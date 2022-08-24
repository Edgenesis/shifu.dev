---
title: 下载安装
sidebar_position: 0
---

# 下载安装

## 平台支持

***Shifu*** 支持常见的硬件平台和操作系统。

### 硬件要求

| 硬件平台 | 支持情况 |
| --- | --- |
| `x86/64` | :white_check_mark: |
| `ARM` | :white_check_mark: |

### 操作系统要求

| 操作系统 | 支持情况 |
| --- | --- |
| `Linux` | :white_check_mark: |
| `macOS` | :white_check_mark: |
| `Windows(WSL2)` | :white_check_mark: |

## 安装方式

### 本地测试

1. ***Shifu*** 基于 `Docker` 的虚拟化容器技术，在电脑上安装 ***Shifu*** 需要您先安装 `Docker Desktop`。请查看 [安装 Docker Desktop](./install-docker.md)。
2. 安装好 `Docker Desktop` 后
    - 如果您不太熟悉命令行和 `Kubernetes`，我们为您提供了一键式安装的Demo，请查看 [本地Demo](./local-demo.md) 来安装和试用 ***Shifu***。
    - 如果您对命令行和 `Kubernetes` 较熟悉，我们为您提供了命令行的安装方式，请查看 [本地kind测试](./local-kind.md) 来安装和试用 ***Shifu***。

### 生产环境部署

请查看 [生产环境安装](./production.md) 来将 ***Shifu*** 安装到您的 Kubernetes集群 中。


如果您希望在本地安装和试用 ***Shifu***，需要先安装 [Docker Desktop](https://www.docker.com)。请选择您的电脑操作系统查看对应的安装方式：

<Tabs groupId="operating-systems">
<TabItem value="win" label="Windows">

**1. 安装 Docker Desktop**

[点我下载 Docker Desktop 安装包](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker Desktop 运行顺利**

使用 `Windows WSL2` 的用户请在开始菜单中打开 `Ubuntu` 或您安装的其他 `Linux发行版`，执行以下命令:

```bash
sudo docker ps
```

</TabItem>
<TabItem value="mac" label="macOS">

**1. 安装 Docker Desktop**

| 芯片类型 | 安装包 |
|--|--|
| `M1/M2` | [点我下载安装包](https://desktop.docker.com/mac/main/arm64/Docker.dmg) |
| `Intel` | [点我下载安装包](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker Desktop 运行顺利**

请打开终端 (Terminal) 在命令行中执行下面的命令:

```bash
sudo docker ps
```

</TabItem>
<TabItem value="linux" label="Linux">

**1. 安装 Docker Desktop**

[点我查看安装教程](https://docs.docker.com/desktop/install/linux-install/)

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker Desktop 运行顺利**

请打开终端 (Terminal) 在命令行中执行下面的命令:

```bash
sudo docker ps
```

</TabItem>
</Tabs>

:::tip
您可能需要输入管理员密码，输入密码时屏幕不会显示密码，结束后敲击回车即可
:::

如果 `Docker` 运行顺利，将会得到以下输出:  

![](images/docker_run.png)


## 确认 Docker Desktop 已安装且启动

使用下面的命令来确定 `Docker Desktop` 已安装且启动：

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

如果输出为 `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`，则说明 `Docker Desktop` 未启动；如果输出为 `command not found`，则说明 `Docker Desktop` 未安装。请查看 [安装 Docker](./install-docker.md)。

## 安装 ***Shifu***

前往 [demo.shifu.run](https://demo.shifu.run) 下载 ***Shifu*** 安装包并按照网站的指导安装。

:::tip
直接进入页面中的第二步，完成后即可回到本页面
:::

安装完成后 ***Shifu*** 会在 `Docker` 运行时伴随启动。

### 确认 ***Shifu*** 已启动

使用以下命令来查看运行效果：

```bash
sudo kubectl get pods -A
```

如果所有 `STATUS` 都是 `Running` 即表示成功：

![Shifu Finished pods](images/shifuFinishPods.png)
