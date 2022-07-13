---
title: 设备接入
sidebar_position: 1
---

# 设备接入
如果您未运行过`极速试玩`，建议您先行体验[极速试玩](quickstart/quick_demo.md)。
## 如何修改设备接入设置
1. 编辑`edgedevice.yaml`文件

接入设备前，您需要对`edgedevice.yaml`文件进行编辑。对于不同的协议，`protocolSettings`可根据协议进行进一步配置，详细配置请前往[Shifu API 参考](shifu-api-reference/edgedevice.md#protocolsettings)。

```yaml  
...
connection: Ethernet  
address: 0.0.0.0:11112
protocol: HTTP 
protocolSettings:  
  OPCUASetting:  
...
```
`connection`：表示设备的网络连接方式。  
`address`：表示设备的网络地址。  
`protocol`：表示与设备进行交互的通信协议。  
`protocolSettings`：表示对协议进行的下一步设置，对于[不同的协议](protocol-driver-compatibility/protocols.md)需要[引入不同的`Setting`](shifu-api-reference/edgedevice.md#protocolsettings)。

2. 创建`deviceshifu`

修改完上述文件后即可创建`deviceshifu`，此时`deviceshifu`会尝试通过您所设置的配置与您的设备进行连接。

3. 检测设备接入状态

如果您通过命令`kubectl get pods -n deviceshifu`发现`deviceshifu`状态出现`Error`或者`CrashLoopBackOff`，这意味着连接异常。

您也可以通过命令`kubectl logs <NAME> -n deviceshifu` 打印错误信息。

## 通过配置来接入一台OPC UA设备
```yaml
connection: Ethernet  
address: opc.tcp://192.168.0.111:4840/freeopcua/server 
protocol: OPCUA  
protocolSettings:  
  OPCUASetting:  
    SecurityMode: None  
    ConnectionTimeoutInMilliseconds: 5000  
    AuthenticationMode: UserName  
    Username: user1  
    Password: pwd1
```
通过如上配置，将`address`设置成您的OPC UA设备的地址，`protocol`设置成`OPC UA`，`protocolSetting`加入`OPCUASetting`，并配置`SecurityMode`(信息安全模式)、`ConnectionTimeoutInMilliseconds`(连接超时时间)、`AuthenticationMode`(认证默认)以及账号密码等。  
修改完上述配置之后，创建`deviceshifu`即可接入OPC UA设备。
