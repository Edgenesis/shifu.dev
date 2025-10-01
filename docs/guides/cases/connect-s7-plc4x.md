---
title: Use PLC4x to connect to a Siemens S7 PLC
sidebar_position: 1
---

# Use PLC4x to connect to a Siemens S7 PLC

:::warning Deprecated
PLC4X support is deprecated and will be removed in v0.81.0. Please plan to migrate to alternative protocols.
:::

***Shifu*** is also compatible with `Siemens S7 series` PLCs in the form of PLC4X. This article will show you how to use `deviceshifu-plc4x-http` to integrate and interact with a `Siemens S7-1200 1214C PLC`.

## Connection

### Step 1

Before connecting to ***Shifu***, the PLC should already be physically connected to the host computer running ***Shifu*** via Ethernet and have an IP address, here we use `192.168.0.1`.


:::tip
If the IP address of your PLC device is not `192.168.0.1`, you can change `address` in the `edgedevice-plc4x.yaml` file to the IP of your device)
:::

### Step 2

Create a folder, which in the example we named `plc4x_configuration_directory`. Save all four configuration files described below in this folder.

First we need a configuration file to get the IP address and device type.  

<details>
  <summary> <b>click here to check deviceshifu-plc4x-deployment.yaml</b> </summary> 

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

In the mean time, we need some common configuration files:

<details>
  <summary> <b>click here to check deviceshifu-plcs4x-configmap.yaml</b> </summary>

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
  <summary> <b>click here to check deviceshifu-plc4x-service.yaml</b> </summary>

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
  <summary> <b>click here to check edgedevice-plc4x.yaml</b> </summary>

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

### Step 3

Add PLC devices in ***Shifu***，build and start ***deviceShifu***:

```bash
kubectl apply -f ../plc4x_configuration_directory
```

## Operations

***Shifu*** can read and write to the memory of PLC via HTTP requests. 

Before operation, we need to start an `nginx container` for sending and receiving HTTP requests, the relevant command to start is as follows:

```bash
kubectl run nginx --image=nginx:1.21 -n deviceshifu 
kubectl exec -it nginx -n deviceshifu -- bash
```

`deviceshifu-plc4x-http` has two built-in commands `read` and `write`, which we can use to read and write to the devices via ***shifu***.

:::tip
The command `%Q0.0:BOOL` in this article is a PLC4X command where `Q` is the name of the memory area, `0.0` indicates the address of the starting bit and its offset. `BOOL` is the type of data to be read (written).

If you want to know more about PLC4X commands, please go to [PLC4X official website](https://plc4x.apache.org/users/protocols/s7.html).
:::

### read

**read** means to read the value of the device using the corresponding command:

For example, the command `curl "deviceshifu-plc4x/read?%Q0.0:BOOL"` returns the address of the memory area `Q0`.

```bash
curl "deviceshifu-plc4x/read?%Q0.0:BOOL"; echo
{"field_%Q0.0:BOOL": "BOOL(1bit):false"}
```

At this point ***Shifu*** returns the status of the first indicator from left to right in the Q area. If the light is on, then it returns true, otherwise it returns false. Since the light is off, the return value is false.

### write

`write` means to modify the value of the corresponding location through commands:

For example, the command `curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true"` will change the first bit of `Q0` to true.

```bash
curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true"; echo
```

### More

If you need to read or write multiple commands at the same time, you can connect them with `&`.

For example, the command `curl "deviceshifu-plc4x/read?%Q0.0:BOOL&%Q0.1:BOOL"` will return both the first bit and the second bit of `Q0` at the same time.

The command `curl "deviceshifu-plc4x/write?%Q0.0:BOOL=true&%Q0.1:BOOL=true"` will change both the first bit and the second bit of `Q0` to true.
