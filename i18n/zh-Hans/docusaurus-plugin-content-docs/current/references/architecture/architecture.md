--- 
title: 基本架构
sidebar_position: 0
--- 

# ***Shifu*** 基本架构

***Shifu*** 是一个[Kubernetes](https://kubernetes.io/)原生的平台，它的所有组件都以[Pod](https://kubernetes.io/docs/concepts/workloads/pods/)的形式运行。

本文是关于 ***Shifu*** 架构的简介，如果你对 ***Shifu*** 的架构设计感兴趣，可以前往[desing-shifu-zh](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-shifu-zh.md)查看具体细节。

下图是 ***Shifu*** 架构的示意图：

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

**注：示意图内的IoT设备以及协议不仅限于图中出现的种类。*Shifu* 具有极强的扩展性，兼容所有通过协议或驱动通信的IoT设备。**

## 通信

***Shifu*** 与应用、设备之间的关系，可以用下图来表示：

```mermaid
flowchart LR;
 APP<-->|HTTP/gRPC|Shifu;
  Shifu<-->|IoT Protocols/drivers|Devices;
```

### ***Shifu*** 与设备之间的通信

***Shifu*** 可以同时兼容不同的[通信协议和驱动](../../guides/install/support.md)，它将不同设备的不同形式的请求进行统一，使得用户可以更简单地使用设备。同时，***Shifu*** 兼容的协议和驱动的数量也在不断增加。

### ***Shifu*** 与应用之间的通信

***Shifu*** 可以通过`HTTP`协议(gRPC协议暂未支持)与开发者所开发的程序进行通信。使得开发者开发物联网场景时像开发一个软件一样简单。

换句话说，对设备的控制和信息读取都由 ***Shifu*** 托管并对外暴露成统一类型的接口，只需要使用相同类型的API即可实现对多种类设备的的通信。
