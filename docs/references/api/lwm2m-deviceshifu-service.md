---
title: lwm2m DeviceShifu Service
sidebar_position: 3
---

# ***lwm2m DeviceShifu*** Service

`apiVersion: v1`

## Service

Service defining network access for the LwM2M device.

- **apiVersion**: v1
- **kind**: Service
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **spec**: Spec  
  Defines how the service is exposed.

### Ports

- **deviceshifu**:
  - **port**: 80
  - **protocol**: TCP
  - **nodePort**: 30080
  - **targetPort**: 8080

- **lwm2mserver-coaps**:
  - **port**: 5684
  - **protocol**: UDP
  - **nodePort**: 30001
  - **targetPort**: 5684

- **selector**: app = deviceshifu-lwm2m-deployment
- **type**: NodePort
