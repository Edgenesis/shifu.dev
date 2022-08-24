import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from "../../../button";
import Select from "../../../select"
import CodeView from '../../../codeVIew';

const codeListOne = [
  {
    id: 1,
    description: "2.1在Linux/Windows/Mac的命令行中执行以下命令",
    code: "curl -LO https://demo.shifu.run/demo-content/shifu_demo_aio_linux_arm64.tar ",
    isCopy: true
  },
  {
    id: 2,
    description: "2.2如果 Docker 运行顺利，将会有以下输出",
    code: `ubuntu@localhost:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES`,
    isCopy: false,
  },
]

const codeListTwo = [
  {
    id: 1,
    description: "2.1在Linux/Windows/Mac的命令行中执行以下命令",
    code: "curl -LO https://demo.shifu.run/demo-content/shifu_demo_aio_linux_arm64.tar ",
    isCopy: true
  },
  {
    id: 2,
    description: "2.2如果 Docker 运行顺利，将会有以下输出",
    code: `ubuntu@localhost:~$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES`,
    isCopy: false,
  },
]

const selectList = [
  {
    id: 1,
    options: [
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
  },
  {
    id: 2,
    options: [
      {
        value: "AMD64",
        id: 1,
      },
      {
        value: "ARM",
        id: 2,
      },
    ]
  }
]

function StepTwo() {
  // const codeListOne = codeListOne.map((item) => {
  //   return <CodeView key={item.id} {...item}></CodeView>
  // })
  // const codeListTwo = codeListTwo.map((item) => {
  //   return <CodeView key={item.id} {...item}></CodeView>
  // })
  const selects = selectList.map((item) => {
    return <Select key={item.id} {...item}></Select>
  })
  return (
    <div className={styles.stepTwo}>
      <h1 className={styles.titleOne}>1.安装Shifu</h1>
      <div className={styles.selectContainer}>
      <h2 className={styles.titleTwo}>1.1请选择你的系统</h2>
        {selects}
      </div>
      <h1 className={styles.titleOne}>2.确认Docker运行成功</h1>
    </div>
  )
}

export default StepTwo