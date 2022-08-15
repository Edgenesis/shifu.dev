---
title: Device Management
sidebar_position: 2
---

# Device Management

The `telemetries` in `deviceshifu_configmap.yaml` indicate automatic measurement recording conduction. *Shifu* uses the method set in `telemetries` to periodically send requests to the device at a specified time to determine the connection status of the device. If the device fails or there is a connection problem, the state of the `edgedevice` will change, the status can be viewed with `kubectl describe edgedevice -A`.

```yaml
...
telemetries: |  
  telemetrySettings:  
    telemetryUpdateIntervaInlMiliseconds: 1000  
  telemetries:  
    device_health:  
      properties:  
        instruction: get_server  
        initialDelayMs: 1000  
        intervalMs: 1000
```

`telemetryUpdateIntervaInlMiliseconds` of `telemetrySettings` represents the time interval for automatic measurement.

`telemetries` can contain multiple objects, that is, multiple objects can be opened at the same time.

## Demo

1. Let's start `OPC UA` equipment, and start the `deviceshifu`. Then we use the following command to check the condition.

```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Running
Events:             <none>
```

2. Once the device is observed at `Running`, shut down the device. Then the status of the device can be checked through the following command:

```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Failed
Events:             <none>
```

3. The device is in a `Failed` state, at this time the device need to be restarted. Shifu will update the device status to `Running` after the device is restarted. After that, input command to see the changes in the device status

```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Running
Events:             <none>
```
