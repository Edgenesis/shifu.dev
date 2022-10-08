---
title: Control Plane
sidebar_position: 1
---
# Control Plane
The main components of the ***Shifu*** control plane are ***shifuController*** and ***shifud***.

### ***shifuController***

#### Introduction

***shifuController*** is used to control a custom [Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/ custom-resource-definitions/) i.e. ***edgeDevice***, ***edgeDevice*** describes various information about the device connected to ***Shifu***.

Each ***edgeDevice*** has two parts.
`EdgeDeviceSpec` and `EdgeDevicePhase`.

`EdgeDeviceSpec` contains the basic information about the device. It has four elements.

| Variable Name | Variable Type | Purpose | Example |
|--|--|--|--|
| Sku | string | SKU name of the device | PLC, Hikvision camera |
| Connection | Connection | Hardware connection type | Ethernet, USB |
| Address | string | Hardware address | 192.168.0.1 |
| Protocol | Protocol | Transmission protocol | HTTP, MQTT, Socket... |Protocol

The `EdgeDevicePhase` defines the current state of the device.

| Status | Meaning |
|--|--|
| `Pending` | The device has been identified, but access to ***Shifu*** is not yet complete... |--|--|
| `Running` | The device has been successfully connected to ***Shifu*** and is running... | `Failed
| `Failed` | Device access to ***Shifu*** has failed... | `Unknown
| `Unknown` | Unknown status... | `Unknown` | Unknown status...

#### Design Documentation

If you are interested in the internal details of ***shifuController***, you can go to the [***shifuController*** design documentation](https://github.com/Edgenesis/shifu/blob/main/docs/design/design- shifuController-zh.md) for further reading.

### ***shifud***

#### Introduction

***shifud*** is a `DaemonSet` that runs on each Kubernetes node and is mainly responsible for device recognition, authentication and updates.

#### Design Documentation

If you are interested in the internal details of ***shifud***, you can go to [***shifud*** Design Documentation](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifud-zh.md) for further reading.
