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
```

在 `examples/mqttDeviceShifu/mqtt_deploy/mqtt_deviceshifu_configmap.yaml` 中:

```yml
...
data:
  driverProperties: |
    driverSku: testMQTT
    driverImage: 
  instructions: | 
    instructions: # 一条命令可以订阅一个topic，如需订阅多个topic，增加命令即可
      get_topicmsg1: # 修改此值
        protocolPropertyList:
          MQTTTopic: "/test/test1" # 修改此值
      get_topicmsg2: 
        protocolPropertyList:
          MQTTTopic: "/test/test2"
      ... # 根据自己的需要可继续配置命令及对应的Topic，只需按照此格式继续添加即可
  mutexInstructions: | 
  # 可选，配置mutexInstructions，格式为"key: value", key是向设备发送的mutex指令，设备执行mutex指令时进入忙碌状态，拒绝接收其它指令，value是设备返回给MQTT broker的响应，表示设备已完成对应mutex指令，恢复空闲状态 
    Moving_the_device: "Device_finished_moving" # 修改此值
    Rotating_the_device: "Device_finished_Rotating" 
    ... # 根据自己的需要可继续配置mutexInstruction及对应说明，只需按照此格式继续添加即可
```

## 部署deviceShifu

运行下面的命令：

```
kubectl apply -f examples/mqttDeviceShifu/mqtt_deploy
```

## 获取设备最新的MQTT消息

在您的集群中运行下面的命令:

```
curl deviceshifu-mqtt/get_topicmsg1
```

这里 `get_topicmsg1` 是需要查询的字段。

MQTT ***deviceShifu*** 返回的内容如下：

```json
{"mqtt_message":"test2333","mqtt_receive_timestamp":"2022-04-29 08:57:49.9492744 +0000 UTC m=+75.407609501"}
```

其中 `mqtt_message` 是设备接受到的最新字符串。`mqtt_receive_timestamp` 是接收到该消息的时间戳。

## 通过deviceShifu发布MQTT消息

在您的集群中运行下面的命令:

```
curl -X POST -d 'test_publish' deviceshifu-mqtt/get_topicmsg1
```

这里 `get_topicmsg1` 是需要查询或发布的字段。

发布之后，再次查询MQTT ***deviceShifu*** 返回的内容如下：

```json
{"mqtt_message":"test_publish","mqtt_receive_timestamp":"2022-04-29 08:57:59.7397692 +0000 UTC m=+75.407609501"}
```
