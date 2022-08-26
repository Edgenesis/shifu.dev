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
    title: translate({message: '极速设备接入'}),
    descript:
      <span>
        <Translate>大到使用私有驱动的工程机械</Translate><br />
        <Translate>小到使用公有协议的温湿度计</Translate><br />
        <Translate>Shifu超高兼容性让你轻松应对各种易购设备</Translate>
      </span>,
    isReverse: true,
    titleColor: "#2490FF",
    shadowColor: "rgba(61, 114, 177, 0.2)"
  },
  {
    img: modularization,
    title: translate({message: '模块化部署体验'}),
    descript:
      <span>
        <Translate>所有接入Shifu的设备及应用都会被封装成一个拼图式模块</Translate><br />
        <Translate>根据场景内的设备不同，按需加载即可</Translate>
      </span>,
    isReverse: false,
    titleColor: "#C15CFF",
    shadowColor: "rgba(126, 65, 155, 0.2)"
  },
  {
    img: application,
    title: translate({message: '高效应用开发'}),
    descript:
      <span>
        <Translate>接入设备后，Shifu会自动把设备的能力抽象成API</Translate><br />
        <Translate>让你的应用和硬件设备彻底解耦</Translate><br />
        <Translate>把低效的物联网应用开发变得像面向对象编程一样高效</Translate>
      </span>,
    isReverse: true,
    titleColor: "#F33EE3",
    shadowColor: "rgba(186, 90, 36, 0.2)"
  },
]

let engineeringList = [
  {
    img: stable,
    title: translate({message: '航天级稳定性'}),
    descript:
      <span>
        <Translate>Shifu已通过在航天场景验证</Translate><br />
        <Translate>提供99.9999%的可靠性</Translate><br />
        <Translate>让你远离宕机烦恼</Translate>
      </span>,
    isReverse: true,
    titleColor: "#FF64EF",
    shadowColor: "rgba(200, 68, 39, 0.2)"
  },
  {
    img: security,
    title: translate({message: '多维度安全策略'}),
    descript:
      <span>
        <Translate>联合国的云原生安全团队操刀</Translate><br />
        <Translate>无论是数据加密还是网络安全</Translate><br />
        <Translate>Shifu不一而足</Translate>
      </span>,
    isReverse: false,
    titleColor: "#9A5CFF",
    shadowColor: "rgba(128, 34, 186, 0.2)"
  },
  {
    img: community,
    title: translate({message: '全球化社区生态'}),
    descript:
      <span>
        <Translate>Shifu得益于Kubernetes原生架构</Translate><br />
        <Translate>可以无缝接入强大的云原生软件生态</Translate><br />
        <Translate>让全球的开发者帮你解决后顾之忧</Translate>
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
      <IntroBar img={bar1} title={translate({ message: 'Shifu对开发者的价值' })}></IntroBar>
      {developerPart}
      <IntroBar img={bar2} title={translate({ message: 'Shifu对工程团体的价值' })}></IntroBar>
      {engineeringPart}
      <IntroBar img={bar3} title={translate({ message: 'Shifu的独有优势' })}></IntroBar>
    </div>
  )
}