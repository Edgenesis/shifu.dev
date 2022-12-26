import Translate, { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import { Col, Row } from 'antd'
import styles from './styles.module.scss'
import PlanCard from './plancard/index'

const list = [
  {
    title: '开源版Shifu 框架',
    instruction: '作为下一代云原生物联网开发框架，Shifu为用户提供了全场景设备托管与一体化软件开发能力。开发者通过使用 Shifu框架，可以更简单地连接、监视和控制任何物联网设备。',
    function: ['极速设备接入', '模块化部署体验', '高效应用开发'],
    button: '点击试用',
    jpg: 'github.png'
  },
  {
    title: 'Shifu Cloud 平台',
    instruction: '作为基于开源物联网开发框架Shifu的设备配置平台，Shifu Cloud能够自动生成设备孪生的YAML文件，让开发者快速获得设备能力的API接口，更快进入物联网场景的开发。',
    function: ['多类型协议支持', '便捷应用开发', '应用商店支持'],
    button: '点击试用(个人限时免费)',
    jpg: 'cloud.png'
  }
]

const App = () => (
  <>
    <div className={styles.bck}></div>
    <Row className={styles.head}>
      <Col span={24}>
        <p className={styles.title} style={{ fontSize: 64 }}>
          选择适合您的部署方式，立即开始试用
        </p>
      </Col>
    </Row>

    <Row className={styles.planbody}>
      <Col xs={20} sm={17} md={14} lg={11} xl={8}>
        <PlanCard data={list[0]}></PlanCard>
      </Col>
      <Col xs={0} sm={0} md={0} lg={1} xl={1}></Col>
      <Col xs={20} sm={17} md={14} lg={11} xl={8}>
        <PlanCard data={list[1]}></PlanCard>
      </Col>
    </Row>
  </>
)

export default function Disclaimer() {
  return (
    <Layout>
      <App></App>
    </Layout>
  )
  // return <Layout>shifuCloud</Layout>
}
