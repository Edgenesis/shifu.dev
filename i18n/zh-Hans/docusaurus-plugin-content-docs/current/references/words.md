---
title: 词汇解释
sidebar_position: 4
---

# 词汇解释

## Shifu相关
- Shifu
  - 基于[Kubernetes](https://kubernetes.io/docs/reference/glossary/?fundamental=true)的高效物联网设备管理开发框架
  - 开发者通过使用 Shifu，可以更简单地连接、监视和控制任何物联网设备
  - Shifu是一个[Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/)
- Shifu Cloud
  - 基于开源物联网开发框架Shifu的一站式平台
  - 开发者仅需通过可视化界面填写基本设备信息，便可直接实现设备接入
- Shifu Demo
  - Shifu安装包，包含：
    - Shifu 的安装脚本
    - Shifu 在运作过程中需要的所有镜像
    - 用于操作集群的`kubectl`
    - 用于本地创建测试集群的`kind`
    - 供用户试玩的虚拟设备
- edgeDevice：由 Shifu 管理的物联网设备
- edgeNode：可以连接到多个edgeDevices的Kubernetes节点，通常是一台计算机或服务器
- edgeMap：表示edgeNode和edgeDevice之间关系的数据结构
- deviceShifu
  - IoT设备在 Shifu 中的结构性数字孪生，以微服务的形式存在。
  - 底层是Kubernetes的Pod
- shifud：运行在每一个edgeNode上，监控硬件的变化（包括edgeDevice的连接或断开）
- shifuController：管理deviceShifu的生命周期，创建/删除相应deviceShifu实例
## 会用到的工具
- Docker：Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows操作系统的机器上
- Kind：使用 Docker 容器节点运行本地 Kubernetes 集群的工具
- Kubectl：操作k8s集群的命令行工具
## 跟其他平台的区别与联系
### 😙云供应商的物联网解决方案产品（AWS物联网核心、Azure物联网枢纽、阿里巴巴云物联网等）
公共云供应商拥有完整的功能。如果你正在寻找一个端到端的解决方案，你可以去找公共云供应商。然而云供应商的产品有几个缺点：
  - 供应商锁定。我们知道从一个公共云迁移到另一个是相当困难的。例如，谷歌云将在2023年关闭其物联网核心服务
  - 高成本。鉴于物联网的大数据和大规模的性质，在公共云上运行完整的解决方案可能非常昂贵
### 🤗EdgeXFoundry
EdgeXFoundry是一个流行的开源物联网中间件。它是由戴尔在2015年7月发布的。经过7年多的发展，EdgeXfoundry具有许多功能。此外，EdgeXFoundry专注于边缘计算并拥有广泛的应用场景。然而，作为一个7岁的产品，也意味着它是在前Kubernetes时代设计的，这就是EdgeXFoundry和Shifu之间最突出的区别。

与EdgeXFoundry不同，Shifu是一个Kubernetes原生CRD，它将每个物联网设备虚拟为一个K8s pod。这赋予了Shifu许多优势：
  - 一个强大的云原生生态。你可以在CNCF的云原生环境中找到你需要的几乎所有工具。而作为k8s原生的，Shifu与其中的每一个都是兼容的
  - 不需要第二个基础设施平台。我们的团队已经成功地将EdgeXFoundry迁移到K8s之上，但还不能管理两个冲突的平台
  - 没有单点故障。利用K8s的力量，Shifu可以很容易地以无状态的方式进行复制。Shifu从最开始起就被设计成就高度可用
  - 高可扩展性。K8s是最久经沙场的大规模应用的信息平台，但也同样适用于中小规模的用户案例。Shifu利用K8s的内置可扩展性，为物联网世界的开发者和运营商提供云计算行业的最佳实践
### 😗ThingsBoard
ThingsBoard是另一个流行的开源物联网中间件。与Shifu不同，ThingsBoard更注重前端，它在数据可视化方面做得很好。Shifu计划与ThingsBoard整合以实现数据可视化。
### 😎OpenYurt
OpenYurt是一个用于云-边协调的K8s分布，Shifu可以运行在OpenYurt之上。但OpenYurt并没有解决物联网的互操作性问题。通常的做法是在OpenYurt之上运行Shifu，为云-边设备提供完整的互操作性。 
### 🥰KubeEdge
KubeEdge是一个为云-边协调而设计的云原生边缘计算平台，但KubeEdge并没有解决物联网的互操作性的问题。通常的做法是在KubeEdge之上运行Shifu，为云-边设备提供完整的互操作性。
### 😍EMQ
EMQ是一个流行的MQTT代理。通常的做法是使用Shifu将设备消息转换为MQTT消息，并利用EMQ等代理程序将MQTT消息分发到其他应用程序。
### 🤩RT-Thread
RT-Thread是一个流行的实时EOS。作为中间件，Shifu运行在GPCD（x86/64/ARM）上，并通过网络与运行RT-Thread等操作系统的设备进行通信。
