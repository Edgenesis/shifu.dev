import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import { Button } from 'antd'
import common from '@site/src/css/common.module.scss'
export default function Company() {
  return (
    <Layout>
      <div className={styles.company}>
        <div className={common.content}>
          <div className={styles.introduce}>
            <div className={common.block80}></div>
            <h1>
              {translate({ message: 'Hi！We Are ' })}
              <a>{translate({ message: 'Edgenesis' })}</a>
            </h1>
            <div className={common.block30}></div>
            <div className={styles.main}>
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
            <div className={common.block80}></div>
          </div>
        </div>
      </div>

      <div className={common.content}>
        <div className={common.comTitle}>
          <h2 className={styles.trust}>{translate({ message: 'Well trusted by industry leaders' })}</h2>
        </div>

        <div className={common.block80}></div>
        <img className={styles.icons} src={require('@site/static/img/product/logo5.png').default}></img>
        <div className={common.block50}></div>
        <div className={styles.contact}>
          <div className={common.block50}></div>
          <h1>{translate({ message: 'Welcome to join us!' })}</h1>
          <Button
            onClick={() => {
              location.href = 'https://4g1tj81q9o.jobs.fbmms.cn/page/PSVAGacDW6xEEcT5qbbfRL0FR3'
            }}
          >
            {translate({ message: 'Contact Us' })}
          </Button>
          <div className={common.block50}></div>
        </div>
      </div>
      <div className={common.block80}></div>
    </Layout>
  )
}
