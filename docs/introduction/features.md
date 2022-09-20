---
title: Features
sidebar_position: 1
---

# Features

***Shifu***, as the next generation of IoT application development framework, strives to provide a one-stop solution for IoT application developers. 

## By Working Process of IoT application development

Based on the principle "Born for Developers", ***Shifu*** divides the work of IoT application development into six following major categories:

1. Device Access
1. Device Management
1. Data Collection
1. Device Control
1. Application Development
1. System Operation and Maintenance

## Device Access

The advanced microservices architecture empowers ***Shifu*** with unparalleled scalability and allows ***Shifu*** to access new devices quickly.

## Device Management

***Shifu*** comes with a device management framework that makes it easy to check the operating status of devices, update device drivers, perform security configurations.

## Data Collection

On ***Shifu***, you can easily realize data collection automatically.

## Device Control

On ***Shifu***, you can attain automated device control through data collection.

## Application Development

On ***Shifu***, each device generates a corresponding digital twin ([***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md)). Developers can utilize the capabilities of the device with unparalleled ease by simply calling the API exposed by [***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md).

```bash
curl http://robot-arm/grip/
```

For example, this simple command above can make a robotic arm complete a grasping move.

The aim of ***Shifu*** is to **help developers to create a complex IoT application as easy as creating a mobile app!**

## System Operation and Maintenance

Due to integration with `Kubernetes`' capabilities, ***Shifu*** was born with two advantages in operation and maintenance:

1. ***Shifu***, based on Kubernetes, enables developers to unify the management of applications and IoT devices by operating and maintaining only one set of k8s clusters, eliminating the need to operate and maintain an additional set of IoT platforms.

1. Never having singular-point failures. Unlike other IoT platforms, ***Shifu***'s architecture can be created with several copies of ***deviceShifu***, so there will never be a singular-point failure. In fact, ***Shifu*** has been running for 500,000 hours without failure in core scenarios (factories, labs, supply chain, etc.) in many Fortune 500 companies.

## By ***Shifu***'s Module

***Shifu***, as a framework for developing and managing IoT devices, features the following functions：

- [***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md)
  - Get data from devices
  - Send commands to the devices
  - Various application development tools (finite state machine, etc.)
- [***shifud***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifud.md)
  - Device discovery
  - Device verification
  - Device update
- [***shifuController***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifuController.md)
  - Manage the entire process of ***Shifu***, including generation of digital twins, calling, operation and maintenance, etc.
