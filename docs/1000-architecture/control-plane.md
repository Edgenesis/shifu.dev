---
title: 控制面 Control Plane
sidebar_position: 2
---

***Shifu*** 控制面的主要组件是 ***shifuController*** 和 ***shifud***。

### ***shifuController***

#### 简介

***shifuController*** 被用来控制 ***Shifu*** 自定义的一个[Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) 即 ***edgeDevice***，***edgeDevice*** 描述了连接到 ***Shifu*** 的实际设备的各项信息。

每一个 ***edgeDevice*** 拥有两个部分：
`EdgeDeviceSpec` 和 `EdgeDevicePhase`。

`EdgeDeviceSpec`包含了设备的基本信息。它拥有四个元素：

| 变量名 | 变量类型 | 用途 | 举例 |
|--|--|--|--|
|	Sku | \*string | 设备的SKU名称 | PLC, Hikvision camera |
|	Connection | \*Connection | 硬件连接方式 |Ethernet, USB|
| Address | \*string | 硬件地址 | 192.168.0.1 |
|	Protocol | \*Protocol | 传输协议 |HTTP, MQTT, Socket...|

`EdgeDevicePhase`定义了设备的当前状态：

| 状态 | 含义 |
|--|--|
| `Pending` | 设备已被识别，但接入 ***Shifu*** 尚未完成... |
| `Running` | 设备已成功接入 ***Shifu*** 并正在运行... |
| `Failed` | 设备接入 ***Shifu*** 失败... |
| `Unknown` | 未知状态... |

#### 设计文档

如果你对 ***shifuController*** 内部细节感兴趣,可以前往[***shifuController*** 设计文档](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifuController-zh.md)进一步阅读。

### ***shifud***

#### 简介

***shifud*** 是运行在每个Kubernetes节点上的`DaemonSet`，主要负责设备发现、验证及更新。

#### 设计文档

如果你对 ***shifud*** 内部细节感兴趣,可以前往[***shifud*** 设计文档](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifud-zh.md)进一步阅读。
