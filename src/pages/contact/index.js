import React, { useEffect, Component, useState } from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import { Foot } from '../../components/footer'
import { Spin } from 'antd'

export function Form2() {
  let urladdress = 'https://wenjuan.feishu.cn/m/cfm?t=sVOK1dytzVIi-xlnr'
  const [iframestate, setIframestate] = useState(false)
  setTimeout(() => {
    setIframestate(true)
  }, 1000)
  // setInterval(() => {
  //   console.log(parent.document.getElementById('frame').contentWindow.location.href)
  // }, 5000)
  return (
    <div>
      <iframe id="frame" className={`${iframestate ? '' : styles.none}`} height="800px" width="100%" src="https://wenjuan.feishu.cn/m/cfm?t=sVOK1dytzVIi-xlnr" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"></iframe>
      <div className={`${styles.spin} ${iframestate ? styles.none : ''} `}>
        <Spin />
      </div>
    </div>
  )
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
