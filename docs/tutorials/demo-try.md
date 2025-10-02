---
title: Try out
sidebar_position: 1
---

# Try out

We have prepared five devices (AGV, thermometer, microplate reader, PLC and robotic arm) in ***Shifu*** installer for you to explore the abilities of ***Shifu***.

:::note
An IoT device is a device that can connect and interact with other devices, systems, and applications offline or online, for instance:

- A robotic arm in a manufacturing plant can receive commands from a local automated control system and complete the corresponding moves.
- An automated guided vehicle can be remotely controlled by its operator.
- A thermometer in a car can send commands to the on-board air conditioner to raise or lower its temperature, and can upload real-time temperature data to the cloud.

When installing ***Shifu*** installer, five virtual devices are created and connected to your computer. Actual IoT devices can be operated through these virtual devices.
:::

## Preparation

To try out the devices mentioned below make sure to install Shifu in your local system from [Quick Install](https://shifu.dev/docs/tutorials/demo-install) before proceeding forward.

After the completion of Quick Install guide  change the directory to `shifudemos` using:

```bash
cd shifudemos
```

### Start the Nginx service {#start-the-nginx}

Start `nginx` to interact with ***deviceShifu***:

```bash
sudo kubectl run --image=nginx:1.21 nginx
sudo kubectl get pods -A | grep nginx
```

Now, `nginx` is running:

![nginx pod running](images/nginxPodStatus.png)

:::note
In the actual situation, users of IoT devices use an application or a monitoring platform to interact with the digital twin ***deviceShifu***. Here `nginx` is an application or a monitoring platform.
:::

## 1. Interact with the AGV

<details>
  <summary> Click here to view the details of AGV  </summary>
  Q: What is AGV?  <br/>
  A: AGV is a kind of automatic guided transportation vehicle. (Please refer to specific introduction on <a href="https://en.wikipedia.org/wiki/Automated_guided_vehicle">Wiki</a>) <br/>
  Q:  How does this interact with the AGV? <br/>
  A:  When the digital twin of the AGV receives the get_position command, it will generate and return the x and y axis coordinates of the current position of the device.
</details>

### Create the digital twin

:::note
You have just installed ***Shifu*** through the ***Shifu*** installer, so the digital twin of the AGV, ***deviceShifu***, has been created automatically.  You can interact with the digital twin of the AGV directly without having to manually create it.

The state of the digital twin will show the state of the actual device, so operating the digital twin is actually operating the actual IoT device.
:::

Execute the following command, and we can see that the digital twin of the AGV has started:

```bash
sudo kubectl get pods -A | grep agv
```

![deviceshifu-agv_start.png](images/deviceshifu-agv_start.png)

![](./images-cluster/cluster-1-en.png)

### Interact with the digital twin

Next, enter the `nginx`:

```bash
sudo kubectl exec -it nginx -- bash
```

By interacting  with the digital twin of the AGV via `http://deviceshifu-agv.deviceshifu.svc.cluster.local`, ***Shifu*** can get the `x` and `y` coordinates of the current position of the AGV:

```bash
curl http://deviceshifu-agv.deviceshifu.svc.cluster.local/get_position; echo
```

![deviceshifu-agv output](images/deviceshifu-agv_output.png)

:::note
Press `ctrl D` to exit `nginx`.
:::

## 2. Interact with the thermometer

<details>
  <summary> Click here for thermometer details </summary>
  Q: How do I interact with a thermometer in this demo? <br/>
  A: When the thermometer's digital twin receives the read_value command, it will generate and return the current thermometer reading.
</details>

### Create the digital twin

First, create a digital twin of the thermometer:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-thermometer
```

Now, the thermometer has started:

```bash
sudo kubectl get pods -A | grep thermometer
```

![deviceshifu-thermometer pod_start.png](images/deviceshifu-thermometer_pod_start.png)

![](./images-cluster/cluster-2-en.png)

### Interact with the digital twin

Next, enter the `nginx`:

```bash
sudo kubectl exec -it nginx -- bash
```

By interacting with the digital twin of the thermometer via `http://deviceshifu-thermometer.deviceshifu.svc.cluster.local`, ***Shifu*** can get the measured temperature of the thermometer (the following results are random):

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/read_value; echo
```

![deviceshifu-thermometer output](images/deviceshifu-thermometer-output.png)

Finally, the current operating status of the thermometer can be obtained through the `get_status` command (the following results are random):

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Running](images/Running.png)

```bash
curl http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/get_status; echo
```

![Error](images/Error.png)

:::note
Press `ctrl D` to exit `nginx`.
:::

## 3. Interact with the microplate reader

<details>
  <summary> Click here to view the details of the microplate reader  </summary>
  Q: What is a microplate reader? <br/>
  A: Microplate reader is a kind of laboratory equipment.(Please refer to specific introduction on  <a href="https://en.wikipedia.org/wiki/Plate_reader">Wiki</a>)<br/>
  Q: How do I interact with the microplate reader?  <br/>
  A: When the digital twin of the microplate reader receives the command get_measurement, it will return a matrix of 8*12. Each number in the matrix represents the value of the result of a spectral analysis scan in a sample.
</details>

### Create the digital twin

First, start the digital twin of the microplate reader:

```
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plate-reader
```

Enter the following command to see that the digital twin of the microplate reader has been started:

```bash
sudo kubectl get pods -A | grep plate
```

![deviceshifu-plate_pods_start.png](images/deviceshifu-plate-reader_pod_start.png)

![](./images-cluster/cluster-3-en.png)

### Interact with the digital twin

Next, enter nginx: (if you have not started Nginx, please [start the Nginx service](#start-the-nginx) first)

```
sudo kubectl exec -it nginx -- bash
```

By interacting with the digital twin of the microplate reader via `http://deviceshifu-thermometer.deviceshifu.svc.cluster.local`, Shifu can get the results of the microplate reader:

```bash
curl "deviceshifu-plate-reader.deviceshifu.svc.cluster.local/get_measurement"
```

![deviceshifu-plate-reader_output](images/deviceshifu-plate-reader_output.png)

:::note
Press `ctrl D` to exit `nginx`.
:::

## 4. Interact with the PLC

<details>
  <summary> Click here to view PLC details  </summary>
  Q: What is PLC? <br/>
  A: PLC is an industrial controller. (Please refer to specific introduction on <a href="https://en.wikipedia.org/wiki/Programmable_logic_controller">Wiki</a>)<br/>
  Q: How to interact with PLC?<br/>
  A: When the PLC's digital twin receives the sendsinglebit command, it can modify a bit in the memory area. When it receives the getcontent command, it can get the value of a byte in the memory area.
</details>

### Create the digital twin

First, start the digital twin of the PLC:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-plc
```

Enter the following command to see that the digital twin of the PLC has been started:

```bash
sudo kubectl get pods -A | grep plc
```

![deviceshifu-plc_pods_start](images/deviceshifu-plc_pods_start.png)

![](./images-cluster/cluster-4-en.png)

### Interact with the digital twin

Next, please enter nginx: (if you have not started Nginx, please [start the Nginx service](#start-the-nginx) first)

```bash
sudo kubectl exec -it nginx -- bash
```

By interacting with the PLC digital twin via `http://deviceshifu-plc.deviceshifu.svc.cluster.local`, ***Shifu*** can set bit 0 of the `Q0` memory area of ​​the PLC to 1:

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=1"; echo
```

![deviceshifu-plc_output1.png](images/deviceshifu-plc_output1.png)

"digit" indicates the number of bits in the PLC memory and "value" indicates the value of the current bit. The value of the corresponding memory area bit can be changed by modifying the values of "digit" and "value". For example, the fourth digit value of the Q0 memory of a PLC represents the control program, and the program can be started by setting "digit=3" and "value=1":

```bash
curl "deviceshifu-plc.deviceshifu.svc.cluster.local/sendsinglebit?rootaddress=Q&address=0&start=0&digit=3&value=1"; echo
```

![deviceshifu-plc_output2.png](images/deviceshifu-plc_output2.png)

:::note
Press `ctrl D` to exit `nginx`.
:::

## 5. Interact with the robotic arm

<details>
  <summary> Click here to view the details of the robotic arm </summary>
  Q: What is a robotic arm? <br/>
  A: Robotic arm is a kind of industrial controller. (Please refer to specific introduction on <a href="https://en.wikipedia.org/wiki/Robotic_arm">Wiki</a>)<br/>
  Q: How do I interact with the robot arm?  <br/>
  A: When the digital twin of the robot arm receives the get_coordinate command, it will return its current x, y, z axis coordinates.
</details>

### Create the digital twin

First, create a digital twin of the robotic arm:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-robot-arm
```

Enter the following command to see that the digital twin of the robotic arm has been started:

```bash
sudo kubectl get pods -A | grep robotarm
```

![deviceshifu-reboot-arm_start_pods](images/deviceshifu-reboot-arm_start_pods.png)

![](./images-cluster/cluster-5-en.png)

### Interact with the digital twin

Next, enter nginx: 

```bash
sudo kubectl exec -it nginx -- bash
```

By interacting with the digital twin of the robotic arm through `http://deviceshifu-robotarm.deviceshifu.svc.cluster.local`, ***Shifu*** can get the coordinates and operating states of the robotic arm (the following operating states appear randomly):

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_coordinate; echo
```

![deviceshifu-reboot-arm_result1](images/deviceshifu-reboot-arm_result1.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Idle.png](images/Idle.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Error.png](images/Error.png)

```bash
curl http://deviceshifu-robotarm.deviceshifu.svc.cluster.local/get_status; echo
```

![Running.png](images/Running.png)

## 6. Interact with the OPC UA Device

<details>
  <summary> Click here to view the details of the OPC UA </summary>
  Q: What is a OPC UA? <br/>
  A: OPC UA is a machine-to-machine network transmission protocol applied to automation technology, please click <a href="https://en.wikipedia.org/wiki/OPC_UA">here</a> for details. <br/>
  Q: How to interact with the OPC UA in this demo? <br/>
  A: When the OPC UA digital twin receives the get_server command, it will get the OPC UA Server information, and when it receives the get_value command, it can get the value of a NodeId of the device.
</details>

### Create the digital twin

First, create a digital twin of the OPC UA:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-opcua/mock-device
sudo kubectl wait --for=condition=Available deploy/mockdevice-opcua -n devices --timeout=150s
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-opcua
```

Enter the following command to see that the digital twin of the OPC UA has been started:

```bash
sudo kubectl get pods -A | grep opcua
```

![deviceshifu-opcua_pods_start](images/deviceshifu-opcua_pods_start.png)

### Interact with the digital twin

Next, enter nginx: 

```bash
sudo kubectl exec -it nginx -- bash
```

By communicating with the digital twin of the OPC UA through `http://deviceshifu-opcua.deviceshifu.svc.cluster.local`, Shifu can get the information of OPC UA Server:

```bash
curl http://deviceshifu-opcua.deviceshifu.svc.cluster.local/get_server; echo
```

![deviceshifu-opcua_output1.png](images/deviceshifu-opcua_output1.png)

By communicating with the digital twin of the OPC UA through `http://deviceshifu-opcua.deviceshifu.svc.cluster.local`, Shifu can get the value of NodeId:

```bash
curl http://deviceshifu-opcua.deviceshifu.svc.cluster.local/get_value; echo
```

![deviceshifu-opcua_output2.png](images/deviceshifu-opcua_output2.png)


## 7. Interact with the Socket Device

<details>
  <summary> Click here to view the details of the Socket </summary>
  Q: What is a Socket? <br/>
  A: Socket is an inter-process communication mechanism provided by the operating system, please click <a href="https://en.wikipedia.org/wiki/Socket">here</a> for details. <br/>
  Q: How to interact with the Socket in this demo? <br/>
  A: When the socket's digital twin receives the cmd command, it parses the information about the requested load and returns the Command plus '\n' in it.
</details>

### Create the digital twin

First, create a digital twin of the Socket:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-socket/mock-device
sudo kubectl wait --for=condition=Available deploy/mockdevice-socket -n devices --timeout=150s
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-socket
```

Enter the following command to see that the digital twin of the Socket has been started:

```bash
sudo kubectl get pods -A | grep socket
```

![deviceshifu-socket_pods_start](images/deviceshifu-socket_pods_start.png)

### Interact with the digital twin

Next, enter nginx: 

```bash
sudo kubectl exec -it nginx -- bash
```

By communicating with the digital twin of the Socket through `http://deviceshifu-socket.deviceshifu.svc.cluster.local`, Shifu can get the command we sent:

```bash
curl -XPOST -H "Content-Type: application/json" -d '{"command": "testCommand", "timeout":1000}' \
http://deviceshifu-socket.deviceshifu.svc.cluster.local/cmd; echo
```

![deviceshifu-socket_output1.png](images/deviceshifu-socket_output1.png)

## 8. Interact with the MQTT Device (Support multi-topic subscription)

<details>
  <summary> Click here to view the details of the MQTT </summary>
  Q: What is a MQTT? <br/>
  A: MQTT is a messaging protocol based on the publish/subscribe paradigm under the ISO standard, please click <a href="https://en.wikipedia.org/wiki/MQTT">here</a> for details. <br/>
  Q: How to interact with the MQTT in this demo? <br/>
  A: We support multi-topic subscription, so we can have multiple APIs for MQTT's digital twin (eg: get_topicmsg1, get_topicmsg2), When MQTT's digital twin receives the mqtt_data command, it returns the last message in the subscribed topic.
</details>

### Create the digital twin

First, create a digital twin of the MQTT:

```bash
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-mqtt/mosquitto.yaml 
sudo kubectl wait --for=condition=Available deploy/mosquitto -n devices --timeout=150s
sudo kubectl apply -f run_dir/shifu/demo_device/edgedevice-mqtt
```

Enter the following command to see that the digital twin of the MQTT has been started:

```bash
sudo kubectl get pods -A 
```

![deviceshifu-mqtt_pods_start](images/deviceshifu-mqtt_pods_start.png)

### Interact with the digital twin

By communicating with the digital twin of the Socket through `http://deviceshifu-mqtt.deviceshifu.svc.cluster.local`, Shifu can get the command we sent:

```bash
sudo kubectl exec -it nginx -- curl http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg1
sudo kubectl exec -it nginx -- curl http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg2
```

![deviceshifu-mqtt_output1.png](images/deviceshifu-mqtt_output1.png)
![deviceshifu-mqtt_output1.png](images/deviceshifu-mqtt_output1.png)

We can use mosquitto to publish data to multiple topics to MQTT server. (The data after -m is the information we posted)

```bash
sudo kubectl exec -it deploy/mosquitto -n devices -- mosquitto_pub -h localhost -d -p 1883 -t /test/test1 -m "test_topicmsg1"
sudo kubectl exec -it deploy/mosquitto -n devices -- mosquitto_pub -h localhost -d -p 1883 -t /test/test2 -m "test_topicmsg2"
```

![deviceshifu-mqtt_output2.png](images/deviceshifu-mqtt_output2.png)
![deviceshifu-mqtt_output3.png](images/deviceshifu-mqtt_output3.png)

At this point we can send commands to the digital twin of MQTT to get the published data.

```bash
sudo kubectl exec -it nginx -- curl http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg1
sudo kubectl exec -it nginx -- curl http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg2
```

![deviceshifu-mqtt_output4.png](images/deviceshifu-mqtt_output4.png)
![deviceshifu-mqtt_output5.png](images/deviceshifu-mqtt_output5.png)

At the same time, we can use the following commands to publish data to multiple topics through the digital twin of MQTT. (The data after -d is the information we posted)

```bash
sudo kubectl exec -it nginx -- curl -X POST -d 'test_pulish_topic1' http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg1
sudo kubectl exec -it nginx -- curl -X POST -d 'test_pulish_topic2' http://deviceshifu-mqtt.deviceshifu.svc.cluster.local/get_topicmsg2
```

## Next Step

Congratulations！！！:rocket: :rocket: :rocket: You have completed trying ***Shifu***, next:

- You can check the left sidebar for 
    - [**How-to Guides**](../guides): Detailed guides for using ***Shifu***.
    - [**Reference Book**](../references)
        - ***Shifu*** architecture and functions.
        - ***Shifu*** API reference.
    - [**Open Source Community**](../community): View FAQs, get support, and join the open source community.
- ***Shifu*** is now an open source project. If you are interested in it, visit ***Shifu***'s repo at [GitHub](https://github.com/Edgenesis/shifu).
- [Contact us to get technical support](community/join.md)。

## Delete the cluster (optional)

During the process of trying ***Shifu***, the ***Shifu*** installer created a cluster on your computer and installed ***Shifu*** in this cluster. If you do not want this cluster to run continuously, you can delete this cluster by executing the following command:

```bash
sudo kind delete cluster
```

`Docker` images can also be deleted. Use command `sudo docker images` to check all images. You can use command `sudo docker rmi <image_id>` to delete useless images.

:::info
Used images:

- `kindest/node` to create a local cluster
- `edgehub/deviceshifu-http-xxxx` to generate a ***deviceShifu*** on the base of it
- `edgehub/mockdevice-xxx` virtual devices
- `edgehub/shifu-controller-telemetry-plugin` a ***Shifu*** plug-in
- `edgehub/shifu-controller` `edgehub/edgedevice-controller-multi` ***Shifu***'s controller
- `nginx` to interact with ***deviceShifu***
:::

Delete the downloaded ***Shifu*** installer `shifu_demo_aio_xxx_xxx.tar` and the folder `testdir`.

:::tip
You can also check more detailed instruction in [Update, Uninstall and Restore Demo](docs\guides\install\demo-update-delete-recover.md).
:::
