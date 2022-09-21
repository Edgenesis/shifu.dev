---
title: DeviceShifu Deployment
sidebar_position: 2
---

# DeviceShifu Deployment

:::caution Work in Progress

:::

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## Deployment

Deployment under the Shifu architecture is a Kubernetes-native [Deployment](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/), which represents a digital twin in Shifu that allows us to update [Pods](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/) declaratively.

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**: Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta) under metadata standards.
- **spec**: spec describes the expected behavior of a Deployment.

## General Configuration for Deviceshifu Deployment

- **spec.template.spec.containers[0].env**
  - **EDGEDEVICE_NAME** (string)
    name of the EdgeDevice to which DeviceShifu corresponds to.
  - **EDGEDEVICE_NAMESPACE** (string)
    namespace of the EdgeDevice corresponding to DeviceShifu.
- **spec.template.spec.volumes[0].configMap**
  - **volume**
    - **name**
      name of the ConfigMap to be mounted.
    - **configMap**
      name of the DeviceShifu configuration ConfigMap.
      - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
  - **volumeMount**
    - **name** (string)
      name of the ConfigMap to be mounted.
    - **mountPath** (string)
      path of the mounted ConfigMap, which has to be `/etc/edgedevice/config`.
- **spec.template.spec.serviceAccountName** (string)
  service account name used by DeviceShifu to update EdgeDevice information, which has to be `edgedevice-sa`

## OPC UA DeviceShifu Deployment

For a detailed example, please refer to <https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu>.

- **spec.template.spec.volumes[].configMap**
  - **volume**
    - **name**
      name of the ConfigMap to be mounted.
    - **configMap**
      name of the ConfigMap of the OPC UA certificate.
      - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
  - **volumeMount**
    - **name** (string)
      name of the ConfigMap to be mounted.
    - **mountPath** (string)
      path of the mounted ConfigMap, which has to be `/etc/edgedevice/certificate`.

## Siemens PLC DeviceShifu Deployment

For a detailed example, please refer to <https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu>

- **spec.template.spec.containers[1].image**
  - **name** (string)
    driver image of the Siemens PLC, which has to be `edgehub/plc-device:v0.0.1` (for now).
- **spec.template.spec.containers[1].env**
  - **PLC_ADDRESS** (string)
    IP address of the PLC, e.g. `192.168.0.1`.
  - **PLC_RACK** (string)
    RACK value of the PLC.
  - **PLC_SLOT** (string)
    SLOT value of the PLC.
  - **PLC_CONTAINER_PORT**
    port of the PLC drive container, which has to be `11111` (for now).

## RTSP DeviceShifu Deployment

For a detailed example, please refer to https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu

- **spec.template.spec.containers[1].image**
  - **name** (string)
    driver image for the RTSP camera, which has to be `edgehub/camera-python:v0.0.1` (for now).
- **spec.template.spec.containers[1].env**
  - **IP_CAMERA_ADDRESS** (string)
    IP address of the camera, `192.168.0.1`
  - **IP_CAMERA_USERNAME** (string)
    user name of the camera RTSP stream.
  - **IP_CAMERA_PASSWORD** (string)
    password for the camera RTSP stream.
  - **IP_CAMERA_CONTAINER_PORT**
    port of the RTSP camera driver container, which has to be `11111` (for now).
