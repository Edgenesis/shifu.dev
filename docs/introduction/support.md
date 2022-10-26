---
title: Support
sidebar_position: 3
---

# Support

## Platform Support

***Shifu*** supports common hardware platforms and operating systems.

### Hardware Requirements

| Hardware Platforms | Support |
| --- | --- |
| `x86/64` | :white_check_mark: |
| `ARM` | :white_check_mark: |

### Operating System Requirements

| Operating System | Support |
| --- | --- |
| `Linux` | :white_check_mark: |
| `macOS` | :white_check_mark: |
| `Windows(WSL2)` | :white_check_mark: |

## Protocol Support

### Compatible protocols

Currently, ***Shifu*** supports the following protocols for interacting with devices.

- [HTTP](https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu)
- [MQTT](https://github.com/Edgenesis/shifu/tree/main/examples/mqttDeviceShifu)
- [RTSP for streaming](https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu)
- [Siemens S7](https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu)
- [TCP socket](https://github.com/Edgenesis/shifu/tree/main/examples/socketDeviceShifu)
- [OPC UA](https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu)

### Incompatible protocols

The microservice architecture of ***Shifu*** gives ***Shifu*** unparalleled scalability and allows ***Shifu*** to be compatible with new protocols very quickly.

If the protocol you are using ***Shifu*** is not yet supported, please [submit a GitHub Issue](https://github.com/Edgenesis/shifu/issues/new) and we will support it as soon as possible!

## Driver support

### Compatible drivers already

***Shifu*** allows users to add the following forms of drivers to the platform:

- [command-line driver](references/advanced-features/remote-driver-execution.md)

### Incompatible drivers

The microservice architecture of ***Shifu*** gives ***Shifu*** unparalleled scalability and allows ***Shifu*** to be compatible with new drivers very quickly.

If the driver you are using ***Shifu*** is not yet supported, please click [Submit a GitHub Issue](https://github.com/Edgenesis/shifu/issue/new) and we will support the protocol as soon as possible!
