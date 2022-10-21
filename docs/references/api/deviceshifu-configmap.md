---
title: deviceShifu ConfigMap
sidebar_position: 3
---

# ***deviceShifu*** ConfigMap

:::caution Work in Progress

:::

`apiVersion: apps/v1`

`import "k8s.io/api/core/v1"`

## ConfigMap

ConfigMap of ***Shifu*** is a Kubernetes-native [ConfigMap](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/config-map-v1/) that is used to store ***deviceShifu*** configurations.

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata** (ObjectMeta)
  The standard [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)
- **data** (map[string]string)
  Data for ConfigMap.
  - **driverProperties** ([DeviceShifuDriverProperties](#deviceshifudriverproperties))
  - **instructions** ([DeviceShifuInstructions](#deviceshifuinstructions))
  - **telemetries** ([DeviceShifuTelemetries](#deviceshifutelemetries))

## DeviceShifuDriverProperties

`DeviceShifuDriverProperties` refer to driver parameters of DeviceShifu.

- **driverSku** (string)
  hardware models supported by the driver, such as `Hikvision Camera`.
- **driverImage** (string)
  container image name of the driver, such as `driver/hikvision-camera:v1.2.3`.
- **driverExecution** (string)
   execution path of the drive. For command line driver, relative/absolute path of the driver execution file needs to be filled in, such as `python driver.py` or `C:\driver.exe`.

## DeviceShifuInstructions

`DeviceShifuInstructions` are all the commands and settings that ***deviceShifu*** can receive and issue.

- **instructionSettings** ([DeviceShifuInstructionSettings](#deviceshifuinstructionsettings))
- **instructions** (map[string]DeviceShifuInstruction)
    - **[DeviceShifuInstruction](#deviceshifuinstruction)**

## DeviceShifuInstruction

`DeviceShifuInstruction` is the command that ***deviceShifu*** can receive.

-  **protocolPropertyList** (`map[string]string`)
  parameters of the DeviceShifu command, which have various configurations according to different protocols . Please refer to the  examples for more [examples](https://github.com/Edgenesis/shifu/tree/main/examples).
  - **DeviceShifuInstructionProperty** (interface)

## DeviceShifuInstructionSettings

`DeviceShifuInstructionSettings` refers to the settings related to Instructions in ***deviceShifu***.

- **defaultTimeoutSeconds** (int)
  default timeout period (in seconds) for all Instructions. If not set, the default value is 3 seconds

## DeviceShifuTelemetries

`DeviceShifuTelemetries` refer to one or more commands that ***deviceShifu*** uses to detect IoT devices.

- **telemetrySettings** ([DeviceShifuTelemetrySettings](#deviceshifutelemetrysettings))
- **telemetries** (map[string]DeviceShifuTelemetry)
  - **[DeviceShifuTelemetry](#deviceshifutelemetry)**

## DeviceShifuTelemetrySettings

`DeviceShifuTelemetrySettings` are the settings related to ***deviceShifu*** monitoring.

- **defaultPushToServer** (bool) ***deviceShifu*** Defaults all telemetry to the push service.
- **defaultTelemetryCollectionService** (string) ***deviceShifu*** Defaults telemetry to push addresses.
- HTTP protocol:
    - **telemetryUpdateIntervalInMilliseconds** (int64)
      millisecond interval at which ***deviceShifu*** detects `Telemetry`. The default value is 3000.
    - **telemetryTimeoutInMilliseconds** (int64)
      timeout for ***deviceShifu*** to connect to the device. The default value is 3000.
    - **telemetryInitialDelayInMilliseconds** (int64)
      delay time for the initial detection of ***deviceShifu***. The default value is 3000.
- TCP socket protocol:
    - **telemetryUpdateIntervalInMilliseconds** (int64)
      millisecond interval at which ***deviceShifu*** detects Telemetry. Default is 1000. (Detection method: ***deviceShifu*** tries to establish a socket connection with the device once every 1000 milliseconds, and determines if the device is on by whether the connection is successful.)
- MQTT protocol:
    - **telemetryUpdateIntervalInMiliseconds** (int64)
      DeviceShifu detects the millisecond interval between the MQTT and the receipt of the last msg. Default value is 3000.
- PLC4X:
  - **telemetryUpdateIntervalInMiliseconds** (int64) ***deviceShifu*** The interval (in milliseconds) for detecting `Telemetry`. (Detection method, using PLC4X to send ping to the device.)
## DeviceShifuTelemetry

`DeviceShifuTelemetry` describes which commands ***deviceShifu*** uses to monitor the status of IoT devices.

- **properties** (DeviceShifuTelemetryProperties)
  - **instruction** (string)
    Indicates the command used for telemetry, and must be a valid command as defined by [DeviceShifuInstruction](#deviceshifuinstruction) above.
  - **initialDelayMs** (int)
    Indicates the delay (in milliseconds) to start telemetry.
  - **intervalMs** (int)
    Indicates the interval of telemetry (milliseconds).
  - **pushSettings** ([DeviceShifuTelemetryPushSettings](#deviceshifutelemetrypushsettings))
    Used to set up this telemetry push service.

## DeviceShifuTelemetryPushSettings

`DeviceShifuTelemetryPushSettings` describes the settings for a telemetry push service for ***deviceshifu***.

- **telemetryCollectionService** (string)
  Indicates the name of the TelemetryService corresponding to the telemetry service.
- **pushToServer** (bool)
  Indicates whether this telemetry service is performed or not.
