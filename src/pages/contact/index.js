import Translate, { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'

export default function Disclaimer() {
  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.message}>
          <div className={styles.messagedetail}>
            <img src={require('@site/static/img/product/message.png').default} className={styles.messagebck}></img>
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </Layout>
  )
}
