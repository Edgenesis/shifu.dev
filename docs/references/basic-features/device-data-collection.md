---
title: Data Collection
sidebar_position: 3
---

# Data Collection

We can communicate with ***deviceShifu*** via HTTP/gRPC. ***deviceShifu*** will convert the request we send into the form of the protocol supported by the device and send it to the device.

When the device receives the command, the data will be transferred to ***deviceShifu***, after that ***deviceShifu*** will return the data as the return value of our request, thus realizing the data acquisition.

## Automated Data Collection

1. First, we can write the following program to automate data acquisition. This program is used to perform real-time data acquisition on the previously running `edgedevice-thermometer` device, parse the temperature data and output it. The program can be written in any language and in any form, and you can store the data in your database or in a file.
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
         Body.Close()
         Time.Sleep(2 * time.Second)
      }
   }
   ```
2. Use `go mod init high-temperature-detector` to generate the `go.mod` file.
3. For the above program, we can package it as a `docker image` and load it into the cluster so that it can better communicate with ***deviceShifu***. Create the following `Dockerfile` file.
   ```dockerfile
   # syntax=docker/dockerfile:1  
   
   FROM golang:1.17-alpine  
   WORKDIR /app  
   COPY go.mod . /  
   RUN go mod download  
   COPY *.go . /RUN  
   RUN go build -o /high-temperature-detector  
   EXPOSE 11111  
   CMD [ "/high-temperature-detector" ]
   ```
4. To generate a `docker image` using the `Dockerfile` file, execute the following command.
   ```bash
   docker build --tag high-temperature-detector:v0.0.1
   ```
5. After that we load the `docker image` into the cluster with the following command.
   ```bash
   kind load docker-image high-temperature-detector:v0.0.1
   ```
6. To run the data acquisition program we wrote, run the following command.
   ```bash
   kubectl run high-temperature-detector --image=high-temperature-detector:v0.0.1
   ```
7. Finally, to view the logs of the program and get the data, we need to execute the following command:
   ```bash
   kubectl logs high-temperature-detector -f
   ```
   The result of the data obtained is as follows.
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
