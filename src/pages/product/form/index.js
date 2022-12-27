import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd'
import styles from './styles.module.scss'
import Translate, { translate } from '@docusaurus/Translate'
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
}
/* eslint-enable no-template-curly-in-string */
const LoginForm = () => {
  const onFinish = values => {
    console.log(values)
  }
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      autoComplete="off"
      layout="vertical"
      className={styles.form}
      initialValues={{
        remember: true
      }}
    >
      <Form.Item name={['name']} rules={[{ required: true, message: 'Please input your username!' }]}>
        <label>
          <img src={require('../msg1.png').default}></img>
          {translate({ message: 'How would you prefer to be addressed?' })}
        </label>
        <Input />
      </Form.Item>
      <Form.Item name={['age']} rules={[{ required: true, message: 'Please input your Phone number!' }]}>
        <label>
          <img src={require('../msg2.png').default}></img> {translate({ message: 'Phone number' })}
        </label>
        <Input />
      </Form.Item>
      <Form.Item name={['email']} rules={[{ required: true, message: 'Please input your Email Address!' }]}>
        {' '}
        <label>
          <img src={require('../msg3.png').default}></img> {translate({ message: 'Email Address' })}
        </label>
        <Input />
      </Form.Item>

      <Form.Item name={['company']}>
        <label>
          <img src={require('../msg4.png').default}></img> {translate({ message: 'Company/organization' })}
        </label>
        <Input />
      </Form.Item>

      <Form.Item name={['question']}>
        <label>
          <img src={require('../msg5.png').default}></img> {translate({ message: 'What kind of problem do you wish to use Shifu to deal with?' })}
        </label>
        <br />
        <Radio.Group>
          <Radio value={1}> {translate({ message: 'Device connection' })}</Radio>
          <Radio value={2}> {translate({ message: 'Application development' })}</Radio>
          <Radio value={3}> {translate({ message: 'Device management' })}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name={['konwledge']}>
        <label>
          <img src={require('../msg6.png').default}></img> {translate({ message: 'Are you familiar with Docker/Kubernetes?' })}
        </label>
        <br />
        <Radio.Group>
          <Radio value={1}> {translate({ message: 'Never heard of it' })}</Radio>
          <Radio value={2}> {translate({ message: 'I have some knowledge of it' })}</Radio>
          <Radio value={3}> {translate({ message: 'Master in this area' })}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name={['shifu']}>
        <label>
          <img src={require('../msg7.png').default}></img> {translate({ message: 'How did you get to know Shifu?' })}
        </label>
        <br />
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>
              Github<img className={styles.github} src={require('../msggithub.png').default}></img>
            </Radio>
            <Radio value={2}> {translate({ message: 'Social media(Hacker News, Twitter, Reddit, etc.)' })}</Radio>
            <Radio value={3}> {translate({ message: 'Introduced by others' })}</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {translate({ message: 'Done' })}
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginForm
