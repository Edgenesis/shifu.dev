---
title: LwM2M Gateway ConfigMap
sidebar_position: 1
---

# ***LwM2M Gateway ConfigMap***

`apiVersion: v1`

## ConfigMap

The ConfigMap for LwM2M Gateway stores configurations such as driver properties and instructions for communication.

- **apiVersion**: v1
- **kind**: ConfigMap
- **metadata**: ObjectMeta  
  Standard Kubernetes [ObjectMeta](https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/object-meta/).
- **data** (map[string]string)  
  Contains driver properties and operational instructions.

  - **driverProperties**: Specifies driver-specific properties.
  - **instructions**: Provides instruction mappings.

## Example Instructions

### read_temperature

- **ObjectId**: `/3303/0/5700`
- **DataType**: `float`

### reset_device

- **ObjectId**: `/3303/0/5605`
- **DataType**: `command`
