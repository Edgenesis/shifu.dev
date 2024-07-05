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
  telemetryServiceEndpoint: http://telemetryservice.shifu-service.svc.cluster.local
  serviceSettings:
    MinIOSetting:
      # or you can specify AccessKey and SecretKey
      Secret: minio-secret
      # the timeout when deviceShifu send request to TelemetryService
      RequestTimeoutMS: 2500
      # the bucket which you want to upload to
      Bucket: test-bucket
      # your file's extension name
      FileExtension: mp4
      # MinIO service's address
      ServerAddress: minio.data.svc.cluster.local:9000
```

## Create Secret
you can use either MinIO's `username` and `password` or the AccessId and AccessKey created in the MinIO GUI.

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
      telemetryTimeoutInMilliseconds: 2500
    telemetries:
      push-file:
        properties:
          # deviceShifu will visit this uri for get the file's content
          instruction: get_file_mp4
          pushSettings:
            # your telemetryService's name
            telemetryCollectionService: push-file-mp4
```

## deploy deviceShifu again
Then you need to deploy deviceShifu again so that TelemetryService will store the file in the configured bucket.
The file's name will build like `{device-name}/{time(RFC3339)}.{file-extension}`.

## examples
Here is an example of how to use.

[https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment](https://github.com/Edgenesis/shifu/tree/main/examples/minioTelemetryService/deployment)
