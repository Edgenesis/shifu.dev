---
title: Connect a LwM2M Device
sidebar_position: 6
---

# Connect a LwM2M Device

This document demonstrates the integration of LwM2M protocol devices with Shifu. Shifu communicates with the LeShan server via the LwM2M protocol, showcasing seamless device management and interaction.



## Introduction to LwM2M protocol

`LwM2M` (Lightweight M2M)is a lightweight IoT device management protocol developed by OMA SpecWorks (Open Mobile Alliance). It is specifically designed for resource-constrained devices, such as low-power sensors and embedded devices, providing remote management capabilities for device management and services. LwM2M operates on the CoAP (Constrained Application Protocol) protocol stack and uses UDP or DTLS as the transport layer protocol, making it suitable for low-bandwidth and unstable network environments.

The following section describes how to use ***Shifu*** to connect devices via the `LwM2M` protocol.



## Pull and Deploy the Shifu Project

Before pulling the project from GitHub, you need to download the relevant Git environment, which can be quickly installed using `yum`.

```shell
sudo yum -y install git
```

Clone Shifu to your local machine:

```shell
git clone https://github.com/Edgenesis/shifu.git
```

Please use the latest configuration file to ensure support for the latest protocols:

```shell
kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```



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



## Deploy LwM2M deviceShifu

Execute the following command to deploy our **deviceShifu**:

```shell
kubectl apply -f examples/lwM2MDeviceShifuWithSecurity/lwM2M
```

After a short wait, you can see that the external LwM2M deviceShifu component is running normally with the following command:

```shell
kubectl get pods -n deviceshifu
```
Terminal displays:
```shell
NAME                                            READY   STATUS    RESTARTS      AGE
deviceshifu-lwm2m-deployment-794ddd9978-cn6hb   1/1     Running   4 (67m ago)   47h
leshan-client-65b78c78cb-gktbq                  1/1     Running   1 (67m ago)   2d
```

We can check the service status in the cluster:
```shell
kubectl get svc -n deviceshifu
```
Terminal displays:
```shell
NAME                         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)                       AGE
deviceshifu-lwm2m-security   NodePort   10.43.50.246   <none>        80:30080/TCP,5684:30001/UDP   2d
```

We can access the corresponding service through the externally exposed TCP port: 30080, using NodePort. Here, we use `curl` for a simple test, but you can also use tools like Postman or Apifox for testing.

```shell
curl http://<Your Server IP>:30080/float_value

3.14159
```

Write data:
```shell
curl -X PUT http://<Your Server IP>:30080/float_value -d 88.88
```
The terminal displays the following content:
```shell
Success
```
Read the `float_value` data again.
```shell
curl http://<Your Server IP>:30080/float_value
```
The terminal displays the following content:
```shell
88.88
```
Fill in your server IP address in `Your Server IP` to perform a simple test.
