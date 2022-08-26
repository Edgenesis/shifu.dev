import React from "react";
import styles from "./styles.module.scss";
import { ButtonSquare } from "../button";

const ReturnIcon = require('@site/static/img/icon/return-icon.svg').default

function DemoFooter(props) {
  let one = "none", two = "none", three = "none"
  switch (props.stepIndex) {
    case 0:
      one = "flex"
      break;
    case 1:
      two = "flex"
      break;
    case 2:
      three = "flex"
      break;
    default:
      one = "flex"
  }
  return (
    <div className={styles.demoFooterContainer}>
      <ButtonSquare style={{ display: `${one}` }} colorLevel="two" content="Docker部署已完成" onClick={props.onClick}></ButtonSquare>
      <ButtonSquare style={{ display: `${two}` }} colorLevel="two" content="Shifu安装已完成" onClick={props.onClick}></ButtonSquare>
      <div onClick={() => props.isReturn()} className={styles.returnBack} style={{ display: `${three}` }}>
        <ReturnIcon></ReturnIcon>
        <p className={styles.returnContent}>再看一遍</p>
      </div>
    </div >
  );
}
export default DemoFooter