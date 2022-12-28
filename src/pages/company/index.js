import Translate, { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import { Button } from 'antd'
export default function Disclaimer() {
  return (
    <Layout>
      <>
        <div className={styles.bck3}></div>
        <div className={styles.third}>
          <div className={styles.instructionbox}>
            <p>
              {translate({ message: 'Hi！We Are ' })}
              <a>{translate({ message: 'Edgenesis' })}</a>
            </p>
            <p>{translate({ message: 'Edgenesis (Beijing) Technology Co., Ltd., is committed to the R&D of the next generation open source IoT development frameworks.' })}</p>
            <p>
              {translate({
                message:
                  'Edgenesis has created the ingenious distributed IoT framework Shifu based on k8s, providing full-scene device hosting for customers and an integrated software development experience. By using digital twin technology within a transparent framework, Shifu endows devices with thinking digital brain. The platform layer collects north-bound data from all devices and machines on the scene and sends south-bound instructions.'
              })}
            </p>
            <p>
              {translate({
                message:
                  'Edgenesis has provided framework hosting services to many top companies in respective industries. The company has cooperated with many domestic and foreign Fortune 500 companies, including China State Shipbuilding Cooperation, Xiamen Itg Group Corp.,Ltd. Microsoft, and Amazon. In the future, Edgenesis will continue to promote the digitalization of the underlying structure of intelligent devices, providing 100% reusable and modular-like framework deployment experience for solution integrators, industrial IoT projects, and government infrastructure departments.'
              })}
            </p>
          </div>
          <p>{translate({ message: 'Well trusted by industry leaders' })}</p>
          <img src={require('@site/static/img/product/logo5.png').default}></img>
          <div className={styles.contact}>
            <p>{translate({ message: 'Welcome to join us!' })}</p>
            <Button
              className={styles.contactbutton}
              onClick={() => {
                location.href = 'https://4g1tj81q9o.jobs.fbmms.cn/page/PSVAGacDW6xEEcT5qbbfRL0FR3'
              }}
            >
              {translate({ message: 'Contact Us' })}
            </Button>
          </div>
        </div>
      </>
    </Layout>
  )
}
