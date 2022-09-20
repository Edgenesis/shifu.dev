---
title: Architecture
sidebar_position: 0
---

# Architecture Introduction

Under a certain scenario, we often have a large number of IoT devices. ***Shifu*** generates a ***deviceShifu*** for each connected device in the system, and these independent ***deviceShifu*** will form a specific ***Shifu***  for the scenario. It will then serve as the exclusive database for this scenario, allowing developers to develop applications on it easily and efficiently.

In terms of computing architecture, ***Shifu*** only relies on the `K8s` environment. From the `K8s` upstream distribution to the `K3s`, ***Shifu*** can be deployed and running perfectly within a minute. Since ***Shifu*** runs in the same cluster as the applications developers originally deployed on `K8s`, they don't have to maintain an additional IoT platform, which greatly reduces O&M costs. In addition, each device can form several copies of ***deviceShifu***, the single point of failure problem of traditional IoT platform is also perfectly solved. So ***Shifu*** can greatly help your application development.

![](./images/architecture.png)
