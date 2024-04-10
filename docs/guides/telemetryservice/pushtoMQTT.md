# To MQTT

***Shifu*** can push your data from telemetry to your MQTT Broker

## Create TelemetryService Yaml file
```yaml
#telemetry_service.yaml
apiVersion: shifu.edgenesis.io/v1alpha1
kind: TelemetryService
metadata:
  name: push-endpoint-1 # tag
  namespace: devices
spec:
  telemetrySeriveEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    MQTTSetting:
      MQTTServerAddress: 192.168.14.163:1883 # Edit it to your IP
      MQTTTopic: /test/test # Edit it to your topic which you want to publish
```
`telemetrySeriveEndpoint` is telemetry service endpoint address.
`MQTTServerAddress` is your MQTT Broker's address.
`MQTTTopic` is the topic which you want to publish the rawdata to.
`MQTTServerSecret`(optional) is the secret name which you want to use to connect to your MQTT Broker. Or you can set your password in this field directly.
`MQTTServerUserName`(optional) is the username which you want to use to connect to your MQTT Broker. `username` in secret will overwrite this field.

## Create Secret

`username` and `password` is the username and password which you want to use to connect to your MQTT Broker. Those are optional if your MQTT Broker doesn't need one of them.

```bash
kubectl create secret generic mqtt-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::note
If you have multiple telemetry services, you can write them in one file and split them in one file using `---`.
:::

## Edit Configmap Yaml file
```yaml
# configmap.yaml
data:
  telemetries: |
    telemetries:
      device_health1:
        properties:
          instruction: status
          pushSettings:
           telemetryCollectionService: push-endpoint-1 # Edit it to the name same with TelemetryService's name(# tag)
```
Then edit the Configmap yaml file and make sure that the telemetryCollectionService value is the same as the name of the telemetry service you created in the previous step.

## deploy deviceShifu again

Then you need to deploy deviceShifu again so that the telemetry will push raw data to the telemetry service and publish it to your MQTT broker.

## examples

Here is an example of how to use.

[https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/httpDeviceShifu/deployment)
