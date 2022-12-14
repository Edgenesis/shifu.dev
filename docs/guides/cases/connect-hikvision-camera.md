---
title: Connect a Hikvision Camera
sidebar_position: 4
---

# Connect a Hikvision Camera

## Get the template

Check template files at [examples/rtspDeviceShifu](https://github.com/Edgenesis/shifu/tree/main/examples/rtspDeviceShifu).

## Modify configuration

In `examples/rtspDeviceShifu/camera-deployment/deviceshifu-camera-deployment.yaml`:

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
          value: "192.168.14.254" # change this value
        - name: IP_CAMERA_USERNAME
          value: "admin" # change this value
        - name: IP_CAMERA_PASSWORD
          value: "password" # change this value
        - name: IP_CAMERA_CONTAINER_PORT
          value: "11112" # change this value
        ...
```

:::note use `Secret` to store password

1. Create a `Secret` with `rtsp_password` field filled by your password.

```bash
kubectl create secret generic deviceshifu-secret --from-literal=rtsp_password=your_password -n deviceshifu
```

2. Modify the yaml file above, change the value of enviroment varible `IP_CAMERA_PASSWORD` from string to `Secret` we just created.

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
To check the ip address of your camera, use the official tool provided by Hikvision:

**SADP**

- [macOS download](https://www.hikvision.com/en/support/tools/hitools/cl3620e9fb51dfac31/)
- [Windows download](https://www.hikvision.com/en/support/tools/hitools/clea8b3e4ea7da90a9/)
:::

## Deploy deviceShifu

Run the following command:

```
kubectl apply -f examples/rtspDeviceShifu/camera-deployment
```

## Interact with deviceShifu

In `examples/rtspDeviceShifu/camera-deployment/deviceshifu-camera-configmap.yaml`:

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

You can use these instructions to interact with the ***deviceShifu***, which is equal to operate on the actual Hikvision camera.
