import React from "react";
import styles from "./styles.module.scss";
import { ButtonSquare, ButtonTransparent } from "../button";

const GithubIcon = require('@site/static/img/icon/github-icon.svg').default
const DocIcon = require('@site/static/img/icon/doc-icon.svg').default

function DemoFooter(props) {
  let footerBtnContent;
  switch (props.stepIndex) {
    case 0:
      footerBtnContent = "Docker部署已完成";
      break;
    case 1:
      footerBtnContent = "Shifu安装已完成";
      break;
    case 2:
      footerBtnContent = "进入Shifu Cloud";
      break;
    default:
      footerBtnContent = "Docker部署已完成"
  }
  return (
    <div className={styles.demoFooterContainer}>
      <div className={styles.demoFooterButton}>
        <ButtonSquare colorLevel="two" content={footerBtnContent} onClick={props.onClick}></ButtonSquare>
      </div>
      <div className={styles.demoFooterContent}>
        <div className={styles.demoFooterDoc}>
          <ButtonTransparent content="技术文档" left={<DocIcon></DocIcon>} href="/"></ButtonTransparent>
        </div>
        <div className={styles.demoFooterGithub}>
          <ButtonTransparent content="申请Github权限" left={<GithubIcon></GithubIcon>}></ButtonTransparent>
        </div>
      </div>
    </div>
  );
}
export default DemoFooter