---
title: 词汇解释
sidebar_position: 4
---

# 词汇解释

## Shifu 相关

- Shifu
  - 基于[Kubernetes](https://kubernetes.io/docs/reference/glossary/?fundamental=true)的高效物联网设备管理开发框架
  - 开发者通过使用 Shifu，可以更简单地连接、监视和控制任何物联网设备
  - Shifu 是一个[Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/)
- Shifu Cloud
  - 基于开源物联网开发框架 Shifu 的一站式平台
  - 开发者仅需通过可视化界面填写基本设备信息，便可直接实现设备接入
- Shifu Demo
  - Shifu 安装包，包含：
    - Shifu 的安装脚本
    - Shifu 在运作过程中需要的所有镜像
    - 用于操作集群的`kubectl`
    - 用于本地创建测试集群的`kind`
    - 供用户试玩的虚拟设备
- edgeDevice：由 Shifu 管理的物联网设备
- edgeNode：可以连接到多个 edgeDevices 的 Kubernetes 节点，通常是一台计算机或服务器
- edgeMap：表示 edgeNode 和 edgeDevice 之间关系的数据结构
- deviceShifu
  - IoT 设备在 Shifu 中的结构性数字孪生，以微服务的形式存在。
  - 底层是 Kubernetes 的 Pod
- shifud：运行在每一个 edgeNode 上，监控硬件的变化（包括 edgeDevice 的连接或断开）
- shifuController：管理 deviceShifu 的生命周期，创建/删除相应 deviceShifu 实例

## 会用到的工具

- Docker：Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux 或 Windows 操作系统的机器上
- Kind：使用 Docker 容器节点运行本地 Kubernetes 集群的工具
- Kubectl：操作 k8s 集群的命令行工具

## 跟其他平台的区别与联系

### 😙 云供应商的物联网解决方案产品（AWS 物联网核心、Azure 物联网枢纽、阿里巴巴云物联网等）

公共云供应商拥有完整的功能。如果你正在寻找一个端到端的解决方案，你可以去找公共云供应商。然而云供应商的产品有几个缺点：

- 供应商锁定。我们知道从一个公共云迁移到另一个是相当困难的。例如，谷歌云将在 2023 年关闭其物联网核心服务
- 高成本。鉴于物联网的大数据和大规模的性质，在公共云上运行完整的解决方案可能非常昂贵

### 🤗EdgeXFoundry

EdgeXFoundry 是一个流行的开源物联网中间件。它是由戴尔在 2015 年 7 月发布的。经过 7 年多的发展，EdgeXfoundry 具有许多功能。此外，EdgeXFoundry 专注于边缘计算并拥有广泛的应用场景。然而，作为一个 7 岁的产品，也意味着它是在前 Kubernetes 时代设计的，这就是 EdgeXFoundry 和 Shifu 之间最突出的区别。

与 EdgeXFoundry 不同，Shifu 是一个 Kubernetes 原生 CRD，它将每个物联网设备虚拟为一个 K8s pod。这赋予了 Shifu 许多优势：

- 一个强大的云原生生态。你可以在 CNCF 的云原生环境中找到你需要的几乎所有工具。而作为 k8s 原生的，Shifu 与其中的每一个都是兼容的
- 不需要第二个基础设施平台。我们的团队已经成功地将 EdgeXFoundry 迁移到 K8s 之上，但还不能管理两个冲突的平台
- 没有单点故障。利用 K8s 的力量，Shifu 可以很容易地以无状态的方式进行复制。Shifu 从最开始起就被设计成就高度可用
- 高可扩展性。K8s 是最久经沙场的大规模应用的信息平台，但也同样适用于中小规模的用户案例。Shifu 利用 K8s 的内置可扩展性，为物联网世界的开发者和运营商提供云计算行业的最佳实践

### 😗ThingsBoard

ThingsBoard 是另一个流行的开源物联网中间件。与 Shifu 不同，ThingsBoard 更注重前端，它在数据可视化方面做得很好。Shifu 计划与 ThingsBoard 整合以实现数据可视化。

### 😎OpenYurt

OpenYurt 是一个用于云-边协调的 K8s 分布，Shifu 可以运行在 OpenYurt 之上。但 OpenYurt 并没有解决物联网的互操作性问题。通常的做法是在 OpenYurt 之上运行 Shifu，为云-边设备提供完整的互操作性。

### 🥰KubeEdge

KubeEdge 是一个为云-边协调而设计的云原生边缘计算平台，但 KubeEdge 并没有解决物联网的互操作性的问题。通常的做法是在 KubeEdge 之上运行 Shifu，为云-边设备提供完整的互操作性。

### 😍EMQ

EMQ 是一个流行的 MQTT 代理。通常的做法是使用 Shifu 将设备消息转换为 MQTT 消息，并利用 EMQ 等代理程序将 MQTT 消息分发到其他应用程序。

### 🤩RT-Thread

RT-Thread 是一个流行的实时 EOS。作为中间件，Shifu 运行在 GPCD（x86/64/ARM）上，并通过网络与运行 RT-Thread 等操作系统的设备进行通信。
