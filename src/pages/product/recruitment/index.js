import { Button, Space } from 'antd'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
const Feature = forwardRef((props, ref) => {
  return (
    <div className={styles.welcome}>
      <a className={styles.address}>北京</a>
      <p className={styles.name}>{props.data.name}</p>
      <p className={styles.require}>{props.data.require}</p>
      <a className={styles.detail} href="http://www.baidu.com">
        查看详情>>
      </a>
    </div>
  )
})

export default Feature
