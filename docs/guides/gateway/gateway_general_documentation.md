---
title: Gateway General Documentation
sidebar_position: 0
---

# Gateway General Documentation

The Shifu project's gateway is a multi-protocol bridge that supports various protocols such as HTTP, MQTT and LwM2M. It provides a unified interaction interface for different IoT devices and systems, simplifying protocol conversion and integration.

## Overview

The **Shifu** gateway supports multiple communication protocols, including HTTP, MQTT, and LwM2M. It offers a universal solution for IoT ecosystems, allowing devices using different protocols to be managed and controlled through a single gateway, reducing development complexity and promoting integration with cloud services and other applications.

The gateway component enables devices to adapt to a unified protocol and handle requests from the same server. It facilitates telemetry services to extract data from devices and supports data publishing from the cloud to devices. Through the same server, data can also be uniformly pushed to the cloud.

## Key Features

- **Protocol Conversion:** Supports converting HTTP, MQTT, and OPC UA requests into a unified internal message format, allowing developers to interact with different types of IoT devices without dealing directly with the underlying protocol details.
- **Device Management:** Provides core functionalities such as device registration, reading attributes, executing commands, and monitoring device status, applicable to devices under multiple protocols.

## Typical Use Case

A typical use case is an HTTP or MQTT client interacting with IoT devices:

- The client sends a request (e.g. containing device ID and operation instructions) to the gateway.

- The gateway converts the request into an internal operation request and processes it according to the device protocol.

- After the device responds, the gateway converts it back to the original protocol response (HTTP, MQTT, etc.) and returns it to the client.

## Advantages

- **Developer-Friendly:** Developers can use familiar tools and frameworks (HTTP, MQTT, OPC UA) to interact with IoT devices, reducing development complexity.
- **Flexible Integration:** The gateway can be easily integrated into existing IoT ecosystems, supporting interoperability with multiple systems and protocols.
- **Unified Management:** By supporting multiple protocols, the gateway provides unified management for different devices and systems, enhancing system scalability.
