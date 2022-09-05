import React from "react";
import styles from "./styles.module.scss";
import { CardOne } from "../cards"
import { bar1, bar2, bar3, access, modularization, application, stable, security, community } from "../../svg"
import Translate, { translate } from '@docusaurus/Translate';

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
        {props.img}
      </div>
    </div>
  );
}

function IntroBar(props) {
  return (
    <div className={styles.introBar}>
      {props.img}
      <p className={styles.barTitle}>{props.title}</p>
    </div>
  )
}

let developerlist = [
  {
    img: access,
    title: translate({ message: 'Extremely Fast Connection' }),
    descript:
      <span>
        <Translate>Large to construction machinery using private driver</Translate><br />
        <Translate>Small to thermometers using public protocol</Translate><br />
        <Translate>Shifu's high compatibility allows you to easily handle a variety of e-bay devices</Translate>
      </span>,
    isReverse: true,
    titleColor: "#2490FF",
    shadowColor: "rgba(61, 114, 177, 0.2)"
  },
  {
    img: modularization,
    title: translate({ message: 'Modularized Deployment Experience' }),
    descript:
      <span>
        <Translate>All devices and applications connected to Shifu are packaged into a puzzle-like module</Translate><br />
        <Translate>Just load as needed, depending on the devices in the scene</Translate>
      </span>,
    isReverse: false,
    titleColor: "#C15CFF",
    shadowColor: "rgba(126, 65, 155, 0.2)"
  },
  {
    img: application,
    title: translate({ message: 'Efficient Application Development' }),
    descript:
      <span>
        <Translate>After connecting to the device, Shifu will automatically abstract the device's capabilities into an API, allowing you to completely decouple your application from the hardware device, making inefficient IoT application development as efficient as object-oriented programming.</Translate>
      </span>,
    isReverse: true,
    titleColor: "#F33EE3",
    shadowColor: "rgba(186, 90, 36, 0.2)"
  },
]

let engineeringList = [
  {
    img: stable,
    title: translate({ message: 'Aerospace-grade Stability' }),
    descript:
      <span>
        <Translate>Shifu has been validated in aerospace scenarios</Translate><br />
        <Translate>Provides 99.9999% reliability</Translate><br />
        <Translate>Keeps you out of downtime trouble</Translate>
      </span>,
    isReverse: true,
    titleColor: "#FF64EF",
    shadowColor: "rgba(200, 68, 39, 0.2)"
  },
  {
    img: security,
    title: translate({ message: 'Multidimensional Security Policy' }),
    descript:
      <span>
        <Translate>The UN's cloud-native security team is at the helm</Translate><br />
        <Translate>Whether it is data encryption or network security</Translate><br />
        <Translate>Shifu satisfies</Translate>
      </span>,
    isReverse: false,
    titleColor: "#9A5CFF",
    shadowColor: "rgba(128, 34, 186, 0.2)"
  },
  {
    img: community,
    title: translate({ message: 'Globalized Community Ecology' }),
    descript:
      <span>
        <Translate>Shifu benefits from the Kubernetes native architecture, providing seamless access to the powerful cloud-native software ecosystem and allowing developers around the world to help you solve your worries.</Translate>
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