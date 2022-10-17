# Connect Devices

To interact with ***edgeDevice*** which represents actual IoT devices, you should first connect the device and convert it to a ***deviceShifu*** in the cluster.

To achieve this, ***Shifu*** provides lots of templates (check the [examples folder](https://github.com/Edgenesis/shifu/tree/main/examples)) for you to use. You only need to change some configuration in the template to connect your own devices.

Then simply use `kubectl apply -f examples/xxxDeviceShifu/deployment` to create the ***deviceShifu***.
