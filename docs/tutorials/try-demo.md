---
title: 试用 Shifu
sidebar_position: 1
---

# 试用 ***Shifu***

:::tip
您在试用 ***Shifu*** 的过程中有任何问题，都可以 [联系我们获得支持](../resources/support.md)。
:::

***Shifu*** 安装包 中准备了五个设备(`AGV`，`温度计`，`酶标仪`，`PLC`，`机械臂`）供您进行试玩，体验 ***Shifu*** 的能力。

:::note
在安装 ***Shifu*** 安装包 时，我们创建了五个虚拟设备，并连接到您的电脑上。这五个设备与实际的物理设备是等价的。
:::

## 准备

我们需要启动一个 `nginx` 来和数字孪生设备 ***deviceShifu*** 交互，请运行下面的命令：

```bash
sudo kubectl run --image=nginx:1.21 nginx
sudo kubectl get pods -A | grep nginx
```

可以看到 `nginx` 已经在运行：

![nginx pod running](images/nginxPodStatus.png)

:::note
在实际的情况中，物联网设备的用户使用手机应用或者监控平台与数字孪生 ***deviceShifu*** 交互。这里 `nginx` 相当于一个手机应用或一个监控平台。
:::

## 1. 与AGV交互

<details>
  <summary> 点此查看AGV细节 </summary>
  Q：什么是AGV? <br/>
  A：AGV是一种自动导引运输车，具体介绍可以<a href="https://baike.baidu.com/item/自动导引运输车/15535355">查看百度百科</a>。<br/>
  Q：这个试玩中如何与AGV交互? <br/>
  A：当AGV的数字孪生接收到get_position命令时会生成并返回设备当前位置的x、y轴坐标。
</details>

### 创建数字孪生

:::note
您刚才通过 ***Shifu*** 安装包 安装了 ***Shifu***，AGV的数字孪生 ***deviceShifu*** 已自动创建，所以您无需进行手动的创建过程，可以直接和AGV的数字孪生进行交互。

数字孪生的状态会和实际设备的状态一致，与数字孪生交互相当于与实际物联网设备交互。
:::

执行下面的命令，我们可以看到AGV的数字孪生已经正常启动：

```bash
sudo kubectl get pods -A | grep agv
```

![deviceshifu-agv_start.png](images/deviceshifu-agv_start.png)

### 与数字孪生交互

我们需要先进入 `nginx`：

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以与AGV的数字孪生通过 `http://deviceshifu-agv.deviceshifu.svc.cluster.local` 进行交互，得到AGV的当前 `x`, `y` 坐标：

```bash
curl http://deviceshifu-agv.deviceshifu.svc.cluster.local/get_position; echo
```

![deviceshifu-agv output](images/deviceshifu-agv_output.png)

:::note
交互结束后按下 `ctrl D` 即可退出 `nginx`。
:::

## 2. 与温度计交互

<details>
  <summary> 点此查看温度计细节 </summary>
  Q：在这个试玩中如何与温度计交互?<br/>
  A：当温度计的数字孪生接收到read_value命令时会生成并返回当前温度计的读数。
</details>

### 创建数字孪生

首先，我们创建一个温度计的数字孪生：

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-thermometer
```

我们可以看到温度计的数字孪生已经正常启动：

```bash
sudo kubectl get pods -A | grep thermometer
```

![deviceshifu-thermometer pod_start.png](images/deviceshifu-thermometer_pod_start.png)

### 与数字孪生交互

我们需要先进入 `nginx`：

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以与温度计的数字孪生通过 `http://deviceshifu-thermometer.deviceshifu.svc.cluster.local` 进行交互，得到温度计的测量温度（以下结果随机）：

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/read_value; echo
```

![deviceshifu-thermometer output](images/deviceshifu-thermometer-output.png)

我们也可以通过 `get_status` 命令得到温度计当前运行状态（以下结果随机）：

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Running](images/Running.png)

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Error](images/Error.png)

:::note
交互结束后按下 `ctrl D` 即可退出 `nginx`。
:::

## 3. 与酶标仪交互

<details>
  <summary> 点此查看酶标仪细节 </summary>
  Q：什么是酶标仪? <br/>
  A：酶标仪是一种实验室设备，具体介绍可以<a href="https://baike.baidu.com/item/%E9%85%B6%E6%A0%87%E4%BB%AA">查看百度百科</a>。<br/>
  Q：在这个试玩中如何与酶标仪交互? <br/>
  A：当酶标仪的数字孪生接收到命令get_measurement会返回8*12的矩阵，其中的每一个数字代表一个样本中光谱分析扫描的结果数值。
</details>

### 创建数字孪生

首先，我们启动酶标仪的数字孪生：

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plate-reader
```

我们可以看到酶标仪的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep plate
```
![deviceshifu-plate_pods_start.png](images/deviceshifu-plate-reader_pod_start.png)

### 与数字孪生交互

我们需要先进入 `nginx`:

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以和酶标仪的数字孪生通过 `http://deviceshifu-plate-reader.deviceshifu.svc.cluster.local` 进行交互，得到酶标仪的测量结果：

```bash
curl "deviceshifu-plate-reader.deviceshifu.svc.cluster.local/get_measurement"
```

![deviceshifu-plate-reader_output](images/deviceshifu-plate-reader_output.png)

:::note
交互结束后按下 `ctrl D` 即可退出 `nginx`。
:::

## 4. 与PLC交互

<details>
  <summary> 点此查看PLC细节 </summary>
  Q：什么是PLC? <br/>
  A：PLC是一种非常普遍的工业控制器，具体介绍可以<a href="https://baike.baidu.com/item/%E5%8F%AF%E7%BC%96%E7%A8%8B%E9%80%BB%E8%BE%91%E6%8E%A7%E5%88%B6%E5%99%A8/84414?fromtitle=PLC&fromid=275974">查看百度百科</a>。<br/>
  Q：在这个试玩中如何与PLC交互? <br/>
  A：当PLC的数字孪生接收到 sendsinglebit 命令可以修改内存区域中一个bit，接收到 getcontent 命令可以得到内存区域中一个byte的值。
</details>

### 创建数字孪生

首先，我们启动PLC的数字孪生：

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plc
```

通过如下指令，可以看到PLC设备的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep plc
```

![deviceshifu-plc_pods_start](images/deviceshifu-plc_pods_start.png)

### 与数字孪生交互

我们需要先进入 `nginx`：

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以与PLC的数字孪生通过 `http://deviceshifu-plc.deviceshifu.svc.cluster.local` 进行交互，将PLC `Q0内存` 的第0位设置成 `1`：

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=1"; echo
```

![deviceshifu-plc_output1.png](images/deviceshifu-plc_output1.png)

`digit` 表示PLC内存的第几个比特，`value` 表示当前比特的值，通过修改 `digit` 与 `value` 的数值可以更改对应内存空间比特的值。例如一个PLC的 `Q0内存` 的第四位值代表控制程序，设定 `digit=3` 与 `value=1` 就可以开启程序：

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=3&value=1"; echo
```

![deviceshifu-plc_output2.png](images/deviceshifu-plc_output2.png)

:::note
交互结束后按下 `ctrl D` 即可退出 `nginx`。
:::

## 5. 与机械臂交互

<details>
  <summary> 点此查看机械臂细节 </summary>
  Q：什么是机械臂? <br/>
  A：机械臂是一种非常普遍的工业控制器，具体介绍可以<a href="https://baike.baidu.com/item/%E6%9C%BA%E6%A2%B0%E8%87%82/2178090">查看百度百科</a>。<br/>
  Q：在这个试玩中如何与机械臂交互? <br/>
  A：当机械臂的数字孪生接收到 get_coordinate 命令后会返回其当前的 x, y, z轴坐标。
</details>

### 创建数字孪生

首先，我们创建一个机械臂的数字孪生：

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-robot-arm
```

通过如下指令，可以看到机械臂的数字孪生已经启动：

```bash
sudo kubectl get pods -A | grep robotarm
```

![deviceshifu-reboot-arm_start_pods](images/deviceshifu-reboot-arm_start_pods.png)

### 与数字孪生交互

我们需要先进入 `nginx`：

```bash
sudo kubectl exec -it nginx -- bash
```

我们可以与机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的坐标：

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_coordinate; echo
```

![deviceshifu-reboot-arm_result1](images/deviceshifu-reboot-arm_result1.png)

我们也可以与机械臂的数字孪生通过`http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`进行交互，得到机械臂的运行状态（以下运行状态随机出现）:

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Idle.png](images/Idle.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Error.png](images/Error.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Running.png](images/Running.png)

:::note
交互结束后按下 `ctrl D` 即可退出 `nginx`。
:::

## 下一步

恭喜！！！:rocket: :rocket: :rocket: 您已经完成了 ***Shifu*** 的试用，接下来：

- 您可以查看左侧边栏中的
    - **使用指南**：更详细的 ***Shifu*** 使用教程。
    - **概念解释**：***Shifu*** 相关的架构、功能解释。
    - **实际案例**：在真实场景中使用 ***Shifu*** 的案例。
    - **参考手册**：***Shifu*** 的 API参考 和 协议支持情况。
    - **更多资源**：常见问题、获取支持等内容。
- ***Shifu*** 已经开源，如果您有兴趣，可以访问 ***Shifu*** 的 [GitHub仓库](https://github.com/Edgenesis/shifu)。
- [联系我们以获取技术支持](../resources/support.md)。

## 删除集群（可选）

在上述的试用过程中，***Shifu*** 安装包 在您的电脑上创建了一个集群，并在这个集群中安装了 ***Shifu***。如果您不希望该集群持续运行，可以执行下面的命令来删除这个集群：

```bash
sudo kind delete cluster
```

:::caution正在施工
这里需要引导用户删除不使用的镜像
:::

:::caution正在施工
这里需要引导用户删除下载的600多MB的包
:::
