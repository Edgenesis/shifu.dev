---
title: DeviceShifu Deployment
---

# DeviceShifu Deployment

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## Deployment

Deployment 是一个 Kubernetes 原生的 [Deployment](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/)，在 Shifu 中是一个的数字孪生对象。他使我们可以生命式的更新 [Pods](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/)

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**
  标准的 Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)
- **spec**
  描述了一个 Deployment 的预期行为

## Deviceshifu Deployment 通用配置

- **spec.template.spec.containers[0].env**
  - **EDGEDEVICE_NAME** (string)
  DeviceShifu 对应的 EdgeDevice 的名字
  - **EDGEDEVICE_NAMESPACE** (string)
  DeviceShifu 对应的 EdgeDevice 所在的域
- **spec.template.spec.volumes[0].configMap**
  - **volume**
    - **name**
    挂载的 ConfigMap 的名字
    - **configMap**
    DeviceShifu 配置 ConfigMap 的名字
      - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
  - **volumeMount**
    - **name** (string)
    挂载的 ConfigMap 的名字
    - **mountPath** (string)
    挂载的 ConfigMap 的路径。必须是 `/etc/edgedevice/config`

- **spec.template.spec.serviceAccountName** (string)
  DeviceShifu 用来更新 EdgeDevice 信息的服务账号名。必须是 `edgedevice-sa`

## OPC UA DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu
- **spec.template.spec.volumes[].configMap**
  - **volume**
    - **name**
    挂载的 ConfigMap 的名字
    - **configMap**
    OPC UA 证书的 ConfigMap 的名字
      - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
  - **volumeMount**
    - **name** (string)
    挂载的 ConfigMap 的名字
    - **mountPath** (string)
    挂载的 ConfigMap 的路径。必须是 `/etc/edgedevice/certificate`

## Siemens PLC DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu

- **spec.template.spec.containers[1].image**
  - **name** (string)
  西门子 PLC 的驱动镜像。现在必须是 `edgehub/plc-device:v0.0.1`
- **spec.template.spec.containers[1].env**
  - **PLC_ADDRESS** (string)
  PLC 的 IP 地址，如`192.168.0.1`
  - **PLC_RACK** (string)
  PLC 的 RACK 值
  - **PLC_SLOT** (string)
  PLC 的 SLOT 值
  - **PLC_CONTAINER_PORT**
  PLC 驱动容器的端口。现在必须是 `"11111"`

## RTSP DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu

- **spec.template.spec.containers[1].image**
  - **name** (string)
  RTSP 摄像头的驱动镜像。现在必须是 `edgehub/camera-python:v0.0.1`
- **spec.template.spec.containers[1].env**
  - **IP_CAMERA_ADDRESS** (string)
  摄像头的 IP 地址，如`192.168.0.1`
  - **IP_CAMERA_USERNAME** (string)
  摄像头 RTSP 流的用户名
  - **IP_CAMERA_PASSWORD** (string)
  摄像头 RTSP 流的密码
  - **IP_CAMERA_CONTAINER_PORT**
  RTSP 摄像头驱动容器的端口。现在必须是 `"11111"`
