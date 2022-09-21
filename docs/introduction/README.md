# Product Introduction

***Shifu***([GitHub Repo](https://github.com/Edgenesis/shifu)) is an open source platform for IoT development and management based on [Kubernetes](https://kubernetes.io/). By using ***Shifu***, developers can connect, monitor and control any IoT device easier.

## Technical Features

### Full Device Integration

***Shifu*** can easily integrate all kinds of devices and support both public and private protocol platforms and drivers.

### Digital-twin Development

With digital twin, ***Shifu*** can gradually achieve low-code and zero-code development, has multi-level abstraction and the ability to quickly adapt to application scenarios.

### Native Architecture O&M

***Shifu*** uses `Kubernetes` native architecture and interconnects devices through the local network. Developers don't need other O&M (`K8s` + edge computing) facilities anymore. 

<!-- ## 视频介绍

<video width="100%" controls>
    <source src="https://bianwuji.com/stuff/videos/techintro.mp4" type="video/mp4"></source>
</video> -->

## Use Introduction

***Shifu*** is an efficient developer tool that provides all-in-one IoT solutions. 

### Step 1: Import the Driver 

  ***Shifu*** contains a large number of communication protocols and drivers that can be loaded automatically when called and are perfectly compatible with most hardware.

Shifu allows developers to add new drivers and protocols if they are not already compatible. Once the driver libraries are added, the system can automatically recognize and process them, package them into ready-to-use container images, and complete compatibility.

### Step 2: Generate a Digital Twin 
 
  Next, each connected hardware is structured as a corresponding digital twin, and each device's capability will become an API of the digital twin. ***Shifu*** has a built-in format converter. It automatically converts web requests sent by developers and then sends them to the device with the communication protocol supported by the device. As a result, all digital twins are able to implement a uniform request format and interaction.

  The CRD feature of `Kubernetes` greatly increases the development efficiency. Developers can generate digital twins by providing a Yaml configuration file. The basic configuration file includes the name of the device, the codename, the name of the communication protocol, and the device API required to control it.

  If more features are desired for the digital twin, ***Shifu*** can also satisfy more configuration requirements.

  Because each digital twin is a containerized microservice, resources are by default automatically scheduled in the form of `Pod` by `Kubernetes`.

### Step 3: Implementing Automation 
 
  In ***Shifu*** framework, developers will get two types of automation: deployment automation and device automation.

  On the deployment side, ***Shifu*** can discover, register and manage devices, and also generates digital twins for production.

  On the usage side, the request format and interaction of the digital twin are unified, and developers can control all devices in a unified way.

  ***Shifu*** allows developers to define the automation logic of hardware as a declarative API in the Yaml configuration file.

  As a result, IoT development becomes easy and efficient. 
