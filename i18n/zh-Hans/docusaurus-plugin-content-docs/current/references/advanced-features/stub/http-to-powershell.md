---
title: HTTP 到 PowerShell 的中间件
sidebar_position: 1
---

# HTTP 到 PowerShell 的中间件

## 简介

为了让你的设备接入 ***Shifu***。我们用Go编写了一个简单的HTTP到 PowerShell 的中间件，供开发者使用。

### 设计

这个HTTP到PowerShell的中间件是这样设计的：

- 中间件在主机上暴露了一个HTTP接口
- 该HTTP接口用于转发来自外部的请求到 `Windows` 主机
- 中间件将代理结果和执行状态返回给请求者

### 功能

#### 将HTTP请求体代理到PowerShell shell并执行

接受HTTP请求体中的一切内容，并在规定超时时间内执行。

## 构建中间件

### 操作

`386`:

```bash
GOOS=windows GOARCH=386 go build -a -o http2powershell.exe cmd/httpstub/powershellstub/powershellstub.go
```

`amd64`:

```bash
GOOS=windows GOARCH=amd64 go build -a -o http2powershell.exe cmd/httpstub/powershellstub/powershellstub.go
```

## 使用方法

该可执行文件需要配置以下环境变量：

- `EDGEDEVICE_DRIVER_HTTP_PORT` (可选)
  - 驱动程序容器的HTTP服务器端口，默认为`11112`。
- `EDGEDEVICE_DRIVER_EXEC_TIMEOUT_SECOND` (可选)
  - 执行指令的超时时间，可以通过在命令前面加上`timeout <seconds>`来实现。

### 对于`Windows`主机的操作：

如果要运行中间件，请双击`http2powershell.exe`，默认情况下，中间件会在`0.0.0.0`上监听`11112`端口。

### 对于Shifu的操作：

使用`/examples/simple-powershell-stub`中提供的样本部署文件。

在`shifu`的根目录下发布：

```bash
kubectl apply -f driver_util/http-to-powershell-stub/examples/Simple-powershell-stub
```

### 代理命令

使用 `curl` 向`Windows`主机发布请求：

```bash
root@nginx:/# curl "edgedevice-powershell/issue_cmd?flags_no_parameter=ls,C:"
    Directory: C:\
Mode                 LastWriteTime         Length Name                                                   
----                 -------------         ------ ----                                                   
d-----          6/5/2021   8:10 PM                PerfLogs                                               
d-r---          6/9/2022   2:48 PM                Program Files                                          
d-r---         4/29/2022   8:02 PM                Program Files (x86)                                    
d-r---         4/16/2022   1:46 AM                Users                                                  
d-----          6/9/2022   2:48 PM                Windows                                                
d-----         4/17/2022   5:23 PM                xampp                                                     

root@nginx:/# curl "edgedevice-powershell/issue_cmd?flags_no_parameter=ping,8.8.8.8"

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=64ms TTL=114
Reply from 8.8.8.8: bytes=32 time=56ms TTL=114
Reply from 8.8.8.8: bytes=32 time=57ms TTL=114
Reply from 8.8.8.8: bytes=32 time=59ms TTL=114

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 56ms, Maximum = 64ms, Average = 59ms
```

### 示例

当使用 `curl` 向一个给定的URL发布请求时，命令如下：

`curl "example.com/issue_cmd?flags_no_parameter=ping,8.8.8.8`。

然后请求将从HTTP的中间件传到`Windows`主机的`PowerShell`。

`> powershell.exe ping 8.8.8.8`。

请注意，默认的定时`EDGEDEVICE_DRIVER_EXEC_TIMEOUT_SECOND`可以被URL中的`timeout`标志所覆盖，例如：

- 如果没有`timeout`标志（命令超时，输出不完整）：
    ```bash
    root@nginx:/# curl "example.com/issue_cmd?flags_no_parameter=ping,-n,6,8.8.8.8"   

    Pinging 8.8.8.8 with 32 bytes of data:
    Reply from 8.8.8.8: bytes=32 time=58ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=51ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=59ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=45ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=59ms TTL=114
    ```
- 使用`timeout`标志（输出完整）：
    ```bash
    root@nginx:/# curl "example.com/issue_cmd?timeout=10&flags_no_parameter=ping,-n,6,8.8.8.8" 

    Pinging 8.8.8.8 with 32 bytes of data:
    Reply from 8.8.8.8: bytes=32 time=60ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=60ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=59ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=59ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=59ms TTL=114
    Reply from 8.8.8.8: bytes=32 time=60ms TTL=114

    Ping statistics for 8.8.8.8:
        Packets: Sent = 6, Received = 6, Lost = 0 (0% loss),
    Approximate round trip times in milli-seconds:
        Minimum = 59ms, Maximum = 60ms, Average = 59ms
    ```

我们还添加了一个参数`stub_toleration`来处理 ***deviceShifu***和中间件之间的延迟问题。默认情况下，它被设置为`1`秒,你可以用以下方法覆盖这个时间:

```bash 
root@nginx:/# curl "example.com/issue_cmd?timeout=10&flags_no_parameter=ping,-n,6,8.8.8.8&stub_toleration=0" 
```
