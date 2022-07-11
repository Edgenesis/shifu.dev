---
title: 设备管理
sidebar_position: 2
---

# 设备管理
在`deviceshifu_configmap.yaml`中的`telemetries`表示自动测量记录传导。*shifu*通过`telemetries`中设置的方法，以指定时间周期性地向设备发送请求，以判断设备连接连接情况。如果设备出现故障或者链接出现问题，`edgedevice`的状态将发生改变，您可以通过`kubectl describe edgedevice -A`查看其状态。
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
其中`telemetrySettings:`下的`telemetryUpdateIntervaInlMiliseconds`表示自动测量的时间间隔。

`telemetries`下可以包含多个对象，即可以同时开启多个。
## 案例演示
我们先启动一个`OPC UA`设备，并启动`deviceshifu`。之后我们通过命令查看工作状态。
```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Running
Events:             <none>
```
我们可以观察到当前设备处于`Running状态`，此时我们将设备关闭。此时我们在通过命令查看工作状态。
```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Failed
Events:             <none>
```
我们可以观察到当前设备处于`Failed状态`，此时我们将设备重新启动。*shifu*检测到设备启动后将更新设备状态到`Running`。
```bash
$ kubectl describe edgedevice -A
...
Status:
  Edgedevicephase:  Running
Events:             <none>
