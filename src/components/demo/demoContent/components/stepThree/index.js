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
  borderRadius: "20px"
}

const codeList = [
  {
    id: 1,
    description: translate({ message: "1. Start an nginx instance to simulate the interaction between applications and Shifu" }),
    code: "sudo kubectl run --image=nginx:1.21 nginx  ",
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 2,
    description: translate({ message: "2. Run the following command to check the running result" }),
    code: `sudo kubectl get pods -A | grep nginx `,
    isCopy: true,
    style: codeViewStyle,
    codeDescriptionStyle: codeViewDescriptionStyle
  },
  {
    id: 3,
    description: translate({ message: "3. If the following result appears, it means the startup is successful" }),
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
    content: <div><p><Translate>Case One</Translate></p><p><Translate>Interact with the AGV</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#1-interact-with-the-agv" })
  },
  {
    id: 2,
    colorLevel: 'three',
    content: <div><p><Translate>Case Two</Translate></p><p><Translate>Interact with the thermometer</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#2-interact-with-the-thermometer" })
  },
  {
    id: 3,
    colorLevel: 'three',
    content: <div><p><Translate>Case Three</Translate></p><p><Translate>Interact with the microplate reader</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#3-interact-with-the-microplate-reader" })
  },
  {
    id: 4,
    colorLevel: 'three',
    content: <div><p><Translate>Case Four</Translate></p><p><Translate>Interact with the PLC</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#4-interact-with-the-plc" })
  },
  {
    id: 5,
    colorLevel: 'three',
    content: <div><p><Translate>Case Five</Translate></p><p><Translate>Interact with the robotic arm</Translate></p></div>,
    contentStyle: buttonContentStyle,
    url: translate({ message: "https://shifu.run/docs/tutorials/demo-try#5-interact-with-the-robotic-arm" })
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
          <h1 className={styles.guideTitle}><Translate>Confirm nginx starts</Translate></h1>
          {codes}
          <div className={styles.enterGameBtn}>
            <ButtonSquare colorLevel="one" content={translate({ message: "Start trying out" })} target="_blank" href={this.state.btnInfo.url}></ButtonSquare>
          </div>
        </div>
        {/* <div className={styles.enterShifuCloud}>
          <ActiveLine></ActiveLine>
          <a href='https://cloud.shifu.run/' target='_blank' className={styles.shifuCloud}>
            <ShifuCloudLogo></ShifuCloudLogo>
          </a>
          <p className={styles.shifuCloudContent}><Translate>免费试用Shifu Cloud</Translate></p>
        </div> */}
      </div>
    )
  }
}

export default StepThree