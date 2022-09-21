---
title: Control Plane
sidebar_position: 2
---

The main components of the ***Shifu*** control plane are ***shifuController*** and ***shifud***.

### shifuController

#### Introduction

The ***shifuController*** is used to control a [Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) introduced by ***Shifu***, the ***edgeDevice***, which contains information about the physical device connected to ***Shifu***.

Each ***edgeDevice*** has two parts: `EdgeDeviceSpec` and `EdgeDevicePhase`.

The `EdgeDeviceSpec` contains the basic information of the device, with the following 4 elements:

| Variable name | Variable type | Usage | Examples |
|--|--|--|--|
| Sku        | string     | SKU name of device            | PLC, Hikvision camera |
| Connection | Connection | Method of hardware connection | Ethernet, USB |
| Address    | string     | Hardware address              | 192.168.0.1 |
| Protocol   | Protocol   | Transfer protocol             | HTTP, MQTT, Socket...|

The `EdgeDevicePhase` defines the current state of the device:

| State | Meaning |
|--|--|
| Pending | Device recognized, but has not connected to ***Shifu***... |
| Running | Device has connected to ***Shifu*** and is running... |
| Failed  | Device failed to connect ***Shifu***... |
| Unknown | Unknown state... |

#### Design Docs 

If you are interested in the detailed design of ***shifuController***, please visit [***shifuController*** design documentation](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifuController.md) for further reading.

### ***shifud***

#### Introduction

***shifud*** is a `DaemonSet` that runs on each Kubernetes node, primarily responsible for device discovery, verification, and updates.

#### Design Docs

If you are interested in the detailed design of ***shifud***, please visit [***shifud*** design documentation](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifud.md) for further reading.
