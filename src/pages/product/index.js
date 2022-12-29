import React from 'react'
import Layout from '@theme/Layout'
// import styles from './styles.module.scss'
import Introduce from './introduce/index'
import FeatureList from './feature'
import Service from './service'
import { Foot } from '../../components/footer/index'
import common from '@site/src/css/common.module.scss'

export default function Product() {
  return (
    <Layout>
      <Introduce></Introduce>
      <div className={common.block50}></div>
      <FeatureList></FeatureList>
      <Service></Service>
      <Foot></Foot>
    </Layout>
  )
  // return <Layout>shifuCloud</Layout>
}
