---
title: 下载安装
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 下载安装

## 安装 Docker Desktop

在本地安装和体验 ***Shifu***，需要先安装 `Docker Desktop`。

:::info
***Shifu*** 使用容器技术 `Docker` 将每一个实际的物理设备 (***edgeDevice***) 转为一个数字孪生设备 (***deviceShifu***)。
:::

请选择您的电脑操作系统查看对应的 `Docker Desktop` 安装方式：

<Tabs groupId="operating-systems">
<TabItem value="win" label="Windows(WSL)">

**0. 安装 WSL**

:::tip
如果您在 `VMware` 中有 `Linux虚拟机`，且计划在虚拟机中体验 ***Shifu***，您可以点击上方按钮切换到 `Linux`。
:::

您的 `Windows` 需要是 `Windows 10` (版本2004及更高版本) 或 `Windows 11`。

您需要在管理员 `PowerShell` 或 `Windows命令提示符` 中输入下面的命令，然后**重启计算机**来安装运行适用于 Linux 的 Windows 子系统 (WSL) 所需的全部内容。

```
wsl --install
```

安装时遇到问题可以查看 [微软WSL官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/install)。

**1. 安装 Docker Desktop**

[点我下载 Docker Desktop 安装包](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker 运行顺利**

请在开始菜单中打开 `Ubuntu` 或您安装的其他 `Linux发行版`，执行以下命令:

```bash
sudo docker ps
```

:::note
您可能需要输入管理员密码，输入密码时屏幕不会显示密码，结束后敲击回车即可
:::

</TabItem>
<TabItem value="mac" label="macOS">

**1. 安装 Docker Desktop**

| 芯片类型 | 安装包 |
|--|--|
| `M1/M2` | [点我下载安装包](https://desktop.docker.com/mac/main/arm64/Docker.dmg) |
| `Intel` | [点我下载安装包](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker 运行顺利**

请打开终端 (Terminal) 在命令行中执行下面的命令:

```bash
sudo docker ps
```

</TabItem>
<TabItem value="linux" label="Linux">

**1. 安装 Docker Desktop**

[点我查看安装教程](https://docs.docker.com/desktop/install/linux-install/)

**2. 打开 Docker Desktop 并保持其运行**

**3. 确定 Docker 运行顺利**

请打开终端 (Terminal) 在命令行中执行下面的命令:

```bash
sudo docker ps
```

</TabItem>
</Tabs>

如果 `Docker` 运行顺利，将会得到以下输出:  

![](images/docker_run.png)

如果输出为 `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`，则说明 `Docker Desktop` 未打开；如果输出为 `command not found`，则说明 `Docker Desktop` 未安装。

## 安装 ***Shifu***

前往 [**Shifu Demo 下载**](https://shifu.run/disclaimer) 下载 ***Shifu*** 安装包并按照网站的指导安装。

直接进入页面中的第二步，完成后即可回到本页面

安装完成后 ***Shifu*** 会在 `Docker` 运行时伴随启动。

:::info
***Shifu*** 安装包 包含以下内容：

- 用于本地创建测试集群的 `kind`
- ***Shifu*** 在运作过程中需要的所有镜像
- ***Shifu*** 的安装脚本

您不需要了解 ***Shifu*** 的运作细节，通过 ***Shifu*** 安装包 即可很方便的体验 ***Shifu***。

如果您希望手动创建集群、导入镜像、安装 ***Shifu***，请查看 [本机测试安装](guides/install-shifu-dev.md)。
:::

:::tip 关于用户指标
要了解更多信息，包括如何禁用内置用户指标收集，请查看[***Shifu*** 中的用户指标](../more/user-metrics.md)。
:::

### 确认 ***Shifu*** 已启动

使用以下命令来查看运行效果：

```bash
sudo kubectl get pods -A
```

![Shifu Finished pods](images/shifuFinishPods.png)

如果所有 `STATUS` 都是 `Running` 即表示 ***Shifu*** 已成功安装启动。

:::info
`kubectl get pods -A` 命令可以查看集群中所有正在运行的 `Pod`（你可以简单将 `Pod` 理解为一个应用或者一个进程）。

可以看到 NAMESPACE `shifu-crd-system` 下，控制器 ***shifuController*** 正在运行；NAMESPACE `deviceshifu` 下，已经有一个AGV设备对应的 ***deviceShifu*** 数字孪生在运行了。
:::

![](./images-cluster/cluster-1-zh.png)

## 下一步

恭喜您已经在电脑上安装了 ***Shifu***，下一步可以 [体验 ***Shifu***](./demo-try.md) 了！
