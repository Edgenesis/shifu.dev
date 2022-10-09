---
title: Production Environment Deployment
sidebar_position: 0
---

# Production Environment Deployment

To deploy ***Shifu*** in production environment, you need to [Install Kubernetes](https://kubernetes.io/releases/download/) first.

***Shifu*** provides a one-click installation where you can use the following command to install ***Shifu*** into your cluster.
```bash
kubectl apply -f https://raw.githubusercontent.com/Edgenesis/shifu/v0.2.1/pkg/k8s/crd/install/shifu_install.yml
```
