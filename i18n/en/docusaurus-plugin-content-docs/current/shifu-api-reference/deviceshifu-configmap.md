---
title: DeviceShifu ConfigMap
sidebar_position: 2
---

# DeviceShifu ConfigMap

`apiVersion: apps/v1`

`import "k8s.io/api/core/v1"`

## ConfigMap

ConfigMap of Shifu is a Kubernetes-native [ConfigMap](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/config-map-v1/) that is used to store DeviceShifu configurations.

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

DeviceShifuDriverProperties refer to driver parameters of DeviceShifu.

- **driverSku** (string)
  indicates the hardware models supported by the driver, such as `Hikvision Camera`.
- **driverImage** (string)
  indicates the container image name of the driver, such as `driver/hikvision-camera:v1.2.3`.
- **driverExecution** (string)
   indicates the execution path of the drive. For command line driver, relative/absolute path of the driver execution file needs to be filled in, such as `python driver.py` or `C:\driver.exe`.

## DeviceShifuInstructions

DeviceShifuInstructions are all the commands and settings that DeviceShifu can receive and issue.

- **instructionSettings** ([DeviceShifuInstructionSettings](#deviceshifuinstructionsettings))
- **instructions** (map[string]DeviceShifuInstruction)
    - **[DeviceShifuInstruction](#deviceshifuinstruction)**

## DeviceShifuInstruction

DeviceShifuInstruction is the command that DeviceShifu can receive.

- **instructionProperties** (DeviceShifuInstructionProperty)
  indicates the parameters of the DeviceShifu command, which have various configurations according to different protocols . Please refer to the  examples for more [examples](https://github.com/Edgenesis/shifu/tree/main/examples).
  - **DeviceShifuInstructionProperty** (interface)

## DeviceShifuInstructionSettings

DeviceShifuInstructionSettings refers to the settings related to Instructions in DeviceShifu.

- **defaultTimeoutSeconds** (int)
  indicates the default timeout period (in seconds) for all Instructions. If not set, the default value is 3 seconds

## DeviceShifuTelemetries

DeviceShifuTelemetries refer to one or more commands that DeviceShifu uses to detect IoT devices.

- **telemetrySettings** ([DeviceShifuTelemetrySettings](#deviceshifutelemetrysettings))
- **telemetries** (map[string]DeviceShifuTelemetry)
  - **[DeviceShifuTelemetry](#deviceshifutelemetry)**

## DeviceShifuTelemetrySettings

DeviceShifuTelemetrySettings are the settings related to DeviceShifu monitoring.

- HTTP protocol:
    - **telemetryUpdateIntervalInMilliseconds** (int64)
      The millisecond interval at which DeviceShifu detects Telemetry. The default value is 3000.
    - **telemetryTimeoutInMilliseconds** (int64)
      The timeout for DeviceShifu to connect to the device. The default value is 3000.
    - **telemetryInitialDelayInMilliseconds** (int64)
      The delay time for the initial detection of DeviceShifu. The default value is 3000.
- TCP socket protocol:
    - **telemetryUpdateIntervalInMilliseconds** (int64)
      The millisecond interval at which DeviceShifu detects Telemetry. Default is 1000. (Detection method: DeviceShifu tries to establish a socket connection with the device once every 1000 milliseconds, and determines if the device is on by whether the connection is successful.)
- MQTT protocol:
    - **telemetryUpdateIntervalInMiliseconds** (int64)
      DeviceShifu detects the millisecond interval between the MQTT and the receipt of the last msg. Default value is 3000.

## DeviceShifuTelemetry

DeviceShifuTelemetry describes which commands DeviceShifu uses to monitor the status of IoT devices.

- **properties** (DeviceShifuTelemetryProperties)
  - **instruction** (string)
    indicates the command to be used for detection which must be a valid command as defined by [DeviceShifuInstruction](#deviceshifuinstruction) above.
  - **initialDelayMs** (int)
    indicates the delay (in milliseconds) to start the detection.
