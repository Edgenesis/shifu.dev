# You don't need a device manager

:::info
Shifu is a Kubernetes-native IoT development framework that allows developers to easily connect, monitor, and control any IoT device. Shifu brings Kubernetes to the edge computing scenarios of the Internet of Things, helping to achieve scalability and high availability of IoT applications. 
:::

As an IoT enthusiast, you have used millions of device managers. They are all great at doing their job - managing your devices. However, you have also got millions of complaints - they are just too complicated to use. 

This complication is actuallly reasonable. A typical IoT environment will have tons of devices, and tons of devices indicate easy-to-mess-up memories, as well as easy-to-scramble threads. That is the curse of a monolith. You had better decouple it - OK, then it makes the coding complex. So now the programmers are facing the trade-off between easy-to-code vs. easy-to-use, and of course, programmers won't make their own life hard.

But should the users always carry the burden? Before now, the answer could be yes as there aren't good solutions to this question; but now, the burden is fully distributed and dissolved - because of Shifu.

### Podding your devices
You may already get it - Shifu is using Kubernetes. K8s is a great devops tool for managing system resources and requirements across multiple pods. As we have already learned from all those large scale clouds, K8s is perfect for decoupling - with its powerful container support, every pod is now completely separated, yet still coordinated together - perfect for the management of the Internet of Things.

Device management is a combination device and management. You have devices already there, now you just need management - and K8s has devoted its entire life into management. Now you just need to tell K8s "lad you need to manage those" to let everything start running. How? Use Shifu.

Shifu makes K8s an IoT native platform. You just need to give Shifu what the device is, the name of protocol it is using, and the list of operations it supports; all those three types of information will be written in a simple configuration file, and then it is done - Shifu will take care of what remains: reading the configuration, building the supported drivers, generating containers, and creating pods and letting K8s know. So K8s has no idea what it is managing - they are still pods, but Shifu knows that each pod is actually a virtual device, entangled with the real device.

This out-of-box experience is what you deserve after you have suffered so many different "advanced device managers" - you should manage your devices to the level above all - Pods.