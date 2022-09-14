import React from "react";
import styles from "./styles.module.scss"
import { CardTwo } from "../cards";
import Translate, { translate } from '@docusaurus/Translate';

let cardsList = [
  {
    img: require('@site/static/img/index/card-1.svg').default,
    title: translate({message: 'Data Acquisition'}),
    descript: <span><Translate>Automated collection of protocol and driver's value</Translate></span>,
    iconBg: '#E1E1FA',
  },
  {
    img: require('@site/static/img/index/card-2.svg').default,
    title: translate({ message: 'Open Source Community' }),
    descript: <span><Translate>Open source with limitless cloud carrier choice Versatile deployment on enterprise, edge, private or public cloud service</Translate></span>,
    iconBg: '#DDE3FA',
  },
  {
    img: require('@site/static/img/index/card-3.svg').default,
    title: translate({ message: 'K8s Native' }),
    descript: <span><Translate>Rooted in K8s, hassle-free migration in the future</Translate></span>,
    iconBg: '#E0EFFF',
  },
  {
    img: require('@site/static/img/index/card-4.svg').default,
    title: translate({ message: 'Lightweight Hardware Requirment' }),
    descript: <span><Translate>As light as a Raspberry Pi(e)! (2G RAM)</Translate></span>,
    iconBg: '#DCF2FE',
  },
  {
    img: require('@site/static/img/index/card-5.svg').default,
    title: translate({ message: 'Cloud-Side Collaboration' }),
    descript: <span><Translate>Compatible with all K8s-based cloud/edge frameworks (OpenYurt, KubeEdge, etc.)</Translate></span>,
    iconBg: '#D8FFFD',
  },
  {
    img: require('@site/static/img/index/card-6.svg').default,
    title: translate({message: 'Infinite Scalability'}),
    descript: <span><Translate>Billions level of device service scalability Big enough to run the city</Translate></span>,
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