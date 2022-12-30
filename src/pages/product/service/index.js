import Translate,{ translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React from 'react'
import common from '@site/src/css/common.module.scss'
import { Button } from 'antd'
const Service = () => {
  return (
    <div className={common.content}>
      <div className={styles.box}>
        <div className={common.block80}></div>
        <h1>{translate({ message: 'Enterprise-level services' })} </h1>
        <div className={common.block30}></div>
        <p>{translate({ message: 'Our core operational team provides private deployment technical support, architecture design, industrial scene development consulting, remote training, and O&M support, etc., to make IoT development fast and easy.' })}</p>
        <div className={common.block30}></div>
        <Button type="primary"   href="contact" className={common.bannerBtn}>
          <Translate>Contact Us</Translate>
        </Button>
        <div className={common.block80}></div>
      </div>
    </div>
  )
}
export default Service
