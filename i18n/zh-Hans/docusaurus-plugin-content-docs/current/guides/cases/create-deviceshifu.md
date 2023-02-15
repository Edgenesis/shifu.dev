# DeviceShifu开发指南

请先阅读以下文档：

1. [contribution guide](https://github.com/Edgenesis/shifu/blob/main/docs/contribution/contributing.md)
2. [deviceshifu design](https://github.com/Edgenesis/shifu/blob/main/docs/design/design-deviceShifu.md)

## 引言

`DeviceShifu`是物理设备的数字孪生体，能接收HTTP请求，支持多协议与MQTT、OPCUA等设备之间的通信。现在各协议已支持一种新型`DeviceShifu`，点击[DeviceShifu](https://github.com/Edgenesis/shifu/tree/main/pkg/deviceshifu)以查看支持的所有协议。

## 概述

如何构建名为`deviceshifuxxx`的`DeviceShifu`：

1. [Modify CRD](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md#crd).
2. [Modify API](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md#api).
3. [Add DeviceShifu source files](https://github.com/Edgenesis/shifu/blob/main/docs/development/develop-deviceshifu.md#deviceshifu)

## 组件

为创建新型`deviceShifuxxx`（xxx代表希望支持的协议名称），需要创建或修改以下组件：

### CRD

`CRD`全称`Customized Resource Definition`。我们新建了一个CRD`edgeDevice`来定义物理设备的映射。 创建新型`deviceShifuxxx`可能需要更改`pkg/k8s/crd/`目录下的文件。

某些协议可能需要特定设置，比如`MQTT`：

```Go
  MQTTSetting:
    description: MQTTSetting defines MQTT specific settings when connecting
      to an EdgeDevice
    properties:
      MQTTServerAddress:
        type: string
      MQTTServerSecret:
        type: string
      MQTTTopic:
        type: string
    type: object
```

为使设备`ShifuXXX`接收到这些特定设置，需要在`PortocolSettings`下的`properties`文件`shifu_install.yml`、`config_crd.yaml`和`config_default.yaml`中添加setting schema。

### API

我们将Golang中的`CRD` API定义放在API目录下。对于在`CRD`中添加的所有设置，你需要将其放在 `pkg/k8s/api/v1apha1/edgedevice_types.go`中。同样以`MQTT`为例：

```Go
// ProtocolSettings defines protocol settings when connecting to an EdgeDevice
type ProtocolSettings struct {
+   MQTTSetting   *MQTTSetting   `json:"MQTTSetting,omitempty"`
    OPCUASetting  *OPCUASetting  `json:"OPCUASetting,omitempty"`
    SocketSetting *SocketSetting `json:"SocketSetting,omitempty"`
}
```

首先，将`MQTTSetting`添加到`ProtocolSettings`，然后将新写的设置结构化添加到`CRD`中：

```Go
// MQTTSetting defines MQTT specific settings when connecting to an EdgeDevice
type MQTTSetting struct {
    MQTTTopic         *string `json:"MQTTTopic,omitempty"`
    MQTTServerAddress *string `json:"MQTTServerAddress,omitempty"`
    MQTTServerSecret  *string `json:"MQTTServerSecret,omitempty"`
}
```

该结构应与在CRD中添加的setting schema保持一致。

### **DeviceShifu**

`DeviceShifu`是在k8s集群中作为pod运行的数字孪生体，基本可将HTTP请求转换为任何需要的底层协议。

#### **shifuctl**

`shifuctl`是命令行工具，可以帮助引导新的`DeviceShifu`。以下是使用方法：

1. 将环境变量`SHIFU_ROOT_DIR`设置为shifu的根目录。在Linux上：`export SHIFU_ROOT_DIR=[root directory of shifu]`。
2. 使用`shifuctl add deviceshifu--name deviceshifuxxx`引导准系统源文件。
3. 不需要修改`cmd/deviceshifu/`下的`deviceshifuxxx/main.go`文件。
4. `pkg/deviceshifu/`下的`deviceshifuxxx`目录中有4个文件，你需要相应地作出修改。

#### **deviceshifuxxx**

在`pkg/deviceshifu/deviceshifuxxx`中有4个文件，其中`deviceshifuxxx.go`和`deviceshifuxxxconfig.go`为主要文件。`deviceshifuxxx.go`主要包含程序的实际逻辑，`deviceshifuconfig.go`主要包含协议底层需要的配置。以`MQTT`为例：

[deviceshifumqttconfig.go](https://github.com/Edgenesis/shifu/blob/main/pkg/deviceshifu/deviceshifumqtt/deviceshifumqttconfig.go)

```Go
package deviceshifumqtt

// ReturnBody Body of mqtt's reply
type ReturnBody struct {
    MQTTMessage   string `json:"mqtt_message"`
    MQTTTimestamp string `json:"mqtt_receive_timestamp"`
}
```

对于`deviceshifuxxx.go`，你可按以下模式进行：创建一个名为`DeviceShifu`的结构体，并将`*deviceshifubase.DeviceShifuBase`作为其字段。 在`deviceshifubase.go`中实现`DeviceShifu`接口。`DeviceShifuBase`包含用于创建和启动`DeviceShifu`的框架代码。以`MQTT`为例：

```Go
// DeviceShifu implemented from deviceshifuBase
type DeviceShifu struct {
    base *deviceshifubase.DeviceShifuBase
}
```

你还可以添加协议特定结构，以`OPCUA`为例：

```Go
// DeviceShifu implemented from deviceshifuBase and OPC UA Setting and client
type DeviceShifu struct {
    base              *deviceshifubase.DeviceShifuBase
    opcuaInstructions *OPCUAInstructions
    opcuaClient       *opcua.Client
}
```

创建结构实例：

```Go
// New This function creates a new Device Shifu based on the configuration
func New(deviceShifuMetadata *deviceshifubase.DeviceShifuMetaData) (*DeviceShifu, error)
```

`deviceShifuMetadata`用于创建`DeviceShifuBase`。

在函数内部，你可以调用

```Go
base, mux, err := deviceshifubase.New(deviceShifuMetadata)
if err != nil {
    return nil, err
}
```

该函数返回初始化的`DeviceShifuBase`和服务器mux。`deviceshifuxxx`运行的关键部分是注册恰当的处理程序来处理所有传入的http请求。就handler函数而言，此处以`MQTT`的handler函数为例。

要注册处理程序，你可以：

```Go
handler := DeviceCommandHandlerMQTT{HandlerMetaData}
mux.HandleFunc("/"+MqttDataEndpoint, handler.commandHandleFunc())
```

`DeviceShifu`还可以收集设备特定的遥测数据。如果不知道遥测是什么，请先查看此文档：https://github.com/Edgenesis/shifu/blob/main/docs/design/deviceshifu/telemetry.md

`DeviceShifuBase`将采用以下函数：

```Go
// collectTelemetry struct of collectTelemetry
type collectTelemetry func() (bool, error)
```

并定期用其从设备中收集遥测数据。你可以定义收集遥测数据的方式，详情参考MQTT的[遥测合集](https://github.com/Edgenesis/shifu/blob/main/pkg/deviceshifu/deviceshifumqtt/deviceshifumqtt.go#L206)。

完成处理程序和遥测逻辑后，使用`DeviceShifuBase`通过实现`Start`和`Stop`函数来启动/停止程序，此处也以 MQTT为例：

```Go
// Start start Mqtt Telemetry
func (ds *DeviceShifu) Start(stopCh <-chan struct{}) error {
    return ds.base.Start(stopCh, ds.collectMQTTTelemetry)
}

// Stop Http Server
func (ds *DeviceShifu) Stop() error {
    return ds.base.Stop()
}
```

#### **main**

需要`main.go`才能使`deviceshifuxxx`程序运行起来。在`cmd/deviceshifu`目录下新建一个`cmdxxx`目录文件夹，并在该目录下创建一个`main.go`。

以`MQTT`为例，main的内容可以是：

```Go
func main() {
    deviceName := os.Getenv("EDGEDEVICE_NAME")
    namespace := os.Getenv("EDGEDEVICE_NAMESPACE")

    deviceShifuMetadata := &deviceshifubase.DeviceShifuMetaData{
        Name:           deviceName,
        ConfigFilePath: deviceshifubase.DeviceConfigmapFolderPath,
        KubeConfigPath: deviceshifubase.KubernetesConfigDefault,
        Namespace:      namespace,
    }
    // TODO: Change deviceshifumqtt to the deviceshifuxxx you just created
    ds, err := deviceshifumqtt.New(deviceShifuMetadata)
    if err != nil {
        panic(err.Error())
    }

    if err := ds.Start(wait.NeverStop); err != nil {
        panic(err.Error())
    }

    select {}
}
```

#### **Dockerfile and makefile**

要在k8s中运行go程序，需要将其打包成docker镜像。为此，需要在`dockerfiles`目录下创建一个名为`Dockerfile.deviceshifuxxx`的文件。以`MQTT`为例，dockerfile可以是：

```Go
# Build the manager binary
FROM --platform=$BUILDPLATFORM golang:1.18.4 as builder

WORKDIR /shifu

ENV GO111MODULE=on
ENV GOPRIVATE=github.com/Edgenesis

COPY go.mod go.mod
COPY go.sum go.sum
COPY pkg/k8s pkg/k8s
# TODO: Change cmdmqtt to cmdxxx
COPY cmd/deviceshifu/cmdmqtt cmd/deviceshifu/cmdmqtt
COPY pkg/deviceshifu pkg/deviceshifu

RUN go mod download

# Build the Go App
ARG TARGETOS
ARG TARGETARCH

RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -a -o /output/deviceshifu cmd/deviceshifu/cmdmqtt/main.go

FROM gcr.io/distroless/static-debian11
WORKDIR /
COPY --from=builder /output/deviceshifu deviceshifu

# Command to run the executable
USER 65532:65532
ENTRYPOINT ["/deviceshifu"]
```

*注意*：一些原生协议需要一些原生的c绑定库，因此你需要在dockerfile中进行安装。

你可以利用`Makefile`来推送和构建docker镜像。以`MQTT`为例，要使用`Makefile`，可以添加以下行： 

构建镜像：

```Go
buildx-build-image-deviceshifu-http-mqtt:
    docker buildx build --platform=linux/$(shell go env GOARCH) -f ${PROJECT_ROOT}/dockerfiles/Dockerfile.deviceshifuMQTT \
        --build-arg PROJECT_ROOT="${PROJECT_ROOT}" ${PROJECT_ROOT} \
        -t edgehub/deviceshifu-http-mqtt:${IMAGE_VERSION} --load
```

推送镜像：

```Go
buildx-push-image-deviceshifu-http-mqtt:
    docker buildx build --platform=linux/amd64,linux/arm64,linux/arm -f ${PROJECT_ROOT}/dockerfiles/Dockerfile.deviceshifuMQTT \
        --build-arg PROJECT_ROOT="${PROJECT_ROOT}" ${PROJECT_ROOT} \
        -t edgehub/deviceshifu-http-mqtt:${IMAGE_VERSION} --push
```

构建并推送所有`deviceshifu`类型：

```Go
buildx-build-image-deviceshifu: \
    buildx-build-image-deviceshifu-http-http \
+   buildx-build-image-deviceshifu-http-mqtt \
    buildx-build-image-deviceshifu-http-socket \
    buildx-build-image-deviceshifu-http-opcua

buildx-push-image-deviceshifu: \
    buildx-push-image-deviceshifu-http-http \
+   buildx-push-image-deviceshifu-http-mqtt \
    buildx-push-image-deviceshifu-http-socket \
    buildx-push-image-deviceshifu-http-opcua
```

#### Test

对于新建的`deviceshifuxxx`类型，建议在将其部署到k8s或创建PR合并之前对其进行单元测试。详情见`deviceshifumqtt_test.go`和`deviceshifumqttconfig_test.go`。

我们还在管道上运行了端到端的测试。在创建 PR 之前，你可以尝试创建一个mockdevice并将端到端测试添加到我们的管道中。对于mockdevice，你可在`pkg/deviceshifu/mockdevice`进行查看；对于如何编写端到端测试，请参考我们的[管道](https://github.com/Edgenesis/shifu/blob/main/azure-pipelines/azure-pipelines.yml#L369-L422)。

## 其他

如果你对如何开发`deviceshifu`的详细内容感兴趣，可以参考commit [65e124d9](https://github.com/Edgenesis/shifu/commit/65e124d9823afeca9640a7514c893224f67508a0)，了解我们是如何创建`deviceshifuplc4x`（一个利用plc4x库的deviceshifu）。