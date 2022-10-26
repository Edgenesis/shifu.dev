---
title: Features
sidebar_position: 1
---

# Features

As the next generation of IoT application development framework, ***Shifu*** is dedicated to provide one-stop solution for IoT application developers. 

## By Working Process of IoT application development

Based on the principle "Born for Developers", ***Shifu*** divides the work of IoT application development into six following major categories:

1. Device Integration
2. Device Management
3. Data Collection
4. Device Control
5. Application Development
6. System Operation and Maintenance

## Device Integration

The advanced microservices architecture empowers ***Shifu*** with unparalleled scalability and allows ***Shifu*** to integrate new devices swiftly.

## Device Management

***Shifu*** comes with a device management framework that makes it easy to check the operating status of devices, update device drivers, perform security configurations.

## Data Collection

On ***Shifu***, you can easily automate your data collection.

## Device Control

On ***Shifu***, you can achieve automated device control through data collection.

## Application Development

On ***Shifu***, each device generates a corresponding digital twin ([***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md)). Developers can utilize the capabilities of the device with unparalleled ease by simply calling the API exposed by [***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md).

```bash
curl http://robot-arm/grip/
```

For example, this simple command above can make a robotic arm complete a grasping move.

The aim of ***Shifu*** is to **help developers to create a complex IoT application as easy as creating a mobile app!**

## System Operation and Maintenance

Due to integration with `Kubernetes`' capabilities, ***Shifu*** was born with two advantages in operation and maintenance:

1. ***Shifu***, based on Kubernetes, enables developers to unify the management of applications and IoT devices by operating and maintaining only one set of k8s clusters, sparing the need to operate and maintain an additional set of IoT platforms.
2. Never having single-point failures. Unlike other IoT platforms, ***Shifu***'s architecture is formed with several copies of ***deviceShifu***, so there will never be a single point failure. In fact, ***Shifu*** has been running for 500,000 hours without one failure in core scenarios (factories, labs, supply chain, etc.) in many Fortune 500 companies.

## By ***Shifu***'s Module

***Shifu***, as a framework for developing and managing IoT devices, features the following functions：

- [***deviceShifu***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md)
  - Extract data from devices
  - Send commands to devices
  - Various application development tools (finite state machine, etc.)
- [***shifuController***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifuController.md)
  - Manage the lifecycle of ***Shifu***
- [***shifud***](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifud.md)
  - Device Discovery
  - Device Verification
  - Device Update
