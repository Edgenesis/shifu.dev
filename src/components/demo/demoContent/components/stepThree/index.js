import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from "../../../button";
import CodeView from '../../../codeVIew';

/*
 * codeViewStyle and codeViewDescriptionStyle for modify the codeView component style
 */
const codeViewStyle = {
  width: "392px",
  marginBottom: "12px"
}

const codeViewDescriptionStyle = {
  marginBottom: "6px",
  color: "#000000",
  fontSize: "12px"
}

const codeList = [
  {
    id: 1,
    description: "1.启动一个nginx实例来模拟应用程序与shifu的交互",
    code: "sudo kubectl run --image=nginx:1.21 nginx  ",
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 2,
    description: "2.输入以下指令查看运行结果",
    code: `sudo kubectl get pods -A | grep nginx `,
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 3,
    description: "3.如果出现以下结果，表示启动成功",
    code: 
`NAME  READY  STATUS  RESTARTS  AGE 
nginx   1/1   Running    0     34s`,
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
]

const btnList = [
  {
    colorLevel: 'three',
    content: `案例一
与AGV的数字孪生交互`,
  },
  {
    colorLevel: 'three',
    content: `案例二
与温度计的数字孪生交互`,
  },
  {
    colorLevel: 'three',
    content: `案例三
与酶标仪的数字孪生交互`,
  },
  {
    colorLevel: 'three',
    content: `案例四
与PLC的数字孪生交互`,
  },
  {
    colorLevel: 'three',
    content: `案例五
与机械臂的数字孪生交互`,
  },
]

function StepThree() {
  const codes = codeList.map((item) => {
    return <CodeView key={item.id} {...item}></CodeView>
  })
  const buttons = btnList.map((item) => {
    return <ButtonSquare key={item.content} {...item}></ButtonSquare>
  })
  return (
    <div className={styles.stepThree}>
      <div className={styles.buttonsContainer}>
        {buttons}
      </div>
      <div className={styles.guideContainer}>
        <h1 className={styles.guideTitle}>确认是否启动Nginx</h1>
        {codes}
        <div className={styles.enterGameBtn}>
          <ButtonSquare colorLevel="two" content="进入试玩"></ButtonSquare>
        </div>
      </div>
    </div>
  )
}

export default StepThree