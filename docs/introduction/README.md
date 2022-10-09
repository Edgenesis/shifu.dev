# Introduction

***Shifu*** ([GitHub Repository](https://github.com/Edgenesis/shifu)) is an open source platform for IoT development and management based on [Kubernetes](https://kubernetes.io/). Developers can connect, monitor and control any IoT device more simply through ***Shifu***.

## Technical Features

### Universal IoT Device Integration

***Shifu*** makes it easy to invoke all kinds of devices and support the integration of public and private protocol platforms and driver devices.

### Digital Twin Development

***Shifu*** can achieve low-code and even zero-code development progressively through digital twin, which endows ***Shifu*** with multi-layer abstraction feature and fast adaptation to application scenarios.

### Native Architecture O&M

***Shifu*** is a `Kubernetes` native architecture, which spares the need for additional O&M facilities for interconnection among devices in local network. (feature of `K8s` + edge computing).

<!-- ## Video Introduction

!-- <video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/techintro.mp4" type="video/mp4"></source>
</video> -- -->

## Get Started

***Shifu*** is an efficient IoT developing tool that provides full-scene IoT solutions. 

### Step 1: Import the Driver 

Firstly, ***Shifu*** has included a large number of communication protocols and drivers that can be loaded automatically when called and are perfectly compatible with most hardware.
 
If not already compatible, ***Shifu*** allows developers to add new drivers and protocols. Once the driver repositories are added, the system can automatically recognize and process them, package them into ready-to-use container images, thus render them compatible. 

### Step 2: Generate a Digital Twin 
 
Next, each integrated hardware is transformed to a corresponding digital twin. And each capability of the device is packaged as an API inside the digital twin. ***Shifu*** has a built-in format converter that automatically converts the web requests sent by developers, and sends them to the device with a communication protocol supported by the device, which results a unified request format and interaction of all digital twins. 

Since ***Shifu*** leverages the CRD feature of `Kubernetes`, it greatly improves development efficiency. Developers can generate digital twins by providing a Yaml configuration file. The basic configuration file includes the name of the device, the codename, communication protocol, and the device API needed to control it. 

***Shifu*** can also host additional configuration requirements if the developer wishes more functions from the digital twin.

Since each digital twin is a containerized microservice, resources are automatically called by default as `Pod` by `Kubernetes`. 

### Step 3: Automation 
 
In the ***Shifu*** framework, developers will enjoy two types of automation: deployment automation and device automation. 

In terms of deployment, ***Shifu*** automates the discovery, registration and management of devices, and automatically generates digital twins for production. 

In terms of usage, the request format and interaction of the digital twin are unified, and developers can control all devices in a unified way. 

***Shifu*** allows developers to define the automation logic of hardware as a declarative API in the Yaml configuration file. 
 
From then on, IoT development becomes so easy and efficient. 