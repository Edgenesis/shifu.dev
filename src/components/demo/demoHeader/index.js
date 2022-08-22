import React from 'react';
import styles from "./styles.module.scss";

function SpotsLine() {
  return (
    <div className={styles.spotsLine}>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
      <div className={styles.minSpot}></div>
    </div>
  )
}

function StepSpot(props) {
  return (
    <div className={styles.stepSpot}>
      <div className={styles.stepNum}>{props.step}</div>
      <p className={styles.stepName}>{props.name}</p>
    </div>
  )
}

function ProgressBar() {
  return (
    <div className={styles.ProgressBarContainer}>
      <StepSpot step="1" name="部署Docker"></StepSpot>
      <StepSpot step="2" name="安装Shifu"></StepSpot>
      <StepSpot step="3" name="试玩Shifu"></StepSpot>
      <SpotsLine></SpotsLine>
    </div>
  )
}

const Logo = require('@site/static/img/logo/shifu-mini.svg').default

export default function DemoHeader() {
  return (
    <div className={styles.demoHeaderContainer}>
      <Logo className={styles.logo}></Logo>
      <h1 className={styles.header}>欢迎体验Shifu demo</h1>
      <ProgressBar></ProgressBar>
    </div>
  )
}