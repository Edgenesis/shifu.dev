---
title: EdgeDevice
sidebar_position: 1
---

# EdgeDevice

`apiVersion: v0`

`import "github.com/edgenesis/shifu/k8s/crd"`

## EdgeDevice

EdgeDevice is a custom resource created by Kubernetes [CRD](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) that represents a virtualized digital twin of a physical IoT device.
  - **apiVersion**: v1alpha1
  - **kind**: EdgeDevice
  - **metadata** Standard Kubernetes ObjectMeta.
  - **spec** ([Spec](#edgedevicespec)) Describes the specification of an EdgeDevice.
  - **status** ([EdgeDeviceStatus](#edgedevicestatus)) Describes the observed status of the EdgeDevice.

## EdgeDeviceSpec

EdgeDeviceSpec is the description of an EdgeDevice.

### Sku

Indicates the hardware model of an EdgeDevice, e.g. `Siemens S7-1200`.

- **sku** (string) is required to be filled in

### Connection

Indicates how the EdgeDevice connects to Shifu.

- **connection** (Connection) is required to be filled in
  - **Connection** (string) Indicates the connection method, which has to be Ethernet (for now).

### Address

Indicates the connection address of the EdgeDevice, the format varies depending on the [protocol](#protocol).

- **address** (string) is required to be filled in

### Protocol

Indicates the connection protocol of the EdgeDevice.

- **protocol** (Protocol) is required to be filled in
  - **Protocol** (string)
    indicates the connection protocol, which has to be `HTTP`, `HTTPCommandline`, `MQTT`, `OPCUA` or `Socket` (for now).

### ProtocolSettings

Indicates the settings of EdgeDevice connection protocol.

- **protocolSettings** (ProtocolSettings)
  - **MQTTSetting** (MQTTSetting) 
    - **MQTTTopic** (string)
      indicates the subscription of MQTT topic, e.g. `/test/test`.
  - **OPCUASetting** (OPCUASetting)
    - **OPCUAEndpoint** (string)
      indicates the server address of OPC UA, e.g. `opc.tcp://192.168.0.1:4840/test/server`.
    - **SecurityMode** (string)
      indicates the message encryption mode of OPC UA, which has to be `None` (for now).
    - **Username** (string)
      indicates the connection authentication username of OPC UA, e.g. `operator`.
    - **Password** (string)
      indicates the connection authentication password of OPC UA, e.g. `password`.
    - **ConnectionTimeoutInMilliseconds** (int64)
      indicates the requested connection milliseconds for OPC UA, e.g. `1000`.
  - **SocketSetting** (SocketSetting)
    - **Encoding** (string)
      indicates the encoding of the socket connection, which has to be `utf-8` (for now).
    - **NetworkType** (string)
      indicates the protocol of the socket link, which has to be `tcp` (for now).

### CustomMetadata

Indicates additional information about the EdgeDevice.

- **customMetadata** (string: string)
  indicates additional information, e.g. `ChargingTime: 9h`.

## EdgeDeviceStatus

Indicates the current status information

### EdgeDevicePhase (will automatically update based on device telemetry)

Indicates the current state of EdgeDevice.

- **edgedevicephase** (EdgeDevicePhase)
  - EdgeDevicePhase (string)
    indicates that the state of EdgeDevice has to be `Pending`, `Running`, `Failed` or `Unknown`.
