---
title: Architecture
sidebar_position: 0
---

# Architecture Introduction

In a scenario where we often have a large number of IoT devices, ***Shifu*** generates a ***deviceShifu*** for each connected device in the system, and these independent ***deviceShifu*** form a ***Shifu*** customized for the scenario. This ***Shifu*** will then serve as the exclusive data base for this scenario, allowing developers to develop applications on it easily and efficiently. 

In terms of computing architecture, ***Shifu*** relies only on the `K8s` environment, from the `K8s` upstream distribution to the `K3s`, `Shifu` can be deployed and running perfectly within a minute. And because ***Shifu*** runs in the same cluster as the applications you originally deployed on `K8s`, you don't have to maintain an additional IoT platform at all, which greatly reduces O&M costs. In addition, because each device can form several copies of ***deviceShifu*** in ***Shifu***, the single point of failure problem of traditional IoT platform is also perfectly solved. ***Shifu*** escorts your application development.

![](./images/architecture.png)
