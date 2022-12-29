import { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
import common from '@site/src/css/common.module.scss'
const Feature = forwardRef((props, ref) => {
  return (
    <div className={styles.feature}>
      <img src={require('@site/static/img/product/' + props.data.jpg).default}></img>
      <h2>{translate({ message: props.data.title })}</h2>
      <p> {translate({ message: props.data.instruction })}</p>
    </div>
  )
})
const list = [
  {
    title: 'Multi-protocol support',
    instruction: 'The open-source community has been dedicated to adding support for various protocol types, increasing the coverage of protocols for quick access',
    jpg: 'icon1.png'
  },
  {
    title: 'Application development support',
    instruction: 'Shifu has provided with a platform for convenient application development',
    jpg: 'icon2.png'
  },
  {
    title: 'App store support',
    instruction: 'Developers can upload their own developed applications or third-party plugins, users can install these applications or plugins with one click.',
    jpg: 'icon3.png'
  }
]

const FeatureList = () => {
  return (
    <div className={styles.cptd}>
      <div className={common.content}>
        <div className={common.block80}></div>
        <h1> {translate({ message: 'Features' })}</h1>

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
