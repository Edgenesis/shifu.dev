import { Button, Space } from 'antd'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
const Feature = forwardRef((props, ref) => {
  return (
    <div className={styles.feature}>
      <img src={require('../' + props.data.jpg).default}></img>
      <p className={styles.title}>{props.data.title}</p>
      <p className={styles.instruction}>{props.data.instruction}</p>
    </div>
  )
})

export default Feature
