# 推送至 TDengine

## 创建TelemetryService Yaml 文件
```yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: TelemetryService
metadata:
  name: push-endpoint-1
  namespace: devices
spec:
  telemetrySeriveEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    SQLSetting:
      serverAddress: 192.168.14.163:6041
      username: root
      secret: taosdata
      dbName: shifu
      dbTable: testTable2
      dbtype: TDengine
```

- `telemetrySeriveEndpoint` 是telemetryService的端点地址
- `serverAddress` 表示数据库地址
- `username` 表示你的数据库用户名
- `secret` 表示你的数据库密码
- `dbName` 表示数据库名 
- `dbTable` 表示数据库表（table）名
- `dbtype` 表示数据库类型

:::note
如果你有多个遥测服务，你可以把它们写在一个文件里，用`---`把它们分割该文件文件。
:::

## 编辑Configmap Yaml文件
```yaml
# configmap.yaml
data:
  telemetries: |
    telemetries:
      device_health1:
        properties:
          instruction: status
          pushSettings:
            telemetryCollectionService: push-endpoint-1 # Edit it to the name same with TelemetryService's name
```
然后编辑 Configmap.yaml 文件，确保 telemetryCollectionService 的值与你在上一步创建的遥测服务的名称相同。

## 再次部署deviceShifu

然后你需要再次部署 deviceShifu ，这样遥测就会将采集到的数据推送到遥测服务，并将其发布到你的 TDengine数据库中。

##例子

下面是一个例子，帮助你更好地了解如何使用它。

[https://github.com/Edgenesis/shifu/tree/main/examples/tdengineTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/tdengineTelemetryService/deployment)
