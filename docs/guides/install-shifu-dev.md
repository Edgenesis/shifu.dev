---
title: 本机测试安装
sidebar_position: 1
---

# 本机测试安装

## 安装 Docker Desktop

请查看 [Docker 官网](https://www.docker.com) 来在自己的电脑上安装 `Docker Desktop`。

### 确认 Docker Desktop 已安装且启动

使用下面的命令来确定 `Docker Desktop` 已安装且启动，输出如下则说明成功：

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

如果输出为 `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`，则说明 `Docker Desktop` 未启动；如果输出为 `command not found`，则说明 `Docker Desktop` 未安装。

## 安装 kubectl

[安装 kubectl](https://kubernetes.io/docs/tasks/tools/)

> `kubectl` 是 `Kubernetes` 的命令行工具，帮助你在 `Kubernetes集群` 中执行命令。你可以用 `kubectl` 来部署应用、查看和管理集群资源、查看日志。

（TOOD 把这段移到英文版）

> The `Kubernetes` command-line tool, `kubectl`, allows you to run commands against Kubernetes clusters. You can use `kubectl` to deploy applications, inspect and manage cluster resources, and view logs.

确认 `kubectl` 已安装：

```bash
$ kubectl version --client --output=yaml
```

## 安装kind

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

***Shifu*** 的安装非常方便，`k8s/crd/install/shifu_install.yml`为安装脚本，一键安装即可：

```bash
# clone shifu仓库 并在集群中安装shifu
git clone https://github.com/Edgenesis/shifu.git
cd shifu
sudo kubectl apply -f k8s/crd/install/shifu_install.yml
```

### 注：提前下载镜像

`k8s/crd/install/shifu_install.yml` 中使用到的镜像有 `quay.io/brancz/kube-rbac-proxy:v0.12.0` 和 `edgehub/shifu-controller:v0.0.5`，如果下载出问题，可以提前下载镜像到本机并导入集群：

```bash
sudo docker pull quay.io/brancz/kube-rbac-proxy:v0.12.0
sudo kind load docker-image quay.io/brancz/kube-rbac-proxy:v0.12.0

sudo docker pull edgehub/shifu-controller:v0.0.5
sudo kind load docker-image edgehub/shifu-controller:v0.0.5
```

注：这种方法会占用本机存储。使用完毕后可以用命令`sudo docker rmi <image_id>`来删除本机镜像。
