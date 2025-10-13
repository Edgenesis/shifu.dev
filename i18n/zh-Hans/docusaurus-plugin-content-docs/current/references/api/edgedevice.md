---
title: edgeDevice
sidebar_position: 0
---

# ***edgeDevice***

## EdgeDevice

EdgeDevice 是通过 [Kubernetes CRD](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) 创建的自定义资源，代表着一个物理IoT设备的虚拟化数字孪生。

- **apiVersion**: v1alpha1
- **kind**: EdgeDevice
- **metadata**<br/>标准的 Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)。
- **spec** ([Spec](#edgedevicespec))<br/>描述了一个 EdgeDevice 的规格
- **status** ([EdgeDeviceStatus](#edgedevicestatus))<br/>描述了 EdgeDevice 的观察状态

## EdgeDeviceSpec

EdgeDeviceSpec 是一个 EdgeDevice的描述。

### Sku

表示一个 EdgeDevice 的硬件型号，如 `Siemens S7-1200`。

- **sku** (string) 必填

### Connection

表示EdgeDevice 连接到 Shifu 的连接方式。

- **connection** (Connection) 必填
    - **Connection** (string)<br/>表示连接方式，现在必须是 `Ethernet`。

### Address

表示 EdgeDevice 的连接地址，根据不同的[协议](#protocol)，格式也有所不同。

- **address** (string) 必填

### Protocol

表示 EdgeDevice 通过连接方式的连接协议。

- **protocol** (Protocol) 必填
    - **Protocol** (string)<br/>表示连接协议，现在必须是 `HTTP`, `HTTPCommandline`, `MQTT`, `OPCUA`, `Socket`, `PLC4X` (已弃用，将在 v0.81.0 中移除)。

### ProtocolSettings

表示 EdgeDevice 连接协议的设置。

- **protocolSettings** (ProtocolSettings)
    - **MQTTSetting** (MQTTSetting) 
        - **MQTTTopic** (string)<br/>表示要订阅的MQTT主题， 如 `/test/test`。
        - **MQTTServerAddress** (string)<br/>在没有提供Address时则将其设置为Address
    - **OPCUASetting** (OPCUASetting)
        - **OPCUAEndpoint** (string)<br/>表示 OPC UA 的服务器地址，如 `opc.tcp://192.168.0.1:4840/test/server`。
        - **SecurityMode** (string)<br/>表示 OPC UA 的信息加密模式，现在必须是 `None`。
        - **Username** (string)<br/>表示 OPC UA 的连接认证用户名，如 `operator`。
        - **Password** (string)<br/>表示 OPC UA 的连接认证密码，如 `password`。
        - **ConnectionTimeoutInMilliseconds** (int64)<br/>表示 OPC UA 的请求连接毫秒时长，如 `1000`。
    - **SocketSetting** (SocketSetting)
        - **encoding** (string)<br/>表示 Socket 连接时的编码，可选值为 `utf-8` 或 `hex`，默认值为 `utf-8`。
        - **NetworkType** (string)<br/>表示 Socket 链接时的协议，现在必须是 `tcp`。
        - **bufferLength** (int)<br/>表示 Socket 传输数据时的缓冲区大小，默认值为 1024。
    - **PLC4XSetting** (PLC4XSetting) (已弃用，将在 v0.81.0 中移除)
        - **protocol** ([Plc4xProtocol](#plc4xprotocolenum))<br/>表示 PLC4X 连接PLC设备时的协议。

#### Plc4xProtocol(enum) (已弃用，将在 v0.81.0 中移除) {#plc4xprotocolenum}

```go
Plc4xProtocolS7           = "s7"
Plc4xProtocolADS          = "ads"
Plc4xProtocolBACnet       = "bacnet"
Plc4xProtocolCBus         = "cbus"
Plc4xProtocolEip          = "eip"
Plc4xProtocolKnx          = "knx"
Plc4xProtocolModbusAscii  = "modbus-ascii"
Plc4xProtocolModbusRTU    = "modbus-rtu"
Plc4xProtocolModbusTcp    = "modbus-tcp"
```

### CustomMetadata

表示 EdgeDevice 的附加信息。

- **customMetadata** (string: string)<br/>表示附加信息，如 `ChargingTime: 9h`。

## EdgeDeviceStatus

表示 EdgeDevice 的状态信息。

### EdgeDevicePhase (会自动根据设备遥测进行更新）

表示 EdgeDevice 当前的状态。

- **edgedevicephase** (EdgeDevicePhase)
    - EdgeDevicePhase (string)<br/>表示EdgeDevice 的状态，必须是 `Pending`, `Running`, `Failed` 或 `Unknown`。
