--- 
title: Basic Structure
sidebar_position: 0
--- 

# Basic Structure

***Shifu*** is a native [Kubernetes](https://kubernetes.io/) platform with all its components running as [Pods](https://kubernetes.io/docs/concepts/workloads/pods/).

This article is an introduction to the ***Shifu*** architecture. If you are interested in the architectural design of ***Shifu***, please go to [desing-shifu](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifu.md) for the specific details.

The following diagram illustrates the ***Shifu*** architecture：

```mermaid
flowchart BT
	subgraph Shifu
    
    subgraph sg-kernel[Shifu Kernel]
    	subgraph sg-cp[Control Plane]
    	sc[shifuController]
    	sd[shifud]
    	end
    
    	subgraph sg-dp[Data Plane]
    	d0cam[deviceShifu0:Camera]
    	d1ts[deviceShifu1:Temperature Sensor]
    	d2agv[deviceShifu2:AGV]
    	d3ra[deviceShifu3:Robot Arm]
    	dotsinsg-dp[...]
    	dn[deviceShifuN: Any IoT device]
    	end
  	end
  
    
		subgraph sg-p[Shifu Plug-ins]
    	subgraph sg-op[other plug-ins]
    	dotsinsg-op[...]
    	end
    
   		subgraph sg-pg[protocol gateway]
  		mqtt[MQTT]
  		rtsp[RTSP]
  		opcua[OPC UA]
  		http[HTTP]
  		dotsinsg-pg[...]
  		end
  	end
  end
  
  subgraph sg-id[IoT Devices]
  cam[Camera]
  ts[Temperature Sensor]
  agv[AGV]
  ra[Robot Arm]
  dotsInIoT[...]
  end

	sg-id<-->sg-pg
  sg-pg<-->sg-dp
```

**Note: IoT devices and protocols within the schematic are not limited to the types that appear in the diagram. ***Shifu*** is extremely scalable and compatible with all IoT devices that interact via protocols or drivers.**

## Interaction

The relationship between ***Shifu*** and applications and devices can be represented by the following diagram:

```mermaid
flowchart LR;
 APP<-->|HTTP/gRPC|Shifu;
  Shifu<-->|IoT Protocols/drivers|Devices;
```

### Interaction between ***Shifu*** and devices

***Shifu*** is compatible with different communication protocols and drivers all at once, and it unifies different forms of requests from different devices, makes it easier for users to use the devices. Meanwhile, the number of protocols and drivers compatible with ***Shifu*** is growing.

### Interaction between ***Shifu*** and applications

***Shifu*** can interact with applications via `HTTP` protocol (gRPC protocol not yet supported). 

In other words, the control and data collection of devices are hosted by ***Shifu*** and exposed as unified type of interfaces, so that interaction between multiple devices can be achieved by using the same type of APIs.
