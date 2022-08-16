---
title: Device Control
sidebar_position: 4
---

# Device Control

Similar to data collection, after setting the device instructions in `deviceshifu_configmap.yaml`, communication can be made with `deviceshifu` through HTTP/gRPC. The `deviceshifu` will convert the instructions into the form of supported  protocol by the device and send it to the device. After the device receives the instruction, it can execute the corresponding operation through the instruction, as to realize the device control.

## Combined with Data Acquisition to Realize Automatic Control of Equipment

1. Create a virtual device `PLC` (if you have not tried the `PLC` device, please click [here](quickstart/connect-a-plc.md) to view it).
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME                                            READY   STATUS    RESTARTS   AGE
   deviceshifu-opcua-deployment-765b77cfcf-dnhjh   1/1     Running   0          14m
   deviceshifu-plc-deployment-7f96585f7c-6t48g     1/1     Running   0          7m8s
   ```
   At this point, two deviceshifu are started. Each `deviceshifu` is connected to a device. The two `deviceshifu` can interact with each other. That is, when the temperature of the thermometer exceeds the threshold, the lowest position of the Q area of the `PLC` is set to 1, and when the temperature of the thermometer is lower than the threshold, it is set to 0.
2. Write programs related to the control equipment.
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
3. The above program can be packaged into a `docker image` and loaded into the cluster, so that it can better communicate with `deviceshifu`. Create the following `dockerfile`:
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
4. Use the `dockerfile` file to generate the `docker image`.
   ```bash
   docker build --tag high-temperature-control-plc:v0.0.1
   ```
5. Load the `docker image` into the cluster.
   ```bash
   kind load docker-image high-temperature-control-plc:v0.0.1
   ```
6. Run the data acquisition program.
   ```bash
   kubectl run high-temperature-control-plc --image=high-temperature-control-plc:v0.0.1
   ```
7. At the same time, in order to contribute to observing the value of the `PLC` device, please load another `nginx` image.
   ```bash
   kubectl run nginx --image=nginx:1.21 -n deviceshifu
   ```
8. At this point these `pod`s are under `Running` state.
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME                                                  READY   STATUS    RESTARTS   AGE
   deviceshifu-plc-deployment-7f96585f7c-87zb4           1/1     Running   0          20m
   deviceshifu-thermometer-deployment-7b69b89b88-crwzx   1/1     Running   0          67m
   high-temperature-control-plc                          1/1     Running   0          8m54s
   nginx                                                 1/1     Running   0          61m
   ```
9. The automation equipment control program is running, and the data obtained by the program can be viewed in real-time log.
   ```bash
   $ kubectl logs high-temperature-control-plc -n deviceshifu -f 
   2022/07/07 03:05:07 Now remperature is: 29
   2022/07/07 03:05:12 Now remperature is: 10
   2022/07/07 03:05:17 Now remperature is: 23
   2022/07/07 03:05:22 Now remperature is: 30
   ```
10. In order to observe the data conveniently, increase the value of `time.Sleep(5 * time.Second)` in the program (in order to improve the acquisition accuracy, it can be adjusted downward to increase frequency). At this point, input another command to enter the `nginx` container as follows.
   ```bash
   kubectl exec -it nginx -n deviceshifu -- bash
   ```
11. When the temperature obtained by the program exceeds the threshold, obtain the `PLC` value through `curl`.
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b0000000000000001
   ```
12. When the temperature obtained by the program is lower than the threshold, get the `PLC` value through `curl` again.
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b0000000000000000
   ```

Thus, Automatic control of `PLC` equipment by collecting real-time data from the virtual thermometer has been realized now.
