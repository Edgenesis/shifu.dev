import React from "react";
import styles from "./styles.module.scss"
import banner from "@site/static/img/home/Banner.png";
import Translate   from '@docusaurus/Translate';
import { Button } from 'antd';
export function Banner() {
  return (
      <div className={styles.banner}>
        <img src={banner} alt=""/>
        <div className={styles.bannerCon}>
          <h1>
            <Translate>Next Generation</Translate><br/>
            <Translate>Cloud Native IoT</Translate><br/>
            <Translate>Development Framework</Translate>
          </h1>
          <p>
            <Translate>An industrial IoT development framework that boosts IoT developer efficiency by ten times.</Translate>
          </p>
          <a href="product">
            <Button type="primary"><Translate>Free trial</Translate></Button>
          </a>
        </div>
      </div>
  )
}