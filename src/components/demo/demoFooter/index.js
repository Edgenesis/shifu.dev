import React from "react";
import styles from "./styles.module.scss";
import { ButtonSquare } from "../button";

function DemoFooter(props) {
  let button;
  switch (props.stepIndex) {
    case 0:
      button = <ButtonSquare colorLevel="two" content="Docker部署已完成" onClick={props.onClick}></ButtonSquare>
      break;
    case 1:
      button = <ButtonSquare href="javascript:void(0)" colorLevel="two" content="Shifu安装已完成" onClick={props.onClick}></ButtonSquare>
      break;
    case 2:
      button = <ButtonSquare href='https://cloud.shifu.run/' colorLevel="two" content="进入Shifu Cloud" onClick={props.onClick}></ButtonSquare>
      break;
    default:
      footerBtnContent = "Docker部署已完成"
  }
  return (
    <div className={styles.demoFooterContainer}>
      {button}
    </div>
  );
}
export default DemoFooter