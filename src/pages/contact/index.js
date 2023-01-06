import React, { useEffect, Component } from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import { Foot } from '../../components/footer'
import { Spin } from 'antd'

class Form2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iframestate: true
    }
  }
  render() {
    let urladdress = 'https://wenjuan.feishu.cn/m?t=sVOK1dytzVIi-xlnr'
    useEffect(() => {
      console.log(urladdress)
      if (urladdress !== 'https://wenjuan.feishu.cn/m?t=sVOK1dytzVIi-xlnr') {
        window.location.href = 'thanks'
        urladdress = 'https://wenjuan.feishu.cn/m?t=sVOK1dytzVIi-xlnr'
      }
    }, [urladdress])
    return this.state.iframestate ? (
      <iframe height="800px" width="100%" src={urladdress} frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"></iframe>
    ) : (
      <div className={`${styles.spin}`}>
        <Spin />
      </div>
    )
  }
}

export default function Disclaimer() {
  return (
    <Layout>
      <div className={styles.box}>
        <div className={common.block80}></div>
        <div className={`${styles.message}  ${common.content}`}>
          <div className={`${styles.messagedetail}`}>
            <img src={require('@site/static/img/product/message.png').default} className={styles.imgBackground}></img>
            <div className={styles.form}>
              <div className={common.block60}></div>
              <Form2></Form2>
              {/* <LoginForm></LoginForm> */}
              <div className={common.block60}></div>
            </div>
          </div>
        </div>
        <div className={common.block80}></div>
        <Foot></Foot>
      </div>
    </Layout>
  )
}
