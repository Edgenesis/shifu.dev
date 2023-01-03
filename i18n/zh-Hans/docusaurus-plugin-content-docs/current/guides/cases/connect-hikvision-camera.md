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

:::note 推荐使用`Secret`存储密码,对于接入设备这是不必要的,但是这样会大大加强安全性

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

## 通过浏览器访问摄像头

我们可以通过service 来实现对 pod 的访问 , 在默认的yaml 文件中我们已经设置了对应的 service , 现在只需要用它启用端口映射

通过下面的命令获得当前的 service列表 

```
kubectl get svc -A 
```
其中存在时间最短的应该就是我们刚刚添加的service , 通过下面命令我们开启端口映射

```
kubectl port-forward -n deviceshifu svc/<填入刚刚添加的service名> 3000:
```
运行顺利的话我们可以看到如下输出

```
Forwarding from 127.0.0.1:3000 -> 8080
Forwarding from [::1]:3000 -> 8080
```


然后就可以实现从浏览器访问摄像头了
比如访问 `localhost:3000/info` 应该就会显示摄像头相关的信息
将info 替换为其他的 instruction 就可以实现对应的功能
