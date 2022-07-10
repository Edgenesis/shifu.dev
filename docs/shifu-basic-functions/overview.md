---
title: Shifu 功能总览
sidebar_position: 1
---

# Shifu功能
Shifu作为下一代的物联网应用开发框架，致力于为物联网应用开发者全流程提供一站式解决方案。
秉着“为开发者而生”的原则，Shifu将物联网应用开发者的工作分为四大类：
1. 设备接入
2. 设备管理
3. 应用开发
4. 系统运维

## 设备接入
Shifu先进的微服务架构赋予了Shifu无与伦比的扩展性，也使得Shifu可以非常快速地接入一个新的设备。

## 设备管理
Shifu自带了设备管理框架，可以便捷地查看设备的运行状态、更新驱动、进行安全配置等等。

## 应用开发
在Shifu中，每一个设备都会有与其对应的数字孪生，也就是[deviceShifu](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu-zh.md)存在。
开发者只需调用DdviceShifu所暴露出来的API，就可以无比便捷地调用设备的能力。
举个例子，```curl http://robot-arm/grip/```就可以让一个机械臂进行抓取的动作。
我们希望Shifu未来能够帮助物联网应用开发者们，**开发一个产业场景都像开发一个App一样简单**！

## 系统运维
由于Shifu底层集成了Kubernetes的能力，所以Shifu在运维上有两大天然优势：
1. Kubernetes原生，使得开发者只用运维一套k8s集群，便可统一管理应用和IoT设备，无需运维一套额外的物联网平台；
2. 永无单点故障。与其他物联网平台不同，[Shifu的架构](architecture/architectuire.md)是完全由可创建若干个副本的deviceShifu组成，所以Shifu永无单点故障。
事实上，Shifu已经在多个500强企业的核心场景中（工厂、实验室、供应链等）累计运行了50万小时且没有出过故障。