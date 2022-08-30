import Translate, { translate } from '@docusaurus/Translate';
import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from "../../../button";
import CodeView from '../../../codeVIew';
const ShifuCloudLogo = require('@site/static/img/logo/shifucloud-logo.svg').default

/*
 * codeViewStyle and codeViewDescriptionStyle for modify the codeView component style
 */
const codeViewStyle = {
  width: "392px",
  marginBottom: "12px"
}

const codeViewDescriptionStyle = {
  marginBottom: "6px",
  color: "#fff",
  fontSize: "12px"
}

const buttonContentStyle = {
  fontSize: "12px",
}

const buttonStyle = {
  height: "60px"
}

const buttonActiveStyle = {
  height: "80px",
  width: "200px",
}

const codeList = [
  {
    id: 1,
    description: translate({ message: "1.启动一个nginx实例来模拟应用程序与Shifu的交互" }),
    code: "sudo kubectl run --image=nginx:1.21 nginx  ",
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 2,
    description: translate({ message: "2.输入以下指令查看运行结果" }),
    code: `sudo kubectl get pods -A | grep nginx `,
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 3,
    description: translate({ message: "3.如果出现以下结果，表示启动成功" }),
    code:
      `NAME  READY  STATUS  RESTARTS  AGE 
nginx   1/1   Running    0     34s`,
    isCopy: false,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
]

const btnList = [
  {
    id: 1,
    colorLevel: 'three',
    content: <div><p><Translate>案例一</Translate></p><p><Translate>与AGV的数字孪生交互</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#1-与agv交互" })
  },
  {
    id: 2,
    colorLevel: 'three',
    content: <div><p><Translate>案例二</Translate></p><p><Translate>与温度计的数字孪生交互</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#2-与温度计交互" })
  },
  {
    id: 3,
    colorLevel: 'three',
    content: <div><p><Translate>案例三</Translate></p><p><Translate>与酶标仪的数字孪生交互</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#3-与酶标仪交互" })
  },
  {
    id: 4,
    colorLevel: 'three',
    content: <div><p><Translate>案例四</Translate></p><p><Translate>与PLC的数字孪生交互</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#4-与plc交互" })
  },
  {
    id: 5,
    colorLevel: 'three',
    content: <div><p><Translate>案例五</Translate></p><p><Translate>与机械臂的数字孪生交互</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#5-与机械臂交互" })
  },
]

function ActiveLine() {
  let spotList = [0, 1, 2, 3, 4, 5, 6, 7]
  const spots = spotList.map((item) => {
    let delay = 0.3 * item;
    let left = 20 * item;
    return <div className={styles.spot} style={{ animationDelay: `${delay}s`, left: `${left}px` }}></div>
  })
  return (
    <div className={styles.activeLine}>
      {spots}
    </div>
  )
}

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowGuide: false,
      btnInfo: {
        id: null
      }
    }
  }
  setGameUrl(url) {
    this.setState({ gameUrl: url })
  }
  getButton(data) {
    this.setState({ btnInfo: data })
  }
  activeGuide() {
    this.setState({ isShowGuide: true })
  }
  render() {
    const codes = codeList.map((item) => {
      return <CodeView key={item.id} {...item}></CodeView>
    })
    const buttons = btnList.map((item) => {
      if (this.state.btnInfo.id === item.id) {
        item.style = buttonActiveStyle
      } else {
        item.style = buttonStyle
      }
      //add function for click one and send its url to the state
      const that = this
      item.onClick = function () {
        that.getButton(item)
        that.activeGuide()
      }
      return <ButtonSquare key={item.id} {...item}></ButtonSquare>
    })
    return (
      <div className={this.state.isShowGuide ? `${styles.stepThree} ${styles.active}` : `${styles.stepThree}`}>
        <div className={styles.buttonsContainer}>
          {buttons}
        </div>
        <div className={styles.guideContainer}>
          <h1 className={styles.guideTitle}><Translate>确认是否启动Nginx</Translate></h1>
          {codes}
          <div className={styles.enterGameBtn}>
            <ButtonSquare colorLevel="one" content={translate({ message: "进入试玩" })} target="_blank" href={this.state.btnInfo.url}></ButtonSquare>
          </div>
        </div>
        <div className={styles.enterShifuCloud}>
          <ActiveLine></ActiveLine>
          <a href='https://cloud.shifu.run/' className={styles.shifuCloud}>
            <ShifuCloudLogo></ShifuCloudLogo>
          </a>
          <p className={styles.shifuCloudContent}><Translate>免费试用Shifu Cloud</Translate></p>
        </div>
      </div>
    )
  }
}

export default StepThree