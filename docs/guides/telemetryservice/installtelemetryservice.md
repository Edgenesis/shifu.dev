# Deploy Telemetry Services
:::caution
Make sure you have ***shifu*** installed first. If you not Install ***shifu***, please have a look [Local Installation Test](../install-shifu-dev.md)
:::

## What is Telemetry Services

`TelemetryService` is part of the `Shifu` CRD. It describes a service endpoint which ***deviceShifu*** can push data to using the telemetry configuration.


## Install Telemetry Service

***Shifu*** provides a one-click installation where you can use the following command to install ***telemetryService*** into your cluster.

```bash
kubectl apply -f examples/telemetryservice
```
