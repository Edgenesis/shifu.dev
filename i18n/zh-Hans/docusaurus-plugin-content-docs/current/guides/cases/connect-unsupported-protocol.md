---
title: 接入尚未支持协议的设备
sidebar_position: 5
---

# 接入尚未支持协议的设备

:::note
虽然 ***Shifu*** 目前正在不断支持更多的协议，但是物联网设备的连接协议非常多，在使用 ***Shifu*** 的过程中，难免会遇到暂不支持的协议。本文将介绍使用第三方驱动在 ***Shifu*** 中接入设备的方式。
:::

:::tip
如果您希望为 ***Shifu*** 项目贡献代码，添加一个新驱动，请查看 [***deviceShifu*** Development Guide](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md)。
:::

## 技术原理

您可以在 [***Shifu*** 仓库](https://github.com/Edgenesis/shifu) 的 [pkg/deviceshifu](https://github.com/Edgenesis/shifu/tree/main/pkg/deviceshifu) 文件夹下查看现在 ***Shifu*** 支持的 ***deviceShifu***。可以看到 [pkg/deviceshifu/deviceshifuhttp](https://github.com/Edgenesis/shifu/tree/main/pkg/deviceshifu/deviceshifuhttp) 会将一个使用HTTP协议的物联网设备转为 ***deviceShifu***。

也就是说，我们只需要将暂不支持的协议转为 HTTP 协议的接口即可。

## 案例实现

以接入RS485-Modbus协议的设备为例。

:::note
[RS485](https://baike.baidu.com/item/RS-485/9695794) 是一种硬件连接协议，[Modbus](https://baike.baidu.com/item/Modbus通讯协议/5972462) 则是软件层的连接协议。
:::

### 读取数据

我们需要先寻找能够读取 RS485-Modbus 设备数据的第三方库。这里我们使用 Python 编程语言，使用的第三方库为 [pymodbus](https://pymodbus.readthedocs.io/en/latest/)。具体来说，该案例中 RS485物理设备 的连接方式为通过 RS485转USB的芯片 连接到电脑，所以使用的 Python类为 [ModbusSerialClient](https://pymodbus.readthedocs.io/en/latest/source/library/pymodbus.client.html#pymodbus.client.serial.ModbusSerialClient)。

```py
from pymodbus.client.sync import ModbusSerialClient
```

新建一个设备的类，这里我们使用一个LED数码显示屏为例：

```py
class MyRS485Device:
    def __init__(self, device_address: int = 0x01, port: str = '/dev/tty.usbserial-14420') -> None:
        self.device_address = device_address
        self.client = ModbusSerialClient(method='rtu', port=port,  stopbits=1, bytesize=8, parity='N', baudrate=9600, timeout=2.0)
```

可以看到在这里我们需要按照第三方库中 [ModbusSerialClient](https://pymodbus.readthedocs.io/en/latest/source/library/pymodbus.client.html#pymodbus.client.serial.ModbusSerialClient) 的文档对 `client` 进行初始化。

接下来我们就可以定义 RS485设备的功能了，这里我们选择在LED上显示一个小数：

```py
class MyRs485Led:
    ......
    
    def setFloat(self, value: float):
        data = int(abs(value) * 10)

        self.client.connect()
        self.client.write_register(address=7, value=data, unit=self.device_address)

        self.client.close()
```

这样，我们通过上述 Python 代码，就实现了读取 RS485-Modbus 的数据。

### 建立HTTP服务端

接下来我们使用 [fastapi](https://fastapi.tiangolo.com) 启动HTTP服务端，比如我们暴露一个 `setfloat` 的API来供外部访问以在LED显示屏上显示小数。

```py
from fastapi import FastAPI

app = FastAPI()

device = ZhongshengLed()

@app.get("/setfloat")
def setTemperature(value: float = 0.0):
    device.setFloat(value=value)
    return { "OK": "OK" }
```

这里输入的 `float` 是一个可变参数；返回值是一个json串，并不重要。

接下来我们可以在本机部署这个HTTP服务，然后再接入 ***Shifu***。

```sh
uvicorn --host 0.0.0.0 --port 23330 main:app
```

这样我们就可以通过访问 `localhost:23330/setfloat?value=123.4` 在LED数码显示屏上呈现出对应的数字。

### 接入Shifu

接下来我们将这个经过HTTP呈现的设备接入到 ***Shifu*** 生成 ***deviceShifu***。

<details>
  <summary> 点击查看完整配置文件 </summary> 

```yml
---
# Source: shifu_chart/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: deviceshifu-myled-configmap
  namespace: deviceshifu
data:
  driverProperties: |
    driverImage: "defaultImage"
    driverSku: "Hello"
  instructions: |
    instructionSettings:
      defaultTimeoutSeconds: 3
    instructions:
      "setfloat": # 这里需要添加HTTP暴露的API
  telemetries: |
    telemetrySettings:
      telemetryUpdateIntervalInMilliseconds: 6000
    telemetries:
---
# Source: shifu_chart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: deviceshifu-myled-deployment
  name: deviceshifu-myled-service
  namespace: deviceshifu
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 8080
  selector:
    app: deviceshifu-myled-deployment
  type: LoadBalancer
---
# Source: shifu_chart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: deviceshifu-myled-deployment
  name: deviceshifu-myled-deployment
  namespace: deviceshifu
spec:
  replicas: 1
  selector:
    matchLabels:
      app: deviceshifu-myled-deployment
  template:
    metadata:
      labels:
       app: deviceshifu-myled-deployment
    spec:
      containers:
        - image: edgehub/deviceshifu-http-http:v0.1.0
          name: deviceimg
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: deviceshifu-config
              mountPath: "/etc/edgedevice/config"
              readOnly: true
          env:
            - name: EDGEDEVICE_NAME
              value: edgedevice-myled
            - name: EDGEDEVICE_NAMESPACE
              value: devices
      volumes:
      - name: deviceshifu-config
        configMap:
          name: deviceshifu-myled-configmap
      serviceAccountName: edgedevice-sa
---
# Source: shifu_chart/templates/edgedevice.yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: EdgeDevice
metadata:
  name: edgedevice-myled
  namespace: devices
spec:
  sku: "xxx"
  connection: Ethernet
  address: "192.168.0.123:23330" # 需要填写本机的IP地址
  protocol: HTTP
  customMetadata:
      "description" : "description"
      "paas_device_id" : "device_xxxx"
      "vendor" : "xxx"
status:
  edgedevicephase: "pending"
```
</details>

这样我们就完成了部署。

:::tip
欢迎您 [向 ***Shifu*** 项目贡献代码](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md)，添加尚未支持的新驱动！
:::
