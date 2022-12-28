import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Foot } from '../../components/footer'
import 'antd/dist/reset.css'

export default function Hello() {
  return (
    <Layout>
      <>
        <div className={styles.thanks}>
          <div className={styles.thanksmain}>
            <img src={require('@site/static/img/product/thanks.png').default}></img>
            <p className={styles.thankstitle}> {translate({ message: 'We have received the questionnaire!' })}</p>
            <p className={styles.thanksinstruction}> {translate({ message: 'Thank you so much for your support' })}</p>
            <p className={styles.thanksinstruction}> {translate({ message: 'Shifu is dedicated to serving you better!' })}</p>
            <a className={styles.thanksbutton}> {translate({ message: 'Redirecting to the homepage in 5 seconds.' })}</a>
          </div>
        </div>
      </>
      <Foot></Foot>
    </Layout>
  )
}
