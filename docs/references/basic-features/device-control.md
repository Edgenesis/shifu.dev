---
title: Device Control
sidebar_position: 4
---

# Device Control

Similar to data collection, after setting up the commands for the device in `deviceshifu_configmap.yaml`, we can communicate with ***deviceshifu*** via HTTP/gRPC, and ***deviceshifu*** will convert the commands we send into the form of the protocol supported by the device and send them to the device. After the device receives the command, it can perform the corresponding operation to control the device.

## Automated Device Control with Data Collection

1. Here, we create another virtual device `PLC` (if you have not tried the `PLC` device, you can [click to view](guides/cases/connect-s7-plc.md)).
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME READY STATUS RESTARTS AGE
   deviceshifu-opcua-deployment-765b77cfcf-dnhjh 1/1 Running 0 14m
   deviceshifu-plc-deployment-7f96585f7c-6t48g 1/1 Running 0 7m8s
   ```
   At this point we have started two ***deviceshifu*** which have each established a connection to a device. We can link the two ***deviceshifu***, that is, when the thermometer temperature exceeds the threshold, set the lowest position of Q area of `PLC` to 1, and set it back to 0 when the thermometer temperature is below the threshold.
2. Write the program related to the control device.
   
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
         Body, _ := ioutil.ReadAll(res.)  
         temperature, _ := strconv.Atoi(string(body))  
         if temperature > 20 && isHigh == false {  
            setPLCBit("1")  
            isHigh = true  
         } else if temperature <= 20 && isHigh == true {  
            setPLCBit("0")  
            isHigh = false  
         }  
         log.Printf("Now remperature is: %d", temperature)  
         Body.Close()  
         Time.Sleep(5 * time.Second)  
      Sleep(5 * time.Second) }  
   }  
   
   func setPLCBit(value string) {  
      targetUrl := "http://deviceshifu-plc/sendsinglebit?rootaddress=Q&address=0&start=0&digit=0&value=" + value  
      req, _ := http.NewRequest("GET", targetUrl, nil)  
      res, _ := http.DefaultClient.Do(req)  
      defer res.Body.Close()  
   }
   ```
3. For the above program, we can package it as a `docker image` and load it into the cluster so that it can better communicate with ***deviceshifu***. Create the following ``Dockerfile`` file.
   ```dockerfile
   # syntax=docker/dockerfile:1  
   FROM golang:1.17-alpine  
   WORKDIR /app  
   COPY go.mod . /  
   RUN go mod download  
   COPY *.go . /RUN  
   RUN go build -o /high-temperature-control-plc 
   EXPOSE 11111  
   CMD [ "/high-temperature-control-plc" ]
   ```
4. Generate a `docker image` using the `Dockerfile` file.
   ```bash
   docker build --tag high-temperature-control-plc:v0.0.1
   ``` 5.
5. After that we load the ``docker image`` into the cluster.
   ```bash
   kind load docker-image high-temperature-control-plc:v0.0.1
   ```
6. Run the data acquisition program we wrote.
   ```bash
   kubectl run high-temperature-control-plc --image=high-temperature-control-plc:v0.0.1
   ```
7. Also, in order for us to see the values of the `PLC` device, we load another `nginx` image.
   ```bash
   kubectl run nginx --image=nginx:1.21 -n deviceshifu
   ```
8. At this point we have the following `pods`, all in the `Running` state.
   ```bash
   $ kubectl get pods -n deviceshifu
   NAME READY STATUS RESTARTS AGE
   deviceshifu-plc-deployment-7f96585f7c-87zb4 1/1 Running 0 20m
   deviceshifu-thermometer-deployment-7b69b89b88-crwzx 1/1 Running 0 67m
   high-temperature-control-plc 1/1 Running 0 8m54s
   nginx 1/1 Running 0 61m
   ```
9. The automation device control program we wrote is running, and you can view the data obtained by the program by viewing the live log.
   ```bash
   $ kubectl logs high-temperature-control-plc -n deviceshifu -f 
   2022/07/07 03:05:07 Now remperature is: 29
   2022/07/07 03:05:12 Now remperature is: 10
   2022/07/07 03:05:17 Now remperature is: 23
   2022/07/07 03:05:22 Now remperature is: 30
   ```
Sleep(5 * time.Second)` in the program to make it easier to observe the data (to improve the acquisition accuracy, you can turn it down to increase the acquisition frequency). At this point we enter another command into the `nginx` container.
   ```bash
   kubectl exec -it nginx -n deviceshifu -- bash
   ```
11. When the program gets a temperature above the threshold we get the `PLC` value via `curl`.
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b00000000000000000001
   ```
12. When the program gets a temperature below the threshold we get the `PLC` value again via `curl`.
   ```bash
   $ curl "http://deviceshifu-plc/getcontent?rootaddress=Q&address=0&start=0"; echo
   0b0000000000000000
   ```

By now, we have achieved automated control of the `PLC` device by collecting real-time data from the virtual thermometer.