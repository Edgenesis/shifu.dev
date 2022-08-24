---
title: 本地kind测试
sidebar_position: 3
---

# 本地kind测试

## 安装必要工具

### 确认 Docker Desktop 已安装且启动

使用下面的命令来确定 `Docker Desktop` 已安装且启动：

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

如果输出为 `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`，则说明 `Docker Desktop` 未启动；如果输出为 `command not found`，则说明 `Docker Desktop` 未安装。请查看 [安装 Docker](./install-docker.md)。

### 安装 kubectl

[安装 kubectl](https://kubernetes.io/docs/tasks/tools/)

> `kubectl` 是 `Kubernetes` 的命令行工具，帮助你在 `Kubernetes集群` 中执行命令。你可以用 `kubectl` 来部署应用、查看和管理集群资源、查看日志。

（TOOD 把这段移到英文版）

> The `Kubernetes` command-line tool, `kubectl`, allows you to run commands against Kubernetes clusters. You can use `kubectl` to deploy applications, inspect and manage cluster resources, and view logs.

确认 `kubectl` 已安装：

```bash
$ kubectl version --client --output=yaml
```

### 安装kind

(TODO 下面这段移动到英文版)

> `kind` lets you run Kubernetes on your local computer.

> `kind` 可以让我们在本机创建 `Kubernetes集群` 用于测试。

如果已经安装了 `Go`，可以使用下面的命令安装：

```bash
$ go install sigs.k8s.io/kind@v0.14.0
```

如果未安装 `Go`，可以查看 `kind` 的官方文档来[选择安装方式](https://kind.sigs.k8s.io/docs/user/quick-start#installation)。

确认 `kind` 已安装：

```bash
$ kind --version
kind version 0.14.0
```

## 创建集群并安装 ***Shifu***

### 创建集群

我们使用 `kind` 来创建集群：

```bash
$ sudo docker pull kindest/node:v1.24.0
$ sudo kind create cluster --image="kindest/node:v1.24.0"
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.24.0) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
```

#### 注：确认集群已创建

```bash
$ sudo kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:52138
CoreDNS is running at https://127.0.0.1:52138/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
$ sudo kind get clusters
kind
```

#### 注：重新创建

如出现问题，可删除集群并重新创建：

```bash
$ sudo kind delete cluster
Deleting cluster "kind" ...
$ sudo kind create cluster --image="kindest/node:v1.24.0"
```

### 安装 ***Shifu***

***Shifu*** 的安装非常方便，`k8s/crd/install/shifu_install.yml`为安装脚本，一键安装即可：

```bash
# clone shifu仓库 并在集群中安装shifu
git clone https://github.com/Edgenesis/shifu.git
cd shifu
sudo kubectl apply -f k8s/crd/install/shifu_install.yml
```

#### 注：提前下载镜像

`k8s/crd/install/shifu_install.yml` 中使用到的镜像有 `quay.io/brancz/kube-rbac-proxy:v0.12.0` 和 `edgehub/shifu-controller:v0.0.5`，如果下载出问题，可以提前下载镜像到本机并导入集群：

```bash
sudo docker pull quay.io/brancz/kube-rbac-proxy:v0.12.0
sudo kind load docker-image quay.io/brancz/kube-rbac-proxy:v0.12.0

sudo docker pull edgehub/shifu-controller:v0.0.5
sudo kind load docker-image edgehub/shifu-controller:v0.0.5
```

注：这种方法会占用本机存储。使用完毕后可以用命令`sudo docker rmi <image_id>`来删除本机镜像。


## 试用 ***Shifu***

我们准备了五个虚拟设备(`AGV`，`温度计`，`酶标仪`，`PLC`，`机械臂`）以供您进行试玩，体验 ***Shifu*** 的能力。

### 启动nginx实例

我们启动一个 `nginx实例` 来模拟应用程序与 ***Shifu*** 之间的交互：

```bash
sudo kubectl run --image=nginx:1.21 nginx
sudo kubectl get pods -A | grep nginx
```

可以看到 `nginx` 已经在运行：

![nginx pod running](images/nginxPodStatus.png)

### 1. 与AGV的数字孪生交互

<details>
  <summary> 点此查看AGV细节 </summary>
  Q：什么是AGV? <br/>
  A：AGV是一种自动导引运输车，具体介绍请点击<a href="https://baike.baidu.com/item/自动导引运输车/15535355">这里</a>。<br/>
  Q：这个试玩中如何模拟AGV? <br/>
  A：当模拟AGV接收到get_position命令时会生成并返回设备当前位置的x、y轴坐标。
</details>

#### 启动AGV虚拟设备

首先，我们创建一个AGV的数字孪生：

```bash
cd shifu
sudo kubectl apply -f deviceshifu/examples/demo_device/demo_device/edgedevice-agv
```

我们可以看到AGV已经正常启动：

```bash
sudo kubectl get pods -A | grep agv
```

![deviceshifu-agv_start.png](images/deviceshifu-agv_start.png)

#### 与AGV虚拟设备交互

首先，我们进入nginx：

```bash
sudo kubectl exec -it nginx -- bash
```

接着，我们可以与AGV的数字孪生通过 `http://deviceshifu-agv.deviceshifu.svc.cluster.local` 进行交互，得到AGV的当前 `x`, `y` 坐标：

```bash
curl http://deviceshifu-agv.deviceshifu.svc.cluster.local/get_position; echo
```

![deviceshifu-agv output](images/deviceshifu-agv_output.png)

### 2. 与温度计的数字孪生交互

<details>
  <summary> 点此查看温度计细节 </summary>
  Q：在这个试玩中如何模拟温度计?<br/>
  A：当模拟温度计接收到read_value命令时会生成并返回当前温度计的读数。
</details>

#### 启动温度计虚拟设备

首先，我们创建一个温度计的数字孪生：

```bash
cd shifu
sudo kubectl apply -f deviceshifu/examples/demo_device/demo_device/edgedevice-thermometer
```

我们可以看到温度计已经正常启动：

```bash
sudo kubectl get pods -A | grep thermometer
```

![deviceshifu-thermometer pod_start.png](images/deviceshifu-thermometer_pod_start.png)

#### 与温度计虚拟设备交互

接下来我们可以进入nginx来测试温度计：

```bash
sudo kubectl exec -it nginx -- bash
```

然后，我们可以与温度计的数字孪生通过 `http://deviceshifu-thermometer.deviceshifu.svc.cluster.local` 进行交互，得到温度计的测量温度（以下结果随机）：

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/read_value; echo
```

![deviceshifu-thermometer output](images/deviceshifu-thermometer-output.png)

最后，我们可以通过 `get_status` 命令得到温度计当前运行状态（以下结果随机）：

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Running](images/Running.png)

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Error](images/Error.png)

### 3. 与酶标仪的数字孪生交互

<details>
  <summary> 点此查看酶标仪细节 </summary>
  Q：什么是酶标仪? <br/>
  A：酶标仪是一种实验室设备，具体介绍请点击<a href="https://baike.baidu.com/item/%E9%85%B6%E6%A0%87%E4%BB%AA">这里</a>。<br/>
  Q：在这个试玩中如何模拟酶标仪? <br/>
  A：当模拟酶标仪接收到命令get_measurement会返回8*12的矩阵，其中的每一个数字代表一个样本中光谱分析扫描的结果数值。
</details>

#### 启动酶标仪虚拟设备

首先，我们启动酶标仪的数字孪生：

```bash
cd shifu
sudo kubectl apply -f deviceshifu/examples/demo_device/demo_device/edgedevice-plate-reader
```

我们可以看到酶标仪的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep plate
```
![deviceshifu-plate_pods_start.png](images/deviceshifu-plate-reader_pod_start.png)

#### 与酶标仪虚拟设备交互

接着，我们进入nginx：

```bash
sudo kubectl exec -it nginx -- bash
```

最后，我们可以和酶标仪的数字孪生通过 `http://deviceshifu-plate-reader.deviceshifu.svc.cluster.local` 进行交互，得到酶标仪的测量结果：

```bash
curl "deviceshifu-plate-reader.deviceshifu.svc.cluster.local/get_measurement"
```

![deviceshifu-plate-reader_output](images/deviceshifu-plate-reader_output.png)

### 4. 与PLC的数字孪生交互

<details>
  <summary> 点此查看PLC细节 </summary>
  Q：什么是PLC? <br/>
  A：PLC是一种非常普遍的工业控制器，具体介绍请点击<a href="https://baike.baidu.com/item/%E5%8F%AF%E7%BC%96%E7%A8%8B%E9%80%BB%E8%BE%91%E6%8E%A7%E5%88%B6%E5%99%A8/84414?fromtitle=PLC&fromid=275974">这里</a>。<br/>
  Q：在这个试玩中如何模拟PLC? <br/>
  A：当模拟PLC接收到 sendsinglebit 命令可以修改内存区域中一个bit，接收到 getcontent 命令可以得到内存区域中一个byte的值。
</details>

#### 启动PLC虚拟设备

首先，我们启动PLC的数字孪生：

```bash
cd shifu
sudo kubectl apply -f deviceshifu/examples/demo_device/demo_device/edgedevice-plc
```

通过如下指令，可以看到PLC设备的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep plc
```

![deviceshifu-plc_pods_start](images/deviceshifu-plc_pods_start.png)

#### 与PLC虚拟设备交互

接着，我们需要进入nginx：

```bash
sudo kubectl exec -it nginx -- bash
```

最后，我们可以与PLC的数字孪生通过 `http://deviceshifu-plc.deviceshifu.svc.cluster.local` 进行交互，将PLC `Q0内存` 的第0位设置成 `1`：

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=1"; echo
```

![deviceshifu-plc_output1.png](images/deviceshifu-plc_output1.png)

`digit` 表示PLC内存的第几个比特，`value` 表示当前比特的值，通过修改 `digit` 与 `value` 的数值可以更改对应内存空间比特的值。例如一个PLC的 `Q0内存` 的第四位值代表控制程序，设定 `digit=3` 与 `value=1` 就可以开启程序：

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=3&value=1"; echo
```

![deviceshifu-plc_output2.png](images/deviceshifu-plc_output2.png)

### 5. 与机械臂的数字孪生交互

<details>
  <summary> 点此查看机械臂细节 </summary>
  Q：什么是机械臂? <br/>
  A：机械臂是一种非常普遍的工业控制器，具体介绍请点击<a href="https://baike.baidu.com/item/%E6%9C%BA%E6%A2%B0%E8%87%82/2178090">这里</a>。<br/>
  Q：在这个试玩中如何模拟机械臂? <br/>
  A：当模拟机械臂接收到get_coordinate命令后会返回其当前的x, y, z轴坐标。
</details>

#### 启动机械臂虚拟设备

首先，我们创建一个机械臂的数字孪生：

```bash
cd shifu
sudo kubectl apply -f deviceshifu/examples/demo_device/demo_device/edgedevice-robot-arm
```

通过如下指令，可以看到机械臂的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep robotarm
```

![deviceshifu-reboot-arm_start_pods](images/deviceshifu-reboot-arm_start_pods.png)

#### 与机械臂虚拟设备交互

接着，我们需要进入nginx：

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以与机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的坐标：

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_coordinate; echo
```

![deviceshifu-reboot-arm_result1](images/deviceshifu-reboot-arm_result1.png)

此外，我们可以与机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的运行状态（以下运行状态随机出现）:

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Idle.png](images/Idle.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Error.png](images/Error.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Running.png](images/Running.png)

## 下一步

恭喜！！！:rocket: :rocket: :rocket: 您已经完成了 ***Shifu*** 的安装和Demo试用，接下来可以自由探索了！

如果有兴趣，您可以访问 ***Shifu*** 的 [GitHub仓库](https://github.com/Edgenesis/shifu)。

### 删除集群

在上述的试用过程中，Shifu安装包 在您的电脑上创建了一个集群，并在这个集群中安装了 ***Shifu***。如果您不需要继续试用 ***Shifu***，可以执行下面的命令来删除这个集群：

```bash
sudo kind delete cluster
```
