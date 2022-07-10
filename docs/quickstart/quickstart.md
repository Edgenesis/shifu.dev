---
sidebar_position: 1
---

# 5分钟安装

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
| WSL(Windows Subsystem for Linux) | :white_check_mark: |
| Windows | :x: |

## 软件依赖

1. [Docker](https://docs.docker.com/engine/install/)

| 操作系统 | 安装包 |
|--|--|
| Linux | [点我查看教程](https://docs.docker.com/engine/install/#server) |
| Mac OS | [M1 点我下载](https://desktop.docker.com/mac/main/arm64/Docker.dmg)<br/>[Intel 点我下载](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |
| WSL2 (Windows Subsystem for Linux) | [点我下载](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) |

**确保 *Docker* 可用**

在 `Linux/Mac` 的命令行中执行以下命令。如果使用的是 `Windows WSL2`，则在开始菜单中打开 `Ubuntu` 或您安装的Linux发行版，输入以下命令

```bash
sudo docker ps
```

如果 *Docker* 运行顺利，将会有以下输出

```shell
ubuntu@localhost:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## 急速安装！

**请前往 [https://demo.shifu.run/](https://demo.shifu.run/) 获取最新一键部署安装包以及极速安装教程!** 


### 验证安装是否成功

使用以下命令来查看运行效果：

```bash
sudo kubectl get pods -A
```

如果所有 “STATUS“ 都是 `Running` 即表示成功：

```shell
ubuntu@localhots:~/test/testdir$ sudo kubectl get pods -A
NAMESPACE            NAME                                           READY   STATUS    RESTARTS   AGE
devices              agv-5bd7c4f885-w6xpx                           1/1     Running   0          17s
deviceshifu          deviceshifu-agv-deployment-d8db6cd5d-6w78d     1/1     Running   0          15s
kube-system          coredns-6d4b75cb6d-gjzmw                       1/1     Running   0          34s
kube-system          coredns-6d4b75cb6d-rncrk                       1/1     Running   0          34s
kube-system          etcd-kind-control-plane                        1/1     Running   0          49s
kube-system          kindnet-t69bx                                  1/1     Running   0          34s
kube-system          kube-apiserver-kind-control-plane              1/1     Running   0          49s
kube-system          kube-controller-manager-kind-control-plane     1/1     Running   0          48s
kube-system          kube-proxy-7dfvm                               1/1     Running   0          34s
kube-system          kube-scheduler-kind-control-plane              1/1     Running   0          48s
local-path-storage   local-path-provisioner-9cd9bd544-6zgpv         1/1     Running   0          34s
shifu-crd-system     shifu-crd-controller-manager-94c8c779d-czvkx   2/2     Running   0          17s
```

# 5分钟试玩
安装完成以后，文件结构如下：
```
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

## 启动Nginx
我们启动一个nginx实例来模拟应用程序与shifu的交互：
```
sudo kubectl run --image=nginx:1.21 nginx
```
可以看到nginx已经在运行：
```
sudo kubectl get pods -A

NAMESPACE            NAME                                           READY   STATUS    RESTARTS   AGE
default              nginx                                          1/1     Running   0          2m40s
devices              agv-5bd7c4f885-hkx9n                           1/1     Running   0          4m42s
deviceshifu          deviceshifu-agv-deployment-d8db6cd5d-5lml6     1/1     Running   0          4m41s
kube-system          coredns-6d4b75cb6d-g7k7n                       1/1     Running   0          5m38s
kube-system          coredns-6d4b75cb6d-scq8h                       1/1     Running   0          5m38s
kube-system          etcd-kind-control-plane                        1/1     Running   0          5m54s
kube-system          kindnet-98s72                                  1/1     Running   0          5m38s
kube-system          kube-apiserver-kind-control-plane              1/1     Running   0          5m54s
kube-system          kube-controller-manager-kind-control-plane     1/1     Running   0          5m54s
kube-system          kube-proxy-vxwr4                               1/1     Running   0          5m38s
kube-system          kube-scheduler-kind-control-plane              1/1     Running   0          5m53s
local-path-storage   local-path-provisioner-9cd9bd544-9ddvk         1/1     Running   0          5m38s
shifu-crd-system     shifu-crd-controller-manager-94c8c779d-7zrkl   2/2     Running   0          4m43s
```

## 与AGV的数字孪生交互
<details>
  <summary> 点此查看AGV细节 </summary>
  Q：什么是AGV? <br/>
  A：AGV是一种自动导引运输车，具体介绍请点击<a href="https://baike.baidu.com/item/%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%BC%95%E8%BF%90%E8%BE%93%E8%BD%A6/15535355?fromtitle=AGV&fromid=5998847">这里</a>。
  
  Q：这个试玩中如何模拟AGV? 
  A：命令 get_position会返回以x, y轴为坐标的设备当前位置。
</details>
接下来我们进入nginx：

```
sudo kubectl exec -it nginx -- bash
root@nginx:/#
```

接下来我们可以和[AGV](https://baike.baidu.com/item/%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%BC%95%E8%BF%90%E8%BE%93%E8%BD%A6/15535355?fromtitle=AGV&fromid=5998847)的数字孪生通过与`http://deviceshifu-agv.deviceshifu.svc.cluster.local`交互，得到AGV的当前x, y坐标：
```
root@nginx:/# curl http://deviceshifu-agv.deviceshifu.svc.cluster.local/get_position;echo
xpos: 31, ypos: 36
```

## 与酶标仪的数字孪生交互

<details>
  <summary> 点此查看酶标仪细节 </summary>
  Q：什么是酶标仪? <br/>
  A：酶标仪是一种实验室设备，具体介绍请点击<a href="https://baike.baidu.com/item/%E9%85%B6%E6%A0%87%E4%BB%AA">这里</a>。
  
  Q：这个试玩中如何模拟酶标仪? 
  A：命令get_measurement会返回8*12的矩阵，其中的每一个数字代表一个样本中光谱分析扫描的结果数值。
</details>


接下来，我们启动酶标仪的数字孪生：
```
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plate-reader
```

我们可以看到酶标仪的数字孪生已经启动：
```
sudo kubectl get pods -A | grep plate
devices              plate-reader-5688c946b7-92dpg                          1/1     Running   0          6m3s
deviceshifu          deviceshifu-plate-reader-deployment-7cb998f6f4-2l4d6   1/1     Running   0          6m3s
```

接下来我们进入nginx：
```
sudo kubectl exec -it nginx -- bash
root@nginx:/#
```
接下来我们可以和酶标仪的数字孪生通过与`http://deviceshifu-plate-reader.deviceshifu.svc.cluster.local`交互，得到酶标仪的测量结果：
```
root@nginx:/# curl http://deviceshifu-plate-reader.deviceshifu.svc.cluster.local/get_measurement;echo
2.10 2.16 1.36 2.43 2.97 1.08 0.46 2.70 1.54 0.53 1.14 1.29
1.88 1.52 2.98 0.64 0.39 1.27 0.26 0.52 2.88 2.47 2.72 2.18
0.61 1.68 1.76 1.48 1.73 2.23 1.47 0.21 0.86 0.54 1.49 0.14
2.81 0.82 0.17 2.16 1.13 2.82 1.73 2.29 1.84 2.66 2.58 0.13
0.55 2.13 1.92 2.02 0.62 0.78 2.73 1.63 2.52 2.89 2.35 0.70
2.17 2.41 0.82 0.56 2.71 2.03 0.36 2.61 2.42 1.21 2.65 2.68
2.29 0.87 1.90 2.56 1.21 1.58 1.73 0.48 2.66 2.13 0.75 0.79
2.38 0.26 0.17 0.42 0.92 1.19 1.33 0.48 2.67 0.98 0.57 1.49
```

## 与PLC的数字孪生交互

<details>
  <summary> 点此查看PLC细节 </summary>
  Q：什么是PLC? <br/>
  A：PLC是一种非常普遍的工业控制器，具体介绍请点击<a href="https://baike.baidu.com/item/%E5%8F%AF%E7%BC%96%E7%A8%8B%E9%80%BB%E8%BE%91%E6%8E%A7%E5%88%B6%E5%99%A8/84414?fromtitle=PLC&fromid=275974">这里</a>。
  
  Q：这个试玩中如何模拟PLC? 
  A：命令sendsinglebit可以修改内存区域中一个bit，命令getcontent可以得到内存区域中一个byte的值。
</details>

接下来，我们启动PLC的数字孪生：
```
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plc
```

通过如下指令，可以看到PLC设备的数字孪生已经启动：
```
sudo kubectl get pods -A | grep plc
devices              plc-6b5c744fc-pgshq                                    1/1     Running   0             2m29s
deviceshifu          deviceshifu-plc-deployment-7f96585f7c-qbh9r            1/1     Running   0             2m29s
```

接下来我们需要进入nginx：
```
sudo kubectl exec -it nginx -- bash
root@nginx:/#
```

现在，开发者可以和PLC的数字孪生通过`http://deviceshifu-plc.deviceshifu.svc.cluster.local`进行交互，将PLC Q内存区域的第0位设置成1：
```
root@nginx:/# curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=1";echo
0b0000000000000001
```
“digit”表示plc的程序位点，“value”表示运行状态，通过修改“digit”与“value”的数值可以更改对应程序的运行状况，例如设定“digit=3”与“value=1”改变PLC初始状态：
```
root@nginx:/# curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=3&value=1";echo
0b0000000000001001
```

## 与温度计的数字孪生交互
<details>
  <summary> 点此查看温度计细节 </summary>
  Q：这个试玩中如何模拟温度计? 
  A：命令read_value会返回当前温度计的读数。
</details>

首先，我们创建一个温度计的数字孪生：
```
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-thermometer
```

我们可以看出温度计已经正常启动：
```
sudo kubectl get pods -A | grep thermometer

devices              thermometer-55997f45f7-nh96g                           1/1     Running   0          23m
deviceshifu          deviceshifu-thermometer-deployment-7b69b89b88-7p8q7    1/1     Running   0          23m
```

接下来我们可以进入nginx来测试温度计：
```
sudo kubectl exec -it nginx -- bash
root@nginx:/#
```

接下来我们可以和温度计的数字孪生通过与`http://deviceshifu-thermometer.deviceshifu.svc.cluster.local`交互，得到温度计的测量温度（以下结果随机）：
```
root@nginx:/# curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/read_value;echo
26
```

我们可以通过`get_status`得到温度计当前运行状态（以下结果随机）：
```
root@nginx:/# curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status;echo
Running
root@nginx:/# curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status;echo
Error
```

## 与机械臂的数字孪生交互
<details>
  <summary> 点此查看机械臂细节 </summary>
  Q：什么是机械臂? <br/>
  A：机械臂是一种非常普遍的工业控制器，具体介绍请点击<a href="https://baike.baidu.com/item/%E6%9C%BA%E6%A2%B0%E8%87%82/2178090">这里</a>。
  
  Q：这个试玩中如何模拟机械臂? 
  A：命令get_coordinate会返回机械臂当前的x, y, z轴坐标。
</details>

```
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-robot-arm
```

首先，我们创建一个机械臂的数字孪生：
```
sudo kubectl apply -f edgedevice-robot-arm
```

通过如下指令，可以看到机械臂的数字孪生已经启动：
```
sudo kubectl get pods -A | grep robotarm

devices              robotarm-6f67b9945d-fhqp2                          1/1     Running            0               5m
deviceshifu          deviceshifu-robotarm-deployment-7d997dcb5b-zgz7x   1/1     Running            0               5m
```

接下来我们需要进入nginx：
```
sudo kubectl exec -it nginx -- bash
root@nginx:/#
```

现在，开发者可以和机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的坐标：
```
root@nginx:/# curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_coordinate;echo
xpos: 20, ypos: 171, zpos: 107
```

此外，开发者可以和机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的运行状态（以下三种运行状态随机出现）:
```
root@nginx:/# curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status;echo
Idle

root@nginx:/# curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status;echo
Error

root@nginx:/# curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status;echo
Running
```

恭喜！！！:rocket: :rocket: :rocket: 你完成了Shifu的安装和Demo，接下来可以返回[目录](/zh/toc)，自由探索啦！
如果有兴趣，可以点击[这里](/zh/home/github)来访问我们的GitHub！
