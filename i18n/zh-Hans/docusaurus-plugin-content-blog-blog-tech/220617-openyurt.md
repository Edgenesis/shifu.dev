# 使用Shifu在OpenYurt集群中接入RTSP协议摄像头

OpenYurt是一个云边计端算平台，借助OpenYurt的能力，可以将现有的Kubernetes集群转换成OpenYurt集群，并将Kubernetes的能力延伸到边缘侧。OpenYurt为云边端协同开发提供了多样化的功能，如打通云边通信的YurtTunnel，为了方便管理节点单元应用部署/运维的Yurt-App-Manager以及提供了边缘自治的YurtHub。 

开发者可以专注于云边端产品上的应用开发而不用担心底层架构的运维。Shifu作为Kubernetes原生的开源物联网开发架构，可以兼容各种物联网设备的协议并将其抽象成一个为微服务软件对象。二者的能力有非常好的互补性。尤其是在OpenYurt中加入了YurtDeviceController以后，Shifu可以用OpenYurt原生的方式来将设备进行抽象，大大提高物联网开发者的开发效率。 

使用OpenYurt和Shifu以后，我们可以将原本复杂的IoT，云边协同开发转化为简单的web式开发。 

## 简介

本文是一个在OpenYurt集群中使用Shifu接入RTSP协议摄像头的指南，其中包含Shifu Framework, Docker, Linux, Kubernetes, OpenYurt的基本操作，任何开发者都可以阅读本文来学习Shifu Framework的开发方法。

本文中的Shifu Framework架构如下：

<img src="/blog-220617/1.png" width="100%" />


北向通过“deviceshifu-http-http”向上开放HTTP API接口，南向通过“rtsp-driver”来和实际设备交互 

## 目标

1. 在server和edge端通过 yurtctl 部署OpenYurt, 并将edge端加入server端的集群 
2. 在 edge 端部署网络摄像头的数字孪生 
3. 实现通过HTTP对网络摄像头的远程自动化管控 

## 所需设备

1. 两台运行 Linux的虚拟机，server和edge的配置分别为 4核16G内存和2核8G内存 
2. 一个RTSP协议的网络摄像头，本文中用到的摄像头型号为海康威视的 “DS-2DE3Q140CN-W” 

## 软件环境

-CentOS 7.9.2009 
-Go v1.17.1 
-yurtctl v0.6.1 
-kubectl: v1.19.8 
    (installed by yurtctl) 


## 第一步：安装并部署OpenYurt集群

本文参考了OpenYurt的官方教程，地址为： 

https://openyurt.io/docs/v0.6.0/installation/yurtctl-init-join  

首先让我们来下载OpenYurt，从官方的GitHub直接克隆项目： 
git clone https://github.com/openyurtio/openyurt.git

接着让我们下载v0.6.1版本的yurtctl 
curl -LO https://github.com/openyurtio/openyurt/releases/download/v0.6.1/yurtctl 
chmod +x yurtctl

### server端的部署

在server端创建OpenYurt集群 
./yurtctl init --apiserver-advertise-address <SERVER_IP> --openyurt-version latest --passwd 123 

看见如下信息即表示集群创建完成，这里的“--token”要记录一下用来将edge节点加入到集群中 

<img src="/blog-220617/2.png" width="100%" />

接下来看一下各个Pod的运行状况，通过“kubectl get pods -A”: 

<img src="/blog-220617/3.png" width="100%" />

#### 遇到的几个问题


如果在“ kubectl logs yurt-hub-server -n kube-system”里遇到

<img src="/blog-220617/4.png" width="100%" />

请尝试“kubectl apply -f config/setup/yurt-controller-manager.yaml” 
方法来自: https://github.com/openyurtio/openyurt/issues/872#issuecomment-1148167419  

除此之外，还有几个问题，如在“kubectl logs yurt-hub-server -n kube-system”里遇到如下输出：

<img src="/blog-220617/5.png" width="100%" />

请尝试“kubectl apply -f config/setup/ yurthub-cfg.yaml” 

<img src="/blog-220617/6.png" width="100%" />


如果在yurt-tunnel-server和yurt-tunnel-agent也遇到了类似的log，通过以下命令来修复yurt-tunnel的RBAC问题： 

```
kubectl apply -f config/setup/yurt-tunnel-agent.yaml 
kubectl apply -f config/setup/yurt-tunnel-server.yaml

```

Untaint master节点来运行Shifu的controller： 

```
kubectl taint nodes server node-role.kubernetes.io/master-
```

<img src="/blog-220617/7.png" width="100%" />

至此，Server端部署完毕。 

### Edge 端的部署

首先利用刚才server端init以后的token，执行： 

```
./yurtctl join <MASTER_IP>:6443 --token <MASTER_INIT_TOKEN>  --node-type=edge --discovery-token-unsafe-skip-ca-verification --v=5 
```

<img src="/blog-220617/8.png" width="100%" />

确认Node状态，通过"kubectl get nodes”： 

<img src="/blog-220617/9.png" width="100%" />

至此，一个server端+一个edge端的集群建立完毕。

## 第二步：在集群中部署Shifu


接下来让我们把Shifu部署到OpenYurt集群中 
在server端，克隆Shifu项目到本地： 

```
git clone https://github.com/Edgenesis/shifu.git 
cd shifu/
```

接下来，安装Shifu：

```
kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

<img src="/blog-220617/10.png" width="100%" />

通过"kubectl get pods -A”检查Pod状态： 

<img src="/blog-220617/11.png" width="100%" />

看到"shifu-crd-system” namespace中的Pod运行即可 

至此，Shifu安装完毕。

## 第三步：部署虚拟摄像头 (camera deviceShifu)

OpenYurt提供了非常方便的节点池(NodePool)功能，可以让我们管理节点集群，对集群进行部署。 

创建”beijing”节点池： 

```
export WORKER_NODEPOOL="beijing" 
export EDGE_NODE="edge" 
cat <<EOF | kubectl apply -f - 
apiVersion: apps.openyurt.io/v1alpha1 
kind: NodePool 
metadata: 
  name: $WORKER_NODEPOOL 
spec: 
  type: Edge 
EOF
```

输出如下：

<img src="/blog-220617/12.png" width="100%" />

接着将edge服务器label到”beijing”的NodePool： 

```
kubectl label node $EDGE_NODE apps.openyurt.io/desired-nodepool=beijing
```

<img src="/blog-220617/13.png" width="100%" />

查看一下NodePool的状况，应该有一个READYNODES： 

```
kubectl get nodepool
```

<img src="/blog-220617/14.png" width="100%" />

因为物联网的边缘节点通常是分布式在同一场景内的，这里可以使用OpenYurt的UnitedDeployment功能根据NodePool来自动部署 。

安装 Yurt-app-manager
```
git clone https://github.com/openyurtio/yurt-app-manager.git
cd yurt-app-manager
kubectl apply -f config/setup/all_in_one.yaml
```

<img src="/blog-220615/1.png" width="100%" />

使用UnitedDeployment来部署虚拟的海康摄像头，YAML文件如下：

<details>
  <summary> deviceshifu-camera-unitedDeployment.yaml </summary>

```yml

```
</details>

<details>
  <summary> deviceshifu-camera-service.yaml </summary>

```yml

```
</details>

<details>
  <summary> deviceshifu-camera-unitedDeployment.yaml </summary>

```yml

```
</details>

<details>
  <summary> deviceshifu-camera-configmap.yaml </summary>

```yml

```
</details>

将这四个文件放到一个目录，如下： 

```
camera-unitedDeployment/ 
├── camera-edgedevice.yaml 
├── deviceshifu-camera-configmap.yaml 
├── deviceshifu-camera-service.yaml 
└── deviceshifu-camera-unitedDeployment.yaml
```

接下来部署

```
kubectl apply -f camera-unitedDeployment/
```

<img src="/blog-220617/16.png" width="100%" />

通过“kubectl get ud”查看UnitedDeployment状态：

<img src="/blog-220617/17.png" width="100%" />

通过“kubectl get pods -owide”来确认Pod部署在了“beijing” NodePool里的edge服务器中：

<img src="/blog-220617/18.png" width="100%" />

我们可以在集群中通过“kubectl get edgedevices -n devices”查看Shifu的虚拟设备：

<img src="/blog-220617/19.png" width="100%" />

再通过“kubectl describe edgedevices -n devices” 查看设备的详细信息如配置，状态等：

<img src="/blog-220617/20.png" width="100%" />

至此，摄像头孪生部署完毕。


## 最后一步：运行效果

接下来我们来控制摄像头，这里使用一个nginx的pod来代表应用：

```
kubectl run nginx --image=nginx
```

待nginx开始运行时，通过“kubectl exec -it nginx -- bash”来进入nginx的命令行：

<img src="/blog-220617/21.png" width="100%" />


通过以下命令可以直接控制摄像头：

curl deviceshifu-hikvision-camera/move/{up/down/left/right}

<img src="/blog-220617/22.gif" width="100%" />

如果我们想查看摄像头当前拍摄以及当前视频流，需要将摄像头的service通过“kubectl port-forward service/deviceshifu-hikvision-camera 30080:80 --address='0.0.0.0'” 代理到本地。

在浏览器中输入服务器的IP加端口号，可以直接查看图像/视频流：

```
<SERVER_IP>:30080/capture
<SERVER_IP>:30080/stream
```

<img src="/blog-220617/23.gif" width="100%" />

## 总结

在此篇文章中，我们讲述了如何将Shifu部署在OpenYurt集群中来增加RTSP摄像头的支持。

在将来的文章中，我们也会尝试将Shifu与OpenYurt的yurt device controller进行整合，通过OpenYurt原生的方式延申OpenYurt的能力到更多物联网设备的管理中。
https://openyurt.io/zh/docs/core-concepts/yurt-device-controller
