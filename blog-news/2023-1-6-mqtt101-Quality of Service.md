# Shifu IoT Knowledge Classroom: MQTT 101- Quality of Service

:::info
Shifu can easily connect to devices using the MQTT protocol, making IoT development more efficient. Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

You already have a vague impression about the QoS of MQTT - it instructs how is the message delivered; and we have 3 QoS levels and 2 types of messages.

# Quick Review
3 levels of QoS:
0 - at most once
1 - at least once
2 - exactly once

# 2 types of delivery: 
1. publisher to broker
2. broker to subscriber.

Also, in the last article we have discussed the SUBSCRIBE message sent from subscriber to broker; and it defines the maximum QoS level that the subscriber can accept, and any message with higher level will be reduced to the maximum level of the subscriber subscribing to that.

### 0 - At Most Once
You can always know what it behaves by its name. So if you have QoS level 0, the message will either be delivered once, or not delivered - just try once and no retry. Send and forget about it. Wow, much async.

### 1 - At Least Once
I want deliver this message! And I will retry like crazy. Whoever sends the message will keep retry sending the message until it receives PUBACK (consisting of packetId and that is it) from recipients. 

Remember we have the dupFlag field in PUBLISH message? Here is how we use it - in every retry following the initial try, this dupFlag is set to true, informing the recipients that this could be a duplicate message.

### 2 - Exactly Once
The message is ensured to be delivered, and ensured to be delivered only once. This is the slowest and most complicated QoS level. Here is the entire lifecycle of a QoS 2 message:

First, the sender (publisher or broker) sends the PUBLISH message to receiver (broker or subscriber). "Knock knock!"

Second, once the receiver gets the PUBLISH message, it sends the PUBREC message to the sender, indicating that "I recognize this message, oh it is QoS 2, so take my word as a delivery proof, stop harassing!". Before receiving PUBREC, the sender will keep retrying to send PUBLISH message with dupFlag == true to the receiver.

Third, upon the receipt of PUBREC, the sender learns that it has been delivered, and because it knows the message QoS is Exactly Once, it will throw away the message and stop retrying like crazy. The sender sends PUBREL to the receiver saying "I promise I won't knock again with this message."

Fourth, when the PUBREL arrives, the receiver will send PUBCOMP back to the sender to complete the life cycle.

It is very similar to how we handshake in TCP - using some additional steps to ensure all stakeholders are aware of current status.

If the receiver is not reachable, the sender will keep the message locally in a queue so it can send it when the receiver is online.