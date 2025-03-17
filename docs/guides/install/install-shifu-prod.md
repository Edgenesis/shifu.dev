---
title: Production environment install
sidebar_position: 2
---

# Production Environment Deployment

To deploy ***Shifu*** in production environment, you need to [Install Kubernetes](https://kubernetes.io/releases/download/) first.

***Shifu*** provides a one-click installation where you can use the following command to install ***Shifu*** into your cluster.

```bash
kubectl apply -f https://raw.githubusercontent.com/Edgenesis/shifu/v0.66.0/pkg/k8s/crd/install/shifu_install.yml
```

:::tip About User Metrics in Shifu
To learn more about user metrics we collect and how to disable it, please check [User Metrics in ***Shifu***](docs\guides\relative-information\user-metrics.md).
:::
