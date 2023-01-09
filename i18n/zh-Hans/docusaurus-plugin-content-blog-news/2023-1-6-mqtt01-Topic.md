# Shifu物联网知识普及之mqtt篇——主题

:::info
Shifu能够轻松接入使用MQTT协议的设备，让物联网开发变得更高效。Shifu是一个Kubernetes原生的物联网开发框架，开发者通过Shifu可以轻松实现连接、监控和控制任何物联网设备。Shifu将Kubernetes带入到物联网边缘计算场景中，助力实现物联网应用程序的可扩展性和高可用性。
:::

本篇文章，我们将直接讨论主题的结构以及怎样定义主题。

# 主题的定义

主题可以看作是一个字符串，其格式类似Linux文件系统的命名方式。平时，我们会从左到右、从高到低地描述一个主题的多个层次，就像下面这样：“earth/antarctica/elderthings/shoggoth”。其中，“earth”、 “antarctica”、 “elderthings”和 “shoggoth” 分别是上述主题的四个层次。
# 订阅

订阅者需要告诉代理自己订阅的主题是什么，而MQTT让我们可以自由地使用通配符来同时匹配多个主题。

**+**：单层通配符
**#**: 单层和多层通配符 (该通配符只能放在主题末尾)

假如我们有下面五个主题：
- “earth/antarctica/elderthing/shoggoth”
- “earth/antarctica/worker/shoggoth”
- “earth/antarctica/migo”
- “earth/antarctica/cthulhu/starspawn”
- “yith/greatrace”

如果订阅者A订阅了 **“earth/antarctica/+/shoggoth”**，那么他可以收到来自 “earth/antarctica/elderthing/shoggoth ”和 “earth/antarctica/worker/shoggoth ”的信息。

如果订阅者B订阅了 **“earth/antarctica/#”**，那么他可以收到 “earth/antarctica ”下所有四个主题的信息。

如果订阅者C订阅了 **“#”**，那么他就可以收到上述五个主题的信息。
# $SYS

 “$SYS”是一个特殊的主题，用于代理跟踪和维护系统统计数据。除了代理，其他人都不能向该主题发布信息。

记住，确保MQTT服务与上述标准兼容，这是MQTT协议使用者的工作。默认情况下，MQTT几乎允许我们在主题字符串中使用任何东西，包括非ASCII字符。