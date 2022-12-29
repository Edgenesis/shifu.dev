import { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React from 'react'
import common from '@site/src/css/common.module.scss'
import { Button } from 'antd'
const Service = () => {
  return (
    <div className={common.content}>
      <div className={styles.box}>
        <div className={common.block50}></div>
        <h1>{translate({ message: 'Enterprise-level services' })} </h1>
        <p>{translate({ message: 'Our core operational team provides private deployment technical support, architecture design, industrial scene development consulting, remote training, and O&M support, etc., to make IoT development fast and easy.' })}</p>
        <Button
          type="primary"
          onClick={() => {
            location.href = '/zh-Hans/product'
          }}
          className={styles.button}
        >
          {translate({ message: 'Contact Us' })}
        </Button>
        <div className={common.block30}></div>
      </div>
    </div>
  )
}
export default Service
