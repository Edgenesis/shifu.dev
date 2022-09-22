---
title: Architecture
sidebar_position: 0
---

# Architecture Introduction

Under some certain scenarios, we can often have a large number of IoT devices. ***Shifu*** generates a ***deviceShifu*** for each connected device in the system, and these independent ***deviceShifu*** will form a specific ***Shifu***  for the scenario. It will then serve as the exclusive data hub for this scenario, allowing developers to develop applications on it easily and efficiently.

In terms of computing architecture, ***Shifu*** relies solely on the `K8s` environment. From the `K8s` upstream distribution to the `K3s`, ***Shifu*** can be deployed and run perfectly within a minute. Since ***Shifu*** runs in the same `K8S` cluster as the applications, developers don't have to maintain an additional IoT platform, which greatly reduces O&M costs. In addition, each device can have several copies of ***deviceShifu***, traditional IoT platform's single point failure problem is also perfectly solved. ***Shifu*** can help your application development greatly.

![](./images/architecture.png)
