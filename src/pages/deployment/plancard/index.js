import { Button, Space, Col, Row } from 'antd'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
import gouxuan from '@site/static/img/product/gouxuan.png'
const PlanCard = forwardRef((props, ref) => {
  return (
    <Row className={styles.head}>
      <Col>
        <div className={styles.PlanCard}>
          <div className={styles.title}>
            <img src={require('@site/static/img/product/' + props.data.jpg).default}></img>
            <p>{translate({ message: props.data.title })}</p>
          </div>

          <div className={styles.instruction}>
            <p className={styles.instructionmain}>
              {translate({ message: props.data.instruction[0] })}
              <a>{translate({ message: props.data.instruction[1] })}</a>
              {translate({ message: props.data.instruction[2] })}
            </p>
            <Space
              direction="vertical"
              style={{
                width: '100%'
              }}
            >
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

              <Button
                type="primary"
                className={styles.button}
                onClick={() => {
                  location.href = props.data.url
                }}
              >
                {translate({ message: props.data.button })}
              </Button>
            </Space>
          </div>
        </div>
      </Col>
    </Row>
  )
})

export default PlanCard
