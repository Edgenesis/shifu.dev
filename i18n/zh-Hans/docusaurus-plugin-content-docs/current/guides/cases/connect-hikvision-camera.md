---
title: 接入 Hikvision摄像头
sidebar_position: 4
---

# 接入Hikvision摄像头

## 获取模板

在 [examples/rtspDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu) 中查看模板文件。

## 修改配置

在 `examples/rtspDeviceShifu/camera-deployment/deviceshifu-camera-deployment.yaml` 中:

```yaml
spec:
  ...
  template:
    ...
    spec:
      containers:
      ...
      - image: edgehub/camera-python:v0.0.1
        ...
        env:
        - name: EDGEDEVICE_NAME
          value: "edgedevice-camera"
        - name: EDGEDEVICE_NAMESPACE
          value: "devices"
        - name: IP_CAMERA_ADDRESS
          value: "192.168.14.254" # 修改此值
        - name: IP_CAMERA_USERNAME
          value: "admin" # 修改此值
        - name: IP_CAMERA_PASSWORD
          value: "password" # 修改此值
        - name: IP_CAMERA_CONTAINER_PORT
          value: "11112" # 修改此值
        ...
```

:::note 使用`Secret`存储密码

1. 创建 `Secret`，在 `rtsp_password` 字段填写密码

```bash
kubectl create secret generic deviceshifu-secret --from-literal=rtsp_password=your_password -n deviceshifu
```

2. 将环境变量`IP_CAMERA_PASSWORD`的值修改为从`Secret`中获取

```yaml
- name: IP_CAMERA_PASSWORD
  valueFrom:
    secretKeyRef:
      name: deviceshifu-secret
      key: rtsp_password
      optional: false
```

:::

:::tip
查看摄像头的ip地址可以使用海康威视提供的官方工具：

**SADP**

- [macOS 下载](https://www.hikvision.com/en/support/tools/hitools/cl3620e9fb51dfac31/)
- [Windows 下载](https://www.hikvision.com/en/support/tools/hitools/clea8b3e4ea7da90a9/)
:::

## 部署deviceShifu

执行下面的命令：

```
kubectl apply -f examples/rtspDeviceShifu/camera-deployment
```

## 与deviceShifu交互

在 `examples/rtspDeviceShifu/camera-deployment/deviceshifu-camera-configmap.yaml` 中:

```yaml
data:
  ...
  instructions: |
    ...
    instructions:
      capture:
      info:
      stream:
      move/up:
      move/down:
      move/left:
      move/right:
```

您可以通过这些指令与数字孪生交互，这等同于操作实际的海康威视摄像头。
