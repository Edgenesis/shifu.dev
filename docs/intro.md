---
id: intro
slug: /
sidebar_position: 0
title: 欢迎使用
---

# 欢迎使用 ***Shifu***

:::caution正在施工
- shifu简介（开源稿）
- 放视频https://bianwuji.com/stuff/videos/productintro.mp4
- 添加左侧边栏各项的介绍
:::

## 视频介绍

<video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/productintro.mp4" type="video/mp4">
    </source>
</video>

## 简介

***Shifu*** 为用户提供全场景设备托管与一体化软件开发的透明框架。开发者通过使用 ***Shifu***，可以更简单地连接、监视和控制任何物联网设备。 

***Shifu*** 的创新优势是通过透明框架内的数字孪生技术，为设备赋予有思考能力的 “数字大脑”。数字孪生将反映设备的实时状态，对其进行开发操作等同于操作设备本身。物联网设备接入到 ***Shifu*** 中便会生成标准化接口，实现互联网互动，通过平台层对场景内所有设备、机器进行北向数据收集和南向指令管控。 

***Shifu*** 提供了桥接式设备互联解决方案，微服务架构令设备能力模块可调用，可复用，目标是实现通过配置文件轻松接入各种异构设备。目前，***Shifu*** 已经实现通过 `HTTP`、`MQTT`、`TCP Socket`、`RTSP`、`OPC UA`、`ONVIF`、`gRPC` 等协议接入物联网设备，同时已将 `西门子S7`、`海康威视 (HIKVISION)` 等通过私有协议通讯的设备进行了集成。 

作为云原生框架，Shifu通过Kubernetes的CRD功能延伸了K8s的资源，来实现高可用，静态域名，服务管理等功能，shifu可以支持对任何设备进行任何形式的配置。当连接物理设备时，Shifu会识别并以一个k8s Pod的方式启动该设备的数字孪生 deviceShifu。开发者通过接入 deviceShifu 的接口，可以获取物联网设备的所有功能，同时编程定义设备原本不具备的功能。 

云原生的Shifu将系统运维的难度大大降低，应用开发者可以通过一套Kubernetes基础架构进行运维管理。Shifu 将推动Kubernetes成为物联网开发的底层架构标准，将容器编排技术带入物联网软件开发生态中。 
