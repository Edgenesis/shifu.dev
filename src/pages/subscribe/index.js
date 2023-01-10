import React, { Component } from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Foot } from '../../components/footer'
import 'antd/dist/reset.css'
import { translate } from '@docusaurus/Translate'
import common from '@site/src/css/common.module.scss'
import SfLogo from '@site/static/img/product/SfLogo.png'
export default class Hello extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/bookDemo'
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        url: '/zh-Hans/'
      })
    } else {
      this.setState({
        url: '/'
      })
    }
  }
  render() {
    return (
      <Layout>
        <>
          <div className={styles.thanks}>
            <div className={common.block80}></div>
            <div className={`${styles.thanksmain} ${common.content}`}>
              <div className={common.block80}></div>
              <img src={SfLogo}></img>
              <div className={common.block30}></div>
              <p className={styles.thanksinstruction}>
                {translate({
                  message:
                    'Edgenesis is dedicated to developing efficient developer tools and providing full-scenario IoT solutions. Using our self-developed Shifu Framework as an open-source IoT development framework for industrial IoT, we help AIoT developers focus on business logic and develop applications agilely and efficiently.'
                })}
              </p>
              <p className={styles.thanksinstruction}>{translate({ message: 'Welcome to follow our WeChat subscription account to stay updated on the latest information about Shifu.' })}</p>
              <div className={common.block30}></div>
              <img className={styles.qrcode} src={require('@site/static/img/product/qrcode.png').default}></img>
              <a href={this.state.url}>{translate({ message: 'Redirecting to the homepage' })}</a>
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
