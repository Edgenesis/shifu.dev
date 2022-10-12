# 在KubeEdge上部署Shifu

如今十分流行的开源项目 `KubeEdge` 给开发者提供了一个基于 `Kubernetes` 的云边协同方案。它成功地将 `Kubernetes` 的集群编排能力融合到了物联网的边缘场景之中，使得对边缘算力的调度和管理更加轻量、也更加高效。

***Shifu*** 作为同样基于 `Kubernetes` 的开源物联网开发框架，它对于多种设备的兼容和虚拟化将为 `KubeEdge` 在边缘端的应用提供助力。事实上，二者在能力上拥有非常好的互补性，在多设备兼容的同时，运行在 `KubeEdge` 上的 `Shifu` 可以轻松管理边缘端运行的轻量 `Pod`。

有了 `KubeEdge` + ***Shifu*** 的强强联手，我们就可以把IoT设备抽象成 `API`，把原本复杂的传统物联网开发模式转化为简单的Web开发模式！

下面就让我们来看一下如何让 ***Shifu*** 运行在 `KubeEdge` 上，并且给开发者们提供价值吧！

## 简介

本文将简单介绍在 `KubeEdge` 上部署 ***Shifu*** 的步骤，并接入一个海康威视的摄像头（使用 `RTSP` 进行视频流传输）的实例，为 `KubeEdge` 的架构加入海康威视摄像头支持。

本文使用的架构如下：

<img src="/blog-220608/1.png" width="100%" />

## 准备

本文使用了如下服务和工具：

1. `Kubernetes`: 1.21.5
    - `kubectl`
    - `kubeadm`
    - `kubelet`
1. `Golang`: 1.16.10
1. `Docker`: 19.03.9
1. `KubeEdge`: 1.7.2

同时，`KubeEdge` 的 `Cloud端` 和 `Edge端` 分别运行在不同的 `Linux` 实例上，环境均为 `Ubuntu Server 20.04`。

上述服务和工具中，`Cloud端` 需要安装全部上述服务和工具，而 `Edge端` 只需要安装 `Docker` 和 `KubeEdge`。

## 第一步 在Cloud端部署Kubernetes

本步可以参考[Kubernetes的官方教程](https://kubernetes.io/docs/setup/)进行部署。

在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/2.png" width="100%" />

## 第二步 在Cloud端部署Shifu

将 ***Shifu*** 的 `Github` 仓库克隆到本地：

```
git clone https://github.com/Edgenesis/shifu.git
```

然后可以通过下列命令部署 ***Shifu***:

```
kubectl apply -f shifu/pkg/k8s/crd/install/shifu_install.yml
```

部署完成后我们应当看到 ***Shifu*** 的 `CRD controller` 已经完成部署：

<img src="/blog-220608/3.png" width="100%" />

## 第三步 在Cloud端部署KubeEdge

本步可以参考 [`KubeEdge` 的官方教程](https://kubeedge.io/zh/docs/setup/keadm/)，使用 `keadm` 进行部署。

在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/4.png" width="100%" />

## 第四步 在Cloud端获取token

运行如下命令：

```
keadm gettoken
```

请保存获得的`token`以便Edge端使用。

现在Cloud端的配置告一段落，我们现在切换到Edge端的机器，让它加入集群。

## 第五步 在Edge端加入集群

在Edge端运行如下命令：

```
keadm join --cloudcore-ipport="<Cloud端advertise-address>:10000" --token=<第四步获得的token>
```

在部署完成后我们应当看到终端打印出如下信息：

<img src="/blog-220608/5.png" width="100%" />

此时切换回到Cloud端，查看nodes：

<img src="/blog-220608/6.png" width="100%" />

我们可以看到Cloud端和Edge端都已经部署完毕了。

现在我们可以开始部署设备了。

通过 `KubeEdge`，我们可以做到只在Cloud端进行 `Kubernetes` 操作并且部署到Edge端，同时保持Edge端无需安装 `Kubernetes` 组件，保证轻量化。

## 第六步 在Cloud端修改海康威视摄像头的配置文件

***Shifu*** 需要简单的配置文件来实现数字孪生的生成。在 ***Shifu*** 中，数字孪生被称为 ***deviceShifu***，以 `Pod` 的形式运行在集群里。

***Shifu*** 提供了接入海康威视摄像头的配置文件，其路径为 `https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu/`。

***Shifu*** 默认将 ***deviceShifu*** 部署在拥有完整 `Kubernetes` 实例的机器上。在 `KubeEdge` 的环境下，边缘端无需运行完整的 `Kubernetes`，因此 ***Shifu*** 也准备了针对云边协同环境的轻量的 ***deviceShifu*** 供使用。我们可以更改 `deviceshifu-camera-deployment.yaml`，让它使用边缘侧的 ***deviceShifu***，并添加 `nodeName` 将其部署在 `edge node`:

<img src="/blog-220608/7.png" width="100%" />

## 第七步 部署海康威视摄像头Pod

在Cloud端，运行下列命令：

```
kubectl apply -f shifu/examples/rtspDeviceShifu/camera-deployment
```

此时，我们可以查看camera相关的 `Pod`：

<img src="/blog-220608/8.png" width="100%" />

## 最后一步 在Edge端进行确认

在Edge端，我们可以看到camera相关的Docker容器已经在运行了：

<img src="/blog-220608/9.png" width="100%" />

我们可以非常简单地调用 ***deviceShifu*** 提供的 `capture`/`stream`/`info`/`move` 等一系列 `HTTP API`，对摄像头进行操作，比如下面的动图：

相关命令：

```
curl edgedevice-camera/move
```

<img src="/blog-220608/10.gif" width="100%" />

至此，我们就完成了在 `KubeEdge` 上运行 ***Shifu*** 的全部步骤。
