---
title: Data Plane
sidebar_position: 2
---
# Data Plane
The main component of the ***Shifu*** data plane is ***deviceShifu***.

### Introduction

***deviceShifu*** is the core of ***Shifu*** framework and the part where developers should pay most attention to. ***deviceShifu*** takes the form of a `Kubernetes Pod`, a digital representation or digital twin of a physical device.

Each ***deviceShifu*** is associated with one or more physical devices. Users can interact with physical devices through ***deviceShifu***.

**Southbound** - ***deviceShifu*** interacts with IoT devices, translating and sending user requests to the device through a protocol gateway or device driver.

```mermaid
    flowchart TD
    subgraph sg-ds["deviceShifu (southbound section)"]
    http[Protocol gateway]
   	grpc[Device drive]
    end
    sg-ds<-->ed[IoT device]
```

**Northbound** - ***deviceShifu*** converts collected device data via HTTP protocol (gRPC protocol is not supported yet) and sends it to the client.

```mermaid
    flowchart BT
    subgraph sg-ds["deviceShifu (northbound section)"]
    http[HTTP]
    grpc[gRPC]
    end
    sg-ds<-->ua[User application]
```

### Design Docs

If you are interested in the detailed design of ***deviceShifu***, you can visit the [***deviceShifu*** design documentation](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md) for further reading.
