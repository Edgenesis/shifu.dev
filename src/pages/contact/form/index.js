import React from 'react'
import { Button, Form, Input, Radio, Space } from 'antd'
import styles from './styles.module.scss'
import { translate } from '@docusaurus/Translate'
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}

const LoginForm = () => {
  const onFinish = values => {
    window.location.href = 'thanks'
    console.log(values)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      {...layout}
      name="nest_messages"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      className={styles.form}
      initialValues={{
        remember: true
      }}
    >
      <label>
        <img src={require('@site/static/img/product/msg1.png').default}></img>
        {translate({ message: 'How would you prefer to be addressed?' })}
      </label>
      <Form.Item name="name" rules={[{ required: true, message: translate({ message: 'Name is required' }) }]}>
        <Input size="large" />
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg2.png').default}></img> {translate({ message: 'Phone number' })}
      </label>
      <Form.Item
        name="phonenuber"
        rules={[
          { required: true, message: translate({ message: 'Phone number is required' }) },
          {
            pattern: '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$',
            message: translate({ message: 'Please enter the correct phone number' })
          }
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg3.png').default}></img> {translate({ message: 'Email Address' })}
      </label>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: translate({ message: 'Email Address is required' }) },
          {
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$',
            message: translate({ message: 'Please enter the correct Email address' })
          }
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg4.png').default}></img> {translate({ message: 'Company/organization' })}
      </label>
      <Form.Item name="company" rules={[{ required: true, message: translate({ message: 'Company/organization is required' }) }]}>
        <Input size="large" />
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg5.png').default}></img> {translate({ message: 'What kind of problem do you wish to use Shifu to deal with?' })}
      </label>
      <Form.Item name={'question'} rules={[{ required: true, message: translate({ message: 'Please select the best option for you' }) }]}>
        <Radio.Group>
          <Radio value={1}> {translate({ message: 'Device connection' })}</Radio>
          <Radio value={2}> {translate({ message: 'Application development' })}</Radio>
          <Radio value={3}> {translate({ message: 'Device management' })}</Radio>
        </Radio.Group>
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg6.png').default}></img> {translate({ message: 'Are you familiar with Docker/Kubernetes?' })}
      </label>
      <Form.Item name={'konwledge'} rules={[{ required: true, message: translate({ message: 'Please select the best option for you' }) }]}>
        <Radio.Group>
          <Radio value={1}> {translate({ message: 'Never heard of it' })}</Radio>
          <Radio value={2}> {translate({ message: 'I have some knowledge of it' })}</Radio>
          <Radio value={3}> {translate({ message: 'Master in this area' })}</Radio>
        </Radio.Group>
      </Form.Item>

      <label>
        <img src={require('@site/static/img/product/msg7.png').default}></img> {translate({ message: 'How did you get to know Shifu?' })}
      </label>
      <Form.Item name={['shifu']} rules={[{ required: true, message: translate({ message: 'Please select the best option for you' }) }]}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>
              Github<img className={styles.github} src={require('@site/static/img/product/msggithub.png').default}></img>
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
