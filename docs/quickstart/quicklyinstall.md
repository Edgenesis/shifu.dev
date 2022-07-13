---
title: 极速安装
sidebar_position: 1
---

## 前置阅读

1. 所需时长：5分钟
2. 难易程度：简单

### 硬件要求

| 硬件平台 | 是否支持 |
|--|--|
| x86/64 | :white_check_mark: |
| ARM | :white_check_mark: |

### 操作系统要求

| 操作系统 | 是否支持 |
|--|--|
| Linux | :white_check_mark: |
| Mac OS | :white_check_mark: |
| Windows(WSL2) | :white_check_mark: |

## ***Shifu*** 环境准备
### 1. 下载并安装*Docker*

| 操作系统 | 安装包 |
|--|--|
| Linux | [点我查看教程](https://docs.docker.com/engine/install/#server) |
| Mac OS | [M1芯片 点我下载](https://desktop.docker.com/mac/main/arm64/Docker.dmg)<br/>[Intel芯片 点我下载](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |
| Windows (WSL2) | [点我下载](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) |

### 2. 确保*Docker*可用

a. 使用`Linux/Mac`的用户请在命令行(terminal)中执行以下命令。

b. 使用`Windows WSL2`的用户请在开始菜单中打开 `Ubuntu` 或您安装的其他Linux发行版，执行以下命令。

```bash
sudo docker ps
```

如果*Docker*运行顺利，将会得到以下输出：

```shell
ubuntu@localhost:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### 3. 下载安装*Shifu*

如果您未安装*shifu*，建议您前往我们的[demo.shifu.run](https://demo.shifu.run)进行下载安装。

### 4. 查看*Shifu*是否启动

使用以下命令来查看运行效果：

```bash
sudo kubectl get pods -A
```

如果所有 “STATUS” 都是 `Running` 即表示成功：

![Shifu Finished pods](images/shifuFinishPods.png)

### 5. 检查安装后的文件结构
安装完成以后，文件结构如下：

```bash
testdir/
|--run_dir/
   |--shifu/
      |--demo_device/
         |--edgedevice-agv
         |--edgedevice-plate-reader
         |--edgedevice-plc
         |--edgedevice-robot-arm
         |--edgedevice-thermometer
      |--examples/
      |--shifu_install.yml
   |--utils_dir/
|--shifu_demo_aio_linux_amd64.tar.gz  #aio: all in one压缩文件
|--test/
```
