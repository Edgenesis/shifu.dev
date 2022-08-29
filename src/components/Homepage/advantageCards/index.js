import React from "react";
import styles from "./styles.module.scss"
import { CardTwo } from "../cards";
import { card1, card2, card3, card4, card5, card6 } from "../../svg"

import Translate, { translate } from '@docusaurus/Translate';

let cardsList = [
  {
    img: card1,
    title: translate({message: '数据采集'}),
    descript: <span><Translate>无论是协议规定的数据，还是驱动返回值，Shifu都能自动采集。</Translate></span>,
    iconBg: '#E1E1FA',
  },
  {
    img: card2,
    title: translate({message: '开源社区'}),
    descript: <span><Translate>Shifu的核心代码全部开源，让您避免供应商锁定。您更可以自由地选择让Shifu部署在企业内部，边缘云、私有云、混合云或公有云上。</Translate></span>,
    iconBg: '#DDE3FA',
  },
  {
    img: card3,
    title: translate({message: 'k8s原生'}),
    descript: <span><Translate>k8s已经一统天下，Shifu基于k8s的架构可以让你免去未来迁移到k8s上的烦恼。</Translate></span>,
    iconBg: '#E0EFFF',
  },
  {
    img: card4,
    title: translate({message: '轻量化'}),
    descript: <span><Translate>只需一个2G内存的树莓派就可以在生产环境跑起Shifu。</Translate></span>,
    iconBg: '#DCF2FE',
  },
  {
    img: card5,
    title: translate({message: '云边协同'}),
    descript: <span><Translate>Shifu兼容所有基于k8s的云边协同框架（OpenYurt, KubeEdge等）。</Translate></span>,
    iconBg: '#D8FFFD',
  },
  {
    img: card6,
    title: translate({message: '无限扩容'}),
    descript: <span><Translate>基于k8s的架构让Shifu可以无限扩容，轻松处理亿级设备接入，连智慧城市项目都不在话下。</Translate></span>,
    iconBg: '#CEF6F9',
  }
]

export default function AdvantageCards(props) {
  const cards = cardsList.map((item) =>
    <CardTwo {...item}></CardTwo>
  )
  return (
    <div className={styles.advantageCardContainer}>
      {cards}
    </div>
  )
}