---
title: Architecture
sidebar_position: 0
---

# Architecture

在一个场景中，我们常常会有大量IoT设备，***Shifu*** 则会将每一个与之连接的设备都在系统中生成与之一一对应的 ***deviceShifu***，而这些相互独立的 ***deviceShifu*** 组成了一个为这个场景定制的 ***Shifu***。这个 ***Shifu*** 便会作为这个场景的专属数据底座，让开发者可以简单高效地在上面开发应用。

在计算架构上，***Shifu*** 只依赖于 `K8s` 环境，大到 `K8s` upstream发行版，小到 `K3s`，`Shifu` 都可以一分钟之内部署完毕，完美运行。又因为 ***Shifu*** 和您原本部署在 `K8s` 上的应用运行在同一个集群里，使得您完全不必再额外运维一套IoT平台，极大地降低了运维成本。另外，因为每一个设备可以在 ***Shifu*** 中形成若干个与之对应的 ***deviceShifu*** 副本，传统IoT平台的单点故障问题也被完美解决，***Shifu*** 为您的应用开发保驾护航。​

:::caution Work in Progress
an image of ***Shifu***'s architecture
:::
