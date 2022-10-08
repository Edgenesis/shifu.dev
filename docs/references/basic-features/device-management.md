---
title: Device Management
sidebar_position: 2
---

# Device Management

`telemetries` in `deviceshifu_configmap.yaml` represents automatic measurement logging conduction. ***Shifu*** determines the connection status of a device by sending requests to the device periodically at the specified time by the method set in `telemetries`. If a device fails or has connection problems, the status of ***edgeDevice*** will change, and you can check its status with ``kubectl describe edgedevice -A``.

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

The `telemetryUpdateIntervaInlMiliseconds` under `telemetrySettings` indicates the time interval for automatic measurement.

Multiple objects can be included under `telemetries`, i.e. multiple objects can be turned on at the same time.

## Case Demonstration

1. First we start an `OPC UA` device and start ***deviceShifu***. After that we can check the working status of the device with the following command.
    ```bash
    $ kubectl describe edgedevice -A
    ...
    Status:
      Edgedevicephase: Running
    Events: <none>
    ``` 2.
2. We can see that the device is currently in the `Running` state, so let's shut it down. At this point, we can check the status of the device with the following command.
    ```bash
    $ kubectl describe edgedevice -A
    ...
    Status:
      Edgedevicephase: Failed
    Events: <none>
    ``` 3.
3. we can see that the device is currently in `Failed` state, at this point we can restart the device. ***Shifu*** will update the device status to ``Running`` when it detects the device starting up, we will enter the following command to see the change in the device status.
    ```bash
    $ kubectl describe edgedevice -A
    ...
    Status:
      Edgedevicephase: Running
    Events: <none>
    ```
