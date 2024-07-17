import Translate,{ translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, {Component} from 'react'
import common from '@site/src/css/common.module.scss'
import { Button } from 'antd'
export default class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/'
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
        <div className={common.content}>
          <div className={styles.box}>
            <div className={common.block80}></div>
            <h1>{translate({ message: 'Enterprise-level services' })} </h1>
            <div className={common.block30}></div>
            <p>{translate({ message: 'Our core operational team provides private deployment technical support, architecture design, industrial scene development consulting, remote training, and O&M support, etc., to make IoT development fast and easy.' })}</p>
            <div className={common.block30}></div>
            <Button type="primary"   href="https://edgenesis.ai/contact" className={common.bannerBtn}>
              <Translate>Contact Us</Translate>
            </Button>
            <div className={common.block80}></div>
          </div>
        </div>
    )
  }

}
