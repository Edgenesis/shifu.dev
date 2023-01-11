# Shifu IoT Knowledge Classroom: MQTT 101- Pub and Sub

:::info
Shifu can easily connect to devices using the MQTT protocol, making IoT development more efficient. Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

The word asynchronous is the core of a pub sub system. Decoupling the message sender and receiver, this system enables the non-waiting nature: each service now just needs to do its own job. Happens to be a perfect explanation of the relationships among people in a tech company, or a financial institution, or a government department, or a football team, or basically every group with more than one human.

## Pub
MQTT broker does not care about what the data is (i.e., payload), as long as it contains the topic so the broker can forward it to the subscribers. 

### PUBLISH message
A typical MQTT message of PUBLISH has the following fields:
packetId: the identifier of the packet. When the message is configured to always delivered (i.e., qos > 0), the broker needs this identifier to locate the message to retry.

topicName: the name of the topic, it is formatted similar to a directory in a linux file system. For example, we can have "shimokitazawa/beast/tadokoro" as a topic.

**qos**: level of the quality of service. As mentioned in the previous article, we have 3 levels: 0 (at most once), 1 (at least once), and 2 (exactly once).

**retainFlag**: if set to true, the broker will retain the last message of a topic; when a new subscriber comes, the broker will automatically send the last message of this topic to it.

**payload**: the payload. It could be anything in any format.

**dupFlag**: if set to true, then this message is a duplicate. Used by broker when we have qos > 0 in the retrying scenario.

### Broker's job
It is simple - the broker gets the message, reads the qos level, and sends the message to the subscribers according to the qos. Note that the publisher's work is done when the message is delivered to broker; and any work remaining is none of the publisher's business.

## Sub
Er, it is easier to explain what the subscriber does: subcriber tells the broker "hey buddy I am the subscriber of this topic, if you receive the messages of the topic just give it to me".

### SUBSCRIBE message
A typical MQTT message of SUBSCRIBE has the following fields:

**packetId**: still, it is the identifier of the packet of the message.

And a list of combinations of a topic and a qos:
qos_n: the expected qos of topic_n delivering to this subscriber. This qos serves as the max qos of the topic for a subscriber, for example, if the message has a qos of 2 but the max qos of the topic in subscriber_a is 1, then the message will be delivered to this subscriber with qos being 1 instead of 2.

**topic_n**: the topic this subscriber subscribes to.

### Broker's job
Upon receipt of the SUBSCRIBE message, the broker will send back a SUBACK message to the subscriber with the metadata of the subscriber (i.e., the max qos). Once the SUBACK is received by the subscriber, the communication is established.

### Unsubscribe
To unsubscribe a topic, the subscriber just needs to send an UNSUBSCRIBE message with the topic to be unsubscribed (of course it also needs a packetId), and the broker will return an UNSUBACK message to the subscriber.

## Conclusion
This is how MQTT publisher, broker and subscriber work in this Pub Sub relationship. Because MQTT is just a protocol, we need to define how the broker identifies the subscriber - you can just maintain an in-memory table to do it, or you can use a more sophisticated way to do it, like using multiple ECC memories to handle a replicated containerized service protected by a distributed locking mechanism to maintain an in-memory table.