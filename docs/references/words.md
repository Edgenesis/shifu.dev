---
title: Glossary
sidebar_position: 4
---

# Glossary

## Explanation of Shifu
- Shifu
  - An efficient IoT device management and application development framework based on [Kubernetes](https://kubernetes.io/docs/reference/glossary/?fundamental=true)
  - By using Shifu, developers can connect, monitor and control any IoT device more easily
  - Shifu is a [Kubernetes CRD](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/)
- Shifu Cloud
  - A one-stop platform based on the open source IoT development framework Shifu
  - Developers only need to fill in the basic device information through the GUI, and the device can be easily integrated into Shifu
- Shifu Demo
  - Shifu installation package, including
    - Install script of Shifu
    - All the images needed for Shifu
    - `kubectl` for clusters control
    - `kind` for creating test clusters locally
    - Virtual devices for users to try out
- edgeDevice: IoT devices managed by Shifu
- edgeNode: a Kubernetes node that can connect to multiple edgeDevices, it is usually a computer or server
- edgeMap: data structure that represents the relationship between edgeNode and edgeDebive
- deviceShifu
  - A structured digital twin of IoT devices in Shifu in the form of a microservice.
  - The underlying layer is a Kubernetes Pod
- shifud: runs on each edgeNode and monitors hardware changes (including connection or disconnection of edgeDevices)
- shifuController: manages the life cycle of deviceShifu, creating/deleting corresponding deviceShifu instances
## Tools that will be used
- Docker: Docker is a software technology providing operating-system-level virtualization also known as containers
- Kind: A tool for running local Kubernetes clusters using Docker container nodes
- Kubectl: Command line tool for communicating with a Kubernetes cluster's control plane, using the Kubernetes API
## Comparison to other tools
### 😙Cloud Providers' IoT solution offerings (AWS IoT Core, Azure IoT Hub, Alibaba Cloud IoT, etc.)
Public cloud providers boast complete set of features. If you are looking for an end-to-end solution, you should go to public cloud providers. However, there are a few drawbacks.
- Vendor lock-in. We all know it's pretty hard to migrate from one public cloud to another. For example, Google Cloud will shutter its IoT Core service in 2023.
- High cost. Given the big data & massive scale nature of IoT, running complete solutions on public clouds can be very costly.

### 🤗EdgeXFoundry
EdgeXFoundry is a popular open source IoT middleware. It was chartered by Dell in July 2015. It comes with many features after over 7 years of development. Moreover, EdgeXFoundry focuses on edge computing, and has a wide range of application scenarios. However, being a 7-year old product also means it was designed in the pre-Kubernetes era, which leads to the most prominent difference between EdgeXFoundry and Shifu. 
Unlike EdgeXFoundry, Shifu is a Kubernetes native CRD, and it virtualizes every IoT device as a K8s pod. This endows Shifu with many advantages: 
- A powerful cloud native eco-system. You can find almost every tool you need in the CNCF cloud native landscape. And being k8s native, Shifu is compatible with every single one of them.
- No need for a second infra platform. Our team has managed to migrate EdgeXFoundry on top of K8s, but failed to manage two conflicting platforms. 
- No single point of failure. Leveraging the power of K8s, Shifu can be easily replicated in a stateless manner. Shifu is designed to be highly available from day 1. 
- High scalability. K8s is the most battle-tested infra platform for massive scale applications, yet still suitable for small to medium scale use cases. Shifu leverages K8s' built-in scalability to provide best practices in the cloud industry to developers and operators in IoT world.
### 😗ThingsBoard
ThingsBoard is another popular open source IoT middleware. Unlike Shifu, ThingsBoard focuses more on the front end, which means it is very instrumental for data visualization. Shifu plans to integrate with ThingsBoard for data visualization.
### 😎OpenYurt
OpenYurt is a K8s distribution for cloud and edge coordination and Shifu can run on top of OpenYurt. But it does not solve the problem of IoT interoperability. A common practice is to run Shifu on top of OpenYurt to provide complete interoperability for cloud-edge devices.  
### 🥰KubeEdge
KubeEdge is a K8s distribution designed for cloud and edge coordination. But it does not provide a solution for IoT interoperability. A common practice is to run Shifu on top of KubeEdge to provide complete interoperability for cloud-edge devices. 
### 😍EMQ
EMQ is a popular MQTT broker. A common practice is to use Shifu to convert device messages to MQTT messages, and utilize brokers like EMQ to distribute MQTT messages to other applications.
### 🤩RT-Thread
RT-Thread is a popular real-time EOS. As middleware, Shifu runs on a GPCD(x86/64/ARM), and communicates with devices running OSs like RT-Thread through the network. 