import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import BanPC from '@site/static/img/home/ban.png'
import banMove from '@site/static/img/home/bannerMove.png'
import BanWide from './BanWide.js'
import MailForm from './mailchimp.js'
import { Foot } from '../../components/footer/index'

import localStorage from "localStorage"

  // BanWideshow =BanWide 

export function Backbtn() {
  return (
    <a href="/deployment">
      <svg
        width="14"
        height="26"
        viewBox="0 0 14 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7998 1.7998L2.1998 12.9998L11.7998 24.1998"
          stroke="#399BFF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      back
    </a>
  )
}
export default function bookDemo() {
  return (
      <Layout>
      <div className={styles.imagebox}>
        <div  className={` ${styles.bannerImg}`}><BanWide></BanWide> </div>
        <img src={banMove} alt="" className={` ${styles.bannerMove}`} />
      </div>
<div className={styles.backgroundbox}>
  
<div className={styles.pagebox}>
        <div className={styles.pagecontent}>
          {/* <Backbtn></Backbtn> */}
          {/* <h1 className={styles.title}>
            {translate({ message: 'Kindly register for a Shifu Cloud Demo' })}
          </h1> */}
                    <h1 className={styles.title}>
            {translate({ message: 'Register your information' })}
          </h1>
          <div className={styles.textbox}>

            {/* 未来或许有用 May be useful in the future */}
            {/* <p>
                {translate({
                  message: `Hello! Thank you for your interest and support in Shifu Cloud.`,
                })}
              </p>
              <p>
                {translate({
                  message: `In order to help you quickly get started with Shifu Cloud, we have arranged a 30-minute online demonstration for each user.`,
                })}
              </p>
              <p>
                {translate({
                  message: `Our team will walk you through the specific operations of Shifu Cloud and answer any questions you may have. Please schedule your service and time through the following methods.`,
                })}
              </p> */}
              <div className={styles.detailTitle}>
              <p>
              {translate({
                message: `Shifu Cloud is a production-grade IoT software development platform which enables you to build production-grade IoT APPs extremely easily.`,
              })}
            </p>
            <p>
              {translate({
                message: `Shifu Cloud supports the following protocols and APPs:`,
              })}
            </p>
              </div>
           
            <div className={styles.protocoldetail}>
              <li>
                <b>
                {translate({
                  message: `Public protocols: `,
                })}</b>
                {translate({
                  message: `HTTP, OPCUA, Socket, MQTT, ADS, BACnet, CBus, Eip, Knx, ModbusAscii, ModbusRTU, ModbusTCP`,
                })}
              </li>
              <li>
                <b> {translate({
                  message: `Proprietary protocols: `,
                })}</b>
                {translate({
                  message: `Siemens S7, HikVision, DaHua`,
                })}
              </li>
              <li>
                <b>{translate({
                  message: `3rd party APPs: `,
                })}</b>
                {translate({
                  message: `TDengine, Prometheus, Grafana, Kubernetes Dashboard`,
                })}
              </li>
            </div>
            {/*<p>*/}
            {/*  {translate({*/}
            {/*    message: `We will confirm your appointment via email and look forward to further communication with you!`*/}
            {/*  })}*/}
            {/*</p>*/}
          </div>
          <div className={common.block30}></div>

          {/* <iframe
              className={styles.bookingFream}
              src="https://calendly.com/shifu-demo/30min"
              frameBorder="0"
            >
              loading...
            </iframe> */}

            <MailForm></MailForm>
          <div></div>
        </div>
      </div>
</div>
      <Foot></Foot>
    </Layout>
  )
}
