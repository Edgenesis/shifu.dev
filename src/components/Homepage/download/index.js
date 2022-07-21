import React from "react";
import styles from "./styles.module.scss";
import logo from "@site/static/img/edgenesis.png";
import { GreenBorderBtn, YellowBtn } from "../../buttons";

function HeaderLogo() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo}></img>
      <div className={styles.right}>
        <h1>Shifu Framework</h1>
        <p>让开发一个产业场景像开发一个APP一样简单！</p>
      </div>
    </div>
  );
}

function DownloadBtn() {
  return (
    <div className={styles.btnContainer}>
      <div className={styles.wrapper}>
        <YellowBtn
          content="Shifu demo 下载"
          href="https://demo.shifu.run/index"
          target="_blank"
        ></YellowBtn>
        <GreenBorderBtn content="快速上手" href="/docs"></GreenBorderBtn>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className={styles.container}>
      <HeaderLogo></HeaderLogo>
      <DownloadBtn></DownloadBtn>
    </div>
  );
}
