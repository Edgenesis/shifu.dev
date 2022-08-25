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
  color: "#fff",
  fontSize: "12px"
}

const buttonContentStyle = {
  fontSize: "12px",
}

const buttonStyle = {
  height: "60px"
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
    isCopy: false,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
]

const btnList = [
  {
    colorLevel: 'three',
    content: <div><p>案例一</p><p>与AGV的数字孪生交互</p></div>,
    style: buttonStyle,
    contentStyle: buttonContentStyle,
    url: "https://shifu.run/docs/quickstart/quick_demo#1-%E4%B8%8Eagv%E7%9A%84%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E4%BA%A4%E4%BA%92"
  },
  {
    colorLevel: 'three',
    content: <div><p>案例二</p><p>与温度计的数字孪生交互</p></div>,
    style: buttonStyle,
    contentStyle: buttonContentStyle,
    url: "https://shifu.run/docs/quickstart/quick_demo#2-%E4%B8%8E%E6%B8%A9%E5%BA%A6%E8%AE%A1%E7%9A%84%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E4%BA%A4%E4%BA%92"
  },
  {
    colorLevel: 'three',
    content: <div><p>案例三</p><p>与酶标仪的数字孪生交互</p></div>,
    style: buttonStyle,
    contentStyle: buttonContentStyle,
    url: "https://shifu.run/docs/quickstart/quick_demo#3-%E4%B8%8E%E9%85%B6%E6%A0%87%E4%BB%AA%E7%9A%84%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E4%BA%A4%E4%BA%92"
  },
  {
    colorLevel: 'three',
    content: <div><p>案例四</p><p>与PLC的数字孪生交互</p></div>,
    style: buttonStyle,
    contentStyle: buttonContentStyle,
    url: "https://shifu.run/docs/quickstart/quick_demo#4-%E4%B8%8Eplc%E7%9A%84%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E4%BA%A4%E4%BA%92"
  },
  {
    colorLevel: 'three',
    content: <div><p>案例五</p><p>与机械臂的数字孪生交互</p></div>,
    style: buttonStyle,
    contentStyle: buttonContentStyle,
    url: "https://shifu.run/docs/quickstart/quick_demo#5-%E4%B8%8E%E6%9C%BA%E6%A2%B0%E8%87%82%E7%9A%84%E6%95%B0%E5%AD%97%E5%AD%AA%E7%94%9F%E4%BA%A4%E4%BA%92"
  },
]

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameUrl: "",
      isShowGuide: false,
    }
  }
  setGameUrl(url) {
    this.setState({
      gameUrl: url
    })
  }
  activeGuide() {
    this.setState({
      isShowGuide: true
    })
  }
  render() {
    const codes = codeList.map((item) => {
      return <CodeView key={item.id} {...item}></CodeView>
    })
    const buttons = btnList.map((item, index) => {
      //add function for click one and send its url to the state
      const that = this
      item.onClick = function () {
        that.setGameUrl(item.url);
        that.activeGuide()
      }
      return <ButtonSquare key={index} {...item}></ButtonSquare>
    })
    return (
      <div className={this.state.isShowGuide ? `${styles.stepThree} ${styles.active}` : `${styles.stepThree}`}>
        <div className={styles.buttonsContainer}>
          {buttons}
        </div>
        <div className={styles.guideContainer}>
          <h1 className={styles.guideTitle}>确认是否启动Nginx</h1>
          {codes}
          <div className={styles.enterGameBtn}>
            <ButtonSquare colorLevel="one" content="进入试玩" target="_blank" href={this.state.gameUrl}></ButtonSquare>
          </div>
        </div>
      </div>
    )
  }
}

export default StepThree