import React, {Component} from 'react'
import styles from './styles.module.scss'
import background from '@site/static/img/product/bck2.png'
import backgroundMove from '@site/static/img/product/bannerMove.png'
import Translate from '@docusaurus/Translate'
import common from '@site/src/css/common.module.scss'
import {Button} from 'antd'

export  default class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/bookDemo'
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        url: '/zh-Hans/bookDemo'
      })
    } else {
      this.setState({
        url: '/deployment'
      })
    }
  }

  render() {
    return (
        <>
          <div className={styles.banner}>
            <img src={background} alt="" className={styles.backgroundPc}/>
            <img src={backgroundMove} alt="" className={styles.backgroundMove}/>
            <div className={styles.bannerCon}>
              <h1>Shifu Cloud</h1>
              <p>
                <Translate>IoT development platform designed for production use cases. By developers, for
                  developers.</Translate>
              </p>
              <Button type="primary"
                      href={this.state.url}
                      className={common.bannerBtn}>
                <Translate>Get Started</Translate>
              </Button>
            </div>
          </div>
          <div className={common.block80}></div>
        </>
    )
  }

}
