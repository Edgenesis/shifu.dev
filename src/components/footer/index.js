import React from 'react'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import logo from '@site/static/img/footer/logo.png'
import Vector from '@site/static/img/footer/submit.png'
import mail from '@site/static/img/footer/mail.png'
import device from '@site/static/img/footer/device-mobile.png'
import map from '@site/static/img/footer/map-pin.png'
import Translate, { translate } from '@docusaurus/Translate'
import { Divider,Button, Input, Tooltip } from 'antd'

export function Foot(props) {
  return (
    <div className={styles.footerBox}>
      <div className={common.block80}></div>
      <div className={common.content}>
        <div className={styles.footerCon}>
          <Link></Link>
          <Divider className={`${common.divider} ${styles.footerDivider}`} />
          <Contact></Contact>
        </div>
      </div>
    </div>
  )
}
let linkList = [
  {
    img: require('@site/static/img/header/github.png').default,
    link: 'https://github.com/Edgenesis/shifu'
  },
  {
    img: require('@site/static/img/header/discord.png').default,
    link: 'https://discord.gg/2tbdBrkGHv'
  },
  {
    img: require('@site/static/img/header/twitter.png').default,
    link: 'https://twitter.com/ShifuFramework'
  },
  {
    img: require('@site/static/img/footer/linkDin.png').default,
    link: 'https://www.linkedin.com/company/76257633/admin/'
  }
]
export function Link(props) {
  const list = linkList.map(item => {
    return (
      <a href={item.link} className={styles.footerLink} key={item.link}>
        <img src={item.img} alt="" />
      </a>
    )
  })
  return (
    <div>
      <div className={styles.footerTitle}>
        <img src={logo} alt="" />
        <Translate>Shifu Brings mobile-app-development-experience to the IoT world!</Translate>
      </div>
      <div className={`${styles.footerTitle}  ${styles.footerTitleS}`}>
          <a href="product">
            <Translate>Product</Translate>
          </a>
          <Divider type="vertical" />
          <a href="docs">
            <Translate>Documentation</Translate>
          </a>
          <Divider type="vertical" />

         <a href="case-studies">
           <Translate>Case Studies</Translate>
         </a>
         <Divider type="vertical" />
         <a href="company">
           <Translate>Company</Translate>
         </a>

      </div>
      <div className={`${styles.footerTitle},${styles.footerLinks}`}>{list}</div>
    </div>
  )
}

export function Contact(props) {
  return (
    <div className={styles.footerEmail}>
      <h2>
        <Translate>Subscribe</Translate>
      </h2>
      {/*<Input*/}
      {/*  placeholder={translate({ message: 'Please leave your Email' })}*/}
      {/*  suffix={*/}
      {/*    <Tooltip title="Submit">*/}
      {/*      <img src={Vector} alt="" />*/}
      {/*    </Tooltip>*/}
      {/*  }*/}
      {/*/>*/}
      <Button type="primary" block href="contact">
        <Translate>Contact us</Translate>
      </Button>
      <div className={styles.footerLists}>
        <div>
          <img src={mail} alt="" />
          info@edgenesis.com
        </div>
        <div>
          <img src={device} alt="" />
          (+86) 18515145818
        </div>
        <div>
          <img src={map} alt="" />
          <Translate>Haidian, Beijing</Translate>
        </div>
      </div>
    </div>
  )
}
