---
title: 数据采集
sidebar_position: 3
---

# 数据采集

我们可以通过HTTP/gRPC与 ***deviceShifu*** 进行通信，***deviceShifu*** 会将我们发送的请求转换成设备所支持协议的形式，并发送给设备。

当设备接收到指令之后，数据会传输到 ***deviceShifu*** 中，之后 ***deviceShifu*** 将数据作为我们请求的返回值进行返回，从而实现数据的采集。

## 实现自动化数据采集

1. 首先，我们可编写以下程序来实现自动采集数据。该程序用于对之前运行的`edgedevice-thermometer`设备进行实时数据采集，将温度数据进行解析并输出。该程序可以通过任意语言、任意形式进行编写，您可以将数据存入您的数据库中，或者存入文件中。
   ```go
   package main  
   
   import (  
      "log"   
      "io/ioutil"   
      "net/http"   
      "strconv"   
      "time"
   )  
   
   func main() {  
      targetUrl := "http://edgedevice-thermometer/read_value"
      req, _ := http.NewRequest("GET", targetUrl, nil)
      for{
         res, _ := http.DefaultClient.Do(req)
         body, _ := ioutil.ReadAll(res.Body)
         temperature, _ := strconv.Atoi(string(body))     
         if temperature > 20 {
            log.Println("High temperature:", temperature)
         } else if temperature > 15 {
            log.Println("Normal temperature:", temperature)
         } else {
            log.Println("Low temperature:", temperature)
         }
         res.Body.Close()
         time.Sleep(2 * time.Second)
      }
   }
   ```
2. 使用`go mod init high-temperature-detector`生成`go.mod`文件。
3. 对于上述程序，我们可以将其打包成`docker image`并加载到集群中，以便其能更好的与 ***deviceShifu*** 进行通信。创建以下`Dockerfile`文件：
   ```dockerfile
   # syntax=docker/dockerfile:1  
   
   FROM golang:1.17-alpine  
   WORKDIR /app  
   COPY go.mod ./  
   RUN go mod download  
   COPY *.go ./  
   RUN go build -o /high-temperature-detector  
   EXPOSE 11111  
   CMD [ "/high-temperature-detector" ]
   ```
4. 使用`Dockerfile`文件生成`docker image`，需执行以下命令：
   ```bash
   docker build --tag high-temperature-detector:v0.0.1
   ```
5. 之后我们将`docker image`加载到集群中，需执行以下命令：
   ```bash
   kind load docker-image high-temperature-detector:v0.0.1
   ```
6. 运行我们编写的数据采集程序 ，需执行以下命令：
   ```bash
   kubectl run high-temperature-detector --image=high-temperature-detector:v0.0.1
   ```
7. 最后我们查看该程序的日志信息获取数据，需执行以下命令:
   ```bash
   kubectl logs -n default high-temperature-detector -f
   ```
   得到的数据结果如下：
   ```bash
   2021/10/18 10:35:35 High temperature: 24  
   2021/10/18 10:35:37 High temperature: 23  
   2021/10/18 10:35:39 Low temperature: 15  
   2021/10/18 10:35:41 Low temperature: 11  
   2021/10/18 10:35:43 Low temperature: 12  
   2021/10/18 10:35:45 High temperature: 28  
   2021/10/18 10:35:47 Low temperature: 15  
   2021/10/18 10:35:49 High temperature: 30  
   2021/10/18 10:35:51 High temperature: 30  
   2021/10/18 10:35:53 Low temperature: 15
   ```
