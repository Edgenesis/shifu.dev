# Metrics Authentication and Authorization

## Introduction

Shifu's controller exposes a `/metrics` endpoint that provides Prometheus-compatible metrics for monitoring the controller's health and performance. Beginning with Shifu v0.81.0, this endpoint enforces built-in authentication and authorization.

:::note Shifu v0.81.0+
The authenticated metrics endpoint ships with Shifu v0.81.0 and later. Earlier releases expose metrics without the authentication and authorization flow described here.
:::

**Key Features:**
- **Authentication**: All requests are authenticated using Kubernetes TokenReview
- **Authorization**: Access is controlled via RBAC using SubjectAccessReview
- **HTTP by default**: Metrics are served over HTTP (port 8080) to avoid certificate issues
- **Optional HTTPS**: Can be enabled with cert-manager for encrypted transport

:::info
Authentication and authorization are **always enabled**, regardless of whether you use HTTP or HTTPS. This ensures that only authorized users and service accounts can access metrics.
:::

## Default Configuration (HTTP)

By default, Shifu serves metrics on **HTTP port 8080** with authentication enabled. This configuration works out-of-the-box without additional setup and is suitable for most deployments where metrics scraping happens within a trusted cluster network.

### Why HTTP by Default?

When using HTTPS without cert-manager, controller-runtime generates self-signed certificates that only contain `localhost` and `127.0.0.1` as Subject Alternative Names (SANs). This causes x509 validation errors when Prometheus or other tools try to scrape metrics using the service DNS name (e.g., `shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local`).

HTTP avoids these certificate issues while still maintaining security through authentication and authorization.

## How Authentication Works

The metrics endpoint uses Kubernetes' built-in authentication mechanisms:

1. **TokenReview**: Verifies the bearer token sent by the client is valid
2. **SubjectAccessReview**: Checks if the authenticated identity has permission to access `/metrics`

This means that **every request must include a valid Kubernetes ServiceAccount token** and the ServiceAccount must have the appropriate RBAC permissions.

### Access Without Authorization

If you try to access metrics without proper authorization:

```bash
$ kubectl exec -it deploy/prometheus -n monitoring -- \
  curl -k http://shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local:8080/metrics

Unauthorized
```

## Granting Metrics Access

To allow a ServiceAccount to access metrics, you need to bind it to the `shifu-crd-metrics-reader` ClusterRole.

### Step 1: Create a ServiceAccount

Create a ServiceAccount in the namespace where your monitoring tool runs:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: prometheus
  namespace: monitoring
```

### Step 2: Create a ClusterRoleBinding

Bind the ServiceAccount to the `shifu-crd-metrics-reader` ClusterRole:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: prometheus-metrics-reader
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: shifu-crd-metrics-reader
subjects:
- kind: ServiceAccount
  name: prometheus
  namespace: monitoring
```

Apply both resources:

```bash
kubectl apply -f prometheus-sa.yaml
kubectl apply -f prometheus-metrics-binding.yaml
```

### Step 3: Configure Prometheus to Use the ServiceAccount

Update your Prometheus deployment to use the ServiceAccount:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  template:
    spec:
      serviceAccountName: prometheus  # Use the ServiceAccount we created
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        # ... rest of configuration
```

### Step 4: Add Scrape Configuration

Configure Prometheus to scrape the Shifu controller metrics:

```yaml
scrape_configs:
  - job_name: 'shifu-controller'
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
          - shifu-crd-system
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        regex: shifu-crd-controller-manager-metrics-service
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        regex: http
        action: keep
    scheme: http
```

### Verification

Test that the ServiceAccount can now access metrics:

```bash
$ kubectl exec -it deploy/prometheus -n monitoring -- \
  curl -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  http://shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local:8080/metrics

# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 2.5875e-05
...
```

## Optional: Enabling HTTPS with Cert-Manager

For production environments requiring encrypted metrics, you can enable HTTPS with cert-manager. This configuration:

1. Serves metrics on port 8443 with TLS
2. Generates valid certificates with correct DNS names as SANs
3. Maintains authentication and authorization

### Prerequisites

Install cert-manager in your cluster:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.18.2/cert-manager.yaml
```

Wait for cert-manager to be ready:

```bash
kubectl wait --for=condition=Available --timeout=300s \
  deployment/cert-manager -n cert-manager
```

### Enable HTTPS in Shifu

Edit `pkg/k8s/crd/config/default/kustomization.yaml` and uncomment the cert-manager sections:

```yaml
resources:
# Uncomment the following lines
- ../certmanager

patches:
# Uncomment the following patches
- path: cert_metrics_manager_patch.yaml
  target:
    kind: Deployment
- path: cert_metrics_service_patch.yaml
  target:
    kind: Service
    name: controller-manager-metrics-service

# Uncomment the replacements section
replacements:
- source:
    kind: Service
    version: v1
    name: controller-manager-metrics-service
    fieldPath: metadata.name
  targets:
    - select:
        kind: Certificate
        group: cert-manager.io
        version: v1
        name: metrics-certs
      fieldPaths:
        - spec.dnsNames.0
        - spec.dnsNames.1
      options:
        delimiter: '.'
        index: 0
        create: true
# ... (rest of replacements)
```

### Redeploy Shifu

Apply the updated configuration:

```bash
cd pkg/k8s/crd
make deploy IMG=edgehub/shifu-controller:nightly
```

### Update Prometheus Configuration

Update the scrape configuration to use HTTPS:

```yaml
scrape_configs:
  - job_name: 'shifu-controller'
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      insecure_skip_verify: false  # Certificate is now valid!
    kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
          - shifu-crd-system
    relabel_configs:
      - source_labels: [__meta_kubernetes_service_name]
        regex: shifu-crd-controller-manager-metrics-service
        action: keep
      - source_labels: [__meta_kubernetes_endpoint_port_name]
        regex: https  # Changed from 'http' to 'https'
        action: keep
```

## Troubleshooting

### "Unauthorized" Error

**Problem**: Metrics endpoint returns `Unauthorized`

**Solution**: This means authentication failed. Ensure your request includes a valid bearer token:

```bash
# Include the ServiceAccount token in the request
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
curl -H "Authorization: Bearer $TOKEN" http://metrics-service:8080/metrics
```

### "Forbidden" Error

**Problem**: Metrics endpoint returns `Forbidden`

**Solution**: This means authentication succeeded, but authorization failed. The ServiceAccount doesn't have permission to access `/metrics`. Create a ClusterRoleBinding:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: my-app-metrics-reader
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: shifu-crd-metrics-reader
subjects:
- kind: ServiceAccount
  name: my-app
  namespace: my-namespace
```

### x509 Certificate Errors (HTTPS)

**Problem**: `x509: certificate is valid for localhost, not shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local`

**Solution**: This happens when you enable `--metrics-secure=true` without cert-manager. Either:

1. **Use HTTP (recommended for most cases)**: Keep the default configuration
2. **Enable cert-manager**: Follow the HTTPS setup guide above

### Connection Refused

**Problem**: `Connection refused` when trying to access metrics

**Solution**: Check that the Shifu controller is running:

```bash
kubectl get pods -n shifu-crd-system
kubectl logs -n shifu-crd-system deploy/shifu-crd-controller-manager
```

Check the service exists:

```bash
kubectl get svc -n shifu-crd-system shifu-crd-controller-manager-metrics-service
```

## Complete Example: Prometheus with Metrics Access

Here's a complete example of deploying Prometheus with metrics access:

### 1. Create Monitoring Namespace

```bash
kubectl create namespace monitoring
```

### 2. Create ServiceAccount and RBAC

```yaml
# prometheus-rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: prometheus
  namespace: monitoring
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: prometheus-metrics-reader
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: shifu-crd-metrics-reader
subjects:
- kind: ServiceAccount
  name: prometheus
  namespace: monitoring
```

### 3. Create Prometheus ConfigMap

```yaml
# prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'shifu-controller'
        kubernetes_sd_configs:
          - role: endpoints
            namespaces:
              names:
              - shifu-crd-system
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_name]
            regex: shifu-crd-controller-manager-metrics-service
            action: keep
          - source_labels: [__meta_kubernetes_endpoint_port_name]
            regex: http
            action: keep
        scheme: http
```

### 4. Deploy Prometheus

```yaml
# prometheus-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        ports:
        - containerPort: 9090
        volumeMounts:
        - name: config
          mountPath: /etc/prometheus
      volumes:
      - name: config
        configMap:
          name: prometheus-config
```

### 5. Apply All Resources

```bash
kubectl apply -f prometheus-rbac.yaml
kubectl apply -f prometheus-config.yaml
kubectl apply -f prometheus-deployment.yaml
```

### 6. Verify Metrics Collection

Port-forward to Prometheus:

```bash
kubectl port-forward -n monitoring deploy/prometheus 9090:9090
```

Open http://localhost:9090 and check that the `shifu-controller` target is up and scraping metrics successfully.

## Summary

- **Metrics are always authenticated and authorized**, regardless of HTTP or HTTPS
- **Default configuration uses HTTP (port 8080)** to avoid certificate issues
- **Grant access** by binding ServiceAccounts to the `shifu-crd-metrics-reader` ClusterRole
- **HTTPS is optional** and requires cert-manager for valid certificates
- **Authentication errors** (`Unauthorized`) mean the token is missing or invalid
- **Authorization errors** (`Forbidden`) mean the ServiceAccount lacks permissions

For more information about the metrics system, see the [controller-runtime metrics documentation](https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.22.1/pkg/metrics).
