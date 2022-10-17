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
