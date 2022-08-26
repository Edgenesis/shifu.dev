import React from 'react';
import styles from "./styles.module.scss";
import Select from "../../../select"
import CodeView from '../../../codeVIew';

const codeListOne = [
  {
    id: 1,
    description: "1.2下载 Shifu 安装包",
    code: "curl -LO https://demo.shifu.run/demo-content/shifu_demo_aio_linux_arm64.tar",
    isCopy: true
  },
  {
    id: 2,
    description: "1.3将所下载的安装包解压到testdir文件夹中",
    code: `mkdir testdir && tar -xvf shifu_demo_aio_linux_arm64.tar -C testdir && cd testdir `,
    isCopy: true,
  },
  {
    id: 3,
    description: "1.4运行Demo",
    code: `sudo bash scripts/deviceshifu-demo-aio.sh run_demo `,
    isCopy: true,
  },
]

const codeListTwo = [
  {
    id: 4,
    description: "2.1使用以下命令来查看运行效果",
    code: "sudo kubectl get pods -A ",
    isCopy: true
  },
  {
    id: 5,
    description: "2.2如果所有 “STATUS“ 都是 Running 即表示成功",
    code: ` ubuntu@localhots:~/test/testdir$ sudo kubectl get pods -A",
NAMESPACE                    NAME                                 READY       STATUS      RESTARTS       AGE
devices             agv-5bd7c4f885-w6xpx                           1/1        Running        0           17s
deviceshifu         deviceshifu-agv-deployment-d8db6cd5d-6w78d     1/1        Running        0           15s
kube-system         coredns-6d4b75cb6d-gjzmw                       1/1        Running        0           34s
kube-system         coredns-6d4b75cb6d-rncrk                       1/1        Running        0           34s
kube-system         etcd-kind-control-plane                        1/1        Running        0           49s
kube-system         kindnet-t69bx                                  1/1        Running        0           34s
kube-system         kube-apiserver-kind-control-plane              1/1        Running        0           49s
kube-system         kube-controller-manager-kind-control-plane     1/1        Running        0           48s
kube-system         kube-proxy-7dfvm                               1/1        Running        0           34s
kube-system         kube-scheduler-kind-control-plane              1/1        Running        0           48s
local-path-storage  local-path-provisioner-9cd9bd544-6zgpv         1/1        Running        0           34s
shifu-crd-system    shifu-crd-controller-manager-94c8c779d-czvkx   2/2        Running        0           17s`,
    isCopy: false,
  },
]

const optionsOne = [
  {
    value: "Linux",
    id: 1,
  },
  {
    value: "WSL",
    id: 2,
  },
  {
    value: "MacOS",
    id: 3,
  },
]

const optionsTwo = [
  {
    value: "AMD64",
    id: 1,
  },
  {
    value: "ARM",
    id: 2,
  },
]

const shifuUrlList = {
  Linux: {
    AMD64: "shifu_demo_aio_linux_amd64.tar", //Linux and x86/64
    ARM: "shifu_demo_aio_linux_arm64.tar", //Linux and ARM
  },
  WSL: {
    AMD64: "shifu_demo_aio_linux_amd64.tar", //WSL and x86/64
    ARM: "shifu_demo_aio_linux_arm64.tar", //WSL and ARM
  },
  MacOS: {
    AMD64: "shifu_demo_aio_darwin_amd64.tar", //MacOS and x86/64
    ARM: "shifu_demo_aio_darwin_arm64.tar", //MacOS and ARM
  }
}

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shifuUrl: "",
      OSModel: "Linux",
      CPUModel: "AMD64"
    }
    this.getCPUModel = this.getCPUModel.bind(this)
    this.getOSModel = this.getOSModel.bind(this)
  }
  componentDidMount() {
    this.setState({ shifuUrl: shifuUrlList[this.state.OSModel][this.state.CPUModel] })
  }
  getOSModel(data) {
    this.setState({ OSModel: data })
    this.setState({ shifuUrl: shifuUrlList[data][this.state.CPUModel] })
  }
  getCPUModel(data) {
    this.setState({ CPUModel: data })
    this.setState({ shifuUrl: shifuUrlList[this.state.OSModel][data] })
  }
  render() {
    const codeViewOne = codeListOne.map((item) => {
      if (item.id === 1) {
        item.code = this.state.shifuUrl
      }
      return <CodeView key={item.id} {...item}></CodeView>
    })
    const codeViewTwo = codeListTwo.map((item) => {
      return <CodeView key={item.id} {...item}></CodeView>
    })
    return (
      <div className={styles.stepTwo} >
        <h1 className={styles.titleOne}>1.安装Shifu</h1>
        <h2 className={styles.titleTwo}>1.1请选择你的系统</h2>
        <div className={styles.selectContainer}>
          <Select title={this.state.OSModel} options={optionsOne} reciveData={this.getOSModel}></Select>
          <Select title={this.state.CPUModel} options={optionsTwo} reciveData={this.getCPUModel}></Select>
        </div>
        {codeViewOne}
        <h1 className={styles.titleOne}>2.确认Docker运行成功</h1>
        {codeViewTwo}
      </div >
    )
  }
}

export default StepTwo