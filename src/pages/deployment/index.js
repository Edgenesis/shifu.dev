import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import PlanCardList from './plancard/index'
import common from '@site/src/css/common.module.scss'
import { Foot } from '../../components/footer/index'

export default function Deployment() {
  return (
    <Layout>
      <div className={styles.background}>
        <div className={common.content}>
          <div className={common.block80}></div>
          <h1 className={styles.title}>{translate({ message: 'Choose the deployment method that suits you and start your free trial now.' })}</h1>
          <div className={common.block60}></div>
          <PlanCardList></PlanCardList>
        </div>
      </div>
      <Foot></Foot>
    </Layout>
  )
}
