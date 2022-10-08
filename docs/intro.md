---
id: intro
slug: /
sidebar_position: 0
title: 歡迎使用
---

# Welcome to ***Shifu***

## Introduction

***Shifu*** provides users with a transparent framework for full-scene device hosting and integrated software development. By using ***Shifu***, developers can connect, monitor and control any IoT device more simply. 

The innovative advantage of ***Shifu*** is to enpower devices with a thinking "digital brain" through the digital twin technology within a transparent framework. The digital twin will reflect the real-time state of the device, and it is the same to operate on the digital twin and on the device itself. Standardized interfaces will be generated after IoT devices are integrated into ***Shifu***  for Internet interaction. ***Shifu*** can achieve northbound data collection and southbound command control for all devices in the scene through the platform layer. 

***Shifu*** provides a bridged device interconnection solution with a microservice architecture that makes device capability modules invocable and reusable, with the goal of achieving easy integration to various heterogeneous devices through configuration files. Currently, ***Shifu*** can access IoT devices via `HTTP`, `MQTT`, `TCP Socket`, `RTSP`, `OPC UA` and other protocols, and has integrated devices such as `Siemens S7` and `HIKVISION` which communicate via private protocols. 

As a cloud-native framework, ***Shifu*** extends the resources of `Kubernetes` through its `CRD function` to achieve high availability, static domain names, service management, etc. ***Shifu*** supports any configuration for any device. When a physical device is integrated, ***Shifu*** recognizes and launches ***deviceShifu***, the digital twin of that device, as a `Kubernetes Pod`. By accessing ***deviceShifu***, developers can access all the features of an IoT device while programmatically defining features that the device is not endowed with. 

Cloud-native ***Shifu*** makes system operations and maintenance much less difficult, and application developers can manage O&M through one set of `Kubernetes` infrastructure. ***Shifu*** will turn `Kubernetes` to the standard underlying architectural for IoT development, bring container orchestration technology to the IoT software development ecosystem.

## Contents

You can select the content pf which you wish to view in the left sidebar at.

- [**Project Introduction**](. /introduction/): Learn about ***Shifu***'s architecture, features, application scenarios, and see how ***Shifu*** supports protocols.
- [**Quick Hands On**](. /tutorials/): Try it out by installing ***Shifu*** on your computer.
- [**User's Guide**](. /guides/): More detailed guides on how to use ***Shifu***.
- [**Developer Documentation**](. /references/)
    - ***Shifu*** architecture, features explained.
    - ***Shifu*** API reference.
- [**Open Source Community**](. /community/): view frequently asked questions, get support, get to join the open source community and more.
