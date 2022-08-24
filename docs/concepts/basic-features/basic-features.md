---
title: 功能总览
sidebar_position: 0
---

# 功能总览

***Shifu*** 作为下一代的物联网应用开发框架，致力于为物联网应用开发者提供全流程的一站式解决方案。

秉着“为开发者而生”的原则，***Shifu*** 将物联网应用开发者的工作分为六大类：

1. 设备接入
1. 设备管理
1. 数据采集
1. 设备控制
1. 应用开发
1. 系统运维

## [设备接入](3000-basic-features/device-connection.md)

***Shifu*** 先进的微服务架构赋予了 ***Shifu*** 无与伦比的扩展性，也使得 ***Shifu*** 可以非常快速地接入新设备。

## [设备管理](3000-basic-features/device-management.md)

***Shifu***自带了设备管理框架，可以便捷地实现查看设备的运行状态、更新设备驱动、进行安全配置等操作。

## [数据采集](3000-basic-features/device-data-collection.md)

在 ***Shifu*** 中，你可以轻而易举的实现自动化数据采集。

## [设备控制](3000-basic-features/device-control.md)

在 ***Shifu*** 中，你可以结合数据采集实现自动化设备控制。

## 应用开发

在 ***Shifu*** 中，每一个设备都会生成与其相对应的数字孪生（[***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu-zh.md)）。开发者只需调用 ***deviceShifu*** 所暴露出来的API，即可以无比便捷地使用设备的能力。

```bash
curl http://robot-arm/grip/
```

举个例子，上面这条简单的命令就可以让一个机械臂完成抓取的动作。

我们希望 ***Shifu*** 能够帮助物联网应用开发者们，**把开发一个产业场景变得像开发一个App一样简单！**

## 系统运维

由于 ***Shifu*** 底层集成了`Kubernetes`的能力，所以 ***Shifu*** 在运维上有两大天然优势：

1. 由`Kubernetes`原生的 ***Shifu*** 使得开发者只用运维一套k8s集群，便可统一管理应用和IoT设备，无需运维一套额外的物联网平台；
1. 永无单点故障。与其他物联网平台不同，[***Shifu*** 的架构](1000-architecture/architecture.md)完全由可创建若干个 ***deviceShifu*** 的副本组成，所以 ***Shifu*** 永无单点故障。事实上，***Shifu*** 已经在多个500强企业的核心场景中（工厂、实验室、供应链等）累计运行了50万小时且没有出过故障。
