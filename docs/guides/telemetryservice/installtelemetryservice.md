# Deploy Telemetry Services
:::caution
Make sure you have ***Shifu*** installed first. If you have not installed ***Shifu***, please have a look [Local Install](../install/install-shifu-dev.md)
:::

## What is Telemetry Services

`TelemetryService` is part of the `Shifu` CRD. It describes a service endpoint which ***deviceShifu*** can push data to using the telemetry configuration.


## Install Telemetry Service

***Shifu*** provides a one-click installation where you can use the following command to install ***telemetryService*** into your cluster.

```bash
kubectl apply -f https://raw.githubusercontent.com/Edgenesis/shifu/v0.81.0/pkg/telemetryservice/install/telemetryservice_install.yaml
```
