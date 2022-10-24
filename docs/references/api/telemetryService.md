---
title: TelemetryService
sidebar_position: 4
---

# TelemetryService
TelemetryService defines the configuration of the telemetry push service, associated with [DeviceShifuTelemetryPushSettings](deviceshifu-configmap.md#DeviceShifuTelemetryPushSettings).

- **apiVersion**: shifu.edgenesis.io/v1alpha1
- **kind**: `TelemetryService`
- **metadata**
  - **name** 

    Indicates the name of this telemetry service, the content corresponds to `telemetryCollectionService` in Configmap.

  - **namespace**

    Indicates the namespace where the telemetry service is located, please make sure it is under the same namespace as the `configmap` file.

- **spec** ([Spec](#edgedevicespec))

  Describes the specification of an EdgeDevice.

  - **type** (string)

  Describes the protocol of the push service.

  - **address** (string)

  Describes the address of the push service.

  - **serviceSettings** ([ServiceSettings](#servicesettings))

  Describes the push settings for the push service.

## ServiceSettings
- HTTPSetting([HTTPSetting](edgedevice.md#protocolsettings))

  Push service HTTP protocol settings.

- MQTTSetting([MQTTSetting](edgedevice.md#protocolsettings))

  Push service MQTT protocol settings
