import { Button, Space } from 'antd'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, { Component, forwardRef } from 'react'
import gouxuan from '@site/static/img/product/gouxuan.png'
import common from '@site/src/css/common.module.scss'

const list = [
  {
    title: 'Try open source',
    title2: 'Shifu framework',
    instruction: [
      'As ',
      'a next-generation cloud-native IoT development framework',
      ', Shifu provides users with full-scene device hosting and integrated software development capabilities. Through the use of the Shifu framework, developers can more easily connect, monitor and control any IoT device.'
    ],
    function: ['Fast Device Integration', 'Modularize Deployment Experience', 'Effective Application Development'],
    button: 'Try it out',
    jpg: 'GitHub.svg',
    url: 'demo',
    css: 'blue'
  },
  {
    title: 'Try Production-Grade',
    title2: 'Shifu Cloud',
    instruction: [
      'As ',
      'a device configuration platform based on the open source IoT development framework Shifu',
      ', Shifu Cloud can automatically generate YAML files for the digital twin of the device, allowing developers to quickly obtain API interfaces for device capabilities and free up their hands for IoT scene development.'
    ],
    function: ['Multiple protocol support', 'Application Development Support', 'App Store Support'],
    button: 'Shifu Cloud is coming soon! Stay tuned...',
    // button: 'Free Access for Individuals',
    jpg: 'cloud.svg',
    url: '',
    css: 'blue'
  }
]
const PlanCard = forwardRef(props => {
  return (
    <div className={[styles.PlanCard, styles[props.data.css]].join(' ')}>
      <div className={styles.planCardCon}>
        <div className={styles.title}>
          <div className={styles.imgBox}>
            <img src={require('@site/static/img/product/' + props.data.jpg).default}></img>
          </div>

          <div>
            <h2>{translate({ message: props.data.title })}</h2>
            <h1>{translate({ message: props.data.title2 })}</h1>
          </div>
        </div>
        <div className={styles.instruction}>
          <div className={common.block50}></div>
          <p className={`${styles.instructionmain} ${styles[props.class]}`}>
            {translate({ message: props.data.instruction[0] })}
            <a>{translate({ message: props.data.instruction[1] })}</a>
            {translate({ message: props.data.instruction[2] })}
          </p>
          <div className={common.block50}></div>
          <div className={styles.functionlist}>
            <ul>
              {props.data.function.map((item, index) => {
                return (
                  <li key={item}>
                    <img src={gouxuan} alt=""></img>
                    {translate({ message: item })}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={common.block50}></div>
          {
            props.data.url!==''?
                <Button type="primary" block size="large" href={`${props.url}${props.data.url}`} className={styles.button}>
                  <Translate>{props.data.button}</Translate>
                </Button>
                :
                <p className={` ${styles.btn}`}>
                  <Translate>{props.data.button}</Translate>
                </p>
          }

          <div className={common.block60}></div>
        </div>
      </div>
    </div>
  )
})

export default class PlanCardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/',
      class: ''
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        url: '/zh-Hans/',
        class: 'hans'
      })
    } else {
      this.setState({
        url: '/',
        class: ''
      })
    }
  }

  render() {
    return (
      <>
        <div className={styles.list}>
          <PlanCard data={list[0]} url={this.state.url} class={this.state.class}></PlanCard>
          <PlanCard data={list[1]} url={this.state.url} class={this.state.class}></PlanCard>
        </div>
        <div className={common.block80}></div>
      </>
    )
  }
}
