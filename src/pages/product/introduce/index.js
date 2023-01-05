import React from 'react'
import styles from './styles.module.scss'
import background from '@site/static/img/product/bck2.png'
import backgroundMove from '@site/static/img/product/bannerMove.png'
import Translate from '@docusaurus/Translate'
import common from '@site/src/css/common.module.scss'
import { Button } from 'antd'
export default function Introduce() {
  return (
    <>
      <div className={styles.banner}>
        <img src={background} alt=""  className={styles.backgroundPc}/>
        <img src={backgroundMove} alt="" className={styles.backgroundMove}/>
        <div className={styles.bannerCon}>
          <h1>Shifu Cloud</h1>
          <p>
            <Translate>
              As a device configuration platform based on the open source IoT development framework Shifu, Shifu Cloud can automatically generate YAML files for the digital twin of the device, allowing developers to quickly obtain API interfaces for device capabilities and free up their hands for
              IoT scene development.
            </Translate>
          </p>
          <Button type="primary"   href="https://shifu.cloud/" className={common.bannerBtn}>
            <Translate>Get Started</Translate>
          </Button>
        </div>
      </div>
      <div className={common.block80}></div>
    </>
  )
}
