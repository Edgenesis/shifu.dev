import React, { useEffect, Component,useState } from 'react'
import Layout from '@theme/Layout'
import LoginForm from '../contact/form'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import {Foot} from '../../components/footer'
import {Spin} from 'antd'
import bacZh from '@site/static/img/product/message.png'
import bacEn from '@site/static/img/product/messageEn.png'
export function Form2(props) {
  let urladdress = 'https://wenjuan.feishu.cn/m/cfm?t=sVOK1dytzVIi-xlnr'
  const [iframestate, setIframestate] = useState(false)
  setTimeout(() => {
    setIframestate(true)
  }, 1000)
  return (
      <div>
        <iframe id="frame" className={`${iframestate ? '' : styles.none}`} height="800px" width="100%"
                src={props.url} frameBorder="0" allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"></iframe>
        <div className={`${styles.spin} ${iframestate ? styles.none : ''} `}>
          <Spin/>
        </div>
      </div>
  )
}

export default class Disclaimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img:bacEn,
      url: 'https://wenjuan.feishu.cn/m?t=sa9xzCh6l4Ii-efno'
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        img:bacZh,
        url: 'https://wenjuan.feishu.cn/m/cfm?t=sVOK1dytzVIi-xlnr'
      })
    } else {
      this.setState({
        img:bacEn,
        url: 'https://wenjuan.feishu.cn/m?t=sa9xzCh6l4Ii-efno'
      })
    }
  }

  render() {
    return (
        <Layout>
          <div className={styles.box}>
            <div className={common.block80}></div>
            <div className={`${styles.message}  ${common.content}`}>
              <div className={`${styles.messagedetail}`}>
                <img src={this.state.img}
                     className={styles.imgBackground}></img>
                <div className={styles.form}>
                  <div className={common.block60}></div>
                  <Form2 url={this.state.url}></Form2>
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

}
