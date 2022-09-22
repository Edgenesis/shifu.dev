import React from "react";
import styles from "./styles.module.scss";
import { CardOne } from "../cards"
import Translate, { translate } from '@docusaurus/Translate';

const bar1 = require('@site/static/img/index/bar-1.svg').default
const bar2 = require('@site/static/img/index/bar-2.svg').default
const bar3 = require('@site/static/img/index/bar-3.svg').default

function DescriptionModel(props) {
  let flexDirection = props.isReverse ? "row-reverse" : "row";
  let isTextAlignRight = props.isReverse
  return (
    <div
      className={styles.descriptionModel}
      style={{ flexDirection: flexDirection }}
    >
      <CardOne
        title={props.title}
        descript={props.descript}
        isTextAlignRight={isTextAlignRight}
        titleColor={props.titleColor}
        shadowColor={props.shadowColor}>
      </CardOne>
      <div className={styles.img}>
        <props.img></props.img>
      </div>
    </div>
  );
}

function IntroBar(props) {
  return (
    <div className={styles.introBar}>
      <props.img></props.img>
      <p className={styles.barTitle}>{props.title}</p>
    </div>
  )
}

let developerlist = [
  {
    img: require('@site/static/img/index/guide-access.svg').default,
    title: translate({ message: 'Extremely Fast Access' }),
    descript:
      <span>
        <Translate>From machinery to thermometers</Translate><br />
        <Translate>With private or public protocol</Translate><br />
        <Translate>Shifu's high compatibility design makes it easy for you to handle universal devices</Translate>
      </span>,
    isReverse: true,
    titleColor: "#2490FF",
    shadowColor: "rgba(61, 114, 177, 0.2)"
  },
  {
    img: require('@site/static/img/index/guide-modularization.svg').default,
    title: translate({ message: 'Modulized Deployment Experience' }),
    descript:
      <span>
        <Translate>Devices and applications connected with Shifu will be packaged into puzzle-like modules</Translate><br />
        <Translate>Just call for service as you will</Translate>
      </span>,
    isReverse: false,
    titleColor: "#C15CFF",
    shadowColor: "rgba(126, 65, 155, 0.2)"
  },
  {
    img: require('@site/static/img/index/guide-application.svg').default,
    title: translate({ message: 'Efficient Application Development' }),
    descript:
      <span>
        <Translate>Connected devices will be abstracted as functional API</Translate><br />
        <Translate>With the help of Shifu, applications will be decoupled from hardware</Translate><br />
        <Translate>Thus, make the IoT application development as efficient as on the mobile platform</Translate>
      </span>,
    isReverse: true,
    titleColor: "#F33EE3",
    shadowColor: "rgba(186, 90, 36, 0.2)"
  },
]

let engineeringList = [
  {
    img: require('@site/static/img/index/guide-stable.svg').default,
    title: translate({ message: 'Aero-Grade Stability' }),
    descript:
      <span>
          <Translate>Shifu has been validated in aerospace scenarios</Translate><br />
        <Translate>Protected from downtime crash with 99.9999% reliability</Translate>
      </span>,
    isReverse: true,
    titleColor: "#FF64EF",
    shadowColor: "rgba(200, 68, 39, 0.2)"
  },
  {
    img: require('@site/static/img/index/guide-security.svg').default,
    title: translate({ message: 'Multi-Dimensional Security Policy' }),
    descript:
      <span>
         <Translate>Backed by the cloud-native security team of the UN</Translate><br />
        <Translate>No matter data encryption or network security</Translate><br />
        <Translate>Shifu is on duty 24X7</Translate>
      </span>,
    isReverse: false,
    titleColor: "#9A5CFF",
    shadowColor: "rgba(128, 34, 186, 0.2)"
  },
  {
    img: require('@site/static/img/index/guide-community.svg').default,
    title: translate({ message: 'Globalized Community Ecology' }),
    descript:
      <span>
         <Translate>Benefit from cloud-native software ecosystem and native Kubernetes architecture</Translate><br />
        <Translate>Issues will be helped across a worldwide range</Translate>
      </span>,
    isReverse: true,
    titleColor: "#2490FF",
    shadowColor: "rgba(16, 83, 184, 0.2)"
  }
]

export default function Introduction() {
  const developerPart = developerlist.map((item, index) =>
    <DescriptionModel key={index}{...item}></DescriptionModel>
  )
  const engineeringPart = engineeringList.map((item, index) =>
    <DescriptionModel key={index}{...item}></DescriptionModel>
  )
  return (
    <div>
      <IntroBar img={bar1} title={translate({ message: "Shifu's Value to Developers" })}></IntroBar>
      {developerPart}
      <IntroBar img={bar2} title={translate({ message: "Shifu's Value to Engineering" })}></IntroBar>
      {engineeringPart}
      <IntroBar img={bar3} title={translate({ message: "Shifu's Unique Advantages" })}></IntroBar>
    </div>
  )
}