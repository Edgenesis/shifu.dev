---
title: EdgeDevice
sidebar_position: 1
---

# EdgeDevice

:::caution Work in Progress

:::

`apiVersion: v0`

`import "github.com/edgenesis/shifu/pkg/k8s/crd"`

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

Hardware model of an EdgeDevice, e.g. `Siemens S7-1200`.

- **sku** (string) is required to be filled in

### Connection

Indicates how the EdgeDevice connects to Shifu.

- **connection** (Connection) is required to be filled in
  - **Connection** (string) Indicates the connection method, which has to be Ethernet (for now).

### Address

Connection address of the EdgeDevice, the format varies depending on the [protocol](#protocol).

- **address** (string) is required to be filled in

### Protocol

Connection protocol of the EdgeDevice.

- **protocol** (Protocol) is required to be filled in
  - **Protocol** (string)
    indicates the connection protocol, which has to be `HTTP`, `HTTPCommandline`, `MQTT`, `OPCUA` or `Socket` (for now).

### ProtocolSettings

Settings of EdgeDevice connection protocol.

- **protocolSettings** (ProtocolSettings)
  - **MQTTSetting** (MQTTSetting) 
    - **MQTTTopic** (string)
      subscription of MQTT topic, e.g. `/test/test`.
  - **OPCUASetting** (OPCUASetting)
    - **OPCUAEndpoint** (string)
      server address of OPC UA, e.g. `opc.tcp://192.168.0.1:4840/test/server`.
    - **SecurityMode** (string)
      message encryption mode of OPC UA, which has to be `None` (for now).
    - **Username** (string)
      connection authentication username of OPC UA, e.g. `operator`.
    - **Password** (string)
      connection authentication password of OPC UA, e.g. `password`.
    - **ConnectionTimeoutInMilliseconds** (int64)
      requested connection milliseconds for OPC UA, e.g. `1000`.
  - **SocketSetting** (SocketSetting)
    - **Encoding** (string)
      encoding of the socket connection, which has to be `utf-8` (for now).
    - **NetworkType** (string)
      protocol of the socket link, which has to be `tcp` (for now).

### CustomMetadata

Additional information about the EdgeDevice.

- **customMetadata** (string: string)
  additional information, e.g. `ChargingTime: 9h`.

## EdgeDeviceStatus

Current status information

### EdgeDevicePhase (will automatically update based on device telemetry)

Current state of EdgeDevice.

- **edgedevicephase** (EdgeDevicePhase)
  - EdgeDevicePhase (string)
    State of EdgeDevice, has to be `Pending`, `Running`, `Failed` or `Unknown`.
