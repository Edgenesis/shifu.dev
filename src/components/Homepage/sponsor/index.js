import React from "react";
import styles from "./styles.module.scss";
import boc from "@site/static/img/sponsor/BOC.png";
import Azure from "@site/static/img/sponsor/Microsoft_Azure_Logo.png";
import AWS from "@site/static/img/sponsor/AWS.png";
import HAIER from "@site/static/img/sponsor/HAIER.png";
import AGORA_TRANSPARENT from "@site/static/img/sponsor/AGORA_TRANSPARENT.png";
import INDUSTRIALNEXT from "@site/static/img/sponsor/INDUSTRIALNEXT.png";
import CSSC from "@site/static/img/sponsor/CSSC.png";
import guomao from "@site/static/img/sponsor/guomao.png";

export default function Sponsor() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>合作伙伴</p>
        <div className={styles.rotation}>
          <div className={styles.content}>
            <div className="row">
              <div className={styles.Sponsor}>
                <img src={boc}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={Azure}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={AWS}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={HAIER}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={boc}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={Azure}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={AWS}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={HAIER}></img>
              </div>
            </div>
            <div className="row">
              <div className={styles.Sponsor}>
                <img src={AGORA_TRANSPARENT}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={INDUSTRIALNEXT}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={CSSC}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={guomao}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={AGORA_TRANSPARENT}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={INDUSTRIALNEXT}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={CSSC}></img>
              </div>
              <div className={styles.Sponsor}>
                <img src={guomao}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
