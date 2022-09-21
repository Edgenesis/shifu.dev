---
id: intro
slug: /
sidebar_position: 0
title: Welcome
---

# Welcome to Shifu 

<!-- ## 视频介绍

<video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/productintro.mp4" type="video/mp4"></source>
</video> -->

## Introduction
 
***Shifu*** provides a transparent framework for customers to host all-in-one device management and integrated software development. ***Shifu*** makes it easier for developers to connect, monitor, and control any IoT(The Internet of things) device.

***Shifu***'s innovative advantage is that it empowers devices with a thinking "digital brain" through digital twin technology within a transparent framework. The digital twin will reflect the real-time state of the device, so developers can operate the device through it. IoT devices plugged into ***Shifu*** will generate a standardized interface to enable Internet interaction, thus allowing for northbound data collection and southbound command control of all devices and machines under the scenario through the platform layer.

***Shifu*** provides a bridged device interconnection solution with a micro-service architecture that makes device functionality modules invocable and reusable. The goal is to enable easy access to various heterogeneous devices through configuration files. ***Shifu*** has access to IoT devices via `HTTP`, `MQTT`, `TCP Socket`, `RTSP`, `OPC UA` ,and other protocols at present. It has also integrated devices communicating via private protocols such as `Siemens S7` and `HIKVISION`.

As a cloud-native framework, ***Shifu*** extends the resources of `Kubernetes` through the `CRD function` to achieve high availability, static domain names, service management, etc. ***Shifu*** can support any form of configuration for any devices. When a physical device is connected, ***Shifu*** recognizes and launches that device's digital twin, ***deviceShifu***, as a `Kubernetes Pod`. By accessing ***deviceShifu***'s interface, developers can access all the features of an IoT device, program and define features that the device would not otherwise have.

Cloud-native ***Shifu*** makes system operations and maintenance much easier, and application developers can manage operations and maintenance through a set of `Kubernetes` infrastructures. ***Shifu*** will drive `Kubernetes` to become the underlying architecture standard for IoT development, bringing container orchestration technology into the IoT software development ecosystem. 

## Contents

Check contents at the left sidebar:

- [**Product Introduction**](./introduction/): Learn about the architecture, functions, application scenarios of ***Shifu***. And check what protocols are supported by ***Shifu***.
- [**Get Started**](./tutorials/): Install ***Shifu*** locally to try it out.
- [**How-to Guides**](./guides/): Detailed guides for using ***Shifu***.
- [**Reference Book**](./references/)
    - ***Shifu*** architecture and functions.
    - ***Shifu*** API reference.
- [**Open Source Community**](./community/): View FAQs, get support, and join the open source community.
