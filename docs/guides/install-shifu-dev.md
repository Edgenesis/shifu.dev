---
title: Installation Testing
sidebar_position: 1
---

# Installation Testing
***Shifu*** can be deployed directly to a K8s cluster in a production environment.

***Shifu*** is very easy to deploy in production, but for testing you need to debug on the access device first.  And then you can install ***Shifu*** locally and create clusters. Some tools like kind can help you create such clusters on your computer.

Note: This section actually serves the same purpose as Quick Start, but it is a separate explanation of the ***Shifu*** installation package, i.e. creating clusters locally by using the command line step by step. This approach helps you understand the tools used by ***Shifu*** in its operation.

## Install Docker Desktop

`Docker Desktop` enables the installation of Docker on desktop operating systems (Windows / macOS / desktop Ubuntu, etc.) and provides a visual interface for management.

***Shifu*** uses Docker to turn every actual physical device (edgeDevice) into a digital twin (deviceShifu). Docker plays a major role in virtualization and isolation.

Check [Docker official site](https://www.docker.com) to install `Docker Desktop` on your own computer.

### Confirm Docker Desktop installed and running

Use the following command to confirm `Docker Desktop` installed and running. The output should be:

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

If the output is `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`, `Docker Desktop` is not started; if the output is `command not found`, `Docker Desktop` is not installed.

## Install kubectl

[Install kubectl](https://kubernetes.io/docs/tasks/tools/)

> The `Kubernetes` command-line tool, `kubectl`, allows you to run commands against Kubernetes clusters. You can use `kubectl` to deploy applications, inspect and manage cluster resources, and view logs.
:::

Confirm `kubectl` installed:

```bash
$ kubectl version --client --output=yaml
```

## Install kind

> `kind` lets you run Kubernetes on your local computer.

If `Go` is already installed on your computer, use the following command to install `kind`:

```bash
$ go install sigs.k8s.io/kind@v0.14.0
```

If `Go` is not installed, [check the official documentation of `kind`](https://kind.sigs.k8s.io/docs/user/quick-start#installation) to select an appropriate installing method.

Confirm `kind` is installed:

```bash
$ kind --version
kind version 0.14.0
```

## Create a Cluster

Use `kind` to create a cluster:

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

### Confirm the Cluster Created

```bash
$ sudo kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:52138
CoreDNS is running at https://127.0.0.1:52138/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
$ sudo kind get clusters
kind
```

### Re-create a Cluster

If any problem occurs, you can delete the cluster and create a new one:

```bash
$ sudo kind delete cluster
Deleting cluster "kind" ...
$ sudo kind create cluster --image="kindest/node:v1.24.0"
```

## Install ***Shifu***

***Shifu*** is very easy to install. Use `pkg/k8s/crd/install/shifu_install.yml` to apply ***Shifu*** by a single command:

```bash
git clone https://github.com/Edgenesis/shifu.git
cd shifu
# install Shifu in the cluster
sudo kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

### Note: Pre-download Images

`pkg/k8s/crd/install/shifu_install.yml` uses images such as `quay.io/brancz/kube-rbac-proxy:v0.12.0` and `edgehub/shifu-controller:v0.0.5`. You can pre-download these images on your computer and then import them into the cluster:

```bash
sudo docker pull quay.io/brancz/kube-rbac-proxy:v0.12.0
sudo kind load docker-image quay.io/brancz/kube-rbac-proxy:v0.12.0

sudo docker pull edgehub/shifu-controller:v0.0.5
sudo kind load docker-image edgehub/shifu-controller:v0.0.5
```

Note: This method will occupy the storage of your computer. After importing finished, use command `sudo docker rmi <image_id>` to remove useless images on your computer.
