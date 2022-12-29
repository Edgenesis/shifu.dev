---
title: deviceShifu ConfigMap
sidebar_position: 2
---

# ***deviceShifu*** ConfigMap

`apiVersion: apps/v1`

`import "k8s.io/api/core/v1"`

## ConfigMap

***Shifu*** 架构下的 ConfigMap 是一个 [Kubernetes ConfigMap](https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/config-map-v1/)，它被用来存放 ***deviceShifu*** 的配置。

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata** (ObjectMeta)<br/>标准的 [Kubernetes ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)
- **data** (map[string]string)<br/>ConfigMap 的数据
    - **driverProperties** ([DeviceShifuDriverProperties](#deviceshifudriverproperties))
    - **instructions** ([DeviceShifuInstructions](#deviceshifuinstructions))
    - **telemetries** ([DeviceShifuTelemetries](#deviceshifutelemetries))

## DeviceShifuDriverProperties

DeviceShifuDriverProperties 是指 ***deviceShifu*** 的驱动参数。

- **driverSku** (string)<br/>表示驱动所适用的硬件型号，如 `Hikvision Camera`。
- **driverImage** (string)<br/>表示驱动的容器镜像名称，如 `driver/hikvision-camera:v1.2.3`。
- **driverExecution** (string)<br/>表示驱动的执行路径。针对于命令行的驱动，这里需要填写驱动的执行文件的相对/绝对路径，如 `python driver.py` 或 `C:\driver.exe`。

## DeviceShifuInstructions

DeviceShifuInstructions 是指 ***deviceShifu*** 的可以接收并发出的所有指令及设置。

- **instructionSettings** ([DeviceShifuInstructionSettings](#deviceshifuinstructionsettings))
- **instructions** (map[string]DeviceShifuInstruction)
**示例：**
    ```yml
    instructions: |
      instructions:
        get_value: # 想要设置的命令的名称
          protocolPropertyList:      # 命令的参数，根据不同的协议有不同的配置
    ```
    - **[DeviceShifuInstruction](#deviceshifuinstruction)**

## DeviceShifuInstruction

DeviceShifuInstruction 是指 ***deviceShifu*** 可以接收的命令。

- **protocolPropertyList** (map[string]string)([DeviceShifuprotocolPropertyList](#deviceshifuprotocolpropertylist))<br/>表示 ***deviceShifu*** 命令的参数，根据不同协议具有不同的配置.

## DeviceShifuprotocolPropertyList

DeviceShifuprotocolPropertyList 表示 ***deviceShifu*** 命令的参数，根据不同协议具有不同的配置，下面展示MQTT协议和OPC UA协议下的使用,更多示例请参考 [examples](https://github.com/Edgenesis/shifu/tree/main/examples)。

- **MQTT**
```yml
instructions: |
    instructions:
      get_topicmsg1:   # 想要设置的命令的名称
        protocolPropertyList:
          MQTTTopic: "/test/test1"  # MQTTTopic 是这条命令关联的Topic
      get_topicmsg2:   
        protocolPropertyList:
          MQTTTopic: "/test/test2"
      ...  # 根据自己的需要可继续配置命令及对应的Topic，只需按照此格式继续添加即可
mutexInstructions: | 
    # 可选，配置mutexInstructions，格式为"key: value", key能在发布到接收前，使mqttDeviceShifu中对应topic进入阻塞状态, value是key的描述
    testMutexInstruction1: "Mutex_test1" # 修改此值
    testMutexInstruction2: "Mutex_test2" 
    ... # 根据自己的需要可继续配置mutexInstruction及对应说明，只需按照此格式继续添加即可
```
- **OPC UA**
```yml
instructions: |
    instructions:
      get_value:      # 想要设置的命令的名称 
        protocolPropertyList:
          OPCUANodeID: "ns=2;i=2"  # OPCUANodeID 是这条命令关联的NodeID
      get_time:
        protocolPropertyList:
          OPCUANodeID: "i=2258"
      ... # 根据自己的需要可继续配置命令及对应的NodeID，只需按照此格式继续添加即可
```


## DeviceShifuInstructionSettings

DeviceShifuInstructionSettings 是指 ***deviceShifu*** 中的 Instruction 的相关的设置。

- **defaultTimeoutSeconds** (int)<br/>表示所有Instruction的默认超时时间(秒)。如未设置，默认值为3秒

## DeviceShifuTelemetries

DeviceShifuTelemetries 是指 ***deviceShifu*** 用来检测物联网设备的一个或多个命令。

- **telemetrySettings** ([DeviceShifuTelemetrySettings](#deviceshifutelemetrysettings))
- **telemetries** (map[string]DeviceShifuTelemetry)
    - **[DeviceShifuTelemetry](#deviceshifutelemetry)**

## DeviceShifuTelemetrySettings

DeviceShifuTelemetrySettings 是指与 ***deviceShifu*** 监测相关的设置。

- **defaultPushToServer** (bool)<br/>***deviceShifu*** 默认将所有遥测进行推送服务。默认为false。
- **defaultTelemetryCollectionService** (string)<br/>***deviceShifu***将遥测推送地址的默认值。
- HTTP协议
    - **telemetryUpdateIntervalInMilliseconds** (int64)<br/>***deviceShifu*** 检测 Telemetry 的毫秒间隔。默认为3000。
    - **telemetryTimeoutInMilliseconds** (int64)<br/>***deviceShifu*** 与设备连接的超时时间。默认为3000。
    - **telemetryInitialDelayInMilliseconds** (int64)<br/>***deviceShifu*** 初次检测的延迟时间。默认为3000。
- TCP socket 协议
    - **telemetryUpdateIntervalInMilliseconds** (int64)<br/>***deviceShifu*** 检测 Telemetry 的毫秒间隔。默认为1000。（检测方式：***deviceShifu*** 每间隔1000毫秒尝试与设备建立起一次socket连接，通过是否成功连接来判断设备是否开启。）
- MQTT协议
    - **telemetryUpdateIntervalInMiliseconds** (int64)<br/>***deviceShifu*** 检测MQTT距离收到上一条msg到现在的毫秒间隔。默认为3000。
- PLC4X
    - **telemetryUpdateIntervalInMiliseconds** (int64)<br/>***deviceShifu*** 检测 Telemetry 的间隔时间(毫秒)默认为3000。（检测方式，使用PLC4X向设备发送Ping。）

## DeviceShifuTelemetry

DeviceShifuTelemetry 描述了 ***deviceShifu*** 通过哪些指令来监测物联网设备的状态。

- **properties** (DeviceShifuTelemetryProperties)
    - **instruction** (string)<br/>表示用来遥测的命令，且必须是上方 [DeviceShifuInstruction](#deviceshifuinstruction) 定义的有效命令。
    - **initialDelayMs** (int)<br/>表示开始遥测时的延迟（毫秒）。默认为3000。
    - **intervalMs** (int)<br/>表示遥测的间隔时间 (毫秒)。默认为3000。
    - **pushSettings** ([DeviceShifuTelemetryPushSettings](#deviceshifutelemetrypushsettings))<br/>用来设置该遥测推送服务。

## DeviceShifuTelemetryPushSettings

DeviceShifuTelemetryPushSettings 描述了 ***deviceshifu*** 的一个遥测的推送服务的设置。

- **telemetryCollectionService** (string)<br/>表示遥测服务对应的TelemetryService的名称。
- **pushToServer** (bool)<br/>表示该遥测服务是否进行，默认为false。
