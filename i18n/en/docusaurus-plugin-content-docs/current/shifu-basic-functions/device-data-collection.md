---
title: Data Acquisition
sidebar_position: 3
---

# Data Acquisition

If communication is through HTTP/gRPC in *Shifu*, `deviceshifu` will convert the request into the form of the supported device protocol and send it to the device. 

When the device receives the command, the data will be transmitted to `deviceshifu`, and then `deviceshifu` will return the data as the return value of our request, thereby realizing data collection.

## Automated data collection

1. First, write the following program to automatically collect data. This program is used to collect real-time data from the previously running `edgedevice-thermometer`, analyze and output the temperature data. The program can be written in any language, in any form. The data will be stored in the database, or in a file.
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
2. Use `go mod init high-temperature-detector` to generate the `go.mod` file.
3. The above program can be packaged into a `docker image` and loaded into the cluster so that it can better communicate with `deviceshifu`. Create the following `dockerfile`:
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
4. To generate a `docker image` using the `dockerfilefile`, execute the following commands:
   ```bash
   docker build --tag high-temperature-detector:v0.0.1
   ```
5. Then load the `docker image` into the cluster by executing the following command:
   ```bash
   kind load docker-image high-temperature-detector:v0.0.1
   ```
6. To run the data acquisition program, execute the following commands:
   ```bash
   kubectl run high-temperature-detector --image=high-temperature-detector:v0.0.1
   ```
7. Finally, to check program's log information to get the data, execute the following command::
   ```bash
   kubectl run high-temperature-detector --image=high-temperature-detector:v0.0.1
   ```
   The results of the data obtained are as follows:
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
