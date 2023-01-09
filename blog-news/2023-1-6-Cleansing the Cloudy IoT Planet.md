# Cleansing the Cloudy IoT Planet

:::info
Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

### Is this platform really stable? 
When Google tells us the IoT Core is going to be shutdown, anyone who is running on the "cheap, efficient, secure" Cloud IoT services need to ask that question.
I am not only blaming Google. Public cloud providers are harsh. They provide redundant features with a low price to attract customers to make their stock prices great; but when the economy is not as good, such services which only burns cash will be thrown away. Customer will suddenly realize their IoT devices need a new home, just like tenants being kicked out of rental apartments by the landlord.
Is there a way to enjoy great features without worrying about such disappointing scenarios? Yeah we have that.

# Shifu
Right, it is a new IoT platform.

Shifu has the following features that can replace what you enjoy in Google IoT Core as easily and fast as turning a switch:

1. Device Management and Control: Shifu provides an HTTP interface for users to interact with the devices via REST API. You can just forget about any protocols else because Shifu is always compatible.

2. Security: Shifu can be fully on-prem with a highly secure user authentication system. If you don't trust too much about the internet, alright you can use Shifu without any internet connection!

3. Telemetry Collection: It is one of Shifu's flagship features. You can specify anything that you want to collect by just telling Shifu the name of the telemetry and the destination of the data output, then you can just sit and wait.

OK it is how Shifu can be a great alternative to Google IoT Core. But it only makes it yet another new IoT platform. I know it is not enough. So here are the features turning Shifu into an Iot platform that goes beyond Google:

4. Digital Twin: each device is in fact a containerized service running in Shifu. So Shifu is the most decoupled IoT platform in the world - there is never a single point of failure and each device is as independent as it has already been in real life.

5. Flexibility and Scale: Shifu is making use of Kubernetes to ensure all system resources are managed efficiently and ready to scale.

6. Easiest to Setup: Shifu is the easiest to use IoT platform in the world. You don't need to register an account (well if you like you can still do) to start using Shifu. Everything is already containerized and you just need literally one single action to get everything running; if you don't like writing one line of command, there is a fully functioning Web UI waiting there for you to play with.

7. Multiple Clouds: Besides enjoying the on-prem Shifu, if you still like to have Cloud features, we have that. Shifu Cloud is public cloud agnostic - no single cloud provider is a single point of failure to Shifu.

Shifu is giving you back freedom while still maintaining a high standard that is pain-free, easy-to-use, on-prem, and secure. With all the mist eliminated by Shifu, your vision of the IoT planet will be as clear as, well, the lakes you have seen in those romantic movies, especially the ones shot in New Zealand.