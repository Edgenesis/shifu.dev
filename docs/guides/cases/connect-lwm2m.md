---
title: Connect a LwM2M Device
sidebar_position: 6
---

# Connect a LwM2M Device

This document demonstrates the integration of LwM2M protocol devices with Shifu. Shifu communicates with the LeShan server via the LwM2M protocol, showcasing seamless device management and interaction.

## Introduction to LwM2M protocol

`LwM2M` (Lightweight M2M)is a lightweight IoT device management protocol developed by OMA SpecWorks (Open Mobile Alliance). It is specifically designed for resource-constrained devices, such as low-power sensors and embedded devices, providing remote management capabilities for device management and services. LwM2M operates on the CoAP (Constrained Application Protocol) protocol stack and uses UDP or DTLS as the transport layer protocol, making it suitable for low-bandwidth and unstable network environments.

The following section describes how to use ***Shifu*** to connect devices via the `LwM2M` protocol.

## Get the Example

The example provides two methods of integration: [LwM2MDeviceShifuWithSecurity](https://github.com/Edgenesis/shifu/tree/main/examples/lwM2MDeviceShifuWithSecurity) and [LwM2MDeviceshifuWithoutSecurity](https://github.com/Edgenesis/shifu/tree/main/examples/lwM2MDeviceshifuWithoutSecurity). The choice depends on the security configuration (Security Mode) of the device. If the device does not have the corresponding security configuration set, use [LwM2MDeviceshifuWithoutSecurity](https://github.com/Edgenesis/shifu/tree/main/examples/lwM2MDeviceshifuWithoutSecurity).

For demonstration purposes, this guide illustrates a LwM2M device with `Security Mode` set to `DTLS`. You can also simulate a LwM2M device using the `leshan-client` from the example files, which can be found in `examples\lwM2MDeviceShifuWithSecurity\mockdevice`.

## Modify Configuration

Navigate to `examples\lwM2MDeviceShifuWithSecurity\lwM2M\lwm2m-edgedevice.yaml` to configure the device's security settings. For example, our device uses **DTLS** for secure communication and authenticates using the **Pre-Shared** Key method. The encryption algorithm suite is **TLS_PSK_WITH_AES_128_CCM_8**, the PSK identifier is **hint**, and the key value is **ABC123**. The corresponding YAML file is as follows:

```yaml
apiVersion: shifu.edgenesis.io/v1alpha1
...
...
  protocolSettings:
    LwM2MSetting:
      endpointName: leshan-client
      securityMode: DTLS
      dtlsMode: PSK
      cipherSuites: 
        - TLS_PSK_WITH_AES_128_CCM_8
      pskIdentity: hint
      pskKey: ABC123
```

The `examples\lwM2MDeviceShifuWithSecurity\lwM2M\lwm2m-deviceshifu-configmap.yaml` file allows for the configuration of custom commands. In this example, we have configured two commands: `float_value` and `reset`. Each command definition includes two essential parameters: the LwM2M object identifier (`ObjectId`) that specifies the target resource path, and the observation mode flag (`EnableObserve`) that determines whether the server should monitor the resource for changes.

```shell
apiVersion: v1
...
...
  instructions: |
    instructions:
      float_value:
        protocolPropertyList:
          ObjectId: /3442/0/130
          EnableObserve: false
      reset:
        protocolPropertyList:
          ObjectId: /3303/0/5605
          EnableObserve: false
```

The `ObjectId` follows the format `/ObjectID/ObjectInstance/ResourceID`. For example, the `reset` operation with path `/3303/0/5605` represents an operation on the temperature sensor object (3303), targeting its first instance (0), specifically the resource (5605) that resets the minimum and maximum measured values. When the server enables the Observe feature by setting `EnableObserve: true`, the gateway will collect data from deviceShifu at regular intervals. If there is a change in the data value or a timeout occurs, the gateway will automatically notify the server with the updated data.

## Deploy deviceShifu LwM2M

Execute the following command to deploy our **deviceShifu LwM2M**:

```shell
kubectl apply -f examples/lwM2MDeviceShifuWithSecurity/lwM2M
```

After a short wait, you can see that the external deviceShifu LwM2M component is running normally with the following command:

```shell
$ kubectl get pods -n deviceshifu
NAME                                            READY   STATUS    RESTARTS      AGE
deviceshifu-lwm2m-deployment-794ddd9978-cn6hb   1/1     Running   4 (67m ago)   47h
leshan-client-65b78c78cb-gktbq                  1/1     Running   1 (67m ago)   2d
```

We can check the service status in the cluster:

```shell
$ kubectl get svc -n deviceshifu
NAME                         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                       AGE
deviceshifu-lwm2m-security   NodePort   10.43.50.246   <none>        80:30080/TCP,5684:30001/UDP   2d
```

## Test Execution

We can deploy an nginx instance in our Kubernetes cluster for testing:

```shell
$ kubectl run nginx --image=nginx -n deviceshifu
pod/nginx created
```

Verify the nginx pod's running status:

```shell
$ kubectl get pods -n deviceshifu | grep nginx
nginx                                           1/1     Running   0   3m21s
```

Access the nginx container and test our deviceShifu LwM2M using curl:

```shell
kubectl exec -it nginx -n deviceshifu -- bash
```

```shell
$ curl deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value
3.14159
```

Write data:

```shell
$ curl -X PUT deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value -d 88.88
Success
```

Read the `float_value` data again.

```shell
$ curl deviceshifu-lwm2m-nosecurity.deviceshifu.svc.cluster.local/float_value
88.88
```
