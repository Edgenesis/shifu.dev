---
id: intro
slug: /
sidebar_position: 0
title: Welcome
---

# Welcome to Use ***Shifu***

<!-- ## 视频介绍

<video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/productintro.mp4" type="video/mp4"></source>
</video> -->

## Introduction

***Shifu*** provides a transparent framework for customers to host all-scene devices and integrate software development.  ***Shifu*** makes it easier to connect, monitor, and control any IoT device. 

***Shifu***'s innovative advantage is the empowerment of devices with a thinking "digital brain" through digital twin technology within a transparent framework. The digital twin will reflect the real-time state of the device, and developing operations on it is equivalent to operating the device itself. IoT devices plugged into Shifu will generate a standardized interface to enable Internet interaction, northbound data collection and southbound command control of all devices and machines in the scene through the platform layer. 

***Shifu*** provides a bridged device interconnection solution with a micro-service architecture that makes device capability modules invocable and reusable, with the goal of achieving easy access to various heterogeneous devices through configuration files. Currently, ***Shifu*** has achieved access to IoT devices through `HTTP`, `MQTT`, `TCP Socket`, `RTSP`, `OPC UA`, and other protocols, and has integrated devices communicating through private protocols such as `Siemens S7` and `HIKVISION`. 

As a cloud-native framework, ***Shifu*** extends the resources of `Kubernetes` through the `CRD function` of it to achieve high availability, static domain names, service management, etc. ***Shifu*** can support any kind of configuration for any device. When a physical device is connected, ***Shifu*** recognizes and launches that device's digital twin, ***deviceShifu***, as a `Kubernetes Pod`. By accessing ***deviceShifu***'s interface, developers can access all the features of an IoT device, while programmatically defining features that the device would not otherwise have. 

Cloud-native ***Shifu*** makes system operations and maintenance much less difficult, and application developers can manage operations and maintenance through a set of `Kubernetes` infrastructure. ***Shifu*** will drive `Kubernetes` to become the underlying architecture standard for IoT development, bringing container orchestration technology to the IoT software development ecosystem. 

## Contents

Check contents at the left sidebar:

- [**Product Introduction**](./introduction/): Learn about the architecture, functions, using cases of ***Shifu***. And check ***Shifu***'s support for different protocols.
- [**Get Started**](./tutorials/): Install ***Shifu*** in your computer to try it out.
- [**How-to Guides**](./guides/): Detailed guides for using ***Shifu***.
- [**Reference Book**](./references/)
    - ***Shifu*** architecture and functions.
    - ***Shifu*** API reference.
- [**Open Source Community**](./community/): View common problems, get support, and join the open source community.
