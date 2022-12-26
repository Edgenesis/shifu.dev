import { Button, Space, Col, Row } from 'antd'
import styles from './styles.module.scss'
import React, { forwardRef } from 'react'
import gouxuan from '../gouxuan.png'
const PlanCard = forwardRef((props, ref) => {
  return (
    <Row className={styles.head}>
      <Col>
        <div className={styles.PlanCard}>
          <div className={styles.title}>
            <img src={require('../' + props.data.jpg).default}></img>
            <p>{props.data.title}</p>
          </div>

          <div className={styles.instruction}>
            <p className={styles.instructionmain}>{props.data.instruction}</p>
            <Space
              direction="vertical"
              style={{
                width: '100%'
              }}
            >
              <div className={styles.functionlist}>
                <ul>
                  {props.data.function.map(item => {
                    return (
                      <li key={item}>
                        <img src={gouxuan} alt=""></img>
                        {item}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <Button type="primary" className={styles.button}>
                {props.data.button}
              </Button>
            </Space>
          </div>
        </div>
      </Col>
    </Row>
  )
})

export default PlanCard
