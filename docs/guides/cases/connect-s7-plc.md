---
title: Connect a PLC Device
sidebar_position: 0
---

# Connect a PLC Device

***Shifu*** is compatible with the `Siemens S7` series. ***Shifu*** can be used to modify the memory of an `S7 PLC` via HTTP requests. This article will show how to access a `Siemens S7-1200 1214C PLC` and interact with it.

<!-- You can also check [this video](https://youtu.be/SV73l52vDp8) on YouTube.-->

## Connection

### Step 1

Before connecting to ***Shifu***, the PLC should have a physical connection to the host machine of ***Shifu*** through the Ethernet and own an IP address. We use `192.168.0.1` here as the IP address. (If the IP address of your PLC device is not `192.168.0.1`, you can change `PLC_ADDRESS` in `deviceshifu-plc-deployment.yaml` to the IP address of your device.)

### Step 2

Create a folder named `plc_configuration_directory` and create the following four configuration files in this folder.

First, a configuration is required to access the IP address and device type:

<details>
  <summary> <b>Click here to view deviceshifu-plc-deployment.yaml</b> </summary> 

```yml
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

Some general configurations are also required:

<details>
  <summary> <b>Click here to view deviceshifu-plc-configmap.yaml</b> </summary>

```yml
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
  <summary> <b>Click here to view deviceshifu-plc-service.yaml</b> </summary>

```yml
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
  <summary> <b>Click here to view edgedevice-plc.yaml</b> </summary>

```yml
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

### Step 3

Add the PLC device to ***Shifu***. Create and start ***deviceShifu***:

```
kubectl apply -f ../plc_configuration_directory
```

## Operations

***Shifu*** can read and write the memory of the PLC through HTTP requests.

Before the next step, we need to start an `nginx` container to send and receive HTTP requests, with the following commands:

```bash
kubectl run nginx --image=nginx:1.21 -n deviceshifu 
kubectl exec -it nginx -n deviceshifu -- bash
```

Three instructions are `sendsinglebit`, `getcontent` and `getcpuordercode`. We can execute these instructions on the device via ***Shifu***.

### sendsinglebit

`sendsinglebit`  modifies a single bit. It needs the following parameters:

- `rootaddress`: the name of the memory area. e.g. `M` for `Merker` and `Q` for `Digital Output`
- `address`: the address of the memory area
- `start`: the start position
- `digit`: the offset from the start position
- `value`: the new value to set

For example, the command `curl "deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=1&value=1"` will modify the second bit of `Q0.1` to `1`.

```bash
curl "deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=1&value=1"; echo
```

![plc_result1](images/deviceshifu-plc_result1.png)  

Check the PLC and you will find the second indicator light in Q area is on.

### getcontent

`getcontent`  gets the value of a specific address in  a memory area. It needs the following parameters:

- `rootaddress`: the name of the memory area. e.g. `M` for `Merker` and `Q` for `Digital Output`
- `address`: the memory area's address
- `start`: the start position

For example, the command `curl "deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0` will return the value of `Q0.0`.

```bash
curl "deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"
```

![plc_result2](images/deviceshifu-plc_result2.png)

### getcpuordercode

`getcpuordercode` gets the static information of PLC.

```bash
curl "deviceshifu-plc/getcpuordercode"; echo
```

![plc_result3](images/deviceshifu-plc_result3.png)
