---
title: 安装 Docker
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 安装 Docker

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

## 下一步

恭喜，您已经完成了 `Docker Desktop` 的安装！

- 如果您不太熟悉命令行和 `Kubernetes`，我们为您提供了一键式安装的Demo，请查看 [本地Demo](./local-demo.md) 来安装和试用 ***Shifu***。
- 如果您对命令行和 `Kubernetes` 较熟悉，我们为您提供了命令行的安装方式，请查看 [本地kind测试](./local-kind.md) 来安装和试用 ***Shifu***。
