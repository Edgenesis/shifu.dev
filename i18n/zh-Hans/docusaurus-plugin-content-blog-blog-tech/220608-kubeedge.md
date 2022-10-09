# 在KubeEdge上部署Shifu

如今十分流行的开源项目KubeEdge给开发者提供了一个基于Kubernetes的云边协同方案。它成功地将Kubernetes的集群编排能力融合到了物联网的边缘场景之中，使得对边缘算力的调度和管理更加轻量、也更加高效。

Shifu作为同样基于Kubernetes的开源物联网开发框架，它对于多种设备的兼容和虚拟化将为KubeEdge在边缘端的应用提供助力。事实上，二者在能力上拥有非常好的互补性，在多设备兼容的同时，运行在KubeEdge上的Shifu可以轻松管理边缘端运行的轻量Pod。

有了KubeEdge + Shifu的强强联手，我们就可以把IoT设备抽象成API，把原本复杂的传统物联网开发模式转化为简单的web开发模式！

下面就让我们来看一下如何让Shifu运行在KubeEdge上，并且给开发者们提供价值吧！

## 简介

本文将简单介绍在KubeEdge上部署Shifu的步骤，并接入一个海康威视的摄像头（使用RTSP进行视频流传输）的实例，为KubeEdge的架构加入海康威视摄像头支持。

本文使用的简单架构如下：

<img src="/blog-220608/1.png" width="100%" />

## 准备

本文使用了如下服务和工具：

1. Kubernetes: 1.21.5
2. kubectl, kubeadm, kubelet: 1.21.5
3. golang: 1.16.10
4. docker: 19.03.9
5. KubeEdge: 1.7.2

同时，KubeEdge的cloud端和edge端分别运行在不同的Linux实例上，环境均为Ubuntu Server 20.04

上述服务和工具中，cloud端需要安装全部上述服务和工具，而edge端只需要安装docker和KubeEdge。



## 第一步 在cloud端部署Kubernetes

本步可以参考Kubernetes的官方教程进行部署：
https://kubernetes.io/docs/setup/


在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/2.png" width="100%" />

## 第二步：在cloud端部署Shifu

将Shifu的github repo克隆到本地：
git clone https://github.com/Edgenesis/shifu.git

然后可以通过下列命令部署Shifu:
kubectl apply -f shifu/k8s/crd/install/shifu_install.yml

部署完成后我们应当看到Shifu的CRD controller已经完成部署：

<img src="/blog-220608/3.png" width="100%" />

## 第三步：在cloud端部署KubeEdge

本步可以参考KubeEdge的官方教程，使用keadm进行部署：
https://kubeedge.io/zh/docs/setup/keadm/

在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/4.png" width="100%" />

## 第四步：在cloud端获取token

运行如下命令：
keadm gettoken

请保存获得的token以便edge端使用。

现在cloud端的配置告一段落，我们现在切换到edge端的机器，让它加入集群。

第五步：在edge端加入集群

 在edge端运行如下命令：
keadm join --cloudcore-ipport="<cloud端advertise-address>:10000" --token=<第4步获得的token>

 在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/5.png" width="100%" />

此时切换回到cloud端，查看nodes：

<img src="/blog-220608/6.png" width="100%" />

我们可以看到cloud和edge都已经部署完毕了。

现在我们可以开始部署设备了。

通过KubeEdge，我们可以做到只在cloud端进行Kubernetes操作并且部署到edge端，同时保持edge端无需安装Kubernetes组件，保证轻量化。

## 第六步：在cloud端修改海康威视摄像头的配置文件

Shifu需要简单的配置文件来实现数字孪生的生成。在Shifu中，数字孪生被称为deviceShifu，以Pod的形式运行在集群里。

Shifu提供了接入海康威视摄像头的配置文件，其路径如下：
https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu/

Shifu默认将deviceShifu部署在拥有完整Kubernetes实例的机器上。在KubeEdge的环境下，边缘端无需运行完整的Kubernetes，因此Shifu也准备了针对云边协同环境的轻量的deviceShifu供使用。我们可以更改“deviceshifu-camera-deployment.yaml”，让它使用边缘侧的deviceShifu，并添加“nodeName”将其部署在edge node:

<img src="/blog-220608/7.png" width="100%" />

## 第七步：部署海康威视摄像头pod

在cloud端，运行下列命令：
kubectl apply -f shifu/examples/rtspDeviceShifu/camera-deployment

此时，我们可以查看camera相关pod：

<img src="/blog-220608/8.png" width="100%" />

## 最后一步：在edge端进行确认

在edge端，我们可以看到camera相关docker容器已经在运行了：

<img src="/blog-220608/9.png" width="100%" />

我们可以非常简单地调用deviceShifu提供的capture/stream/info/move 等一系列HTTP API，对摄像头进行操作，比如下面的动图。
相关命令：
curl edgedevice-camera/move

<img src="/blog-220608/10.gif" width="100%" />

至此，我们就完成了在KubeEdge上运行Shifu的全部步骤。
