# Shifu IoT Knowledge Classroom: MQTT 101- Overview

:::info
Shifu can easily connect to devices using the MQTT protocol, making IoT development more efficient. Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

## Introduction
You may think that the name MQTT stands for "MQ Telemetry Transport". Well, it was, but now not any more. Currently MQTT is just MQTT, not an acronym of anything. Note that MQ is not an acronym either - it is the name of an IBM product, and it does not stand for "Message Queue".

The reason behind is that this protocol has gone beyond telemetry transport. The major focus of MQTT is now the entire IoT space. On its path to becoming the golden standard of IoT communication, MQTT attracts a growing number of users across the world. However, there are only a few resources online that can give us a complete guide to this protocol. And that is what this article series aims to do - to provide a detailed introduction to MQTT for anyone who would like to dig deeper into the IoT planet:

1. Overview
2. How Pub/Sub works
3. Ensuring the QoS
4. Connect MQTT to Kafka
5. Use MQTT to interact with real devices

This article is the first of the Intro to MQTT series. On this page we are going over some basic terms of the MQTT for a quick overview.

### A Very Brief Explanation of How MQTT works
Suppose we have this setup:
Publisher: a thermometer in our room, publishing "temperature" topic with tag "room1.
Subscriber: a laptop in our room, subscribing "temperature" topic with tag "room1".
Broker: running on a server in our room.
Topic: "temperature".
Tag under "temperature" topic: "room1".

A complete path to the temperature message is:
1. The thermometer publishes the temperature message of topic "temperature" and tag "room1" to broker.
2. The broker checks who is subscribing to the topic and tag, then routes the message to the laptop.
3. The laptop gets the message.
### Pub/Sub
Classic Client-Server pattern requires the client and server know each other. This is an example of strongly coupled system. The issue of that is, the server itself needs to maintain a registry of clients, making it complex, error-prone and somehow single point of failure. 

**MQTT uses a Pub/Sub pattern which decouples this system. **

The high level architecture is consisting of three components: publisher - broker - subscriber. Publisher publishes messages of some topics, subscriber subscribes to some topics, and the broker is in between - it filters the messages and ensures the subscriber only gets the messages it wants. We also call publisher and subscriber "clients" of MQTT broker, indicating that they are both the clients of the broker; therefore, in this definition, the "server" is the broker.

The broker filters messages via topic and the tags under a topic. A topic is a "type" or a "class" that can be used to group messages, and tags are "subtype" or "subclass" of a topic. Once a publisher publises a message under a topic and/or tags to a broker, only the subscribers subscribing to the same topic and/or tags will be able to get the message from broker. In this case, both publisher and subscriber need to know the topics and/or tags they are handling.

### Message Queue
MQTT can be considered as a message queue fully tailored for IoT messaging. Comparing to traditional message queue systems in distributed systems like Kafka, MQTT is light-weight and faster in both space and time. MQTT strongly prefers memory to store messages with very low throughput and asks any implementation to support dynamically adding/removing topics, to achieve ultra-low latency and high flexibility.

You can always connect MQTT with other message queues like Kafka to make use of both.

### Quality of Service (QoS)
By its name, QoS defines the quality of the broker's work serving the clients (publisher and subscriber). The clients need to tell the broker what the QoS level is when communicating with the broker. 

There are 3 QoS levels:


0. or "at most once" - message can be delivered or not, but there should be no duplicates:
  - publisher's message should be delivered to a broker one or zero times;
  - subscriber will get a message from a broker one or zero times;


1. or "at least once" - message has to be delivered, but can tolerate duplicates:
  - publisher's message should be delivered to a broker one or more times;
  - subscriber will get a message from a broker one or more times;


2. or "exactly once" - message has to be delivered, and must be delivered only once:
  - publisher's message must be delivered to a broker once;
  - subscriber must get a message from a broker once.
