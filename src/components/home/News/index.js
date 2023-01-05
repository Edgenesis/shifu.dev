import React from "react";
import styles from "./styles.module.scss"
import common from "@site/src/css/common.module.scss"
import Translate,{translate}   from '@docusaurus/Translate';
import { Divider } from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
let Lists=[
  {
    id:0,
    img: require('@site/static/img/home/blog.png').default,
    title:translate({message: 'Tech Blogs'}),
    message:translate({message: 'How to deploy Shifu on K3s to complete the cloud-edge-device cycle'}),
    messageLink:"technical-blogs/2022/10/20/k3s",
    link:'technical-blogs'
  },
  {
    id:1,
    img: require('@site/static/img/home/news.png').default,
    title:translate({message: 'Insights'}),
    message:translate({message: 'Shifu is officially open source!'}),
    messageLink:"news/2022/08/20/open-source",
    link:'news'
  },
  {
    id:2,
    img: require('@site/static/img/home/releases.png').default,
    title:translate({message: 'Releases'}),
    message:translate({message: 'v0.7.0'}),
    messageLink:"https://github.com/Edgenesis/shifu/releases/tag/v0.7.0",
    link:'https://github.com/Edgenesis/shifu/releases'
  },
]

export function News() {
  const newLists=Lists.map(item=>{
    return <New {...item} key={item.id}/>
  })
  return (
      <>
        <div className={common.block80}></div>
        <div className={styles.newsBox}>
          <div className={` ${common.content}`}>
            <div className={common.block50}></div>
            {/*<Divider className={common.divider}/>*/}
            <div className={common.block50}></div>
            <div className={`${styles.news}`}>
              {newLists}
            </div>
            <div className={common.block30}></div>
            {/*<Divider className={common.divider}/>*/}
            <div className={common.block50}></div>
          </div>
        </div>
      </>



  )
}

export function New(props) {
  return (
      <div className={styles.new}>
        <img src={props.img} alt=""/>
        <h2>{props.title}</h2>
        <a className={styles.message} href={props.messageLink}><p>{props.message} </p></a>

        <a href={props.link}><Translate>More</Translate><ArrowRightOutlined/></a>
      </div>
  )
}