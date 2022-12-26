import Translate, { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import { Button, Col, Row } from 'antd'
import styles from './styles.module.scss'
import PlanCard from './plancard/index'
import Feature from './feature'
import { Foot } from '../../components/footer/index'
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

const list2 = [
  {
    title: '多类型协议支持',
    instruction: '开源社区正在不断增加支持的协议，提高快速接入的覆盖率',
    jpg: 'github.png'
  },
  {
    title: '应用开发支持',
    instruction: '你能在Shifu Cloud平台体验便捷的应用开发',
    jpg: 'cloud.png'
  },
  {
    title: '应用商店支持',
    instruction: '包括开发者上传的自己开发的应用或第三方插件，支持使用者一键安装',
    jpg: 'cloud.png'
  }
]

const First = () => (
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

const Second = () => (
  <>
    <div className={styles.bck2}></div>

    <div className={styles.instruction2}>
      <Row className={styles.planbody}>
        <Col span={8} className={styles.planbody2}>
          <div className={styles.instruction2left}>
            <p className={styles.title2}>Shifu Cloud</p>
            <p className={styles.title3}>作为基于开源物联网开发框架Shifu的设备配置平台，Shifu Cloud能够自动生成设备孪生的YAML文件，让开发者快速获得设备能力的API接口，更快进入物联网场景的开发。</p>
            <Button type="primary" className={styles.button2}>
              现在体验
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img src={require('./bck2.png').default}></img>
        </Col>
      </Row>
    </div>
    <div className={styles.cptd}>
      <p className={styles.cptdtitle}>产品特点</p>
      <div className={styles.featurelist}>
        <Feature data={list2[0]}></Feature>
        <Feature data={list2[1]}></Feature>
        <Feature data={list2[2]}></Feature>
      </div>
    </div>
    <div className={styles.service}>
      <p className={styles.servicetitle}>企业级服务</p>
      <p className={styles.serviceinstruction}>Shifu Cloud核心运营团队提供私有化部署技术支持、架构设计、场景开发咨询、远程培训、运维支持等企业级服务，解决物联网场景落地开发难题。</p>
      <Button type="primary" className={styles.button3}>
        联系我们
      </Button>
    </div>
  </>
)

export default function Disclaimer() {
  return (
    <Layout>
      <First></First>
      {/* <Second></Second> */}
      <Foot></Foot>
    </Layout>
  )
  // return <Layout>shifuCloud</Layout>
}
