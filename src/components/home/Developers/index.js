import React from 'react'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import Translate, { translate } from '@docusaurus/Translate'
let Lists = [
  {
    id: 0,
    title: translate({ message: 'Extremely Fast Integration' }),
    message: translate({ message: 'From robots to thermometers' }),
    message1: translate({ message: 'From proprietary to standard protocols' }),
    message2: translate({ message: "Shifu's high compatibility design makes it easy to cope with all heterogeneous devices" }),
    img: require('@site/static/img/home/list1.png').default
  },
  {
    id: 1,
    title: translate({ message: 'Modularized Deployment Experience' }),
    message: translate({ message: 'Devices and applications integrated into Shifu will be packaged into lego-like modules' }),
    message1: translate({ message: 'You can conjure up a unique substrate 100% suitable for your scenario out of these modules' }),
    img: require('@site/static/img/home/list2.png').default
  },
  {
    id: 2,
    title: translate({ message: 'Efficient Application Development' }),
    message: translate({ message: 'Capabilities of the device integrated into Shifu will be abstracted as APIs' }),
    message1: translate({ message: 'Completely decoupling your application from the hardware' }),
    message2: translate({ message: 'Making IoT application development as efficient as mobile app development' }),
    img: require('@site/static/img/home/list3.png').default
  },
  {
    id: 3,
    title: translate({ message: 'K8s cloud-native' }),
    message: translate({ message: 'A unified cloud-native framework for agile development and operations' }),
    message1: translate({ message: 'Endowing IoT platforms with ultra-high stability and security through K8s' }),
    img: require('@site/static/img/home/list4.png').default
  }
]

export function Developers() {
  const lists = Lists.map(item => {
    return <List {...item} key={item.id} />
  })
  return (
    <div className={`${styles.devBox} `}>
      <div className={common.block80}></div>
      <div className={common.comTitle}>
        <h1>
          <Translate>Why Shifu</Translate>
        </h1>
      </div>
      <div className={common.block60}></div>
      <div className={`${styles.lists} ${common.content}`}>{lists}</div>
      <div className={common.block50}></div>
    </div>
  )
}

export function List(props) {
  return (
    <div className={styles.listBox}>
      <div className={styles.list}>
        <div className={styles.img}>
          <img src={props.img}></img>
        </div>
        <div className={styles.msglist}>
          <h2>{props.title}</h2>
          <p>{props.message}</p>
          <p>{props.message1}</p>
          <p>{props.message2}</p>
        </div>
      </div>
    </div>
  )
}
