# Shifu Cloud 初面演示

在 2022.10.18，[Shifu Cloud](https://shifu.cloud) 正式公测，***Shifu*** 的用户可以方便的通过可视化的方式选择需要接入的设备，即可快速完成设备接入 ***Shifu*** 的流程。

在这一天的线上直播展示中，来自边无际的杨希杰演示使用 [Shifu Cloud](https://shifu.cloud) 接入三个实际的设备，并在其基础上进行应用开发。下面让我们一起来回顾这一过程吧——

## 创建集群 安装shifu

在使用 [Shifu Cloud](https://shifu.cloud) 前，我们需要先确保已有一台安装了 ***Shifu*** 的电脑。

```
# 在本地使用kind启动k8s集群
$ sudo kind create cluster --image="kindest/node:v1.24.0"

# 克隆shifu仓库并进行安装
$ git clone https://github.com/Edgenesis/shifu.git
$ cd shifu
$ sudo kubectl apply -f pkg/k8s/crd/install/shifu_install.yml
```

<img src="/blog-221018/00.png" width="100%" />

<img src="/blog-221018/01.png" width="100%" />

如果你还不了解 ***Shifu*** 的安装和本地测试的方式，你可能需要查阅 [下载安装](https://shifu.run/zh-Hans/docs/tutorials/demo-install) 和 [本机安装测试](https://shifu.run/zh-Hans/docs/guides/install-shifu-dev) 这两篇文档。

## 本机连接温湿度计和LED

<img src="/blog-221018/02.png" width="60%" />

我们要连接的设备为一个RS485的温湿度计和一个RS485的LED显示屏。温湿度计通过串口服务器连接至上位机（电脑），LED显示屏则通过RS485转USB的芯片连接至上位机。具体细节不做展开，在上位机开启HTTP服务之后：

- 访问`localhost:23330/temperature`即可得到温湿度计的温度
- 访问`localhost:23330/humidity`即可得到温湿度计的湿度
- 访问`localhost:23331/setfloat\?value=123.4`value填入需要显示的数字即可在LED上显示

```
curl localhost:23330/temperature
curl localhost:23330/humidity
curl localhost:23331/setfloat\?value=123.4
```

<img src="/blog-221018/03.png" width="100%" />

接下来我们要将这两个设备接入 ***Shifu***，也即将两个实际的设备（***edgeDevice***s）转为k8s集群中的数字孪生（***deviceShifu***s）。

## 一键生成配置文件

[Shifu Cloud](https://shifu.cloud/)可以轻松生成 ***deviceShifu*** 的配置文件。

登录之后点击所有项目，即可添加设备。对于上面的两个设备，采用的都是HTTP协议，所以选择「公有协议 > HTTP」。「基础信息 > 设备名称」中分别填入`my_thermometer`和`my_led`。设备的IP地址不能填写`localhost`，而是需要在电脑的网络设置中找到本机IP：如演示时使用的是`192.168.0.123:23330`和`192.168.0.123:23331`。

<img src="/blog-221018/04-1.png" width="50%" />
<img src="/blog-221018/04-2.png" width="50%" />

<img src="/blog-221018/04-3.png" width="50%" />
<img src="/blog-221018/04-4.png" width="50%" />

信息填写完毕后，网站会弹出一条命令，点击右侧按钮复制到终端执行，即可将设备部署到本机的k8s集群。这省去了手动编写YAML配置文件的时间，也更加直观。

<img src="/blog-221018/04-5.png" width="70%" />

<img src="/blog-221018/04-6.png" width="70%" />

<img src="/blog-221018/04-7.png" width="100%" />

<img src="/blog-221018/04-8.png" width="70%" />

## 测试设备正常接入

我们进入到集群中查看是否可以使用集群内的网络地址访问到两个设备的数字孪生：

```
# 运行一个nginx容器
$ sudo kubectl run --image=nginx:1.21 nginx
# 进入nginx容器
$ sudo kubectl exec -it nginx -- bash
# 与设备进行交互
$ curl http://deviceshifu-mythermometer-service.deviceshifu.svc.cluster.local/humidity
$ curl http://deviceshifu-mythermometer-service.deviceshifu.svc.cluster.local/temperature
$ curl http://deviceshifu-myled-service.deviceshifu.svc.cluster.local/setfloat?value=321
```

可以看到温湿度计的读数与LED的示数设置都没有问题，这说明设备已成功接入转为数字孪生。

## 打包应用镜像

我们希望在有温湿度计和LED的基础上进行应用开发，因此我们写出如下的Python程序：

`main.py`

```py
import time
import requests
import json

isLocal = False
localIp = "192.168.0.123"
flag = -1
while True:
    flag += 1

    # [拿到数据]
    if flag % 2 == 0:
        # 拿到温度
        url = f"http://{localIp}:23330/temperature" if isLocal else "http://deviceshifu-mythermometer-service.deviceshifu.svc.cluster.local/temperature"
    else:
        # 拿到湿度
        url = f"http://{localIp}:23330/humidity" if isLocal else "http://deviceshifu-mythermometer-service.deviceshifu.svc.cluster.local/humidity"
    res = requests.get(url)

    # [转换数据]
    try:
        value = json.loads(res.text)['value']
        print("DEBUG", value)
        # [显示数据]
        led_url = f"http://{localIp}:23331/setfloat?value={value}" if isLocal else f"http://deviceshifu-myled-service.deviceshifu.svc.cluster.local/setfloat?value={value}"
        requests.get(led_url)
    except:
        print("DEBUG", res.text)

    time.sleep(2)
```

该程序每2秒交替读取温湿度计的温度和湿度，并将读到的数据显示到LED上。

接下来我们希望将这个程序打包为一个镜像，之后就可以导入集群运行了：

`requirements.txt`

```
requests
```

`Dockerfile`

```dockerfile
FROM python:3.9-slim-bullseye

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
CMD ["python3", "main.py"]
```

```
# 构建镜像
$ sudo docker build -t xxx/connection:v0.0.1 .
# 确认镜像已构建
$ sudo docker images | grep connection
xxx/connection  v0.0.1  a9526147ddad  2 minutes ago  125MB
# 将镜像载入集群
$ sudo kind load docker-image xxx/connection:v0.0.1
# 将镜像实例化为容器运行
$ sudo kubectl run --image=xxx/connection:v0.0.1 connection-name
```

<img src="/blog-221018/05.png" width="60%" />

## 接入摄像头

接下来我们希望接入海康威视摄像头进行监控的操控。该摄像头并没有在笔者的手边，而是通过Wi-Fi的方式无线连接。

可以看到 [Shifu Cloud](https://shifu.cloud) 支持了海康威视这个模块，点击后配置摄像头ip地址、用户名和密码即可一键接入。演示中的设备名称为 `mycamera`。

```
# 进入nginx容器
$ sudo kubectl exec -it nginx -- bash
# 查看摄像头信息
$ curl http://deviceshifu-mycamera-service.deviceshifu.svc.cluster.local/info
```

这说明海康威视的摄像头已经接入了 ***Shifu*** 并转为了一个数字孪生。

<img src="/blog-221018/06-0.png" width="100%" />

## 控制摄像头位置

紧接着，我们希望调整摄像头的拍摄位置，使用`move/up` `move/down` `move/left` `move/right`这样的API即可控制摄像头的朝向：

```
$ curl http://deviceshifu-mycamera-service.deviceshifu.svc.cluster.local/move/up
```

为了查看效果，我们在电脑开启视频播放器，打开该串流地址：`rtsp://<user_name>:<password>@<ip_address>`。在 `macOS` 中，我们可以打开 `IINA.app`，菜单栏 > Open Url... > paste and enter，即可打开实时的监控视频码流。

可以看到，摄像头的位置确实发生了变化，我们成功的将实际摄像头的位置调整到了需要查看的朝向（右上角的相机从朝向天花板到朝向桌面上的显示器背侧）。

<img src="/blog-221018/06-1.png" width="100%" />
<img src="/blog-221018/06-2.png" width="100%" />

## 总结

在此次展示中，我们使用 [Shifu Cloud](https://shifu.cloud) 接入了三个设备，如果您与Meetup线下接入做对比，您会发现接入速度和门槛明显降低。

[Shifu Cloud](https://shifu.cloud) 还加入了啊哈时刻，在您初步熟悉整个网站的过程中提供帮助。

<img src="/blog-221018/07-1.png" width="100%" />
<img src="/blog-221018/07-2.png" width="100%" />

此外，[Shifu Cloud](https://shifu.cloud) 还在不断发展，后续将逐渐支持：

- 更多的协议支持（边无际与开源社区都会不断增加支持的协议，提高快速接入的覆盖率）
- 应用开发的支持（此次我们开发应用还是在本地进行应用打包，但是之后我们也可以直接在 [shifu.cloud](https://shifu.cloud) 进行便捷的应用开发）
- 应用商店支持（其中包含开发者上传的自己开发的应用或者第三方插件，使用者可以一键安装）

感谢您看到这里，让我们一起期待 [Shifu Cloud](https://shifu.cloud) 的未来吧！
