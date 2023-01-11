import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Banner } from '../components/home/Banner/index'
import { News } from '../components/home/News/index'
import { Developers } from '../components/home/Developers/index'
import { Device } from '../components/home/Device/index'
import { Trusted } from '../components/home/Trusted/index'
import { UseCon } from '../components/home/Use/index'
import { Foot } from '../components/footer'
import 'antd/dist/reset.css'

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <Banner></Banner>
      <News></News>
      <Developers></Developers>
      {/*<Device></Device>*/}
      <Trusted></Trusted>
      <UseCon></UseCon>
      {/*<FirstPart></FirstPart>*/}
      {/*<SecondPart></SecondPart>*/}
      {/*<ThirdPart></ThirdPart>*/}
      <Foot></Foot>
    </Layout>
  )
}
