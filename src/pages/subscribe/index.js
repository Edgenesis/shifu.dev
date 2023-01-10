import React, { Component } from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Foot } from '../../components/footer'
import 'antd/dist/reset.css'
import { translate } from '@docusaurus/Translate'
import common from '@site/src/css/common.module.scss'

export default class Hello extends Component {
  render() {
    return (
      <Layout>
        <>
          <div className={styles.thanks}>
            <div className={common.block80}></div>
            <div className={`${styles.thanksmain} ${common.content}`}>
              <div className={common.block80}></div>
              <img src={require('@site/static/img/product/shifuLogo.png').default}></img>
              <div className={common.block30}></div>
              <p className={styles.thanksinstruction}>{translate({ message: 'Edgenesis is dedicated to developing the next generation of open-source AIoT (artificial intelligence of things) operating system, with a craftsman spirit to build the infrastructure of the digital society.' })}</p>
              <p className={styles.thanksinstruction}>{translate({ message: 'Follow our WeChat subscription account to stay updated on the latest information about Shifu.' })}</p>
              <div className={common.block30}></div>
              <img className={styles.qrcode} src={require('@site/static/img/product/qrcode.png').default}></img>
              <a href="/">{translate({ message: 'Redirecting to the homepage' })}</a>
              <div className={common.block80}></div>
            </div>
            <div className={common.block80}></div>
          </div>
        </>
        <Foot></Foot>
      </Layout>
    )
  }
}
