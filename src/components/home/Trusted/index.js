import React, { useRef } from "react";
import styles from "./styles.module.scss"
import common from "@site/src/css/common.module.scss"
import Translate,{translate}   from '@docusaurus/Translate';
import quote from "@site/static/img/home/quote.png";
import left from "@site/static/img/home/left.png"
import right from "@site/static/img/home/right.png"
import { Carousel } from "antd";

let Lists=[
  {
    url:require('@site/static/img/home/tr1.png').default,
  },
  {
    url:require('@site/static/img/home/tr2.png').default,
  },
  {
    url:require('@site/static/img/home/tr3.png').default,
  },
  {
    url:require('@site/static/img/home/tr4.png').default,
  },
  {
    url:require('@site/static/img/home/tr5.png').default,
  },
  {
    url:require('@site/static/img/home/tr6.png').default,
  },
]
let carList=[

  {
    url:require('@site/static/img/home/tru1.png').default,
    backUrl:require('@site/static/img/home/trus1.png').default,
    text:translate({message: 'Shifu helps us integrate all of our devices in a smart and efficient way. With Shifu, we can treat all of our devices as software objects and abstract away the physical devices. This makes it easier for us to manage and control our devices.'}),
    author:translate({message: 'Chief Robot Engineer'}),
    writer:translate({message: 'CKanyon Edvall'}),
  },
  {
    url:require('@site/static/img/home/tru2.png').default,
    backUrl:require('@site/static/img/home/trus2.png').default,
    text:translate({message: 'Shifu provides a new development model that helps engineering developers quickly transform their business cognition based on user needs, quickly propose software requirements specifications, and complete scenario development.'}),
    author:translate({message: 'CEO of Omni-Native'}),
    writer:translate({message: 'Linfeng Cai'}),
  },
  {
    url:require('@site/static/img/home/tru3.png').default,
    backUrl:require('@site/static/img/home/trus3.png').default,
    text:translate({message: 'The fusion-type intelligent IoT platform developed based on the Shifu framework greatly enhances the compatibility and reliability of the system in production environments, providing a rock-solid foundation for intelligent operation and maintenance of the production line, intelligent prevention of human factors, and integration of production data.'}),
    author:translate({message: 'Head of the AI R&D Center at CNNC Equipment Institute'}),
    writer:translate({message: 'Yuan Huang'}),
  },
  {
    url:require('@site/static/img/home/tru4.png').default,
    backUrl:require('@site/static/img/home/trus4.png').default,
    text:translate({message: 'As a IoT middleware, Shifu helps us achieve a integrated cloud-edge IoT architecture in a concise, efficient, secure and stable way. Shifu has been running in the scenario of Chinese ships for a long time and has always maintained a stable performance. In the future, we also expect Shifu to help more businesses of CSSC to undergo digital transformation.'}),
    author:translate({message: 'Head of CSSC Environment IoT Department   '}),
    writer:translate({message: 'Zhen Zhang'}),
  },
  {
    url:require('@site/static/img/home/tru5.png').default,
    backUrl:require('@site/static/img/home/trus5.png').default,
    text:translate({message: 'Shifu is an important new infrastructure in the industrial internet industry, with potential to help many new energy companies take flight with the internet of things. Our company has a wide range of industrial scenarios and we look forward to seeing Shifu shine in our scenarios.'}),
    author:translate({message: 'CEO of OCSmarter'}),
    writer:translate({message: 'Baolei Yan'})
  }
]
export function Trusted() {
  const lists=Lists.map(item=>{
    return (
        <div key={item.url}>
          <img src={item.url} alt=""/>
        </div>
    )
  })
  const carousel=carList.map(item=>{
    return (
        <Trust {...item} key={item.url}></Trust>
    )
  })
  const contentStyle = {
    height: "400px",
    lineHeight: "400px",
    textAlign: "center",
    background: "#364d79",
  };
  const carouselEL = useRef(null);
  return (
      <div className={`${styles.devBox} `}>
        <div className={common.block80}></div>
        <div className={common.comTitle}>
          <h1><Translate>Well trusted by Industry Leaders</Translate></h1>
        </div>
        <div className={common.block60}></div>
        <div className={`${styles.lists} ${common.content}`}>
          {/*<div className={`${styles.listBox}`}>*/}
            {lists}
          {/*</div>*/}
        </div>
        <div className={common.block60}></div>
        <div className={`${styles.trusts} ${common.content}`}>
          <img src={left}
               className={styles.leftButton}
               style={{ left: 10 }}
               onClick={() => {
                 carouselEL.current.prev();
               }}
               alt=""/>
          <img src={right}
               className={styles.rightButton}
               style={{ right: 10 }}
               onClick={() => {
                 carouselEL.current.next();
               }}
               alt=""/>
          <Carousel autoplay  dots={false}  style={{ margin: "0 30px"}}
                    ref={carouselEL}>
            {carousel}
          </Carousel>
        </div>

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

export function Trust(props) {
  return (
      <div className={styles.trust}>
        <div className={styles.imgBox}>
          <img src={props.url} alt=""/>
        </div>
        <div className={styles.content}>
          <div>
            <img src={quote} alt=""/>
            <p>{props.text}</p>
            <div>——{props.author}</div>
            <div>{props.writer}</div>
          </div>
        </div>
        <img src={props.backUrl} alt=""/>
      </div>
  )
}