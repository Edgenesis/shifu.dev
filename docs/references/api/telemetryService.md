---
title: TelemetryService
sidebar_position: 3
---

# TelemetryService

TelemetryService defines the configuration of the telemetry push service, associated with [DeviceShifuTelemetryPushSettings](deviceshifu-configmap.md#DeviceShifuTelemetryPushSettings) in ConfigMap.

- **apiVersion**: shifu.edgenesis.io/v1alpha1
- **kind**: `TelemetryService`
- **metadata**
    - **name**<br/>Indicates the name of this telemetry service, the content corresponds to `telemetryCollectionService` in Configmap.
    - **namespace**<br/>Indicates the namespace where the telemetry service is located, please make sure it is under the same namespace as the `configmap` file.

- **spec** ([Spec](#edgedevicespec))<br/>Describes the specification of an EdgeDevice.
    - **type** (string)<br/>Describes the protocol of the push service.
    - **address** (string)<br/>Describes the address of the push service.
    - **serviceSettings** ([ServiceSettings](#servicesettings))<br/>Describes the push settings for the push service.

## ServiceSettings

- HTTPSetting([HTTPSetting](edgedevice.md#protocolsettings))<br/>Push service HTTP protocol settings.
- MQTTSetting([MQTTSetting](edgedevice.md#protocolsettings))<br/>Push service MQTT protocol settings
- LwM2MSetting([LwM2MSetting](edgedevice.md#protocolsettings))<br/>Push service LwM2M protocol settings

