# Shifu IoT Knowledge Classroom: MQTT 101- 主题

:::info
Shifu can easily connect to devices using the MQTT protocol, making IoT development more efficient. Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

In today's article we will go directly into what the topic is structured and how we can define a good topic.

# Definition of Topic
A topic is defined as a string and formatted in a linux file system way. In common practice, from left to right, we describe multiple levels of one topic, from highest to lowest, like this:

"earth/antarctica/elderthings/shoggoth"

and "earth", "antarctica", "elderthings", "shoggoth" are four levels of this topic.

# Subscription
The subscriber needs to tell the broker what topic it is subscribing to. MQTT gives us freedom to use wildcard characters to match multiple topics at once:

**+**: matches any single level
**#**: matches one or more levels (can only be placed at the end)

Let's say we have the following topics:
- "earth/antarctica/elderthing/shoggoth"
- "earth/antarctica/worker/shoggoth"
- "earth/antarctica/migo"
- "earth/antarctica/cthulhu/starspawn"
- "yith/greatrace"

If subscriber A subscribes to **"earth/antarctica/+/shoggoth"**, then it can receive messages from "earth/antarctica/elderthing/shoggoth" and "earth/antarctica/worker/shoggoth".

If subscriber B subscribes to **"earth/antarctica/#"**, then it can receive messages from all four topics under "earth/antarctica".

If subscriber C subscribes to **"#"**, then it can receive messages from all five topics above.

# $SYS
"SYS" after a dollar sign is a special "keyword" used by the broker to track and maintain system statistic data. Broker publishes to this topic and no one else can publish to it.

Remember that it is your or whoever implementing the protocol's job to make your MQTT service compatible with the standards above, and by default, MQTT allows you to use almost anything in the topic string, including non-ascii characters.