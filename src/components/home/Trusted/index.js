import React, { useRef } from 'react'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import Translate, { translate } from '@docusaurus/Translate'
import quote from '@site/static/img/home/quote.png'
import left from '@site/static/img/home/left.png'
import right from '@site/static/img/home/right.png'
import { Carousel } from 'antd'

let Lists = [
  {
    url: require('@site/static/img/home/tr1.png').default
  },
  {
    url: require('@site/static/img/home/tr2.png').default
  },
  {
    url: require('@site/static/img/home/tr3.png').default
  },
  {
    url: require('@site/static/img/home/tr4.png').default
  },
  {
    url: require('@site/static/img/home/tr5.png').default
  },
  {
    url: require('@site/static/img/home/tr6.png').default
  }
]
let carList = [
  {
    url: require('@site/static/img/home/tru1.png').default,
    backUrl: require('@site/static/img/home/trus1.png').default,
    text: translate({ message: 'Shifu helps us integrate all of our devices in a smart and efficient way. With Shifu, we can treat all of our devices as software objects and abstract away the physical devices. This makes it easier for us to manage and control our devices.' }),
    author: translate({ message: 'Chief Robot Engineer' }),
    writer: translate({ message: 'Kanyon Edvall' })
  },
  {
    url: require('@site/static/img/home/tru2.png').default,
    backUrl: require('@site/static/img/home/trus2.png').default,
    text: translate({ message: "Shifu's cloud-native architecture supports containerized deployment more perfectly. I hope that Shifu could explore more possibilities in IoT scenarios with TDengine 3.0 in the future." }),
    author: translate({ message: 'Founder of TDengine' }),
    writer: translate({ message: 'Jianhui Tao' })
  },
  {
    url: require('@site/static/img/home/tru3.png').default,
    backUrl: require('@site/static/img/home/trus2.png').default,
    text: translate({
      message: "Shifu's cloud-native architecture is based on Kubernetes, which is very innovative, further unleashing the control and management capabilities of edge devices and providing application development engineers with a unified base for cloud edge collaborative management."
    }),
    author: translate({ message: 'Chairman of LF Edge Board' }),
    writer: translate({ message: 'Tina Tsou' })
  },
  {
    url: require('@site/static/img/home/tru4.png').default,
    backUrl: require('@site/static/img/home/trus2.png').default,
    text: translate({ message: 'The advent of the cloud-native era has reconfigured the infrastructure of all enterprises, and the open source of Shifu will further help enterprises with their IoT management. I sincerely hope that Shifu project will excel itself in the future.' }),
    author: translate({ message: 'Founder of ClickHouse China Community' }),
    writer: translate({ message: 'Wei Guo' })
  }
]
export function Trusted() {
  const lists = Lists.map(item => {
    return (
      <div key={item.url}>
        <img src={item.url} alt="" />
      </div>
    )
  })
  const carousel = carList.map(item => {
    return <Trust {...item} key={item.url}></Trust>
  })
  const contentStyle = {
    height: '400px',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#364d79'
  }
  const carouselEL = useRef(null)
  return (
    <div className={`${styles.devBox} `}>
      <div className={common.block80}></div>
      <div className={common.comTitle}>
        <h1>
          <Translate>Well Trusted by Industry Leaders</Translate>
        </h1>
      </div>
      <div className={common.block60}></div>
      <div className={`${styles.lists} ${common.content}`}>
        {/*<div className={`${styles.listBox}`}>*/}
        {lists}
        {/*</div>*/}
      </div>
      <div className={common.block60}></div>
      <div className={`${styles.trusts} ${common.content}`}>
        <img
          src={left}
          className={styles.leftButton}
          style={{ left: 10 }}
          onClick={() => {
            carouselEL.current.prev()
          }}
          alt=""
        />
        <img
          src={right}
          className={styles.rightButton}
          style={{ right: 10 }}
          onClick={() => {
            carouselEL.current.next()
          }}
          alt=""
        />
        <Carousel autoplay dots={false} style={{ margin: '0 30px' }} ref={carouselEL}>
          {carousel}
        </Carousel>
      </div>

      <div className={common.block50}></div>
    </div>
  )
}

export function List(props) {
  return (
    <div className={styles.listBox}>
      <div className={styles.list}>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  )
}

export function Trust(props) {
  return (
    <div className={styles.trust}>
      <div className={styles.imgBox}>
        <img src={props.url} alt="" />
      </div>
      <div className={styles.content}>
        <div>
          <img src={quote} alt="" />
          <p>{props.text}</p>
          <div>——{props.author}</div>
          <div>{props.writer}</div>
        </div>
      </div>
      <img src={props.backUrl} alt="" />
    </div>
  )
}
