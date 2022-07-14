---
title: 快速上手：连接一个PLC设备
sidebar_position: 3
---

# 快速上手: 接入一个PLC设备
Shifu实现了对西门子S7系列PLC的兼容。用户可以使用Shifu，通过HTTP请求对S7 PLC的内存进行修改。本文将介绍如何接入一台西门子S7-1200 1214C PLC并且与之交互。  
参见[演示视频（YouTube)](https://youtu.be/SV73l52vDp8)以获得操作流程演示。

## 连接
### *第1步*

在接入Shifu之前，PLC应当已经通过以太网与运行Shifu的上位机完成物理连接，并且拥有一个IP地址，这里我们使用`192.168.0.1`。(如果您的PLC设备不为`192.168.0.1`可以将`deviceshifu-plc-deployment.yaml`文件中的`PLC_ADDRESS`改成您的设备的IP)

### *第2步*

创建一个文件夹，在示例中我们将其命名为`plc_configuration_directory`。将下述的四个配置文件都保存在该文件夹下 。  
首先我们需要一个配置文件来获取IP地址与设备类型：  

<details>
  <summary> <b>点此查看deviceshifu-plc-deployment.yaml</b> </summary> 

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: deviceshifu-plc-deployment
  name: deviceshifu-plc-deployment
  namespace: deviceshifu
spec:
  replicas: 1
  selector:
    matchLabels:
      app: deviceshifu-plc-deployment
  template:
    metadata:
      labels:
        app: deviceshifu-plc-deployment
    spec:
      containers:
        - image: edgehub/deviceshifu-http-http:v0.0.1
          name: deviceshifu-http
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: deviceshifu-config
              mountPath: "/etc/edgedevice/config"
              readOnly: true
          env:
            - name: EDGEDEVICE_NAME
              value: "edgedevice-plc"
            - name: EDGEDEVICE_NAMESPACE
              value: "devices"
        - image: edgehub/plc-device:v0.0.1
          name: plc
          env:
            - name: PLC_ADDRESS
              value: "192.168.0.1"
            - name: PLC_RACK
              value: "0"        
            - name: PLC_SLOT
              value: "1"
            - name: PLC_CONTAINER_PORT
              value: "11111"
      volumes:
        - name: deviceshifu-config
          configMap:
            name: plc-configmap-0.0.1
      serviceAccountName: edgedevice-sa
      
```
</details>

同时，还需要一些通用的配置文件:
<details>
  <summary> <b>点此查看deviceshifu-plc-configmap.yaml</b> </summary>

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: plc-configmap-0.0.1
  namespace: deviceshifu
data:
#    device name and image address
  driverProperties: |
    driverSku: PLC
    driverImage: plc-device:v0.0.1
    driverExecution: " "
#    available instructions
  instructions: |
    sendsinglebit:
    sendcontent:
    getcontent:
    getcpuordercode:
#    telemetry retrieval methods
#    in this example, a device_health telemetry is collected by calling hello instruction every 1 second
  telemetries: |
    device_health:
      properties:
        instruction: getcpuordercode
        initialDelayMs: 1000
        intervalMs: 1000
```
</details>

<details>
  <summary> <b>点此查看deviceshifu-plc-service.yaml</b> </summary>

```
apiVersion: v1
kind: Service
metadata:
  labels:
    app: deviceshifu-plc-deployment
  name: deviceshifu-plc
  namespace: deviceshifu
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 8080
  selector:
    app: deviceshifu-plc-deployment
  type: LoadBalancer
```
</details>

<details>
  <summary> <b>点此查看edgedevice-plc.yaml</b> </summary>

```
apiVersion: shifu.edgenesis.io/v1alpha1
kind: EdgeDevice
metadata:
  name: edgedevice-plc
  namespace: devices
spec:
  sku: "PLC"
  connection: Ethernet
  address: 0.0.0.0:11111
  protocol: HTTP
status:
  edgedevicephase: "Pending"
```
</details>

### *第3步*

向Shifu添加PLC设备，创建和启动deviceShifu:

```
kubectl apply -f ../plc_configuration_directory
```

## 操作
对于PLC,Shifu可以通过HTTP请求来设置和读取其内存。  
在执行操作之前，我们需要启动一个nginx镜像，以用于http请求的收发，启动的相关的命令如下：

```bash
kubectl run nginx --image=nginx:1.21 -n deviceshifu 
kubectl exec -it nginx -n deviceshifu -- bash
```
下面列举了3个PLC的指令，分别是**sendsinglebit**、**getcontent**、**getcpuordercode**，我们可以通过 ***Shifu*** 来对设备执行这些命令。

### sendsinglebit

**sendsinglebit**表示修改一个bit，它需要下列参数:

- **rootaddress**: 内存区域名称，比如M代表Merker，Q代表Digital Output。
- **address**: 内存区域中的地址。
- **start**: 开始位置。
- **digit**: 从开始位置起第几个bit。
- **value**: 需要修改成为的数值。

比如，命令`curl "deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=1&value=1"` 会将 Q0.1 的第二个 bit 修改为1。
```bash
curl "deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=1&value=1";echo
```
![plc_result1](images/deviceshifu-plc_result1.png)  
观察PLC我们会发现其Q区的1号位的指示灯变亮。  
### getcontent

**getcontent**表示得到内存区域中一个byte的值，它需要下列参数:

- **rootaddress**: 内存区域名称，比如M代表Merker，Q代表Digital Output。
- **address**: 内存区域中的地址。
- **start**: 开始位置。

比如，命令`curl "deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"` 会返回 Q0.0 的一个 byte 的值。
```bash
curl "deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"
```
![plc_result2](images/deviceshifu-plc_result2.png)
### getcpuordercode

**getcpuordercode**表示得到PLC的静态信息。
```bash
curl "deviceshifu-plc/getcpuordercode";echo
```
![plc_result3](images/deviceshifu-plc_result3.png)  