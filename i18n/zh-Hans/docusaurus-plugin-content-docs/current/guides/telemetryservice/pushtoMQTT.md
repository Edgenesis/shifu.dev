# 推送至 MQTT

## 创建TelemetryService Yaml 文件
```yaml
#telemetry_service.yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: TelemetryService
metadata:
  name: push-endpoint-1 # tag
  namespace: devices
spec:
  telemetryServiceEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    MQTTSetting:
      MQTTServerAddress: 192.168.14.163:1883 # 将其修改为 MQTT Broker 的地址
      MQTTTopic: /test/test # 将其修改为你发布数据的主题
```

- `telemetrySeriveEndpoint` 是telemetryService的端点地址。
- `MQTTServerAddress` 表示你的MQTT Broker的地址。
- `MQTTTopic` 表示你发布原始数据的主题。
- `MQTTServerSecret`(可选) 表示你想要用来连接到MQTT Broker的secret名称。
- `MQTTServerUserName`(可选) 表示你要用来连接到MQTT Broker的用户名。secret中的`username` 将覆盖此字段。
- `MQTTServerPassword`(可选) 表示你想要用来连接到MQTT Broker的密码。secret中的`password` 将覆盖此字段。

## 创建Secret

`username` 和 `password` 是你想要用来连接到MQTT Broker的用户名和密码。如果你的MQTT Broker只需要其中一个，那么这两个是可选的。

```bash
kubectl create secret generic mqtt-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::note
如果你有多个遥测服务，你可以把它们写在一个文件里，用`---`进行分割。
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
           telemetryCollectionService: push-endpoint-1 # 将其修改为你刚创建TelemetryService的名字(# tag)
```
然后编辑 Configmap.yaml 文件，确保 telemetryCollectionService 的值与你在上一步创建的遥测服务的名称相同。

## 再次部署deviceShifu

然后你需要再次部署deviceShifu，这样TelemetryService就会将采集到的数据发布到你的 MQTT Broker 中。

## 例子

下面是一个例子，帮助你更好地了解如何使用它。

[https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu/deployment)
