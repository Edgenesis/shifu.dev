---
title: Connect an MQTT device
sidebar_position: 2
---

# Connect an MQTT device

## Get the template

Check template files at [examples/mqttDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/mqttDeviceShifu).

## Modify configuration

In `examples/mqttDeviceShifu/mqtt_deploy/mqtt_edgedevice.yaml`:

```yml
...
spec:
  sku: "testMQTT" # change this value
  connection: Ethernet
  address: 192.168.62.231:1883 # change this value
  protocol: MQTT
  protocolSettings:
    MQTTSetting:
      MQTTTopic: /test/test # change this value
```

In `examples/mqttDeviceShifu/mqtt_deploy/mqtt_deviceshifu_configmap.yaml`:

```yml
...
data:
  driverProperties: |
    driverSku: testMQTT
    driverImage: 
  instructions: | 
    instructions: # A command can subscribe to a topic, if you need to subscribe to multiple topics, just add a command
      get_topicmsg1: # change this value
        protocolPropertyList:
          MQTTTopic: "/test/test1" # change this value
      get_topicmsg2: 
        protocolPropertyList:
          MQTTTopic: "/test/test2" 
      ... # You can continue to configure commands and corresponding topics according to your own needs, just continue to add according to this format
```

## Deploy deviceShifu

Run this command:

```
kubectl apply -f examples/mqttDeviceShifu/mqtt_deploy
```

## Get the latest MQTT message from device

In your cluster:

```
curl deviceshifu-mqtt/get_topicmsg1
```

Where `get_topicmsg1` is the embedded query string.

Return from MQTT ***deviceShifu***:

```json
{"mqtt_message":"test_2333","mqtt_receive_timestamp":"2022-04-29 08:57:49.9492744 +0000 UTC m=+75.407609501"}
```

Where `mqtt_message` is the latest data string from device, `mqtt_receive_timestamp` is the timestamp when the message was received.
