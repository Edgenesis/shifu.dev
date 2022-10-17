---
title: 连接MQTT设备
sidebar_position: 2
---

# 连接MQTT设备

## 获取模版

请在 [examples/mqttDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/mqttDeviceShifu) 查看模板文件。

## 修改配置

在 `examples/mqttDeviceShifu/mqtt_deploy/mqtt_edgedevice.yaml` 中:

```yml
...
spec:
  sku: "testMQTT" # 修改此值
  connection: Ethernet
  address: 192.168.62.231:1883 # 修改此值
  protocol: MQTT
  protocolSettings:
    MQTTSetting:
      MQTTTopic: /test/test # 修改此值
```

## 部署deviceShifu

运行下面的命令：

```
kubectl apply -f examples/mqttDeviceShifu/mqtt_deploy
```

## 获取设备最新的MQTT消息

在您的集群中运行下面的命令:

```
curl deviceshifu-mqtt/mqtt_data
```

这里 `mqtt_data` 是需要查询的字段。

MQTT ***deviceShifu*** 返回的内容如下：

```json
{"mqtt_message":"test2333","mqtt_receive_timestamp":"2022-04-29 08:57:49.9492744 +0000 UTC m=+75.407609501"}
```

其中 `mqtt_message` 是设备接受到的最新字符串。`mqtt_receive_timestamp` 是接收到该消息的时间戳。
