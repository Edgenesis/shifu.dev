---
title: Device Integration
sidebar_position: 1
---

# Device Integration

## Modify the configuration of device for integration

### 1. Edit the `edgedevice.yaml` file

Before accessing the device, you need to edit the `edgedevice.yaml` file. For different protocols, `protocolSettings` can be further configured according to the protocol. Please go to [Shifu API reference](references/api/edgedevice.md#protocolsettings) for detailed configuration.

```yaml  
...
connection: Ethernet  
address: 0.0.0.0:11112
protocol: HTTP 
protocolSettings:  
  OPCUASetting:  
...
```

- `connection`: how the device is connected to the network.
- `address`: network address of the device.
- `protocol`: communication protocol that interacts with a device.
- `protocolSettings`: next Setting for the protocol, and [different settings](references/api/edgedevice.md#protocolsettings) need to be introduced for different protocols.

### 2. Create ***deviceshifu***

After modifying the documents above, it is ready to create ***deviceshifu***, ***deviceshifu*** will connect with the devices via configuration.

### 3. Test the state of the equipment

If you find that the ***deviceshifu*** status is `Error` or `CrashLoopBackOff` through the command `kubectl get pods -n deviceshifu`, it means that the connection is abnormal.

You can also print error messages through the command `kubectl logs <NAME> -n deviceshifu`.

## Integrate an OPC UA Device by Configuration

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

Through the above configuration, set address to the `address` of your OPC UA device, set protocol to `OPC UA`, add `protocolSetting` to `OPCUASetting`, and configure `SecurityMode` (information security mode), `ConnectionTimeoutInMilliseconds` (connection timeout limit), `AuthenticationMode` (authentication default) and account password Wait.

After modifying the above configuration, create ***deviceshifu*** to access the OPC UA device.
