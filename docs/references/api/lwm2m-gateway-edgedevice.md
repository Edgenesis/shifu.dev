---
title: LwM2M EdgeDevice
sidebar_position: 4
---

# ***LwM2M EdgeDevice***

`apiVersion: shifu.edgenesis.io/v1alpha1`

## EdgeDevice

The EdgeDevice configuration represents a digital twin for LwM2M Gateway devices.

- **apiVersion**: shifu.edgenesis.io/v1alpha1
- **kind**: EdgeDevice
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).

### EdgeDeviceSpec

- **sku**: "LwM2M Gateway Device"
- **connection**: Ethernet
- **protocol**: LwM2M

#### Protocol Settings

- **endpointName**: "lwm2m-gateway"

- **securityMode**: PSK

- **pskIdentity**: "identity"

- **pskKey**: "key123"

  If you select none security mode, take following sentence.

- **securityMode**: None

### Gateway Settings

- **protocol**: lwm2m
- **address**: `deviceshifu-lwm2m-service.deviceshifu.svc.cluster.local:5683`
