---
title: FAQ
sidebar_position: 1
---

# FAQ

> Is ***Shifu*** open source?

***Shifu*** became open source at Aug 20, 2022, under [Apache-2.0 license](https://github.com/Edgenesis/shifu/blob/main/LICENSE). Check the repository at <https://github.com/Edgenesis/shifu>. Welcome to make ***Shifu*** better together.

> What is the relationship between ***Shifu*** and `Kubernetes`?

As a cloud native framework, ***Shifu*** extends `Kubernetes` resources with `Kubernetes's CRD` functions to enable high availability, static domain names, service management, etc. ***Shifu*** can support any form of configuration for devices. When a physical device is connected, ***Shifu*** recognizes and launches the digital twin of that device as a `Kubernetes Pod` called ***deviceShifu***. By accessing the interface to ***deviceShifu***, developers can access all the features of an IoT device, and program and define features that the device would not otherwise have.