# 推送至 SQLServer

***Shifu*** 可以将您的遥测数据推送到 SQLServer 中。

## 创建 TelemetryService Yaml 文件

```yaml
#telemetry_service.yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: TelemetryService
metadata:
  name: push-endpoint-1 # 标识
  namespace: devices
spec:
  telemetryServiceEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    SQLSetting:
      serverAddress: 192.168.14.163:1433
      secret: my-secret
      dbName: shifu
      dbTable: testTable2
      dbtype: SQLServer
```

- `telemetryServiceEndpoint` 是遥测服务的终端地址
- `serverAddress` 是数据库地址
- `secret` 是存储数据库用户名和密码的 `Secret` 的名称
- `dbName` 是数据库的名称
- `dbTable` 是数据库中的表名称
- `dbType` 是数据库的类型

## 创建 Secret

创建一个名为上面 `secret` 字段的 `Secret`，其中 `username` 字段填写您的用户名，`password` 字段填写您的密码。

```bash
kubectl create secret generic sqlserver-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::注意
如果您有多个遥测服务，可以将它们写在一个文件中，并使用 `---` 进行分隔。
:::

## 编辑 Configmap Yaml 文件

```yaml
# configmap.yaml
data:
  telemetries: |
    telemetries:
      device_health1:
        properties:
          instruction: status
          pushSettings:
            telemetryCollectionService: push-endpoint-1 # 将其编辑为与 TelemetryService 的名称相同
```

然后编辑 Configmap yaml 文件，确保 `telemetryCollectionService` 的值与您在前面步骤中创建的遥测服务的名称相同。

## 重新部署 deviceShifu

然后您需要重新部署 deviceShifu，以便遥测数据将被推送到遥测服务并发布到您的 SQLServer 数据库中。