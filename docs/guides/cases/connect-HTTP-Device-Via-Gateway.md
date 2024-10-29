---
title: Connect a HTTP Device Via Gateway
sidebar_position: 7
---

# Connect a HTTP Device Via Gateway

:::note Gateway IntroductionIn

`gateway` primarily provides gateway components to establish communication between edge devices and the management system. This gateway module implements protocol adaptation and conversion, supporting various devices connecting to the Shifu platform. This is especially important in edge computing environments with multi-protocol, multi-type IoT devices, as it enables seamless integration of devices with different protocols.

:::

## Start Shifu's lwM2M Components

start `deviceshifu-lwM2M`

```bash
$ kubectl apply -f examples/lwm2m_gw_http/deviceshifu-lwm2m/
configmap/deviceshifu-lwm2m created
deployment.apps/deviceshifu-lwm2m-deployment created
service/deviceshifu-lwm2m-service created
edgedevice.shifu.edgenesis.io/edgedevice-lwm2m created
```

start `deviceshifu-thermometer`

```bash
$ kubectl apply -f examples/lwm2m_gw_http/deviceshifu-thermometer/
configmap/thermometer-configmap-0.0.1 created
deployment.apps/deviceshifu-thermometer-deployment created
service/deviceshifu-thermometer created
deployment.apps/thermometer created
edgedevice.shifu.edgenesis.io/edgedevice-thermometer created
service/thermometer created
```

The `kubectl` command allows you to view the status of ***deviceShifu***:

```bash
$ kubectl get pods -n deviceshifu
deviceshifu-lwm2m-deployment-86884bd4cd-lwcnz        1/1     Running   0              97s
deviceshifu-thermometer-deployment-78558d778-6mnww   2/2     Running   0              37s
```

## Running Results

Load `nginx`to the `Kubernetes` cluster:

```bash
$ kubectl run nginx --image=nginx -n deviceshifu
```

View `nginx` running status through `kubectl`:

```bash
$ kubectl get pods -n deviceshifu | grep nginx
nginx                                           1/1     Running   0   21s
```

Go to `pod` of `nginx`:

```bash
$ kubectl exec -it nginx -n deviceshifu -- bash
```

Issue an HTTP request to ***deviceShifu*** to get the data(this request will transfer to lwm2m request):

```bash
$ curl http://deviceshifu-lwm2m-service.deviceshifu.svc.cluster.local/read_value
{"bn":"/3442/0/130/","e":[{"v":19}]}
```



