---
title: Telemetry in Shifu
sidebar_position: 1
---

# Telemetry
Telemetry is enabled by default when installing *Shifu*, you can disable it before or after installation.

## Permissions
The telemetry module for *Shifu* take the advantage of Kubernetes' built-in `view` permission ClusterRole, as described in [official Kubernetes documentation](https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/rbac/#user-facing-roles).

Telemetry only allows read-only access to most objects, such as Pod basic information, Kubernetes information, and so on. It does not allow access to private information such as roles, secrets, etc., so you don't need to worry about privacy leaks.

## Data we collect

- Extranet IP
- Download date
- Kubernetes Versions
- Shifu Version
- Kubernetes Cluster Size
- Kubernetes Pod Name
- Kubernetes Deployment Name
- Type of operating system

## Settings

You can set the telemetry interval by setting `-pkg/k8s/crd/install/shifu_install.yaml` with `-telemetry-interval=60`.

Or you can edit the deployment after installation with ``kubectl edit -n shifu-crd-system shifu-crd-controller-manager``.
```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      control-plane: controller-manager
  template:
    spec:
      containers:
      image: quay.io/brancz/kube-rbac-proxy:v0.12.0
      name: kube-rbac-proxy
      - args:
        --telemetry-interval=60 ## Edit this line
```
## Turn off telemetry

To turn off telemetry, manually remove `--enable-telemetry` from `pkg/k8s/crd/install/shifu_install.yaml`.

Or you can edit the deployment after installation with ``kubectl edit -n shifu-crd-system shifu-crd-controller-manager``.

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      control-plane: controller-manager
  template:
    spec:
      containers:
      image: quay.io/brancz/kube-rbac-proxy:v0.12.0
      name: kube-rbac-proxy
      - args:
        --enable-telemetry ## Delete this line
```
