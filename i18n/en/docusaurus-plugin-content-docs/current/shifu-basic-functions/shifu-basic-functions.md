---
title: Function Overview
sidebar_position: 0
---

# Function Overview

Shifu, as the next generation of IoT application development framework, strives to provide a one-stop solution for IoT application developers. Based on the principle "Born for Developers", Shifu divides the work of IoT application development into six following major categories:

1. Device Access
1. Device Management
1. Data Collection
1. Device Control
1. Application Development
1. System Operation and Maintenance

## [Device Access](shifu-basic-functions/device-connection.md)

The advanced microservices architecture empowers Shifu with unparalleled scalability and allows Shifu to access new devices quickly.

## [Device Management](shifu-basic-functions/device-management.md)

Shifu comes with a device management framework that makes it easy to check the operating status of devices, update device drivers, perform security configurations, and other operations.

## [Data Collection](shifu-basic-functions/device-data-collection.md)

On Shifu, you can automate data collection with ease.

## [Device Control](shifu-basic-functions/device-control.md)

On Shifu, you can attain automated device control through data collection.

## Application Development

On Shifu, each device generates a corresponding digital twin ([deviceShifu](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu-zh.md)). Developers can utilize the capabilities of the device with unparalleled ease by simply calling the API exposed by [deviceShifu](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu-zh.md).

```
curl http://robot-arm/grip/
```

For example, this simple command above can make a robotic arm complete a grasping move. The aim of Shifu is to **help developers to create a complex IoT application as easy as creating a mobile app**!

## 系统运维
由于Shifu底层集成了Kubernetes的能力，所以Shifu在运维上有两大天然优势：
1. 由Kubernetes原生的Shifu使得开发者只用运维一套k8s集群，便可统一管理应用和IoT设备，无需运维一套额外的物联网平台；
2. 永无单点故障。与其他物联网平台不同，[Shifu的架构](shifu-architecture/architecture.md)完全由可创建若干个deviceShifu的副本组成，所以Shifu永无单点故障。
事实上，Shifu已经在多个500强企业的核心场景中（工厂、实验室、供应链等）累计运行了50万小时且没有出过故障。

## System Operation and Maintenance

As integrated with Kubernetes' capabilities, Shifu was born with two advantages in operation and maintenance:

1. Shifu, based on Kubernetes, enables developers to unify the management of applications and IoT devices by operating and maintaining only one set of k8s clusters, eliminating the need to operate and maintain an additional set of IoT platforms.
2. Never having singular-point failures. Unlike other IoT platforms, [Shifu's architecture](shifu-architecture/architecture.md) can be created several copies of deviceShifu, so there will never be a singular-point failure. In fact, Shifu has already accumulated 500,000 hours of operation without failure in use cases (factories, labs, supply chain, etc.) of several Fortune 500 company clients.
