# To SQLServer

***Shifu*** can push your data from telemetry to your SQLServer Broker

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
    SQLSetting:
      serverAddress: 192.168.14.163:1433
      username: sa
      secret: my-secret
      dbName: shifu
      dbTable: testTable2
      dbtype: SQLServer
```
- `telemetrySeriveEndpoint` is telemetry service endpoint address
- `serverAddress` is the database address
- `username` is your database username
- `secret` is the name of the `Secret` stored your database username and password
- `dbName` is the name of the database
- `dbTable` is the table name of the database
- `dbType` is the type of the database

## Create the Secret

Create a `Secret` named the `secret` field above with the `username` field filled by your username and the `password` field filled by your password.

```bash
kubectl create secret generic SQLServer-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
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
            telemetryCollectionService: push-endpoint-1 # Edit it to the name same with TelemetryService's name
```
Then edit the Configmap yaml file and make sure that the telemetryCollectionService value is the same as the name of the telemetry service you created in the previous step.

## deploy deviceShifu again

Then you need to deploy deviceShifu again so that the telemetry will push raw data to the telemetry service and publish it to your SQLServer database.
