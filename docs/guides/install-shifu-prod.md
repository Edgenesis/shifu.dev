---
title: Production Installation
sidebar_position: 0
---

# Production Installation

To deploy ***Shifu*** in production environment, you need to [Install Kubernetes](https://kubernetes.io/releases/download/) first.

***Shifu*** provides a one-click installation to deploy it in your cluster with a single command:

```bash
kubectl apply -f https://raw.githubusercontent.com/Edgenesis/shifu/v0.1.1/pkg/k8s/crd/install/shifu_install.yml
```
