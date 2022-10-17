---
title: Local Installation Test
sidebar_position: 1
---

# Local Installation Test

In a production environment ***Shifu*** can be deployed directly in a K8s cluster.

Production deployment of ***Shifu*** is very easy, but for testing, we need to do some debugging work locally on the access device. This is where we need to test install ***Shifu*** locally and you need to create clusters locally, some tools like `kind` can help us to create such clusters on our own computers.

:::note
This article serves the same purpose as [Quick Start](/docs/tutorials/), except that it breaks down the contents of the ***Shifu*** installer and creates a cluster locally using the command line step by step. This approach helps you understand the components used in the operation of ***Shifu***.
:::

## Installing Docker Desktop

:::info
`Docker Desktop` can install `Docker` on desktop operating systems (`Windows` / `macOS` / `Ubuntu for Desktop`, etc.) and provides a visual interface for management.

***Shifu*** uses `Docker` to turn every actual physical device (***edgeDevice***) into a digital twin (***deviceShifu***), the role of `Docker` is mainly virtualization and isolation.
:::

Please [check the Docker official website to install `Docker Desktop` on your own computer](https://www.docker.com).

### Make sure Docker Desktop is installed and started

Use the following command to make sure that `Docker Desktop` is installed and started, and the following output will indicate success.

```bash
$ sudo docker ps
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

If the output is `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`, then `Docker Desktop` is not started; if the output is `command not found`, then `Docker Desktop` is not installed.

## Install kubectl

:::info
`kubectl` is a command line tool for `Kubernetes` that helps you execute commands in a `Kubernetes cluster`. You can use `kubectl` to deploy applications, view and manage cluster resources, and view logs.
:::

Please [check the K8s website for the content to install kubectl](https://kubernetes.io/docs/tasks/tools/).

Confirm that `kubectl` is installed.

```bash
$ kubectl version --client --output=yaml
clientVersion:
  buildDate: "2022-08-23T17:44:59Z"
  compiler: gc
  ......
```

## Install kind

:::info
`kind` allows us to create a `Kubernetes cluster` locally for testing.
:::

If `Go` is already installed, you can install it with the following command.

```bash
$ go install sigs.k8s.io/kind@v0.14.0
```

If `Go` is not installed, you can [check the official documentation of `kind` to choose the installation method](https://kind.sigs.k8s.io/docs/user/quick-start#installation).

Confirm that `kind` is installed.

```bash
$ kind --version
kind version 0.14.0
```

## Create a Cluster

We use `kind` to create the cluster.

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
The K8s cluster used for local testing will have K8s-related management content, ***Shifu*** controllers, etc. installed; the digital twin of the device will be created in it when the device is plugged in later.
:::

### Note: Make sure the cluster is created

```bash
$ sudo kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:52138
CoreDNS is running at https://127.0.0.1:52138/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
$ sudo kind get clusters
kind
```

### Note: Re-Create

In case of problems, you can delete the cluster and recreate it.

```bash
$ sudo kind delete cluster
Deleting cluster "kind" ...
$ sudo kind create cluster --image="kindest/node:v1.24.0"
```

## Install ***Shifu***

The installation of ***Shifu*** is very easy, `pkg/k8s/crd/install/shifu_install.yml` is the installation script, and can be installed with one click:

```bash
# clone Shifu repository
git clone https://github.com/Edgenesis/shifu.git
cd shifu
# Install Shifu in the cluster
sudo kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

:::tip About User Metrics in Shifu
To learn more about user metrics we collect and how to disable it, please check [User Metrics in ***Shifu***](../more/user-metrics.md).
:::

### Note: Download the Image in Advance

The mirrors used in `k8s/crd/install/shifu_install.yml` are `quay.io/brancz/kube-rbac-proxy:v0.12.0` and `edgehub/shifu-controller:latest`, so if you have problems downloading them, you can go ahead and Download the image to the local machine and import it into the cluster: ``bash

```bash
sudo docker pull quay.io/brancz/kube-rbac-proxy:v0.12.0
sudo kind load docker-image quay.io/brancz/kube-rbac-proxy:v0.12.0

sudo docker pull edgehub/shifu-controller:latest
sudo kind load docker-image edgehub/shifu-controller:latest
```

:::note
This method will take up local storage. You can use the command `sudo docker rmi <image_id>` to delete the local image when you are done using it.
:::

## Next Step

Congratulations! You have opened a cluster on your machine and installed ***Shifu*** in that cluster. Next you can try [access devices](./cases/) in the cluster now!
