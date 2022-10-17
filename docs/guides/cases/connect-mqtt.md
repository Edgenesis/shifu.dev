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

## Deploy deviceShifu

Run this command:

```
kubectl apply -f examples/mqttDeviceShifu/mqtt_deploy
```

## Get the latest MQTT message from device

In your cluster:

```
curl deviceshifu-mqtt/mqtt_data
```

Where `mqtt_data` is the embedded query string.

Return from MQTT ***deviceShifu***:

```json
{"mqtt_message":"test2333","mqtt_receive_timestamp":"2022-04-29 08:57:49.9492744 +0000 UTC m=+75.407609501"}
```

Where `mqtt_message` is the latest data string from device, `mqtt_receive_timestamp` is the timestamp when the message was received.
