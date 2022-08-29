import React from 'react';
import styles from "./styles.module.scss";

function SpotsLine(props) {
  let minSpotsList = [1, 2, 3, 4, 5, 6, 7];
  const minSpots = minSpotsList.map((item) => {
    let delayStepstyle = {
      transition: `all ${item * 0.2}s`
    }
    return <div className={styles.minSpot} style={delayStepstyle}></div>
  })
  return (
    <div className={props.className} style={props.style}>
      {minSpots}
    </div>
  )
}

function StepSpot(props) {
  return (
    <div className={props.className}>
      <div className={styles.stepNum}>{props.step}</div>
      <div className={styles.stepName}>
        <p className={styles.title}>{props.name}</p>
        <p className={styles.supplement}>{props.supplement}</p>
      </div>
    </div>
  )
}

const spotsList = [
  {
    step: "1",
    name: "部署Docker",
    supplement: "预备工作",
    className: ""
  },
  {
    step: "2",
    name: "安装Shifu",
    className: ""
  },
  {
    step: "3",
    name: "试玩Shifu",
    className: ""
  },
]

const lineList = [
  {
    id: 1,
    style: {},
    className: ""
  },
  {
    id: 2,
    style: {},
    className: ""
  }
]


function ProgressBar() {
  const stepSpots = spotsList.map((item) =>
    <StepSpot key={item.step} {...item}></StepSpot>
  )
  const spotslines = lineList.map((item) =>
    <SpotsLine key={item.id} {...item}></SpotsLine>
  )
  return (
    <div className={styles.ProgressBarContainer}>
      {stepSpots}
      {spotslines}
    </div>
  )
}

const Logo = require('@site/static/img/logo/shifu-mini.svg').default

export default function DemoHeader(props) {
  for (let i in spotsList) {
    spotsList[i]["className"] = (i == 0) ? `${styles.specialSpot}` : `${styles.normalSpot}`
    if (i == props.stepIndex) {
      spotsList[i]["className"] += ` ${styles.stepSpot} ${styles.stepSpotActive}`
    } else if (i < props.stepIndex) {
      spotsList[i]["className"] += ` ${styles.stepSpot} ${styles.stepPass}`
    } else {
      spotsList[i]["className"] = ` ${styles.stepSpot}`
    }
  }
  for (let i in lineList) {
    lineList[i]["style"] = { transform: `translateX(${105 * i}px)` }
    if (i < props.stepIndex) {
      lineList[i]["className"] += ` ${styles.spotsLineActive}`
    } else {
      lineList[i]["className"] = `${styles.spotsLine}`
    }
  }
  return (
    <div className={styles.demoHeaderContainer}>
      <h1 className={styles.header}>欢迎体验Shifu demo</h1>
      <ProgressBar></ProgressBar>
    </div>
  )
}