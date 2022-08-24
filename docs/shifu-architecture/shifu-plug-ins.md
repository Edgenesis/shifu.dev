---
title: 插件 Plug-ins
sidebar_position: 4
---

***Shifu*** 在持续加入新的工具类服务来保证对不同协议和驱动的兼容性。

### MQTT Broker

`MQTT Broker`被用来帮助MQTT信息的订阅和发布。目前，***Shifu*** 使用了[Mosquitto](https://mosquitto.org/)来实现兼容。

### RTSP Client

`RTSP Client`保证了流媒体信息的传输。

### Siemens S7 Suite

`Siemens S7 Suite`支持西门子S7系列PLC的操作。目前，***Shifu*** 使用了[Snap7](http://snap7.sourceforge.net/)来实现兼容。

### HTTP to SSH driver stub

`HTTP to SSH driver stub`使得 ***Shifu*** 可以允许用户任意添加新的命令行驱动。参见[远程调用命令行驱动](shifu-advanced-functions/remote-driver-execution.md)。
