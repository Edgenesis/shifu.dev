---
title: Integrate an OPCUA Device
sidebar_position: 3
---

# Integrate an OPCUA Device

 As a `Kubernetes` native open source IoT development framework, ***Shifu*** integrates with the `OPC UA` protocol. Developers do not need to think about the actual connecting process of the protocol, but only need to set the key parameters of the protocol to establish a connection and monitor or control the operation of the device.

:::note OPC UA Introduction
`OPC UA` ([OPC Unified Architecture](https://en.wikipedia.org/wiki/OPC_Unified_Architecture)) is the OPC Foundation's machine-to-machine network transport protocol for automation technology. The `OPC UA` protocol supports two communication protocols: a binary communication protocol (`opc.tcp://Server`) and a web service communication protocol (`http://Server`), where the binary communication protocol is the most efficient and provides strong interoperability. firewall is opened.
:::

The following section describes how to use ***Shifu*** to connect devices via the `OPC UA` protocol.

## Set Up Shifu Configuration File

### Configure the IP Information of the Device

Edit the `examples/opcuaDeviceShifu/opcua_deploy/opcua_edgedevice.yaml` file and change `address` to the IP address of the device:

```
address: opc.tcp://192.168.14.163:4840/freeopcua/server
```

### Configure the OPCUA Connection Device Authentication

#### Anonymous Mode

Change `AuthenticationMode` to `Anonymous`:

```
AuthenticationMode: Anonymous
```

#### User Password Mode

For user password mode, you need to modify `AuthenticationMode`, `Username`, `Password` under `opcua_edgedevice.yaml` file:

```
AuthenticationMode: UserName 
Username: user1  
Password: pwd1
```

#### Certification Mode

First you need to create `Configmap` for the certificate and private key.

```bash
$ kubectl create configmap edgedevice-opcua-certificate --from-file=your_certificate_file.pem --from-file=your_private_key.pem -n deviceshifu
```

Modify `AuthenticationMode`, `CertificateFileName`, `PrivateKeyFileName` under `opcua_edgedevice.yaml` file:

```
CertificateFileName: cert.pem  
PrivateKeyFileName: key.pem  
AuthenticationMode: Certificate
```

## Start Shifu's OPCUA Components

Start `deviceshifu-opcua`:

```bash
$ kubectl apply -f examples/opcuaDeviceShifu/opcua_deploy
configmap/opcua-configmap-0.0.1 created
deployment.apps/deviceshifu-opcua-deployment created
service/deviceshifu-opcua created
edgedevice.shifu.edgenesis.io/edgedevice-opcua created
```

The `kubectl` command allows you to view the status of ***deviceShifu***:

```bash
$ kubectl get pods -n deviceshifu
deviceshifu-opcua-deployment-765b77cfcf-f7swc 1/1 Running 0 63s
```

## Running Results

Load `nginx:1.21` to the `Kubernetes` cluster:

```bash
$ kubectl run nginx --image=nginx:1.21 -n deviceshifu
```

View `nginx` running status through `kubectl`:

```bash
$ kubectl get pods -n deviceshifu | grep nginx
nginx 1/1 Running 0 3m43s
```

Go to `pod` of `nginx`':

```bash
$ kubectl exec -it nginx -n deviceshifu -- bash
```

Issue an HTTP request to ***deviceShifu*** to get the data:

```bash
$ curl http://deviceshifu-opcua/get_value
25
```




