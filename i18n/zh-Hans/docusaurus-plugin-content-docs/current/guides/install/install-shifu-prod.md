---
title: 生产安装
sidebar_position: 2
---

# 生产安装

在生产环境部署 ***Shifu*** 前您需要先[安装 Kubernetes](https://kubernetes.io/releases/download/)。

***Shifu*** 提供了一键安装的方式，您可以使用如下命令将 ***Shifu*** 安装到您的集群中：

```bash
kubectl apply -f https://gitee.com/edgenesis/shifu/raw/v0.26.0/pkg/k8s/crd/install/shifu_install.yml
```

:::tip 关于用户指标
要了解更多信息，包括如何禁用内置用户指标收集，请查看[***Shifu*** 中的用户指标](i18n\zh-Hans\docusaurus-plugin-content-docs\current\guides\relative-information\user-metrics.md)。
:::
