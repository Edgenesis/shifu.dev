# To TDengine

***Shifu*** can push data from your device to a TDengine database.

## Create TelemetryService Yaml file
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
- `telemetrySeriveEndpoint` is telemetry service endpoint address
- `serverAddress` is the database address
- `username` is your database username
- `secret` is your database password
- `dbName` is the name of the database
- `dbTable` is the table name of the database
- `dbType` is the type of the database
  

:::note
If you have multiple telemetry services, you can write them in one file and split them in one file using `---`.
:::

:::note use secret to store password

Create a `Secret` using your telemetry name with `telemetry-` prefix like `telemetry-push-endpoint-1`, with `password` field filled by your password, and it will overwrite the `SQLSetting.secret` in `TelemetryService`.

```bash
kubectl create secret generic telemetry-push-endpoint-1 --from-literal=password=your_password -n deviceshifu
```

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
            telemetryCollectionService: push-endpoint-1 # Edit it to the name same with TelemetryService's name
```
Then edit the Configmap yaml file and make sure that the telemetryCollectionService value is the same as the name of the telemetry service you created in the previous step.

## deploy deviceShifu again

Then you need to deploy deviceShifu again so that the telemetry will push raw data to the telemetry service and publish it to your TDengine database.

## examples

Here is an example to help you better know how to use it.

[https://github.com/Edgenesis/shifu/tree/main/examples/tdengineTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/tdengineTelemetryService/deployment)
