---
title: DeviceShifu ConfigMap
sidebar_position: 2
---

# DeviceShifu ConfigMap

`apiVersion: apps/v1`

`import "k8s.io/api/core/v1"`

## ConfigMap

ConfigMap 是一个 Kubernetes 原生的 [ConfigMap](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/config-map-v1/)。用来存放 deviceShifu 的配置。

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata** (ObjectMeta)
  标准的 Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)
- **data** (map[string]string)
  ConfigMap 的数据
  - **driverProperties** ([string](#deviceshifudriverproperties))
  - **instructions** ([string](#deviceshifuinstruction))
  - **telemetries** ([string](#deviceshifutelemetries))

## DeviceShifuDriverProperties

DeviceShifuDriverProperties 是 DeviceShifu 的驱动参数
- **driverSku** (string)
  驱动所适用的硬件型号，如 `Hikvision Camera`
- **driverImage** (string)
  驱动的容器镜像名称，如 `driver/hikvision-camera:v1.2.3`
- **driverExecution** (string)
  驱动的执行路径。针对于命令行的驱动，这里需要填写驱动的执行文件的相对/绝对路径，如 `python driver.py` 或 `C:\driver.exe`

## DeviceShifuInstruction

DeviceShifuInstruction 是 DeviceShifu 可以接受的命令
- **instructionProperties** (DeviceShifuInstructionProperty)
DeviceShifu 命令的参数，根据不同协议有不同的配置。更多示例请参考 [examples](https://github.com/Edgenesis/shifu/tree/main/examples)
  - **DeviceShifuInstructionProperty** (interface)

  
## DeviceShifuTelemetries

DeviceShifuTelemetries 是 DeviceShifu 用来检测一个物联网设备的一个或多个命令
- **telemetrySettings** ([DeviceShifuTelemetrySettings](#deviceshifutelemetrysettings))

- **telemetries** (map[string]DevitelemetryceShifuTelemetry)
  - **[DeviceShifuTelemetry](#deviceshifutelemetry)**

## DeviceShifuTelemetrySettings

DeviceShifuTelemetrySettings 是 DeviceShifu 监测的设置
- **telemetryUpdateIntervalInMiliseconds** (int64)
DeviceShifu 检测 Telemetry 的间隔毫秒

## DeviceShifuTelemetry

DeviceShifuTelemetry 描述了一个 DeviceShifu 通过哪些指令来监测物联网设备的状态
  - **properties** (DeviceShifuTelemetryProperties)
    - **instruction** (string)
    用来检测的命令。必须是上方 [DeviceShifuInstruction](#deviceshifuinstruction) 定义的有效命令
    - **initialDelayMs** (int)
    检测的一开始的延迟（毫秒）

