---
title: lwm2m DeviceShifu ConfigMap
sidebar_position: 2
---

# ***lwm2m DeviceShifu*** ConfigMap

`apiVersion: v1`

## ConfigMap

The ConfigMap for the LwM2M device contains configuration data for the device's properties, instructions, and telemetries.

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **data** (map[string]string)  
  Data containing driver properties and instructions for the device.
  
  - **driverProperties** ([Driver Properties](#driver-properties))
  - **instructions** ([Instructions](#instructions))

## Driver Properties

- **driverSku**: LwM2M Device
- **driverImage**: lwm2m-device:v0.0.1

## Instructions

### float_value

- **protocolPropertyList**  
  - **ObjectId**: `/3442/0/130`
  - **EnableObserve**: `false`

### reset

- **protocolPropertyList**  
  - **ObjectId**: `/3303/0/5605`
  - **EnableObserve**: `false`
