---
title: lwm2m DeviceShifu Deployment
sidebar_position: 1
---

# ***lwm2m DeviceShifu*** Deployment

`apiVersion: apps/v1`

## Deployment

This Deployment defines the LwM2M device in Kubernetes, allowing the device to run and be managed as a pod.

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **spec**: Spec  
  Describes the expected behavior of the LwM2M device Deployment.

## Container Specifications

- **image**: `edgehub/deviceshifu-http-lwm2m:nightly`
- **name**: deviceshifu-lwm2m
- **ports**:
  - **containerPort**: 8080

### Environment Variables

- **EDGEDEVICE_NAME**: "edgedevice-lwm2m"
- **EDGEDEVICE_NAMESPACE**: "devices"
- **LOG_LEVEL**: debug

### Volume Mounts

- **name**: deviceshifu-config
- **mountPath**: "/etc/edgedevice/config"
- **readOnly**: true
