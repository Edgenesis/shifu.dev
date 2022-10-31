---
title: deviceShifu Deployment
sidebar_position: 1
---

# ***deviceShifu*** Deployment

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## Deployment

***Shifu*** 架构下的 Deployment 是一个 Kubernetes 原生的 [Deployment](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/) ，在 ***Shifu*** 中表示一个数字孪生对象，它使我们可以声明式的更新 [Pods](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/)。

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**<br/>标准的 Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta)。
- **spec**<br/>描述了一个 Deployment 的预期行为。

## Deviceshifu Deployment 的通用配置

- **spec.template.spec.containers[0].env**
    - **EDGEDEVICE_NAME** (string)<br/>表示 DeviceShifu 对应的 EdgeDevice 的名字。
    - **EDGEDEVICE_NAMESPACE** (string)<br/>表示 DeviceShifu 对应的 EdgeDevice 所在的域。
- **spec.template.spec.volumes[0].configMap**
    - **volume**
    - **name**<br/>表示挂载的 ConfigMap 的名字。
    - **configMap**<br/>表示 DeviceShifu 配置 ConfigMap 的名字。
        - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
    - **volumeMount**
        - **name** (string)<br/>表示挂载的 ConfigMap 的名字
    - **mountPath** (string)<br/>表示挂载的 ConfigMap 的路径，必须是 `/etc/edgedevice/config`。
- **spec.template.spec.serviceAccountName** (string)<br/>表示 DeviceShifu 用来更新 EdgeDevice 信息的服务账号名，必须是 `edgedevice-sa`。

## OPC UA DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu

- **spec.template.spec.volumes[].configMap**
    - **volume**
        - **name**<br/>表示挂载的 ConfigMap 的名字。
        - **configMap**<br/>表示 OPC UA 证书的 ConfigMap 的名字。
            - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
    - **volumeMount**
        - **name** (string)<br/>表示挂载的 ConfigMap 的名字。
        - **mountPath** (string)<br/>表示挂载的 ConfigMap 的路径，必须是 `/etc/edgedevice/certificate`。

## Siemens PLC DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu

- **spec.template.spec.containers[1].image**
    - **name** (string)<br/>表示西门子 PLC 的驱动镜像，现在必须是 `edgehub/plc-device:v0.0.1`。
- **spec.template.spec.containers[1].env**
    - **PLC_ADDRESS** (string)<br/>表示 PLC 的 IP 地址，如`192.168.0.1`。
    - **PLC_RACK** (string)<br/>表示 PLC 的 RACK 值。
    - **PLC_SLOT** (string)<br/>表示 PLC 的 SLOT 值。
    - **PLC_CONTAINER_PORT**<br/>表示 PLC 驱动容器的端口，现在必须是 `"11111"`。

## RTSP DeviceShifu Deployment

详细示例请参考 https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu

- **spec.template.spec.containers[1].image**
    - **name** (string)<br/>表示 RTSP 摄像头的驱动镜像，现在必须是 `edgehub/camera-python:v0.0.1`。
- **spec.template.spec.containers[1].env**
    - **IP_CAMERA_ADDRESS** (string)<br/>表示摄像头的 IP 地址，如`192.168.0.1`。
    - **IP_CAMERA_USERNAME** (string)<br/>表示摄像头 RTSP 流的用户名。
    - **IP_CAMERA_PASSWORD** (string)<br/>表示摄像头 RTSP 流的密码。
    - **IP_CAMERA_CONTAINER_PORT**<br/>表示RTSP 摄像头驱动容器的端口，现在必须是 `"11111"`。
