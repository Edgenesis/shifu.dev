import React from 'react'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import Translate, { translate } from '@docusaurus/Translate'
let Lists = [
  {
    id: 0,
    title: translate({ message: '1200%' }),
    message: translate({ message: 'increase in efficiency' }),
    img: '@site/static/img/home/list1.png'
  },
  {
    id: 1,
    title: translate({ message: '0 burden' }),
    message: translate({ message: 'to merge into existing platforms' }),
    img: '@site/static/img/home/list2.png'
  },
  {
    id: 2,
    title: translate({ message: 'over 1M hours' }),
    message: translate({ message: 'of uninterrupted client run time' }),
    img: '@site/static/img/home/list3.png'
  },
  {
    id: 3,
    title: translate({ message: '50%' }),
    message: translate({ message: 'time reduction in R&D time' }),
    img: '@site/static/img/home/list4.png'
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
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  )
}
