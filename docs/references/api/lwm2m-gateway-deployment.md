---
title: LwM2M Gateway Deployment
sidebar_position: 2
---

# ***LwM2M Gateway Deployment***

`apiVersion: apps/v1`

## Deployment

The Deployment configuration for the LwM2M Gateway manages the deployment settings and container specifications.

- **apiVersion**: apps/v1
- **kind**: Deployment
- **metadata**: ObjectMeta  
  Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/) standard.

### Container Specifications

- **image**: `edgehub/gateway-lwm2m:nightly`
- **name**: lwm2m-gateway
- **ports**:
  - **containerPort**: 8080

### Environment Variables

- **EDGEDEVICE_NAME**: "lwm2m-device"
- **EDGEDEVICE_NAMESPACE**: "deviceshifu"

### Volume Mounts

- **name**: config-volume
- **mountPath**: "/etc/edgedevice/config"
