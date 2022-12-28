import Translate, { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import { Button, Col, Row, Form, Input, Checkbox } from 'antd'
import styles from './styles.module.scss'
import PlanCard from './plancard/index'
import Feature from './feature'
import Recruitment from './recruitment/index'
import { Foot } from '../../components/footer/index'
import LoginForm from './form'
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

const list3 = [
  {
    name: translate({ message: 'UI/UX intern' }),
    require: translate({ message: 'Inter | Product' })
  },
  {
    name: translate({ message: 'Intern backend engineer (Golang)' }),
    require: translate({ message: 'Intern | Engineering' })
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

const Second = () => (
  <>
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

          <img src={require('./bck2.png').default}></img>
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
        <Button type="primary" className={styles.button3}>
          {translate({
            message: 'Contact Us'
          })}
        </Button>
      </div>
    </div>
  </>
)

const Third = () => (
  <>
    <div className={styles.bck3}></div>
    <div className={styles.third}>
      <div className={styles.instructionbox}>
        <p>
          {translate({
            message: 'Hi！We Are '
          })}
          <a>
            {translate({
              message: 'Edgenesis'
            })}
          </a>
        </p>
        <p>
          {translate({
            message: 'Edgenesis (Beijing) Technology Co., Ltd., is committed to the R&D of the next generation open source IoT development frameworks.'
          })}
        </p>
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
      <img src={require('./logo5.png').default}></img>
      <div className={styles.welcome}>
        <div className={styles.welcomesquare}></div>
        <p className={styles.welcometitle}>{translate({ message: 'Join Us' })}</p>
        <div className={styles.welcomelist}>
          <Recruitment data={list3[0]}></Recruitment>
          <Recruitment data={list3[1]}></Recruitment>
        </div>
      </div>
    </div>
  </>
)

const Fourth = () => (
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
      <img src={require('./logo5.png').default}></img>
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
)

const Fifth = () => (
  <>
    <div className={styles.box}>
      <div className={styles.message}>
        <div className={styles.messagedetail}>
          <img src={require('./message.png').default} className={styles.messagebck}></img>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  </>
)

const Sixth = () => (
  <>
    <div className={styles.thanks}>
      <div className={styles.thanksmain}>
        <img src={require('./thanks.png').default}></img>
        <p className={styles.thankstitle}> {translate({ message: 'We have received the questionnaire!' })}</p>
        <p className={styles.thanksinstruction}> {translate({ message: 'Thank you so much for your support' })}</p>
        <p className={styles.thanksinstruction}> {translate({ message: 'Shifu is dedicated to serving you better!' })}</p>
        <a className={styles.thanksbutton}> {translate({ message: 'Redirecting to the homepage in 5 seconds.' })}</a>
      </div>
    </div>
  </>
)
export default function Disclaimer() {
  return (
    <Layout>
      <First></First>
      {/* <Second></Second> */}
      {/* <Third></Third> */}
      {/* <Fourth></Fourth> */}
      {/* <Fifth></Fifth> */}
      {/* <Sixth></Sixth> */}
      <Foot></Foot>
    </Layout>
  )
  // return <Layout>shifuCloud</Layout>
}
