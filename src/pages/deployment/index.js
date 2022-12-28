import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'
import PlanCard from './plancard/index'
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
        <div className={styles.bck}></div>
        <p className={styles.title} style={{ fontSize: 64 }}>
          {translate({ message: 'Choose the deployment method that suits you and start your free trial now.' })}
        </p>
        <div className={styles.first}>
          <PlanCard data={list[0]}></PlanCard>
          <PlanCard data={list[1]}></PlanCard>
        </div>
      </>
    </Layout>
  )
}
