---
title: Download and Install
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Download and Install

## Install Docker Desktop

To try out ***Shifu*** on your personal computer, you need to install `Docker Desktop` first.

:::info
***Shifu*** uses `Docker`'s virtualized container technology to convert each physical device (***edgeDevice***) to a digital twin (***deviceShifu***).
:::

Select your OS to check the corresponding method to install `Docker Desktop`:

<Tabs groupId="operating-systems">
<TabItem value="win" label="Windows(WSL)">

**0. Install WSL**

:::tip
- If you have a `Linux virtual machine` and want to try ***Shifu*** in it, switch to `Linux` by clicking the button above.
:::

It is required that the version of your Windows is higher than `Windows 10` (version 2004 or higher) or `Windows 11`.

You need to open `PowerShell` or `Windows CMD` to enter the following command. Then you need to restart the computer to install the WSL.

```
wsl --install
```

If problems occurs, please refer to [the official documentation of WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install).

**1. Install Docker Desktop**

[Click here to download Docker Desktop](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

**2. Open Docker Desktop, and keep it running**

**3. Confirm Docker is running**

Please open `Ubuntu` or other `Linux distribution` you have installed in the start menu and execute the following command:

```bash
sudo docker ps
```

:::note
You may need to enter the administrator password, the password will not be displayed on the screen when you enter the password, just hit enter when you are finished.
:::

</TabItem>
<TabItem value="mac" label="macOS">

**1. Install Docker Desktop**

| Chip | Installer |
|--|--|
| `M1/M2` | [Click here to download installer](https://desktop.docker.com/mac/main/arm64/Docker.dmg) |
| `Intel` | [Click here to download installer](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |

**2. Open Docker Desktop, and keep it running**

**3. Confirm Docker is running**

Please open Terminal and execute the following command:

```bash
sudo docker ps
```

</TabItem>
<TabItem value="linux" label="Linux">

**1. Install Docker Desktop**

[Click here to install Docker Desktop on Linux](https://docs.docker.com/desktop/install/linux-install/)

**2. Open Docker Desktop, and keep it running**

**3. Confirm Docker is running**

Please open Terminal and execute the following command:

```bash
sudo docker ps
```

</TabItem>
</Tabs>

If `Docker` runs successfully, you will get the following output:

![](images/docker_run.png)

If the output is `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`, `Docker Desktop` is not started; if the output is `command not found`, `Docker Desktop` is not installed.

## Install ***Shifu***

Please visit [**demo.shifu.run**](https://demo.shifu.run) to download ***Shifu*** installer and install ***Shifu***.

Skip to the second step of the page and after completing its process, return to this page.

After installation is done, ***Shifu*** will be launched with `Docker` runtime.

:::info
The ***Shifu*** installer contains:

- `kind` to create a cluster on your computer
- all images needed when running ***Shifu***
- installing scripts of ***Shifu***

You don't need to know about the details of ***Shifu***. By using ***Shifu*** installer, you can try ***Shifu*** easily.

If you want to manually create the cluster, import images, and install ***Shifu***, please check [Development Installation](guides/install-shifu-dev.md)
:::

### Confirm ***Shifu*** is running

Use the following command to view the results:

```bash
sudo kubectl get pods -A
```

![Shifu Finished pods](images/shifuFinishPods.png)

If all "STATUS" is `Running`, ***Shifu*** is started:

:::info
The command `kubectl get pods -A` can view all running `Pod`s in the cluster. (You can see a `Pod` as an application or a process.)

We find that under the NAMESPACE `shifu-crd-system`, the controller ***shifuController*** is running now; under the NAMESPACE `deviceshifu`, the digital twin of the AVG device, ***deviceShifu***, is already running.
:::

![](./images-cluster/cluster-1-en.png)

## Next Step

Congratulations you have installed ***Shifu*** on your computer! Next you can go to [Try it Out](./demo-try.md).
