# Product Introduction

***Shifu*** is an open source platform for IoT development and management based on [Kubernetes](https://kubernetes.io/). By using ***Shifu***, developers can connect, monitor and control any IoT device more simply.

## Technical Features

### Full Device Access

***Shifu*** can easily invoke all kinds of devices and support access to public and private protocol platforms and driver devices.

### Digital-twin Development

With digital twin, ***Shifu*** progressively achieve low-code and zero-code development with multi-layer abstraction and fast adaptation to application scenarios.

### Native Architecture O&M

***Shifu*** uses `Kubernetes` native architecture and adopts local network for device interconnection. You do not need to architect additional O&M facilities. (`K8s` + edge computing)

<!-- ## 视频介绍

<video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/techintro.mp4" type="video/mp4"></source>
</video> -->

## Introduction of Usage

***Shifu*** is an efficient developer tool that provides full-field IoT solutions. 

### Step 1: Import the Driver 

***Shifu*** contains a large number of communication protocols and drivers that can be loaded automatically when called and are perfectly compatible with most hardware.
 
If the protocol or the driver is not already compatible, ***Shifu*** allows developers to add a new one. Once the driver library is added, the system can automatically recognize and process it, package it into a ready-to-use container image, and complete the compatibility. 

### Step 2: Generate a Digital Twin 
 
Next, each connected hardware is structured as a corresponding digital twin. And, each device capability is encapsulated into an API in the digital twin. ***Shifu*** has a built-in format converter that takes the web requests sent by the developer, automatically converts them, and sends them to the device with a communication protocol supported by the device. As a result, all digital twins are able to implement a uniform request format and interaction. 

Since ***Shifu*** leverages the CRD feature of `Kubernetes`, development efficiency is greatly improved. Developers can generate digital twins by providing a Yaml configuration file. The basic configuration file includes the name of the device, the codename, the name of the communication protocol, and the device API needed to control it. 

If more features are desired for the digital twin, ***Shifu*** can also host additional configuration requirements. 

Because each digital twin is a containerized microservice, resources are automatically scheduled  in the form of `Pod` by `Kubernetes` by default. 

### Step 3: Implementing Automation 
 
In ***Shifu*** framework, developers will get two types of automation: deployment automation and device automation. 

On the deployment side, ***Shifu*** automates the discovery, registration and management of devices, and automatically generates digital twins for production. 

On the usage side, the request format and interaction of the digital twin are unified, and developers can control all devices in a unified way. 

***Shifu*** allows developers to define the automation logic of hardware as a declarative API in the Yaml configuration file. 
 
From then on, IoT development becomes easy and efficient. 
