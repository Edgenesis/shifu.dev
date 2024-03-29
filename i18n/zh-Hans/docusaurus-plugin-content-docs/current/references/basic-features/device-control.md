---
title: 设备控制
sidebar_position: 4
---

# 设备控制

与数据采集类似，在`deviceshifu_configmap.yaml`中设置好设备的指令后，我们可以通过HTTP/gRPC与 ***deviceshifu*** 进行通信，***deviceshifu*** 会将我们发送的指令转换成设备所支持协议的形式，并发送给设备。设备接受到指令之后，可以通过指令执行相应的操作，从而实现设备控制。

## 结合数据采集实现设备的自动化控制

1. 这里，我们再创建一个虚拟设备`PLC`(如果您未试玩过`PLC`设备，您可以[点击查看](guides/cases/connect-s7-plc.md))。
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME                                            READY   STATUS    RESTARTS   AGE
   deviceshifu-opcua-deployment-765b77cfcf-dnhjh   1/1     Running   0          14m
   deviceshifu-plc-deployment-7f96585f7c-6t48g     1/1     Running   0          7m8s
   ```
   此时我们启动了两个 ***deviceshifu***，它们分别与设备建立了连接。我们可以将两个 ***deviceshifu*** 进行联动，即当温度计温度超过阈值时，将`PLC`的Q区的最低位置为1，当温度计温度低于阈值时则置回0。
2. 编写与控制设备相关的程序。
   ```go
   package main  
   
   import (  
      "io/ioutil"  
      "log"
      "net/http"
      "strconv"
      "time"
   )  
   
   func main() {  
      targetUrl := "http://deviceshifu-thermometer.deviceshifu.svc.cluster.local/read_value"  
      req, _ := http.NewRequest("GET", targetUrl, nil)  
      var isHigh bool  
      for {  
         res, _ := http.DefaultClient.Do(req)  
         body, _ := ioutil.ReadAll(res.Body)  
         temperature, _ := strconv.Atoi(string(body))  
         if temperature > 20 && isHigh == false {  
            setPLCBit("1")  
            isHigh = true  
         } else if temperature <= 20 && isHigh == true {  
            setPLCBit("0")  
            isHigh = false  
         }  
         log.Printf("Now remperature is: %d", temperature)  
         res.Body.Close()  
         time.Sleep(5 * time.Second)  
      }  
   }  
   
   func setPLCBit(value string) {  
      targetUrl := "http://deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=" + value  
      req, _ := http.NewRequest("GET", targetUrl, nil)  
      res, _ := http.DefaultClient.Do(req)  
      defer res.Body.Close()  
   }
   ```
3. 对于上述程序，我们可以将其打包成`docker image`并加载到集群中，以便其能更好的与 ***deviceshifu*** 进行通信。创建以下`Dockerfile`文件：
   ```dockerfile
   # syntax=docker/dockerfile:1  
   FROM golang:1.17-alpine  
   WORKDIR /app  
   COPY go.mod ./  
   RUN go mod download  
   COPY *.go ./  
   RUN go build -o /high-temperature-control-plc 
   EXPOSE 11111  
   CMD [ "/high-temperature-control-plc" ]
   ```
4. 使用`Dockerfile`文件生成`docker image`。
   ```bash
   docker build --tag high-temperature-control-plc:v0.0.1
   ```
5. 之后我们将`docker image`加载到集群中。
   ```bash
   kind load docker-image high-temperature-control-plc:v0.0.1
   ```
6. 运行我们编写的数据采集程序。
   ```bash
   kubectl run high-temperature-control-plc --image=high-temperature-control-plc:v0.0.1
   ```
7. 同时为了便于我们观察`PLC`设备的值，我们再载入一个`nginx`镜像。
   ```bash
   kubectl run nginx --image=nginx:1.21 -n deviceshifu
   ```
8. 此时我们有了如下的`pod`，且均处于`Running`状态。
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME                                                  READY   STATUS    RESTARTS   AGE
   deviceshifu-plc-deployment-7f96585f7c-87zb4           1/1     Running   0          20m
   deviceshifu-thermometer-deployment-7b69b89b88-crwzx   1/1     Running   0          67m
   high-temperature-control-plc                          1/1     Running   0          8m54s
   nginx                                                 1/1     Running   0          61m
   ```
9. 我们编写的自动化设备控制程序正处于运行中，可以通过查看实时日志的方式查看程序获取的数据。
   ```bash
   $ kubectl logs high-temperature-control-plc -n deviceshifu -f 
   2022/07/07 03:05:07 Now remperature is: 29
   2022/07/07 03:05:12 Now remperature is: 10
   2022/07/07 03:05:17 Now remperature is: 23
   2022/07/07 03:05:22 Now remperature is: 30
   ```
10. 为了方便观察数据，我们将程序中的`time.Sleep(5 * time.Second)`调高(为提高采集精度，可将其调低，以提高采集频率)。此时我们再输入一条命令进入`nginx`的容器中。
   ```bash
   kubectl exec -it nginx -n deviceshifu -- bash
   ```
11. 程序获取的温度超过阈值时我们通过`curl`获取`PLC`数值。
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b0000000000000001
   ```
12. 当程序获取的温度低于阈值时我们再次通过`curl`获取`PLC`数值。
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b0000000000000000
   ```

自此，我们通过对虚拟温度计采集实时数据，实现了对`PLC`设备的自动化控制。
