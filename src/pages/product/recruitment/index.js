import Translate, { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
const Feature = forwardRef((props, ref) => {
  return (
    <div className={styles.welcome}>
      <a className={styles.address}>{translate({ message: 'Beijing' })}</a>
      <p className={styles.name}>{translate({ message: props.data.name })}</p>
      <p className={styles.require}>{translate({ message: props.data.require })}</p>
      <a className={styles.detail} href="http://www.baidu.com">
        {translate({ message: 'Check Details>> ' })}
      </a>
    </div>
  )
})

export default Feature
