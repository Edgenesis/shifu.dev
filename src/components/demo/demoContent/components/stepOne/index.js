import Translate, { translate } from '@docusaurus/Translate';
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
    content: "MacOS(M1/M2)",
    href: "https://desktop.docker.com/mac/main/arm64/Docker.dmg"
  },
]

const stepOneCodeList = [
  {
    id: 1,
    description: translate({ message: "2.1 Run following command in Linux/Windows/Mac." }),
    code: "sudo docker ps ",
    isCopy: true
  },
  {
    id: 2,
    description: translate({ message: "2.2 If Docker starts successfully, the output will be as follows" }),
    code: `$ sudo docker ps
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
      <h1 className={styles.titleOne}><Translate>1. Select your OS to download Docker</Translate></h1>
      <div className={styles.buttonsContainer}>
        {buttons}
      </div>
      <h1 className={styles.titleOne}><Translate>2. Confirm Docker runs successfully</Translate></h1>
      {codeList}
    </div>
  )
}

export default StepOne