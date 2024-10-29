---
title: lwm2m EdgeDevice
sidebar_position: 0
---

# ***lwm2m EdgeDevice***

`apiVersion: v1alpha1`

## EdgeDevice

The EdgeDevice is a custom Kubernetes resource representing a virtualized digital twin of the LwM2M IoT device.

- **apiVersion**: shifu.edgenesis.io/v1alpha1
- **kind**: EdgeDevice
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **spec** ([EdgeDeviceSpec](#edgedevicespec))  
  Describes the device's specification.

## EdgeDeviceSpec

- **sku**: "LwM2M Device"
- **connection**: Ethernet
- **protocol**: LwM2M

### Protocol Settings

- **endpointName**: leshan-client

- **securityMode**: DTLS

- **dtlsMode**: PSK

- **cipherSuites**:  

  - `TLS_PSK_WITH_AES_128_CCM_8`

- **pskIdentity**: hint

- **pskKey**: ABC123

  If you select none security mode, take following sentence.

- **securityMode**: None
