---
title: TelemetryService
sidebar_position: 4
---

:::caution正在施工

:::

# TelemetryService
TelemetryService 定义遥测推送服务的配置，与`configmap`中[DeviceShifuTelemetryPushSettings](deviceshifu-configmap.md#DeviceShifuTelemetryPushSettings)相关联。

- **apiVersion**: shifu.edgenesis.io/v1alpha1
- **kind**: `TelemetryService`
- **metadata**
  - **name** 

    表示该遥测服务的名字，该内容与Configmap中`telemetryCollectionService`对应。

  - **namespace**

    表示该遥测服务位于的命名空间，请保证它与`configmap`文件位于同一命名空间下。

- **spec** （[Spec](#edgedevicespec)）

  描述了一个 EdgeDevice 的规格。

  - **type** (string)

  描述了推送服务的协议。

  - **address** (string)

  描述了推送服务的地址。

  - **serviceSettings** ([ServiceSettings](#servicesettings))

  描述了推送服务的推送设置。

## ServiceSettings
- HTTPSetting([HTTPSetting](edgedevice.md#protocolsettings))

  推送服务HTTP协议设置。

- MQTTSetting([MQTTSetting](edgedevice.md#protocolsettings))

  推送服务MQTT协议设置