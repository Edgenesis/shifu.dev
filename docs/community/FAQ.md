---
title: 常见问题
sidebar_position: 1
---

# 常见问题

> ***Shifu*** 开源了吗？

***Shifu*** 已于 2022.8.20 开源，GitHub仓库为 <https://github.com/Edgenesis/shifu>，开源协议使用 [Apache-2.0 license](https://github.com/Edgenesis/shifu/blob/main/LICENSE)。欢迎您一起让 ***Shifu*** 变得更好。

> ***Shifu*** 与 `Kubernetes` 的关系是什么？

作为云原生框架，***Shifu*** 通过 `Kubernetes` 的 `CRD功能` 延伸了 `Kubernetes` 的资源，来实现高可用、静态域名、服务管理等功能，***Shifu*** 可以支持对任何设备进行任何形式的配置。当连接物理设备时，***Shifu*** 会识别并以一个 `Kubernetes Pod` 的方式启动该设备的数字孪生 ***deviceShifu***。开发者通过接入 ***deviceShifu*** 的接口，可以获取物联网设备的所有功能，同时编程定义设备原本不具备的功能。
