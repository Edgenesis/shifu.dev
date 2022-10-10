# 使用Shifu在OpenYurt集群中接入RTSP协议摄像头

`OpenYurt` 是一个云边计端算平台，借助 `OpenYurt` 的能力，可以将现有的 `Kubernetes` 集群转换成 `OpenYurt` 集群，并将 `Kubernetes` 的能力延伸到边缘侧。 `OpenYurt` 为云边端协同开发提供了多样化的功能，如打通云边通信的 `YurtTunnel`，为了方便管理节点单元应用部署/运维的 `Yurt-App-Manager` 以及提供了边缘自治的 `YurtHub`。 

开发者可以专注于云边端产品上的应用开发而不用担心底层架构的运维。***Shifu*** 作为 `Kubernetes` 原生的开源物联网开发架构，可以兼容各种物联网设备的协议并将其抽象成一个为微服务软件对象。二者的能力有非常好的互补性。尤其是在 `OpenYurt` 中加入了 `YurtDeviceController` 以后，***Shifu*** 可以用 `OpenYurt` 原生的方式来将设备进行抽象，大大提高物联网开发者的开发效率。 

使用 `OpenYurt` 和 ***Shifu*** 以后，我们可以将原本复杂的 `IoT`，云边协同开发转化为简单的Web式开发。 

## 简介

本文是一个在 `OpenYurt` 集群中使用 ***Shifu*** 接入 `RTSP` 协议摄像头的指南，其中包含 ***Shifu***, `Docker`, `Linux`, `Kubernetes`, `OpenYurt` 的基本操作，任何开发者都可以阅读本文来学习 ***Shifu*** 的开发方法。

本文中的 ***Shifu*** 架构如下：

<img src="/blog-220617/1.png" width="100%" />

北向通过 `deviceshifu-http-http` 向上开放 `HTTP API` 接口，南向通过 `rtsp-driver` 来和实际设备交互。

## 目标

1. 在Server端和Edge端通过 `yurtctl` 部署 `OpenYurt`, 并将Edge端加入Server端的集群 
2. 在Edge端部署网络摄像头的数字孪生 
3. 实现通过HTTP对网络摄像头的远程自动化管控 

## 所需设备

1. 两台运行 `Linux` 的虚拟机，Server和Edge的配置分别为4核16G内存和2核8G内存 
2. 一个 `RTSP` 协议的网络摄像头，本文中用到的摄像头型号为海康威视的  `DS-2DE3Q140CN-W`

## 软件环境

- `CentOS` 7.9.2009 
- `Go` v1.17.1 
- `yurtctl` v0.6.1 
- `kubectl`: v1.19.8 (installed by `yurtctl`) 

## 第一步 安装并部署OpenYurt集群

> 本文参考了 [`OpenYurt` 的官方教程](https://openyurt.io/docs/v0.6.0/installation/yurtctl-init-join)

首先让我们来下载 `OpenYurt`，从官方的GitHub直接克隆项目：

```
git clone https://github.com/openyurtio/openyurt.git
```

接着让我们下载v0.6.1版本的 `yurtctl`:

```
curl -LO https://github.com/openyurtio/openyurt/releases/download/v0.6.1/yurtctl 
chmod +x yurtctl
```

### Server端的部署

在Server端创建 `OpenYurt` 集群:

```
./yurtctl init --apiserver-advertise-address <SERVER_IP> --openyurt-version latest --passwd 123 
```

看见如下信息即表示集群创建完成，这里的 `--token` 要记录一下用来将Edge节点加入到集群中 

<img src="/blog-220617/2.png" width="100%" />

接下来看一下各个 `Pod` 的运行状况，通过 `kubectl get pods -A`: 

<img src="/blog-220617/3.png" width="100%" />

#### 遇到的几个问题

如果在 `kubectl logs yurt-hub-server -n kube-system` 里遇到:

<img src="/blog-220617/4.png" width="100%" />

请尝试 `kubectl apply -f config/setup/yurt-controller-manager.yaml` （方法来自 https://github.com/openyurtio/openyurt/issues/872#issuecomment-1148167419  ）

除此之外，还有几个问题，如在 `kubectl logs yurt-hub-server -n kube-system` 里遇到如下输出：

<img src="/blog-220617/5.png" width="100%" />

请尝试 `kubectl apply -f config/setup/ yurthub-cfg.yaml`

<img src="/blog-220617/6.png" width="100%" />

如果在 `yurt-tunnel-server` 和 `yurt-tunnel-agent` 也遇到了类似的log，通过以下命令来修复 `yurt-tunnel` 的 `RBAC` 问题： 

```
kubectl apply -f config/setup/yurt-tunnel-agent.yaml 
kubectl apply -f config/setup/yurt-tunnel-server.yaml
```

`untaint` master节点来运行 ***Shifu*** 的 `controller`： 

```
kubectl taint nodes server node-role.kubernetes.io/master-
```

<img src="/blog-220617/7.png" width="100%" />

至此，Server端部署完毕。 

### Edge 端的部署

首先利用刚才Server端初始化得到的 `token`，执行： 

```
./yurtctl join <MASTER_IP>:6443 --token <MASTER_INIT_TOKEN>  --node-type=edge --discovery-token-unsafe-skip-ca-verification --v=5 
```

<img src="/blog-220617/8.png" width="100%" />

确认Node状态，通过 `kubectl get nodes`：

<img src="/blog-220617/9.png" width="100%" />

至此，一个Server端+一个Edge端的集群建立完毕。

## 第二步 在集群中部署Shifu

接下来让我们把 ***Shifu*** 部署到 `OpenYurt` 集群中 

在Server端，克隆 `Shifu` 项目到本地： 

```
git clone https://github.com/Edgenesis/shifu.git 
cd shifu/
```

接下来，安装 `Shifu`：

```
kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

<img src="/blog-220617/10.png" width="100%" />

通过 `kubectl get pods -A` 检查Pod状态： 

<img src="/blog-220617/11.png" width="100%" />

看到 `shifu-crd-system` namespace中的Pod运行即可。

至此，***Shifu*** 安装完毕。

## 第三步 部署摄像头的数字孪生deviceShifu

***OpenYurt*** 提供了非常方便的节点池(`NodePool`)功能，可以让我们管理节点集群，对集群进行部署。 

创建 `beijing` 节点池： 

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

接着将Edge服务器 `label` 到 `beijing` 的 `NodePool`：

```
kubectl label node $EDGE_NODE apps.openyurt.io/desired-nodepool=beijing
```

<img src="/blog-220617/13.png" width="100%" />

查看一下 `NodePool` 的状况，应该有一个 `READYNODES`： 

```
kubectl get nodepool
```

<img src="/blog-220617/14.png" width="100%" />

因为物联网的边缘节点通常是分布式在同一场景内的，这里可以使用 `OpenYurt` 的`UnitedDeployment` 功能根据 `NodePool` 来自动部署 。

安装 `Yurt-app-manager`:

```
git clone https://github.com/openyurtio/yurt-app-manager.git
cd yurt-app-manager
kubectl apply -f config/setup/all_in_one.yaml
```

<img src="/blog-220617/15.png" width="100%" />

使用 `UnitedDeployment` 来部署虚拟的海康摄像头，YAML文件如下：

<details>
  <summary> deviceshifu-camera-unitedDeployment.yaml </summary>

```yml
apiVersion: apps.openyurt.io/v1alpha1
kind: UnitedDeployment
metadata:
labels:
  controller-tools.k8s.io: "1.0"
name: deviceshifu-hikvision-camera-deployment
spec:
selector:
  matchLabels:
    app: deviceshifu-hikvision-camera-deployment
workloadTemplate:
  deploymentTemplate:
    metadata:
      labels:
        app: deviceshifu-hikvision-camera-deployment
      name: deviceshifu-hikvision-camera-deployment
      namespace: default
    spec:
      selector:
        matchLabels:
          app: deviceshifu-hikvision-camera-deployment
      template:
        metadata:
          labels:
            app: deviceshifu-hikvision-camera-deployment
        spec:
          containers:
          - image: edgehub/deviceshifu-http-http:v0.0.1
            name: deviceshifu-http
            ports:
            - containerPort: 8080
            volumeMounts:
            - name: deviceshifu-config
              mountPath: "/etc/edgedevice/config"
              readOnly: true
            env:
            - name: EDGEDEVICE_NAME
              value: "deviceshifu-hikvision-camera"
            - name: EDGEDEVICE_NAMESPACE
              value: "devices"
          - image: edgenesis/camera-python:v0.0.1
            name: camera-python
            ports:
            - containerPort: 11112
            volumeMounts:
            - name: deviceshifu-config
              mountPath: "/etc/edgedevice/config"
              readOnly: true
            env:
            - name: EDGEDEVICE_NAME
              value: "deviceshifu-hikvision-camera"
            - name: EDGEDEVICE_NAMESPACE
              value: "devices"
            - name: IP_CAMERA_ADDRESS
              value: "<CAMERA_IP>"
            - name: IP_CAMERA_USERNAME
              value: "<CAMERA_USERNAME>"
            - name: IP_CAMERA_PASSWORD
              value: "<CAMERA_PASSWORD>"
            - name: IP_CAMERA_CONTAINER_PORT
              value: "11112"
            - name: PYTHONUNBUFFERED
              value: "1"
          volumes:
          - name: deviceshifu-config
            configMap:
              name: deviceshifu-hikvision-camera-configmap-0.0.1
          serviceAccountName: edgedevice-sa
topology:
  pools:
  - name: beijing
    nodeSelectorTerm:
      matchExpressions:
      - key: apps.openyurt.io/nodepool
        operator: In
        values:
        - beijing
    replicas: 1
revisionHistoryLimit: 5
```
</details>

<details>
  <summary> deviceshifu-camera-service.yaml </summary>

```yml
apiVersion: v1
kind: Service
metadata:
labels:
  app: deviceshifu-hikvision-camera-deployment
name: deviceshifu-hikvision-camera
namespace: default
spec:
ports:
- port: 80
  protocol: TCP
  targetPort: 8080
selector:
  app: deviceshifu-hikvision-camera-deployment
type: LoadBalancer
```
</details>

<details>
  <summary> deviceshifu-camera-unitedDeployment.yaml </summary>

```yml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: EdgeDevice
metadata:
name: deviceshifu-hikvision-camera
namespace: devices
spec:
sku: "HikVision Camera"
connection: Ethernet
address: 0.0.0.0:11112
protocol: HTTP
```
</details>

<details>
  <summary> deviceshifu-camera-configmap.yaml </summary>

```yml
apiVersion: v1
kind: ConfigMap
metadata:
name: deviceshifu-hikvision-camera-configmap-0.0.1
namespace: default
data:
driverProperties: |
  driverSku: HikVision
  driverImage: edgenesis/camera-python:v0.0.1
instructions: |
  capture:
  info:
  stream:
  move/up:
  move/down:
  move/left:
  move/right:
telemetries: |
  device_health:
    properties:
      instruction: info
      initialDelayMs: 1000
      intervalMs: 1000
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

接下来部署:

```
kubectl apply -f camera-unitedDeployment/
```

<img src="/blog-220617/16.png" width="100%" />

通过 `kubectl get ud` 查看 `UnitedDeployment` 状态：

<img src="/blog-220617/17.png" width="100%" />

通过 `kubectl get pods -owide` 来确认 `Pod` 部署在了 `beijing` `NodePool` 里的Edge服务器中：

<img src="/blog-220617/18.png" width="100%" />

我们可以在集群中通过 `kubectl get edgedevices -n devices` 查看 ***Shifu*** 的虚拟设备：

<img src="/blog-220617/19.png" width="100%" />

再通过 `kubectl describe edgedevices -n devices` 查看设备的详细信息如配置，状态等：

<img src="/blog-220617/20.png" width="100%" />

至此，摄像头孪生部署完毕。

## 运行效果

接下来我们来控制摄像头，这里使用一个 `nginx` 的 `Pod` 来代表应用：

```
kubectl run nginx --image=nginx
```

待 `nginx` 开始运行时，通过 `kubectl exec -it nginx -- bash` 来进入 `nginx` 的命令行：

<img src="/blog-220617/21.png" width="100%" />

通过以下命令可以直接控制摄像头：

```
curl deviceshifu-hikvision-camera/move/{up/down/left/right}
```

<img src="/blog-220617/22.gif" width="100%" />

如果我们想查看摄像头当前拍摄以及当前视频流，需要将摄像头的service通过 `kubectl port-forward service/deviceshifu-hikvision-camera 30080:80 --address='0.0.0.0'` 代理到本地。

在浏览器中输入服务器的IP加端口号，可以直接查看图像/视频流：

```
<SERVER_IP>:30080/capture
<SERVER_IP>:30080/stream
```

<img src="/blog-220617/23.gif" width="100%" />

## 总结

在此篇文章中，我们讲述了如何将 ***Shifu*** 部署在 `OpenYurt` 集群中来增加 `RTSP` 摄像头的支持。

在将来的文章中，我们也会尝试将 ***Shifu*** 与 `OpenYurt` 的 [YurtDeviceController](https://openyurt.io/zh/docs/core-concepts/yurt-device-controller) 进行整合，通过 `OpenYurt` 原生的方式延申 `OpenYurt` 的能力到更多物联网设备的管理中。
