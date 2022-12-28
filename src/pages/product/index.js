import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import { Button, Row } from 'antd'
import styles from './styles.module.scss'
import PlanCard from './plancard/index'
import Feature from './feature'
import { Foot } from '../../components/footer/index'

const list = [
  {
    title: 'Try open source Shifu framework',
    instruction: [
      'As ',
      'a next-generation cloud-native IoT development framework',
      ', Shifu provides users with full-scene device hosting and integrated software development capabilities. Through the use of the Shifu framework, developers can more easily connect, monitor and control any IoT device.'
    ],
    function: ['Fast Device Integration', 'Modularize Deployment Experience', 'Effective Application Development'],
    button: 'Try it out',
    jpg: 'github.png',
    url: '/demo'
  },
  {
    title: 'Try Shifu Cloud',
    instruction: [
      'As ',
      'a device configuration platform based on the open source IoT development framework Shifu',
      ', Shifu Cloud can automatically generate YAML files for the digital twin of the device, allowing developers to quickly obtain API interfaces for device capabilities and free up their hands for IoT scene development.'
    ],
    function: ['Multiple protocol support', 'Application Development Support', 'App Store Support'],
    button: 'Free Access for Individuals',
    jpg: 'cloud.png',
    url: 'https://shifu.cloud/'
  }
]

const list2 = [
  {
    title: 'Multi-protocol support',
    instruction: 'The open-source community has been dedicated to adding support for various protocol types, increasing the coverage of protocols for quick access',
    jpg: 'icon1.png'
  },
  {
    title: 'Application development support',
    instruction: 'Shifu has provided with a platform for convenient application development',
    jpg: 'icon2.png'
  },
  {
    title: 'App store support',
    instruction: 'Developers can upload their own developed applications or third-party plugins, users can install these applications or plugins with one click.',
    jpg: 'icon3.png'
  }
]

const First = () => (
  <>
    <div className={styles.bck}></div>
    <p className={styles.title} style={{ fontSize: 64 }}>
      {translate({ message: 'Choose the deployment method that suits you and start your free trial now.' })}
    </p>
    <div className={styles.first}>
      <PlanCard data={list[0]}></PlanCard>
      <PlanCard data={list[1]}></PlanCard>
    </div>
  </>
)

export default function Disclaimer() {
  return (
    <Layout>
      <>
        {' '}
        <div className={styles.box}>
          <div className={styles.bck2}></div>
          <div className={styles.instruction2}>
            <Row className={styles.planbody}>
              <div className={styles.instruction2left}>
                <p className={styles.title2}>Shifu Cloud</p>
                <p className={styles.title3}>
                  {translate({
                    message:
                      'As a device configuration platform based on the open source IoT development framework Shifu, Shifu Cloud can automatically generate YAML files for the digital twin of the device, allowing developers to quickly obtain API interfaces for device capabilities and free up their hands for IoT scene development.'
                  })}
                </p>
                <Button
                  type="primary"
                  className={styles.button2}
                  onClick={() => {
                    location.href = 'https://shifu.cloud'
                  }}
                >
                  {translate({ message: 'Get Started' })}
                </Button>
              </div>

              <img src={require('@site/static/img/product/bck2.png').default}></img>
            </Row>
          </div>
          <div className={styles.cptd}>
            <p className={styles.cptdtitle}>
              {translate({
                message: 'Features'
              })}
            </p>
            <div className={styles.featurelist}>
              <Feature data={list2[0]}></Feature>
              <Feature data={list2[1]}></Feature>
              <Feature data={list2[2]}></Feature>
            </div>
          </div>
          <div className={styles.service}>
            <p className={styles.servicetitle}>
              {translate({
                message: 'Enterprise-level services'
              })}
            </p>
            <p className={styles.serviceinstruction}>
              {translate({
                message: 'Our core operational team provides private deployment technical support, architecture design, industrial scene development consulting, remote training, and O&M support, etc., to make IoT development fast and easy.'
              })}
            </p>
            <Button
              type="primary"
              className={styles.button3}
              onClick={() => {
                location.href = '/zh-Hans/product'
              }}
            >
              {translate({
                message: 'Contact Us'
              })}
            </Button>
          </div>
        </div>
      </>
      <Foot></Foot>
    </Layout>
  )
  // return <Layout>shifuCloud</Layout>
}
