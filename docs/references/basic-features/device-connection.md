---
title: Device Access
sidebar_position: 1
---

# Device Integration

## Modify the Configuration of Device Integration

### 1. Edit the `edgedevice.yaml` file

Before integrating the device, you need to edit the `edgedevice.yaml` file. `protocolSettings` can be further configured according to different protocols, please go to [Shifu API Reference](references/api/edgedevice.md#protocolsettings) for detailed configuration.

```yaml  
...
connection: Ethernet  
address: 0.0.0.0:11112
protocol: HTTP 
protocolSettings:  
  OPCUASetting:  
...
```

- `connection`: Indicates the network connection method of the device.
- `address`: Indicates the network address of the device.
- `protocol`: indicates the communication protocol to interact with the device.
- `protocolSettings`: indicates the next settings for the protocol, for different protocols you need to introduce [different `Setting`] (references/api/edgedevice.md#protocolsettings).

### 2. Create ***deviceshifu***

After modifying the above files, you can create ***deviceshifu***, which will try to connect to your device with the configuration you have set.

### 3. Detecting Device Access Status

If you find an `Error` or `CrashLoopBackOff` in ***deviceshifu*** status through the command `kubectl get pods -n deviceshifu`, it means that the connection is abnormal.

You can also print error messages with the command `kubectl logs <NAME> -n deviceshifu`.

## Configure to Access an OPC UA Device

```yaml
connection: Ethernet  
address: opc.tcp://192.168.0.111:4840/freeopcua/server 
protocol: OPCUA  
protocolSettings:  
  OPCUASetting:  
    SecurityMode: None  
    ConnectionTimeoutInMilliseconds: 5000  
    AuthenticationMode: UserName  
    Username: user1  
    Password: pwd1
```

With the above configuration, set `address` to the address of your OPC UA device, `protocol` to `OPC UA`, `protocolSetting` to `OPCUASetting`, and configure `SecurityMode`, ` ConnectionTimeoutInMilliseconds`, `AuthenticationMode`, and account password.  

After modifying the configuration above, you can now create a ***deviceshifu*** to access the OPC UA device.