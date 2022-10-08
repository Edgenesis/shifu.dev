---
title: Frequently Asked Questions
sidebar_position: 1
---

# FAQs

> Is ***Shifu*** open source yet?

***Shifu*** was opened on 2022.8.20, GitHub repository is <https://github.com/Edgenesis/shifu>, open source protocol is used [Apache-2.0 license](https://github.com/Edgenesis/ shifu/blob/main/LICENSE). Welcome to make ***Shifu*** better together!

> What is the relationship between ***Shifu*** and `Kubernetes`?

As a cloud-native framework, ***Shifu*** extends `Kubernetes` resources through `Kubernetes` `CRD features` to achieve high availability, static domain names, service management, etc. ***Shifu*** can support any kind of configuration for any device. When a physical device is connected, ***Shifu*** recognizes and launches the digital twin of that device as a `Kubernetes Pod` ***deviceShifu***. By accessing the interface to ***deviceShifu***, developers can access all the features of an IoT device, while programmatically defining features that the device would not otherwise have.