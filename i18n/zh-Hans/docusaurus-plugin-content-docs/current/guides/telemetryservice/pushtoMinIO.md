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
    MinIOSetting:
      # MinIO服务使用的Secret，或者你可以指定AccessKey和SecretKey
      Secret: minio-secret
      # deviceShifu发送给TelemetryService的请求的超时时间
      RequestTimeoutMS: 2500
      # 你要上传到的Bucket
      Bucket: test-bucket
      # 上传的文件后缀名
      FileExtension: mp4
      # MinIO服务的地址
      ServerAddress: minio.data.svc.cluster.local:9000
```

## 创建Secret
在`username`和`password`域中填写在MinIO GUI中创建的AccessId和AccessKey，或者直接填写安装MinIO时指定的用户名和密码。
```bash
kubectl create secret generic minio-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::note
如果你有多个遥测服务，你可以把它们写在一个文件里，用`---`进行分割。
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
      telemetryTimeoutInMilliseconds: 2500
    telemetries:
      push-file:
        properties:
          # 访问你的edgeDevice的这个方法,获得要发送给TelemetryService的数据
          instruction: get_file_mp4
          pushSettings:
            # 将其修改为你刚创建TelemetryService的名字
            telemetryCollectionService: push-file-mp4
```

## 再次部署deviceShifu
然后你需要再次部署 deviceShifu ，这样TelemetryService就会将采集到的文件内容存到MinIO中。
文件名会按`{device-name}/{time(RFC3339)}.{file-extension}`的格式存入对应的Bucket内。

## 例子
下面是一个例子，帮助你更好地了解如何使用它。如果你想测试可以在本地运行mockdevice.go然后修改edgedevice.yaml中的address，改为自己本地的IP即可。

[https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment)
