import Translate from '@docusaurus/Translate';
import React from 'react';
import styles from "./styles.module.scss"

export default function ServiceModel({ showServiceModel }) {
  let rightNum = showServiceModel ? 0 : -300
  return (
    <div className={styles.serviceContainer} style={{ right: `${rightNum}px` }}>
      <h1 className={styles.title}><Translate>Our Email</Translate></h1>
      <p className={styles.content}>info@edgenesis.com</p>
    </div>
  )
}
