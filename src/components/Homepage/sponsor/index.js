import React from "react";
import styles from "./styles.module.scss";
import Microsoft from "@site/static/img/sponsor/Microsoft.png";
import JINMAO from "@site/static/img/sponsor/JINMAO.png";
import HAIER from "@site/static/img/sponsor/HAIER.png";
import amazon from "@site/static/img/sponsor/amazon.png";
import CSSC from "@site/static/img/sponsor/CSSC.png";
import guomao from "@site/static/img/sponsor/guomao.png";

export default function Sponsor() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Shifu受行业领导者信任</p>
        <div className={styles.rotation}>
          <div className={styles.content}>
            <div className={styles.Sponsor}>
              <img src={Microsoft}></img>
            </div>
            <div className={styles.Sponsor}>
              <img src={amazon}></img>
            </div>
            <div className={styles.Sponsor}>
              <img src={HAIER}></img>
            </div>
            <div className={styles.Sponsor}>
              <img src={CSSC}></img>
            </div>
            <div className={styles.Sponsor}>
              <img src={guomao}></img>
            </div>
            <div className={styles.Sponsor}>
              <img src={JINMAO}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
