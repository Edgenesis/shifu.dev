import React, { Component } from 'react'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import Translate, { translate } from '@docusaurus/Translate'
import { Divider } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
let Lists = [
  // {
  //   id: 0,
  //   img: 'blog.svg',
  //   title: translate({ message: 'Tech Blogs' }),
  //   message: translate({ message: 'How to deploy Shifu on K3s to complete the cloud-edge-device cycle' }),
  //   messageLink: 'technical-blogs/2022/10/20/k3s',
  //   link: 'technical-blogs'
  // },
  {
    id: 1,
    img: 'news.svg',
    title: translate({ message: 'Insights' }),
    message: translate({ message: 'Cleansing the Cloudy IoT Planet' }),
    messageLink: '',
    link: 'news'
  },
  {
    id: 2,
    img: 'releases.svg',
    // img: require('@site/static/img/home/releases.png').default,
    title: translate({ message: 'Releases' }),
    message: translate({ message: 'v0.69.0' }),
    messageLink: 'https://github.com/Edgenesis/shifu/releases/tag/v0.69.0',
    link: 'https://github.com/Edgenesis/shifu/releases'
  }
]

export class News extends Component {
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
    const NewLists = Lists.map(item => {
      return <New {...item} url={this.state.url} key={item.id} />
    })
    return (
      <>
        <div className={common.block80}></div>
        <div className={styles.newsBox}>
          <div className={` ${common.content}`}>
            <div className={common.block50}></div>
            {/*<Divider className={common.divider}/>*/}
            <div className={common.block50}></div>
            <div className={`${styles.news}`}>{NewLists}</div>
            <div className={common.block30}></div>
            {/*<Divider className={common.divider}/>*/}
            <div className={common.block50}></div>
          </div>
        </div>
      </>
    )
  }
}

export function New(props) {
  return (
    <div className={styles.new}>
      {/*<img src={props.img} alt="" />*/}
      <img src={require('@site/static/img/home/' + props.img).default}></img>
      <h2>{props.title}</h2>
      <a className={styles.message} href={props.messageLink}>
        <p>{props.message} </p>
      </a>
      {props.link.includes('http') ? (
        <a href={`${props.link}`}>
          <Translate>More</Translate>
          <ArrowRightOutlined />
        </a>
      ) : (
        <a href={`${props.url}${props.link}`}>
          <Translate>More</Translate>
          <ArrowRightOutlined />
        </a>
      )}
    </div>
  )
}
