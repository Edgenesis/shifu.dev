# 接入设备

在与实际的物联网设备 ***edgeDevice*** 交互之前，你需要先连接设备并将其转为一个 ***deviceShifu*** 的数字孪生。

***Shifu*** 为您准备了很多模板文件（[examples 文件夹](https://github.com/Edgenesis/shifu/tree/main/examples)），你只需要在模板的基础上修改配置即可连接你的设备。

然后使用 `kubectl apply -f examples/xxxDeviceShifu/deployment` 即可创建 ***deviceShifu***。
