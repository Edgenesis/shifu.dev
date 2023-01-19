# 推送至 MinIO

## 创建TelemetryService Yaml 文件
```yaml
#telemetry_service.yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: TelemetryService
metadata:
  name: push-file-mp4
  namespace: devices
spec:
  telemetrySeriveEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    # deviceShifu发送给TelemetryService请求的超时时间(ms)
    RequestTimeout: 20000
    MinIOSetting:
      # 上传到的Bucket
      Bucket: test-bucket
      # 上传的文件的后缀名
      FileExtension: mp4
      # MinIO服务的地址
      EndPoint: minio-1673579889.data.svc.cluster.local:9000
      # 你可以指定一个Secret或者是直接指定APIId和APIKey
      Secret: minio-secret
```

## 创建Secret

你需要在`username`和`password`域中填写你的AccessId和AccessKey(在GUI中创建),或你可以直接填写安装MinIO时指定的用户名和密码

```bash
kubectl create secret generic minio-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::note
如果你有多个遥测服务，你可以把它们写在一个文件里，用`---`把它们分割该文件。
:::

## 编辑Configmap Yaml文件
```yaml
# configmap.yaml
data:
  telemetries: |
    telemetrySettings:
      # 每次遥测服务的间隔时间
      telemetryUpdateIntervalInMilliseconds: 10000
      # shifuDevice从edgeDevice获得文件内容的请求的超时时间
      telemetryTimeoutInMilliseconds: 20000
    telemetries:
      push-file:
        properties:
          # 访问你的edgeDevice的这个方法,获得要发送给telemetryService的数据
          instruction: get_file
          pushSettings:
            # 将其修改为你刚创建TelemetryService的名字
            telemetryCollectionService: push-file-mp4
```

## 再次部署deviceShifu

然后你需要再次部署 deviceShifu ，这样遥测就会将采集到的文件内容发送给TelemetryService然后存到MinIO中.文件名会按`device_name/time.FileExtension`的格式存入对应的Bucket内.

## 例子

下面是一个例子，帮助你更好地了解如何使用它。如果你想测试可以在本地运行mockdevice.go然后修改edgedevice.yaml中的address,改为自己本地的IP即可.

[https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment)
