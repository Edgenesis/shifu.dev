import React from "react";
import styles from "./styles.module.scss"
import { CardTwo } from "../cards";
import { card1, card2, card3, card4, card5, card6 } from "../../svg"

import Translate, { translate } from '@docusaurus/Translate';

let cardsList = [
  {
    img: card1,
    title: translate({message: 'Data Acquisition'}),
    descript: <span><Translate>Whether the data is specified by the protocol or returned by the driver, Shifu is able to record it automatically.</Translate></span>,
    iconBg: '#E1E1FA',
  },
  {
    img: card2,
    title: translate({message: 'Open Source Community'}),
    descript: <span><Translate>Shifu's core codes are all open source, allowing you to avoid vendor lock-in. You are even free to choose to have Shifu deployed on-premises, on edge, private, hybrid or public clouds.</Translate></span>,
    iconBg: '#DDE3FA',
  },
  {
    img: card3,
    title: translate({message: 'K8s Native'}),
    descript: <span><Translate>k8s has ruled the roost, and Shifu's k8s-based architecture can save you the trouble of migrating to k8s in the future.</Translate></span>,
    iconBg: '#E0EFFF',
  },
  {
    img: card4,
    title: translate({message: 'Lightweight'}),
    descript: <span><Translate>Just a Raspberry Pi with 2G RAM can run Shifu in a production environment.</Translate></span>,
    iconBg: '#DCF2FE',
  },
  {
    img: card5,
    title: translate({message: 'Cloudside Collaboration'}),
    descript: <span><Translate>Shifu is compatible with all k8s-based cloud edge collaboration frameworks (OpenYurt, KubeEdge, etc.).</Translate></span>,
    iconBg: '#D8FFFD',
  },
  {
    img: card6,
    title: translate({message: 'Infinite Scalability'}),
    descript: <span><Translate>The k8s-based architecture allows Shifu to scale infinitely and easily handle billions of device access, even for smart city projects.</Translate></span>,
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