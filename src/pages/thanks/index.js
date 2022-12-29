import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Foot } from '../../components/footer'
import 'antd/dist/reset.css'
import { translate } from '@docusaurus/Translate'
import common from '@site/src/css/common.module.scss'
export default function Hello() {
  return (
    <Layout>
      <>
        <div className={styles.thanks}>
          <div className={common.block80}></div>
          <div className={`${styles.thanksmain} ${common.content}`}>
            <div className={common.block80}></div>
            <img src={require('@site/static/img/product/thanks.png').default}></img>
            <h1 className={styles.thankstitle}> {translate({ message: 'We have received the questionnaire!' })}</h1>
            <p className={styles.thanksinstruction}> {translate({ message: 'Thank you so much for your support' })}</p>
            <p className={styles.thanksinstruction}> {translate({ message: 'Shifu is dedicated to serving you better!' })}</p>
            <a className={styles.thanksbutton} href="/"> {translate({ message: 'Redirecting to the homepage in 5 seconds.' })}</a>
            <div className={common.block80}></div>
          </div>
          <div className={common.block80}></div>
        </div>
      </>
      <Foot></Foot>
    </Layout>
  )
}
