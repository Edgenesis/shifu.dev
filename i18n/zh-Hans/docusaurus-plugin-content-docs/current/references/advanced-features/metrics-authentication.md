# 指标认证与授权

## 介绍

Shifu 控制器会暴露一个 `/metrics` 端点,提供与 Prometheus 兼容的指标,用于监控控制器的健康状况和性能。从 Shifu v0.81.0 起,该端点强制执行内置的认证与授权。

:::note 自 Shifu v0.81.0 起
经过认证的 `/metrics` 端点随 Shifu v0.81.0 及更高版本提供。在此之前的版本不会启用本文介绍的认证与授权流程。
:::

**主要特性:**
- **认证**: 所有请求都使用 Kubernetes TokenReview 进行认证
- **授权**: 通过 RBAC 使用 SubjectAccessReview 控制访问
- **默认使用 HTTP**: 指标通过 HTTP(端口 8080)提供服务,以避免证书问题
- **可选 HTTPS**: 可以通过 cert-manager 启用加密传输

:::info
无论您使用 HTTP 还是 HTTPS,认证和授权**始终启用**。这确保只有授权的用户和服务账户才能访问指标。
:::

## 默认配置(HTTP)

默认情况下,Shifu 在 **HTTP 端口 8080** 上提供指标服务,并启用认证。此配置无需额外设置即可开箱即用,适用于大多数在受信任集群网络内进行指标采集的部署。

### 为什么默认使用 HTTP?

在不使用 cert-manager 的情况下使用 HTTPS 时,controller-runtime 会生成自签名证书,这些证书仅包含 `localhost` 和 `127.0.0.1` 作为主体备用名称(SAN)。当 Prometheus 或其他工具尝试使用服务 DNS 名称(例如 `shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local`)采集指标时,这会导致 x509 验证错误。

HTTP 避免了这些证书问题,同时仍然通过认证和授权保持安全性。

## 认证工作原理

指标端点使用 Kubernetes 的内置认证机制:

1. **TokenReview**: 验证客户端发送的 bearer token 是否有效
2. **SubjectAccessReview**: 检查已认证的身份是否有权限访问 `/metrics`

这意味着**每个请求都必须包含有效的 Kubernetes ServiceAccount token**,并且 ServiceAccount 必须具有适当的 RBAC 权限。

### 未授权的访问

如果您尝试在没有适当授权的情况下访问指标:

```bash
$ kubectl exec -it deploy/prometheus -n monitoring -- \
  curl -k http://shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local:8080/metrics

Unauthorized
```

## 授予指标访问权限

要允许 ServiceAccount 访问指标,您需要将其绑定到 `shifu-crd-metrics-reader` ClusterRole。

### 步骤 1: 创建 ServiceAccount

在您的监控工具运行的命名空间中创建 ServiceAccount:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: prometheus
  namespace: monitoring
```

### 步骤 2: 创建 ClusterRoleBinding

将 ServiceAccount 绑定到 `shifu-crd-metrics-reader` ClusterRole:

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

应用这两个资源:

```bash
kubectl apply -f prometheus-sa.yaml
kubectl apply -f prometheus-metrics-binding.yaml
```

### 步骤 3: 配置 Prometheus 使用 ServiceAccount

更新您的 Prometheus 部署以使用 ServiceAccount:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  template:
    spec:
      serviceAccountName: prometheus  # 使用我们创建的 ServiceAccount
      containers:
      - name: prometheus
        image: prom/prometheus:latest
        # ... 其余配置
```

### 步骤 4: 添加采集配置

配置 Prometheus 采集 Shifu 控制器指标:

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

### 验证

测试 ServiceAccount 现在可以访问指标:

```bash
$ kubectl exec -it deploy/prometheus -n monitoring -- \
  curl -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  http://shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local:8080/metrics

# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 2.5875e-05
...
```

## 可选: 使用 Cert-Manager 启用 HTTPS

对于需要加密指标的生产环境,您可以使用 cert-manager 启用 HTTPS。此配置:

1. 在端口 8443 上通过 TLS 提供指标服务
2. 生成具有正确 DNS 名称作为 SAN 的有效证书
3. 保持认证和授权

### 前提条件

在集群中安装 cert-manager:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.18.2/cert-manager.yaml
```

等待 cert-manager 准备就绪:

```bash
kubectl wait --for=condition=Available --timeout=300s \
  deployment/cert-manager -n cert-manager
```

### 在 Shifu 中启用 HTTPS

编辑 `pkg/k8s/crd/config/default/kustomization.yaml` 并取消注释 cert-manager 部分:

```yaml
resources:
# 取消注释以下行
- ../certmanager

patches:
# 取消注释以下补丁
- path: cert_metrics_manager_patch.yaml
  target:
    kind: Deployment
- path: cert_metrics_service_patch.yaml
  target:
    kind: Service
    name: controller-manager-metrics-service

# 取消注释 replacements 部分
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
# ... (其余 replacements)
```

### 重新部署 Shifu

应用更新的配置:

```bash
cd pkg/k8s/crd
make deploy IMG=edgehub/shifu-controller:nightly
```

### 更新 Prometheus 配置

更新采集配置以使用 HTTPS:

```yaml
scrape_configs:
  - job_name: 'shifu-controller'
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      insecure_skip_verify: false  # 证书现在有效!
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
        regex: https  # 从 'http' 改为 'https'
        action: keep
```

## 故障排除

### "Unauthorized" 错误

**问题**: 指标端点返回 `Unauthorized`

**解决方案**: 这意味着认证失败。确保您的请求包含有效的 bearer token:

```bash
# 在请求中包含 ServiceAccount token
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
curl -H "Authorization: Bearer $TOKEN" http://metrics-service:8080/metrics
```

### "Forbidden" 错误

**问题**: 指标端点返回 `Forbidden`

**解决方案**: 这意味着认证成功,但授权失败。ServiceAccount 没有访问 `/metrics` 的权限。创建 ClusterRoleBinding:

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

### x509 证书错误(HTTPS)

**问题**: `x509: certificate is valid for localhost, not shifu-crd-controller-manager-metrics-service.shifu-crd-system.svc.cluster.local`

**解决方案**: 这发生在不使用 cert-manager 的情况下启用 `--metrics-secure=true` 时。您可以:

1. **使用 HTTP(大多数情况下推荐)**: 保持默认配置
2. **启用 cert-manager**: 按照上面的 HTTPS 设置指南操作

### 连接被拒绝

**问题**: 尝试访问指标时出现 `Connection refused`

**解决方案**: 检查 Shifu 控制器是否正在运行:

```bash
kubectl get pods -n shifu-crd-system
kubectl logs -n shifu-crd-system deploy/shifu-crd-controller-manager
```

检查服务是否存在:

```bash
kubectl get svc -n shifu-crd-system shifu-crd-controller-manager-metrics-service
```

## 完整示例: 具有指标访问权限的 Prometheus

以下是部署具有指标访问权限的 Prometheus 的完整示例:

### 1. 创建监控命名空间

```bash
kubectl create namespace monitoring
```

### 2. 创建 ServiceAccount 和 RBAC

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

### 3. 创建 Prometheus ConfigMap

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

### 4. 部署 Prometheus

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

### 5. 应用所有资源

```bash
kubectl apply -f prometheus-rbac.yaml
kubectl apply -f prometheus-config.yaml
kubectl apply -f prometheus-deployment.yaml
```

### 6. 验证指标收集

端口转发到 Prometheus:

```bash
kubectl port-forward -n monitoring deploy/prometheus 9090:9090
```

打开 http://localhost:9090 并检查 `shifu-controller` 目标是否正常运行并成功采集指标。

## 总结

- **指标始终经过认证和授权**,无论是 HTTP 还是 HTTPS
- **默认配置使用 HTTP(端口 8080)** 以避免证书问题
- **授予访问权限**需要将 ServiceAccount 绑定到 `shifu-crd-metrics-reader` ClusterRole
- **HTTPS 是可选的**,需要 cert-manager 来生成有效证书
- **认证错误**(`Unauthorized`)表示 token 缺失或无效
- **授权错误**(`Forbidden`)表示 ServiceAccount 缺少权限

有关指标系统的更多信息,请参阅 [controller-runtime 指标文档](https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.22.1/pkg/metrics)。
