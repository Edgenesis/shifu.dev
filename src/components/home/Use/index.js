import React from "react";
import styles from "./styles.module.scss"
import Use from "@site/static/img/home/use.png";
import common from "@site/src/css/common.module.scss"
import Translate   from '@docusaurus/Translate';
import { Button } from 'antd';
export function UseCon() {
  return (
      <>
        <div className={common.block80}></div>
        <div className={`${styles.banner} ${common.content}`}>
          <img src={Use} alt=""/>
          <div className={styles.bannerCon}>
            <h1>
              <Translate>Get started</Translate>
            </h1>
            <a href="product">
              <Button type="primary" size="large" className={styles.large}><Translate>Free trial</Translate></Button>
              <Button type="primary" size="small" className={styles.small}><Translate>Free trial</Translate></Button>
            </a>
          </div>
        </div>
        <div className={common.block80}></div>
      </>

  )
}