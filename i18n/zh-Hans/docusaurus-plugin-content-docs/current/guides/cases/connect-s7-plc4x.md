---
title: 使用 PLC4x 连接 西门子S7 PLC
sidebar_position: 1
---

# 使用 PLC4x 连接 西门子S7 PLC

***Shifu*** 还可以使用 PLC4X的形式 实现对 `西门子S7系列` PLC兼容。本文将介绍如何使用 `deviceshifu-plc4x-http` 接入一台 `西门子S7-1200 1214C PLC` 并且与之交互。

## 连接

### 第1步

在接入 ***Shifu*** 之前，PLC应当已经通过以太网与运行 ***Shifu*** 的上位机完成物理连接，并且拥有一个IP地址，这里我们使用`192.168.0.1`。

:::tip
如果您的PLC设备不为`192.168.0.1`可以将`edgedevice-plc4x.yaml`文件中的`address`改成您的设备的IP)
:::

### 第2步

创建一个文件夹，在示例中我们将其命名为`plc4x_configuration_directory`。将下述的四个配置文件都保存在该文件夹下 。  

首先我们需要一个配置文件来获取IP地址与设备类型：  

<details>
  <summary> <b>点此查看deviceshifu-plc4x-deployment.yaml</b> </summary> 

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: deviceshifu-plc4x-deployment
  name: deviceshifu-plc4x-deployment
  namespace: deviceshifu
spec:
  replicas: 1
  selector:
    matchLabels:
      app: deviceshifu-plc4x-deployment
  template:
    metadata:
      labels:
        app: deviceshifu-plc4x-deployment
    spec:
      containers:
      - image: edgehub/deviceshifu-http-plc4x:v0.1.1
        name: deviceshifu-http
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: deviceshifu-config
          mountPath: "/etc/edgedevice/config"
          readOnly: true
        env:
        - name: EDGEDEVICE_NAME
          value: "edgedevice-plc4x"
        - name: EDGEDEVICE_NAMESPACE
          value: "devices"
      volumes:
      - name: deviceshifu-config
        configMap:
          name: plc4x-configmap
      serviceAccountName: edgedevice-sa
```
</details>

同时，还需要一些通用的配置文件:

<details>
  <summary> <b>点此查看deviceshifu-plcs4x-configmap.yaml</b> </summary>

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: plc4x-configmap
  namespace: deviceshifu
data:
  driverProperties: |
    driverSku: testPlc4x
    driverImage: 
  instructions: |
    instructions:
  telemetries: |
    telemetrySettings:
```
</details>

<details>
  <summary> <b>点此查看deviceshifu-plc4x-service.yaml</b> </summary>

```yml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: deviceshifu-plc4x-deployment
  name: deviceshifu-plc4x
  namespace: deviceshifu
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: deviceshifu-plc4x-deployment
  type: LoadBalancer
```
</details>

<details>
  <summary> <b>点此查看edgedevice-plc4x.yaml</b> </summary>

```yml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: EdgeDevice
metadata:
  name: edgedevice-plc4x
  namespace: devices
spec:
  sku: "testPlc4x" 
  connection: Ethernet
  address: 192.168.0.1 #change this accordingly
  protocol: PLC4X
  protocolSettings:
    PLC4XSetting:
      protocol: s7
```
</details>

### 第3步

向 ***Shifu*** 添加PLC设备，创建和启动 ***deviceShifu***:

```bash
kubectl apply -f ../plc4x_configuration_directory
```

## 操作

对于PLC，***Shifu*** 可以通过HTTP请求来读取和写入其内存。 

在执行操作之前，我们需要启动一个 `nginx容器`，以用于HTTP请求的收发，启动的相关的命令如下：

```bash
kubectl run nginx --image=nginx:1.21 -n deviceshifu 
kubectl exec -it nginx -n deviceshifu -- bash
```

`deviceshifu-plc4x-http` 内置了两个命令`read`和`write`，我们可以通过 ***shifu*** 使用这两个命令来对设备进行读写操作。

:::tip
本文中的命令 `%Q0.0:BOOL` 为PLC4X的命令其中 `Q` 为内存区域名称，`0.0` 表示起始 bit 的地址及其偏移量。`BOOL` 为读取(写入)的数据类型。

如果您想了解更多关于PLC4X的命令，请前往[PLC4X官网](https://plc4x.apache.org/users/protocols/s7.html)。
:::

### read

`read` 表示使用对应命令读取设备的值:

比如，命令`curl "deviceshifu-plc4x/read?%Q0.0:BOOL"` 会返回内存区域 `Q0` 的地址内容。

```bash
curl "deviceshifu-plc4x/read?%Q0.0:BOOL"; echo
{"field_%Q0.0:BOOL":"BOOL(1bit):false"}
```

此时 ***Shifu*** 返回Q区的从左往右第一个指示灯的状态。如果该指示灯为亮的则返回true，否则返回false。由于当前为熄灭状态，返回值为false

### write

`write` 表示通过命令修改对应位置的值:

比如，命令`curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true"` 会将 `Q0` 的第一个 bit 修改为true。

```bash
curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true"; echo
```

### 更多

如果您需要同时读取或者写入多个命令，您可以使用 `&` 进行连接使用。

比如，命令`curl "deviceshifu-plc4x/read?%Q0.0:BOOL&%Q0.1:BOOL"` 会同时将 `Q0` 的第一个 bit 和 第二个 bit 的值返回。

命令 `curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true&%Q0.1:BOOL=true"`会同时将 `Q0` 的第一个 bit 和 第二个 bit 修改为true。
