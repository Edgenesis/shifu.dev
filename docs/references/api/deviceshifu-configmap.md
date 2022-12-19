---
title: deviceShifu ConfigMap
sidebar_position: 2
---

# ***deviceShifu*** ConfigMap

`apiVersion: apps/v1`

`import "k8s.io/api/core/v1"`

## ConfigMap

ConfigMap of ***Shifu*** is a Kubernetes-native [Kubernetes ConfigMap](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/config-map-v1/) that is used to store ***deviceShifu*** configurations.

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata** (ObjectMeta)<br/>the standard [Kubernetes ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)
- **data** (map[string]string)<br/>Data for ConfigMap.
    - **driverProperties** ([DeviceShifuDriverProperties](#deviceshifudriverproperties))
    - **instructions** ([DeviceShifuInstructions](#deviceshifuinstructions))
    - **telemetries** ([DeviceShifuTelemetries](#deviceshifutelemetries))

## DeviceShifuDriverProperties

DeviceShifuDriverProperties refer to driver parameters of ***deviceShifu***.

- **driverSku** (string)<br/>hardware models supported by the driver, such as `Hikvision Camera`.
- **driverImage** (string)<br/>container image name of the driver, such as `driver/hikvision-camera:v1.2.3`.
- **driverExecution** (string)<br/>execution path of the drive. For command line driver, relative/absolute path of the driver execution file needs to be filled in, such as `python driver.py` or `C:\driver.exe`.

## DeviceShifuInstructions

DeviceShifuInstructions are all the commands and settings that ***deviceShifu*** can receive and issue.

- **instructionSettings** ([DeviceShifuInstructionSettings](#deviceshifuinstructionsettings))
- **instructions** (map[string]DeviceShifuInstruction)<br>**example:**
```yml
instructions: |
  instructions:
    get_value: # The name of the command you want to set
      protocolPropertyList:      # The parameters of the command have different configurations according to different protocols
```
  - **[DeviceShifuInstruction](#deviceshifuinstruction)**

## DeviceShifuInstruction

DeviceShifuInstruction is the command that ***deviceShifu*** can receive.

-  **protocolPropertyList** (map[string]string)([DeviceShifuprotocolPropertyList](#deviceshifuprotocolpropertylist))<br/>parameters of the ***deviceShifu*** command, which have various configurations according to different protocols. Please refer to the  examples for more [examples](https://github.com/Edgenesis/shifu/tree/main/examples).

## DeviceShifuprotocolPropertyList

DeviceShifuprotocolPropertyList parameters of the ***deviceShifu*** command, which have various configurations according to different protocols. The following shows the use of MQTT protocol and OPC UA protocol. Please refer to the examples for more [examples](https://github.com/Edgenesis/shifu/tree/main/examples).

- **MQTT**
```yml
instructions: |
    instructions:
      get_topicmsg1:   # The name of the command you want to set
        protocolPropertyList:
          MQTTTopic: "/test/test1"  # MQTTTopic  The topic associated with this command
      get_topicmsg2:   
        protocolPropertyList:
          MQTTTopic: "/test/test2"
      ...  # You can continue to configure commands and corresponding topics according to your own needs, just continue to add according to this format
```
- **OPC UA**
```yml
instructions: |
    instructions:
      get_value:      # The name of the command you want to set 
        protocolPropertyList:
          OPCUANodeID: "ns=2;i=2"  # OPCUANodeID The NodeID associated with this command
      get_time:
        protocolPropertyList:
          OPCUANodeID: "i=2258"
      ... # You can continue to configure commands and corresponding NodeID according to your own needs, just continue to add according to this format
```


## DeviceShifuInstructionSettings

DeviceShifuInstructionSettings refers to the settings related to Instructions in ***deviceShifu***.

- **defaultTimeoutSeconds** (int)<br/>default timeout period (in seconds) for all Instructions. If not set, the default value is 3 seconds

## DeviceShifuTelemetries

DeviceShifuTelemetries refer to one or more commands that ***deviceShifu*** uses to detect IoT devices.

- **telemetrySettings** ([DeviceShifuTelemetrySettings](#deviceshifutelemetrysettings))
- **telemetries** (map[string]DeviceShifuTelemetry)
    - **[DeviceShifuTelemetry](#deviceshifutelemetry)**

## DeviceShifuTelemetrySettings

DeviceShifuTelemetrySettings are the settings related to ***deviceShifu*** monitoring.

- **defaultPushToServer** (bool)<br/>***deviceShifu*** Defaults all telemetry to the push service. default false.
- **defaultTelemetryCollectionService** (string)<br/>***deviceShifu*** Defaults telemetry to push addresses.
- HTTP protocol
    - **telemetryUpdateIntervalInMilliseconds** (int64)<br/>millisecond interval at which ***deviceShifu*** detects Telemetry. The default value is 3000.
    - **telemetryTimeoutInMilliseconds** (int64)<br/>timeout for ***deviceShifu*** to connect to the device. The default value is 3000.
    - **telemetryInitialDelayInMilliseconds** (int64)<br/>delay time for the initial detection of ***deviceShifu***. The default value is 3000.
- TCP socket protocol
    - **telemetryUpdateIntervalInMilliseconds** (int64)<br/>millisecond interval at which ***deviceShifu*** detects Telemetry. Default is 1000. (Detection method: ***deviceShifu*** tries to establish a socket connection with the device once every 1000 milliseconds, and determines if the device is on by whether the connection is successful.)
- MQTT protocol
    - **telemetryUpdateIntervalInMiliseconds** (int64)<br/>***deviceShifu*** detects the millisecond interval between the MQTT and the receipt of the last msg. Default value is 3000.
- PLC4X
    - **telemetryUpdateIntervalInMiliseconds** (int64)<br/>***deviceShifu*** The interval (in milliseconds) for detecting Telemetry. (Detection method: using PLC4X to send ping to the device.)

## DeviceShifuTelemetry

DeviceShifuTelemetry describes which commands ***deviceShifu*** uses to monitor the status of IoT devices.

- **properties** (DeviceShifuTelemetryProperties)
    - **instruction** (string)<br/>Indicates the command used for telemetry, and must be a valid command as defined by [DeviceShifuInstruction](#deviceshifuinstruction) above.
    - **initialDelayMs** (int)<br/>Indicates the delay (in milliseconds) to start telemetry.
    - **intervalMs** (int)<br/>Indicates the interval of telemetry (milliseconds).
    - **pushSettings** ([DeviceShifuTelemetryPushSettings](#deviceshifutelemetrypushsettings))<br/>Used to set up this telemetry push service.

## DeviceShifuTelemetryPushSettings

DeviceShifuTelemetryPushSettings describes the settings for a telemetry push service for ***deviceshifu***.

- **telemetryCollectionService** (string)<br/>Indicates the name of the TelemetryService corresponding to the telemetry service.
- **pushToServer** (bool)<br/>Indicates whether this telemetry service is pushed or not.
