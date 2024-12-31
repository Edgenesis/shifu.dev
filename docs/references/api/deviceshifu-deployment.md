---
title: deviceShifu Deployment
sidebar_position: 1
---

# ***deviceShifu*** Deployment

`apiVersion: apps/v1`

`import "k8s.io/api/apps/v1"`

## Deployment

Deployment under the ***Shifu*** architecture is a Kubernetes-native [Deployment](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/deployment-v1/), which represents a digital twin in Shifu that allows us to update [Pods](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/) declaratively.

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**<br/>Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/#ObjectMeta) under metadata standards.
- **spec**<br/>spec describes the expected behavior of a Deployment.

## General Configuration for Deviceshifu Deployment

- **spec.template.spec.containers[0].env**
    - **EDGEDEVICE_NAME** (string)<br/>name of the EdgeDevice to which DeviceShifu corresponds to.
    - **EDGEDEVICE_NAMESPACE** (string)<br/>namespace of the EdgeDevice corresponding to DeviceShifu.
- **spec.template.spec.volumes[0].configMap**
    - **volume**
        - **name**<br/>name of the ConfigMap to be mounted.
        - **configMap**<br/>name of the DeviceShifu configuration ConfigMap.
            - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
    - **volumeMount**
        - **name** (string)<br/>name of the ConfigMap to be mounted.
    - **mountPath** (string)<br/>path of the mounted ConfigMap, which has to be `/etc/edgedevice/config`.
- **spec.template.spec.serviceAccountName** (string)<br/>service account name used by DeviceShifu to update EdgeDevice information, which has to be `edgedevice-sa`

## OPC UA DeviceShifu Deployment

For a detailed example, please refer to [https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/opcuaDeviceShifu).

- **spec.template.spec.volumes[].configMap**
    - **volume**
        - **name**<br/>name of the ConfigMap to be mounted.
        - **configMap**<br/>name of the ConfigMap of the OPC UA certificate.
        - **name** (string)
- **spec.template.spec.containers[0].volumeMounts[].name**
    - **volumeMount**
        - **name** (string)<br/>name of the ConfigMap to be mounted.
        - **mountPath** (string)<br/>path of the mounted ConfigMap, which has to be `/etc/edgedevice/certificate`.

## Siemens PLC DeviceShifu Deployment

For a detailed example, please refer to [https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/siemensPLCDeviceShifu).

- **spec.template.spec.containers[1].image**
    - **name** (string)<br/>driver image of the Siemens PLC, which has to be `edgehub/plc-device:v0.0.1` (for now).
- **spec.template.spec.containers[1].env**
    - **PLC_ADDRESS** (string)<br/>IP address of the PLC, e.g. `192.168.0.1`.
    - **PLC_RACK** (string)<br/>RACK value of the PLC.
    - **PLC_SLOT** (string)<br/>SLOT value of the PLC.
    - **PLC_CONTAINER_PORT**<br/>port of the PLC drive container, which has to be `11111` (for now).

## RTSP DeviceShifu Deployment

For a detailed example, please refer to https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu

- **spec.template.spec.containers[1].image**
    - **name** (string)<br/>driver image for the RTSP camera, which has to be `edgehub/camera-python:v0.0.1` (for now).
- **spec.template.spec.containers[1].env**
    - **IP_CAMERA_ADDRESS** (string)<br/>IP address of the camera, `192.168.0.1`
    - **IP_CAMERA_USERNAME** (string)<br/>user name of the camera RTSP stream.
    - **IP_CAMERA_PASSWORD** (string)<br/>password for the camera RTSP stream.
    - **IP_CAMERA_CONTAINER_PORT**
        port of the RTSP camera driver container, which has to be `11111` (for now).

## LwM2M-Gateway DeviceShifu Deployment

For a detailed example, please refer to  [https://github.com/Edgenesis/shifu/tree/main/examples/lwm2m_gw_http](https://github.com/Edgenesis/shifu/tree/main/examples/lwm2m_gw_http).

- **spec.template.spec.containers[0].image**
  - **name** (string)<br/>the deviceShifu-HTTP container image enables devices using the HTTP protocol to connect to the LwM2M IoT management system. It performs protocol conversion and adaptation, allowing devices with different protocols to be uniformly managed and communicated through the LwM2M protocol. The gateway-driven test version of the driver image is `edgehub/deviceshifu-http-http:nightly`. Please use a stable version in production environments.
- **spec.template.spec.containers[0].image.ports**
  - **containerPort**<br/>`containerPort` specifies the port on which the application inside the container should listen. Such as `8080`.
- **spec.template.spec.containers[1].image**
  - **name** (string)<br/>the image for the LwM2M-gateway. The LwM2M-gateway serves as a protocol translation and data intermediary component that converts heterogeneous protocol device data into LwM2M protocol format, facilitating unified device management and control through the LwM2M server infrastructure. The test version of the driver image for the gateway driver is `edgehub/gateway-lwm2m:nightly`. Please use the stable version in the production environment.
- **spec.template.spec.containers.env**
  - **EDGEDEVICE_NAME** (string)<br/>name of the EdgeDevice associated with the DeviceShifu, such as `edgedevice-thermometer`.
  - **EDGEDEVICE_NAMESPACE** (string)<br/>namespace for the EdgeDevice corresponding to DeviceShifu, set to `deviceshifu`.

