---
title: Connect an OPCUA device
sidebar_position: 3
---

# Connect an OPCUA device

:::caution Work in Progress
English version is not ready yet...
:::

***Shifu*** 作为 `Kubernetes` 原生的开源物联网开发框架，集成了 `OPC UA` 协议。开发者无需考虑协议的具体连接过程，仅需设置协议中的关键参数即可建立连接，监视或者控制设备运行。

:::note OPC UA 简介
`OPC UA` ([OPC Unified Architecture](https://en.wikipedia.org/wiki/OPC_Unified_Architecture)) 是OPC基金会应用在自动化技术的机器对机器网络传输协议。`OPC UA`协议支持两种通信协议：二进制通信协议(`opc.tcp://Server`)和Web服务通讯协议(`http://Server`)，其中二进制通信协议效率最高，提供较强的互操控性，其使用任意选取的TCP通道，可以较容易的进行隧道协议，也可以从透过防火墙开启。
:::

下面将介绍如何使用 ***Shifu*** 通过 `OPC UA` 协议连接设备。

## 设置Shifu的配置文件

### 配置设备IP信息

编辑 `examples/opcuaDeviceShifu/opcua_deploy/opcua_edgedevice.yaml` 文件，将 `address` 修改成设备的IP地址:

```
address: opc.tcp://192.168.14.163:4840/freeopcua/server
```

### 配置OPCUA连接设备认证方式

#### 匿名模式

将 `AuthenticationMode` 修改成 `Anonymous` 即可:

```
AuthenticationMode: Anonymous
```

#### 用户密码模式

用户密码模式，需要修改 `opcua_edgedevice.yaml` 文件下 `AuthenticationMode`、`Username`、`Password`:

```
AuthenticationMode: UserName 
Username: user1  
Password: pwd1
```

#### 证书模式

首先需要为证书以及私钥创建 `Configmap`：

```bash
$ kubectl create configmap edgedevice-opcua-certificate --from-file=your_certificate_file.pem --from-file=your_private_key.pem -n deviceshifu
```

修改 `opcua_edgedevice.yaml` 文件下的 `AuthenticationMode`、`CertificateFileName`、`PrivateKeyFileName`:

```
CertificateFileName: cert.pem  
PrivateKeyFileName: key.pem  
AuthenticationMode: Certificate
```

## 启动Shifu的OPCUA组件

启动 `deviceshifu-opcua`:

```bash
$ kubectl apply -f examples/opcuaDeviceShifu/opcua_deploy
configmap/opcua-configmap-0.0.1 created
deployment.apps/deviceshifu-opcua-deployment created
service/deviceshifu-opcua created
edgedevice.shifu.edgenesis.io/edgedevice-opcua created
```

通过 `kubectl` 命令 可查看 ***deviceShifu*** 运行状况:

```bash
$ kubectl get pods -n deviceshifu
deviceshifu-opcua-deployment-765b77cfcf-f7swc   1/1     Running   0          63s
```

## 运行效果

将 `nginx:1.21` 载入到 `Kubernetes` 集群中:

```bash
$  kubectl run nginx --image=nginx:1.21 -n deviceshifu
```

通过 `kubectl` 查看 `nginx` 运行情况:

```bash
$ kubectl get pods -n deviceshifu  | grep nginx
nginx              1/1     Running   0          3m43s
```

进入 `nginx` 的 `pod`:

```bash
$ kubectl exec -it nginx -n deviceshifu -- bash
```

向 ***deviceShifu*** 发起 HTTP请求，获取数据:

```bash
$ curl http://deviceshifu-opcua/get_value
25
```
