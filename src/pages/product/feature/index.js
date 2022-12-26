import { Button, Space } from 'antd'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
const Feature = forwardRef((props, ref) => {
  return <div className={styles.feature}></div>
})

export default Feature
