---
title: edgeDevice
sidebar_position: 0
---

# ***edgeDevice***

`apiVersion: v0`

`import "github.com/edgenesis/shifu/pkg/k8s/crd"`

## EdgeDevice

EdgeDevice is a custom resource created by Kubernetes [CRD](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) that represents a virtualized digital twin of a physical IoT device.

- **apiVersion**: v1alpha1
- **kind**: EdgeDevice
- **metadata**<br/>Standard Kubernetes ObjectMeta.
- **spec** ([Spec](#edgedevicespec))<br/>Describes the specification of an EdgeDevice.
- **status** ([EdgeDeviceStatus](#edgedevicestatus))<br/>Describes the observed status of the EdgeDevice.

## EdgeDeviceSpec

EdgeDeviceSpec is the description of an EdgeDevice.

### Sku

Hardware model of an EdgeDevice, e.g. `Siemens S7-1200`.

- **sku** (string) required

### Connection

Indicates how the EdgeDevice connects to Shifu.

- **connection** (Connection) required
    - **Connection** (string)<br/>Indicates the connection method, which has to be Ethernet (for now).

### Address

Connection address of the EdgeDevice, the format varies depending on the [protocol](#protocol).

- **address** (string) required

### Protocol

Connection protocol of the EdgeDevice.

- **protocol** (Protocol) required
    - **Protocol** (string)<br/>indicates the connection protocol, which has to be `HTTP`, `HTTPCommandline`, `MQTT`, `OPCUA`, `Socket` or `PLC4X` (for now).

### ProtocolSettings

Settings of EdgeDevice connection protocol.

- **protocolSettings** (ProtocolSettings)
    - **MQTTSetting** (MQTTSetting) 
        - **MQTTTopic** (string)<br/>subscription of MQTT topic, e.g. `/test/test`.
    - **OPCUASetting** (OPCUASetting)
        - **OPCUAEndpoint** (string)<br/>server address of OPC UA, e.g. `opc.tcp://192.168.0.1:4840/test/server`.
        - **SecurityMode** (string)<br/>message encryption mode of OPC UA, which has to be `None` (for now).
        - **Username** (string)<br/>connection authentication username of OPC UA, e.g. `operator`.
        - **Password** (string)<br/>connection authentication password of OPC UA, e.g. `password`.
        - **ConnectionTimeoutInMilliseconds** (int64)<br/>requested connection milliseconds for OPC UA, e.g. `1000`.
    - **SocketSetting** (SocketSetting)
        - **encoding** (string)<br/>encoding of the socket connection, optionally `utf-8` or `hex`, the default value is `utf-8`.
        - **NetworkType** (string)<br/>protocol of the socket link, which has to be `tcp` (for now).
        - **bufferLength** (int)<br/>buffer size of the socket when transferring data, the default value is 1024.
    - **PLC4XSetting** (PLC4XSetting)
        - **protocol** ([Plc4xProtocol](#plc4xprotocolenum))<br/>protocol used by plc4x to connect to the device.
    - **LwM2MSetting** (LwM2MSetting)
    
        - **endpointName** (string)<br/>the unique identifier for the LwM2M client, e.g., `leshan-client`.
        - **securityMode** (string)<br/>the security mode setting for the LwM2M protocol, which can be one of the following:
          1. `None` (for no security)
          2. `DTLS` (for Datagram Transport Layer Security)
        - **dtlsMode** (string)<br/>the DTLS mode, applicable if `securityMode` is set to `DTLS`. Options include:
          1. `PSK` (Pre-Shared Key)
        - **cipherSuites** (array of strings)<br/>the list of DTLS cipher suites, applicable when `securityMode` is `DTLS`. Example:`TLS_PSK_WITH_AES_128_CCM_8`.
        - **pskIdentity** (string)<br/>the pre-shared key identity, applicable when `dtlsMode` is set to `PSK`. Example: `hint`.
        - **pskKey** (string)<br/>the pre-shared key for authentication, applicable when `dtlsMode` is `PSK`. Example: `ABC123`.

#### Plc4xProtocol(enum)

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

Additional information about the EdgeDevice.

- **customMetadata** (string: string)<br/>additional information, e.g. `ChargingTime: 9h`.

## EdgeDeviceStatus

Current status information

### EdgeDevicePhase (will automatically update based on device telemetry)

Current state of EdgeDevice.

- **edgedevicephase** (EdgeDevicePhase)
    - EdgeDevicePhase (string)<br/>State of EdgeDevice, has to be `Pending`, `Running`, `Failed` or `Unknown`.
