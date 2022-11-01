---
title: 本机安装
sidebar_position: 1
---

# 本机安装

生产环境中 ***Shifu*** 可以直接部署在K8s集群中。

***Shifu*** 的生产部署非常容易，但在测试时，我们需要在本地接入设备做一些调试的工作。这时我们需要在本地测试安装 ***Shifu***，您需要在本地创建集群，一些工具如 `kind` 可以帮助我们在自己的电脑上创建这样的集群。

:::note
此篇文章的作用与 [快速上手](/docs/tutorials/) 相同，不同的是拆解了 ***Shifu*** 安装包的内容，使用命令行一步一步在本地创建集群。这种方式有助于您理解 ***Shifu*** 运作过程中使用的组件。
:::

## 安装 Docker Desktop

:::info
`Docker Desktop` 能够在桌面操作系统（`Windows` / `macOS` / `桌面版Ubuntu` 等）安装 `Docker`，并提供可视化的界面可供管理。

***Shifu*** 使用 `Docker` 将每一个实际的物理设备 (***edgeDevice***) 转为一个数字孪生设备 (***deviceShifu***)，`Docker` 所起的作用主要是虚拟化和隔离。
:::

请[查看 Docker 官网来在自己的电脑上安装 `Docker Desktop`](https://www.docker.com)。

### 确认 Docker Desktop 已安装且启动

使用下面的命令来确定 `Docker Desktop` 已安装且启动，输出如下则说明成功：

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

如果输出为 `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`，则说明 `Docker Desktop` 未启动；如果输出为 `command not found`，则说明 `Docker Desktop` 未安装。

## 安装 kubectl

:::info
`kubectl` 是 `Kubernetes` 的命令行工具，帮助你在 `Kubernetes集群` 中执行命令。你可以用 `kubectl` 来部署应用、查看和管理集群资源、查看日志。
:::

请[查看K8s官网的内容以安装 kubectl](https://kubernetes.io/docs/tasks/tools/)。

确认 `kubectl` 已安装：

```bash
$ kubectl version --client --output=yaml
clientVersion:
  buildDate: "2022-08-23T17:44:59Z"
  compiler: gc
  ......
```

## 安装kind

:::info
`kind` 可以让我们在本机创建 `Kubernetes集群` 用于测试。
:::

如果已经安装了 `Go`，可以使用下面的命令安装：

```bash
$ go install sigs.k8s.io/kind@v0.14.0
```

如果未安装 `Go`，可以[查看 `kind` 的官方文档来选择安装方式](https://kind.sigs.k8s.io/docs/user/quick-start#installation)。

确认 `kind` 已安装：

```bash
$ kind --version
kind version 0.14.0
```

## 创建集群

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

:::info
本地测试时使用的K8s集群中会安装和K8s相关的管理内容、***Shifu*** 的控制器等；之后接入设备时则会在其中创建设备的数字孪生。
:::

### 注：确认集群已创建

```bash
$ sudo kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:52138
CoreDNS is running at https://127.0.0.1:52138/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
$ sudo kind get clusters
kind
```

### 注：重新创建

如出现问题，可删除集群并重新创建：

```bash
$ sudo kind delete cluster
Deleting cluster "kind" ...
$ sudo kind create cluster --image="kindest/node:v1.24.0"
```

## 安装 ***Shifu***

***Shifu*** 的安装非常方便，`pkg/k8s/crd/install/shifu_install.yml`为安装脚本，一键安装即可：

```bash
# clone Shifu仓库
git clone https://github.com/Edgenesis/shifu.git
cd shifu
# 在集群中安装Shifu
sudo kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

:::tip 关于用户指标
要了解更多信息，包括如何禁用内置用户指标收集，请查看[***Shifu*** 中的用户指标](../more/user-metrics.md)。
:::

### 注：提前下载镜像

`k8s/crd/install/shifu_install.yml` 中使用到的镜像有 `quay.io/brancz/kube-rbac-proxy:v0.13.1` 和 `edgehub/shifu-controller:nightly`，如果下载出问题，可以提前下载镜像到本机并导入集群：

```bash
sudo docker pull quay.io/brancz/kube-rbac-proxy:v0.13.1
sudo kind load docker-image quay.io/brancz/kube-rbac-proxy:v0.13.1

sudo docker pull edgehub/shifu-controller:nightly
sudo kind load docker-image edgehub/shifu-controller:nightly
```

:::note
这种方法会占用本机存储。使用完毕后可以用命令 `sudo docker rmi <image_id>` 来删除本机镜像。
:::

## 下一步

恭喜！您已经在本机开启了一个集群，而且在该集群中安装了 ***Shifu***。接下来您可以尝试在集群中[接入设备](./cases/README.md)了！
