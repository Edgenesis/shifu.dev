import React from "react";
import styles from "./styles.module.scss"
import { CardTwo } from "../cards";
import { card1, card2, card3, card4, card5, card6 } from "../../svg"
let cardsList = [
  {
    img: card1,
    title: '数据采集',
    descript: <span>无论是协议规定的数据，还是驱动返回值，Shifu都能自动采集。</span>,
    iconBg: '#E1E1FA',
  },
  {
    img: card2,
    title: '开源社区',
    descript: <span>Shifu的核心代码全部开源，让您避免供应商锁定。您更可以自由地选择让Shifu部署在企业内部，边缘云、私有云、混合云或公有云上。</span>,
    iconBg: '#DDE3FA',
  },
  {
    img: card3,
    title: 'k8s原生',
    descript: <span>k8s已经一统天下，Shifu基于k8s的架构可以让你免去未来迁移到k8s上的烦恼。</span>,
    iconBg: '#E0EFFF',
  },
  {
    img: card4,
    title: '轻量化',
    descript: <span>只需一个2G内存的树莓派就可以在生产环境跑起Shifu。</span>,
    iconBg: '#DCF2FE',
  },
  {
    img: card5,
    title: '云边协同',
    descript: <span>Shifu兼容所有基于k8s的云边协同框架（OpenYurt, KubeEdge等）。</span>,
    iconBg: '#D8FFFD',
  },
  {
    img: card6,
    title: '无限扩容',
    descript: <span>基于k8s的架构让Shifu可以无限扩容，轻松处理亿级设备接入，连智慧城市项目都不在话下。</span>,
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