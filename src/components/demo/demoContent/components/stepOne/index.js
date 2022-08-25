import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from "../../../button";
import CodeView from '../../../codeVIew';

const stepOnebtnList = [
  {
    colorLevel: 'two',
    content: "Linux",
    href: "https://docs.docker.com/engine/install/#server",
    target: "_blank"
  },
  {
    colorLevel: 'two',
    content: "Windows(WSL2)",
    href: "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
  },
  {
    colorLevel: 'two',
    content: "MacOS(Intel)",
    href: "https://desktop.docker.com/mac/main/amd64/Docker.dmg"
  },
  {
    colorLevel: 'two',
    content: "MacOS(M1)",
    href: "https://desktop.docker.com/mac/main/arm64/Docker.dmg"
  },
]

const stepOneCodeList = [
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

function StepOne() {
  const buttons = stepOnebtnList.map((item) => {
    return <ButtonSquare key={item.content} {...item}></ButtonSquare>
  })
  const codeList = stepOneCodeList.map((item) => {
    return <CodeView key={item.id} {...item}></CodeView>
  })
  return (
    <div className={styles.stepOne}>
      <h1 className={styles.titleOne}>1.请选择你的系统以下载Docker</h1>
      <div className={styles.buttonsContainer}>
        {buttons}
      </div>
      <h1 className={styles.titleOne}>2.确认Docker运行成功</h1>
      {codeList}
    </div>
  )
}

export default StepOne