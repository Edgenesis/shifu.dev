---
title: Integrate devices with unsupported protocols
sidebar_position: 5
---

:::note
Although ***Shifu*** has been unremittingly trying to support more protocols, there are so many protocols for IoT device communication that it is inevitable to meet with protocols not yet supported when using ***Shifu***. This article will show you how to integrate devices into ***Shifu*** using third-party drivers.
:::

:::tip
If you'd like to contribute and add a new driver to ***Shifu*** project, please check [***deviceShifu*** Development Guide](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md).
:::

## Technical Principle

You can check the folder [pkg/deviceshifu](https://github.com/Edgenesis/shifu/tree/main/pkg/) in [***Shifu*** repository](https://github.com/Edgenesis/shifu.deviceshifu) to see the ***deviceShifu***s supported by ***Shifu***. You can see that [pkg/deviceshifu/deviceshifuhttp](https://github.com/Edgenesis/shifu/tree/main/pkg/deviceshifu/deviceshifuhttp) will convert an IoT device using HTTP protocol to ***debiveShifu***.
In other words, we only need to convert unsupported protocols to HTTP APIs.

## Use Case

Take a device with RS485-Modbus protocol as an example.

:::note
[RS485]( https://en.wikipedia.org/wiki/RS-485) is a hardware connection protocol, and [Modbus]( https://en.wikipedia.org/wiki/Modbus) is a software layer connection protocol.
:::

### Reading data

We need to first find a third-party library that can read data from RS485-Modbus devices. Here we use Python as programming language, and [pymodbus](https://pymodbus.readthedocs.io/en/latest/) as the third-party library. In this case, the physical device RS485 is connected to the computer via an RS485-to-USB module, so the Python class used is [ModbusSerialClient](https://pymodbus.readthedocs.io/en/latest/source/library/pymodbus.client.html#pymodbus.client.serial.ModbusSerialClient).

```py
from pymodbus.client.sync import ModbusSerialClient
```

Create a new class for the device, here we use an LED digital display as an example.

```py
class MyRS485Device:
    def __init__(self, device_address: int = 0x01, port: str = '/dev/tty.usbserial-14420') -> None:
        self.device_address = device_address
        self.client = ModbusSerialClient(method='rtu', port=port, stopbits=1, bytesize=8, parity='N', baudrate=9600, timeout=2.0)
```

As you can see here, we need to initialize the `client` by following the document of [ModbusSerialClient](https://pymodbus.readthedocs.io/en/latest/source/library/pymodbus.client.html#pymodbus.client.serial.ModbusSerialClient) in the third-party library.

Next we can define the functionality of the RS485 device, here we choose to display a decimal number on the LED: 

```py
class MyRs485Led:
    ......
    
    def setFloat(self, value: float):
        data = int(abs(value) * 10)

        self.client.connect()
        self.client.write_register(address=7, value=data, unit=self.device_address)

        self.client.close()
```

In this way, we have successfully read RS485-Modbus data with the Python program above.

### Starting the HTTP server

Next we use [fastapi](https://fastapi.tiangolo.com) to start the HTTP server. We can expose a `setfloat` API for external access to display decimals on the LED display.

```py
from fastapi import FastAPI

app = FastAPI()

device = ZhongshengLed()

@app.get("/setfloat")
def setTemperature(value: float = 0.0):
    device.setFloat(value=value)
    return { "OK": "OK" }
```

The input `float` here is a variable parameter; the return value is a json string, which doesn't matter.

Next we can deploy this HTTP service locally.

```sh
uvicorn --host 0.0.0.0 --port 23330 main:app
```

This allows us to print the corresponding number on the LED digital display by visiting `localhost:23330/setfloat?value=123.4`.

### Accessing Shifu

Next we integrate this device with an HTTP interface into ***Shifu*** to generate a ***deviceShifu***.

<details>
  <summary> Click to see the full configuration file </summary> 


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
      "setfloat": # Here you need to add the API exposed by HTTP
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
  address: "192.168.0.123:23330" # You need to fill in the local IP address
  protocol: HTTP
  customMetadata:
      "description" : "description"
      "paas_device_id" : "device_xxxx"
      "vendor" : "xxx"
status:
  edgedevicephase: "pending"
```
</details>

In this way we have completed the deployment.

:::tip
Welcome to [contribute to ***Shifu*** ](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md) and add new drivers！
:::
