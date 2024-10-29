---
title: LwM2M Gateway Service
sidebar_position: 3
---

# ***LwM2M Gateway Service***

`apiVersion: v1`

## Service

The Service configuration provides network access to the LwM2M Gateway.

- **apiVersion**: v1
- **kind**: Service
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **spec**: Defines service specifications.

### Ports

- **http**:
  - **port**: 80
  - **protocol**: TCP
  - **targetPort**: 8080
  - **nodePort**: 30080

- **coap**:
  - **port**: 5683
  - **protocol**: UDP
  - **targetPort**: 5683
  - **nodePort**: 30568

- **selector**: `app = lwm2m-gateway`
- **type**: NodePort
