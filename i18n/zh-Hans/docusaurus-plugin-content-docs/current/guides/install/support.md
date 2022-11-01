---
title: 支持情况
sidebar_position: 0
---

# 支持情况

## 平台支持

***Shifu*** 支持常见的硬件平台和操作系统。

### 硬件要求

| 硬件平台 | 支持情况 |
| --- | --- |
| `x86/64` | :white_check_mark: |
| `ARM` | :white_check_mark: |

### 操作系统要求

| 操作系统 | 支持情况 |
| --- | --- |
| `Linux` | :white_check_mark: |
| `macOS` | :white_check_mark: |
| `Windows(WSL2)` | :white_check_mark: |


## 协议支持

### 已兼容的协议

当前，***Shifu*** 支持下列协议与设备进行交互：

- [HTTP](https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu)
- [MQTT](https://github.com/Edgenesis/shifu/tree/main/examples/mqttDeviceShifu)
- [RTSP for streaming](https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu)
- [Siemens S7](https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu)
- [TCP socket](https://github.com/Edgenesis/shifu/tree/main/examples/socketDeviceShifu)
- [OPC UA](https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu)

### 未兼容的协议

***Shifu*** 的微服务架构赋予了 ***Shifu*** 无与伦比的扩展性，也使得 ***Shifu*** 可以非常快速地兼容新的协议。

如果您所用的协议 ***Shifu*** 还未支持，请[提交一个GitHub Issue](https://github.com/Edgenesis/shifu/issues/new)，我们会尽快支持该协议！

## 驱动支持

### 已兼容的驱动

***Shifu*** 允许用户向平台添加以下形式的驱动:

- [命令行驱动](references/advanced-features/remote-driver-execution.md)

### 未兼容的驱动

***Shifu*** 的微服务架构赋予了 ***Shifu*** 无与伦比的扩展性，也使得 ***Shifu*** 可以非常快速地兼容新的驱动。

如果您所用的驱动 ***Shifu*** 还未支持，请点击[提交一个 GitHub Issue](https://github.com/Edgenesis/shifu/issue/new)，我们会尽快支持该协议！
