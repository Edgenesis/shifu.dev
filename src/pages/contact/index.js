import React from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import { Foot } from '../../components/footer'
export default function Disclaimer() {
  return (
    <Layout>
      <div className={styles.box}>
        <div className={common.block80}></div>

        <div className={`${styles.message}  ${common.content}`}>
          <div className={`${styles.messagedetail}`}>
            <img src={require('@site/static/img/product/message.png').default} className={styles.imgBackground}></img>
            <div className={styles.form}>
              <div className={common.block60}></div>
              <LoginForm></LoginForm>
              <div className={common.block60}></div>
            </div>
          </div>
        </div>
        <div className={common.block80}></div>
        <Foot></Foot>
      </div>
    </Layout>
  )
}
