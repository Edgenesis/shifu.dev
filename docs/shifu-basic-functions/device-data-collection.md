---
title: 数据采集
sidebar_position: 3
---

# 数据采集

```yaml
instructions: |  
  get_value:  
    instructionProperties:  
      OPCUANodeID: "ns=2;i=2"  
  get_time:  
    instructionProperties:  
      OPCUANodeID: "i=2258"  
  get_server:  
    instructionProperties:  
      OPCUANodeID: "i=2261"
```
在`deviceshifu_configmap.yaml`中设置请求的路径，同时可以在`instructionProperties:`下添加`参数`。此时，我们可以通过HTTP/gRPC与`deviceshifu`进行通信，`deviceshifu`会将我们发送的请求转换成设备所支持协议的形式，并发送给设备。设备接收到指令之后，将数据传输给`deviceshifu`后再将数据作为我们请求的返回值，从而实现数据采集。
## 实现自动化数据采集
我们可以编写一个程序去自动采集数据。
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
使用`go mod init high-temperature-detector`生成`go.mod`文件。
该程序用于对之前运行的`edgedevice-thermometer`设备进行实时数据采集，同时对数据进行解析，并根据温度进行数据解析并输出。该程序可以通过任意语言任意形式进行编写，您可以将数据存入您的数据库中，或者存入文件中。  
对于上述程序，我们可以将其打包成`docker image`并加载到集群中，以便其能更好的与`deviceshifu`进行通信。创建以下`dockerfile`文件。
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
使用`dockerfile`文件生成`docker image`。
> docker build --tag high-temperature-detector:v0.0.1 .
之后我们将`docker image`加载到集群中。
> kind load docker-image high-temperature-detector:v0.0.1
运行我们编写的数据采集程序 。
> kubectl run high-temperature-detector --image=high-temperature-detector:v0.0.1
最后我们查看该程序的日志信息获取数据。
```bash  
$ kubectl logs -n default high-temperature-detector -f  
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