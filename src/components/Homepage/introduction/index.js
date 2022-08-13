import React from "react";
import styles from "./styles.module.scss";
import { CardOne } from "../cards"
import { bar1, bar2, bar3, access, modularization, application, stable, security, community } from "../../svg"

function DescriptionModel(props) {
  let flexDirection = props.isReverse ? "row-reverse" : "row";
  let isTextAlignRight = props.isReverse
  return (
    <div
      className={styles.descriptionModel}
      style={{ flexDirection: flexDirection }}
    >
      <CardOne title={props.title} descript={props.descript} isTextAlignRight={isTextAlignRight}></CardOne>
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
    title: '极速设备接入',
    descript: <span>大到使用私有驱动的工程机械<br />小到使用公有协议的温湿度计<br />你都可以让Shifu来帮你做对接异构设备的脏活累活</span>,
    isReverse: true
  },
  {
    img: modularization,
    title: '模块化工作体验',
    descript: <span>所有接入Shifu的设备都会被封装成一个拼图式模块<br />根据场景内的设备不同，按需加载即可</span>,
    isReverse: false
  },
  {
    img: application,
    title: '高效应用开发',
    descript: <span>接入设备后，Shifu会自动把设备抽象成微服务，让你的应用和硬件设备彻底解耦，把低效的物联网应用开发变得像面向对象编程一样高效。</span>,
    isReverse: true
  },
]

let engineeringList = [
  {
    img: stable,
    title: '航天级稳定性',
    descript: <span>大到使用私有驱动的工程机械，小到使用公有协议的温湿度计，你都可以让Shifu来帮你做对接异构设备的脏活累活。</span>,
    isReverse: true
  },
  {
    img: security,
    title: '多维度安全策略',
    descript: <span>所有接入Shifu的设备都会被封装成一个乐高式模块，根据场景内的设备不同，按需加载即可。</span>,
    isReverse: false
  },
  {
    img: community,
    title: '全球化社区生态',
    descript: <span>接入设备后，Shifu会自动把设备抽象成微服务，让你的应用和硬件设备彻底解耦，把低效的物联网应用开发变得像面向对象编程一样高效。</span>,
    isReverse: true
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
      <IntroBar img={bar1} title='Shifu对开发者的价值'></IntroBar>
      {developerPart}
      <IntroBar img={bar2} title='Shifu对工程团体的价值'></IntroBar>
      {engineeringPart}
      <IntroBar img={bar3} title='Shifu的独有优势'></IntroBar>
    </div>
  )
}