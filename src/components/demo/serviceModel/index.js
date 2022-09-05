import Translate, { translate } from '@docusaurus/Translate';
import React from 'react';
import styles from "./styles.module.scss"

const ServiceQR = require('@site/static/img/service-qr.svg').default

export default function ServiceModel({ showServiceModel }) {
  let rightNum = showServiceModel ? 0 : -200
  return (
    <div className={styles.serviceContainer} style={{ right: `${rightNum}px` }}>
      <h1 className={styles.title}><Translate>Our Email</Translate></h1>
      <p className={styles.content}>info@edgenesis.com</p>
      <h1 className={styles.title}><Translate>Our Tel</Translate></h1>
      <p className={styles.content}>18515145818</p>
      <h1 className={styles.title}><Translate>Contact us via WeChat</Translate></h1>
      <ServiceQR className={styles.serviceImg}></ServiceQR>
    </div>
  )
}