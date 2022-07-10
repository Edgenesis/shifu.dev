---
sidebar_position: 1
title: 协议
---

# 设备协议

## 已兼容的协议

当前，***Shifu***支持下列协议与设备进行交互：

1. HTTP
2. [MQTT](https://github.com/Edgenesis/shifu/tree/main/examples/mqttDeviceShifu)
3. [RTSP for streaming](https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu)
4. [Siemens S7](https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu)
5. [TCP socket](https://github.com/Edgenesis/shifu/tree/main/examples/socketDeviceShifu)
6. [OPC UA](https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu)

## 未兼容的协议

Shifu的微服务架构赋予了***Shifu***无与伦比的扩展性，也使得***Shifu***可以非常快速地兼容一个新的协议。

如果您所用的协议***Shifu***还未支持，请点击[这里](https://github.com/Edgenesis/shifu/issues/new)提交一个GitHub Issue，我们会尽快添加对该协议的支持！
