# To MinIO

## Create TelemetryService Yaml file
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
    # the timeout(ms) when deviceShifu send to TelemetryService
    RequestTimeout: 20000
    MinIOSetting:
      # the bucket which you want to upload to
      Bucket: test-bucket
      # your file's extension
      FileExtension: mp4
      # minio service's address
      EndPoint: minio.data.svc.cluster.local:9000
      # you can specify a secret or APIId and APIKey
      Secret: minio-secret
```

## Create Secret

you need fill the `username` and `password` field, if you don't have a AccessId and AccessKey,
so you should create one in GUI,or you can fill your MinIO user's username and password.

```bash
kubectl create secret generic minio-secret --from-literal=username=your_username --from-literal=password=your_password -n devices
```

:::note
If you have multiple telemetry services, you can write them in one file and split them in one file using `---`.
:::

## Edit Configmap Yaml file
```yaml
# configmap.yaml
data:
  telemetries: |
    telemetrySettings:
      # the interval of each telemetryService request
      telemetryUpdateIntervalInMilliseconds: 10000
      # The timeout of deviceShifu sent to telemetryService
      telemetryTimeoutInMilliseconds: 20000
    telemetries:
      push-file:
        properties:
          # deviceShifu will visit this uri for get the file's content
          instruction: get_file
          pushSettings:
            # your telemetryService's name
            telemetryCollectionService: push-file-mp4
```

## deploy deviceShifu again

Then you need to deploy deviceShifu again so that deviceShifu will send the request to TelemetryService which include file's content
, then telemetryService will save the file to the bucket which you choose.
The file's name will build like `device_name/time.FileExtension`.

## examples

Here is an example of how to use.

[https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment)
