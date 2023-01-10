import { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
import common from '@site/src/css/common.module.scss'
const Feature = forwardRef((props, ref) => {
  return (
    <div className={styles.feature}>
      <div className={styles.featureCon}>
        <img src={require('@site/static/img/product/' + props.data.jpg).default}></img>
        <h2>{translate({ message: props.data.title })}</h2>
        <p> {translate({ message: props.data.instruction })}</p>
      </div>

    </div>
  )
})
const list = [
  {
    title: 'Multi-protocol',
    instruction: 'Shifu Cloud supports HTTP, OPCUA, Socket, MQTT, ADS, BACnet, CBus, Eip, Knx, ModbusAscii, ModbusRTU, ModbusTCP and more!',
    jpg: 'icon1.png'
  },
  {
    title: 'Device template',
    instruction: 'Device template: connect devices with pre-built templates, saving you from configuration hell.',
    jpg: 'icon2.png'
  },
  {
    title: 'App store',
    instruction: 'install 3rd party Apps with one-click. Let\'s build an end-to-end IoT solution in no time!',
    jpg: 'icon3.png'
  }
]

const FeatureList = () => {
  return (
    <div className={styles.cptd}>
      <div className={common.content}>
        <div className={common.block80}></div>
        <h1> {translate({ message: 'Features' })}</h1>
        <div className={common.block30}></div>
        <div className={styles.featurelist}>
          <Feature data={list[0]}></Feature>
          <Feature data={list[1]}></Feature>
          <Feature data={list[2]}></Feature>
        </div>
      </div>
      <div className={common.block80}></div>
    </div>
  )
}
export default FeatureList
