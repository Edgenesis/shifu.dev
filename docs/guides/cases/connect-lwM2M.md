---
title: Connect a lwM2M Device
sidebar_position: 6
---

# Connect a lwM2M Device

:::note OPC UA Introduction
`lwM2M` (Lightweight M2M)is a lightweight IoT device management protocol developed by OMA SpecWorks (Open Mobile Alliance). It is specifically designed for resource-constrained devices, such as low-power sensors and embedded devices, providing remote management capabilities for device management and services. LwM2M operates on the CoAP (Constrained Application Protocol) protocol stack and uses UDP or DTLS as the transport layer protocol, making it suitable for low-bandwidth and unstable network environments.
:::

The following section describes how to use ***Shifu*** to connect devices via the `lwM2M` protocol.

## Use/Not Use Security Mode

There are two examples in` example`, `lwM2MDeviceshifuWithoutSecurity` and `lwM2MDeviceShifuWithSecurity`, which correspond to using security mode and not using security mode. The following will use the not using security mode as a reference.

## Start Shifu's lwM2M Components

start `deviceshifu-lwM2M`

```bash
$ kubectl apply -f examples/lwM2MDeviceshifuWithoutSecurity/lwM2M/
configmap/deviceshifu-lwm2m created
deployment.apps/deviceshifu-lwm2m-deployment created
service/deviceshifu-lwm2m-nosecurity created
edgedevice.shifu.edgenesis.io/edgedevice-lwm2m created
```

start `mockdevice`

```bash
$ kubectl apply -f examples/lwM2MDeviceshifuWithoutSecurity/mockdevice/
deployment.apps/leshan-client created
```

The `kubectl` command allows you to view the status of ***deviceShifu***:

```bash
$ kubectl get pods -n deviceshifu
deviceshifu-lwm2m-deployment-86884bd4cd-gtfgz   1/1     Running   0             47s
leshan-client-587ff5fbc5-pz9tl                  1/1     Running   0             27s
```

## Running Results

Load `nginx`to the `Kubernetes` cluster:
```bash
$ kubectl run nginx --image=nginx -n deviceshifu
```

View `nginx` running status through `kubectl`:

```bash
$ kubectl get pods -n deviceshifu | grep nginx
nginx                                           1/1     Running   0   3m21s
```

Go to `pod` of `nginx`':

```bash
$ kubectl exec -it nginx -n deviceshifu -- bash
```

:::

:::tip
If you use security mode, replace deviceshifu-lwm2m-nosecurity with deviceshifu-lwm2m-security in the following command.
:::

Issue an HTTP request to ***deviceShifu*** to get the data:

```bash
$ curl deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value
3.14159
```

Issue an HTTP request to ***deviceShifu*** to write the data:

```bash
$ curl -X PUT deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value -d 88.8
$ curl deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value
Success 88.8
```



