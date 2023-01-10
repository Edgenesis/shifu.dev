import React, {Component} from 'react'
import styles from './styles.module.scss'
import BanPC from '@site/static/img/home/ban.png'
import banMove from '@site/static/img/home/bannerMove.png'
import common from "@site/src/css/common.module.scss"
import Translate from '@docusaurus/Translate'
import {Button} from 'antd'

export class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/deployment'
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        url:'/zh-Hans/deployment'
      })
    }else{
      this.setState({
        url:'/deployment'
      })
    }
  }

  render() {
    return (
        <div className={styles.banner}>
          <img src={BanPC} alt="" className={styles.bannerImg}/>
          <img src={banMove} alt="" className={styles.bannerMove}/>
          <div className={styles.bannerCon}>
            <a href="https://github.com/edgenesis/shifu">
              <img src="https://img.shields.io/github/stars/edgenesis/shifu?style=social" alt=""
                   className={styles.starImg}/>
            </a>

            <h1>
              <Translate>Next Generation</Translate>
              <br/>
              <Translate>Cloud Native IoT</Translate>
              <br/>
              <Translate>Development Framework</Translate>
            </h1>
            <p>
              <Translate>10X your IoT software development</Translate>
            </p>
            <Button type="primary" href={this.state.url} className={common.bannerBtn}>
              <Translate>Free trial</Translate>
            </Button>
          </div>
        </div>
    )
  }

}
