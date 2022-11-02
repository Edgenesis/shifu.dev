# 部署遥测服务
:::caution
首先确保你已经安装了 ***shifu*** 。如果你没有安装 ***shifu*** ，请看一下[本地安装测试](../install-shifu-dev.md)
:::

## 什么是遥测服务

遥测服务是 ***Shifu*** CRD的一部分。它描述了一个服务端点，***deviceShifu*** 可以使用遥测配置向其推送数据。


## 安装遥测服务

首先，将 ***Shifu*** 的仓库克隆到本地
```bash
git clone https://github.com/Edgenesis/shifu.git
```

***Shifu***提供了一个一键式安装，你可以使用以下命令将 ***telemetryService*** 安装到你的集群。

```bash
kubectl apply -f examples/telemetryservice
```