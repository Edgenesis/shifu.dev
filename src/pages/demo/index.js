import Translate, { translate } from '@docusaurus/Translate';
import React from "react";
import styles from "./styles.module.scss";
import DemoHeader from "../../components/demo/demoHeader";
import DemoContent from "../../components/demo/demoContent";
import DemoFooter from "../../components/demo/demoFooter";
import ServiceModel from "../../components/demo/serviceModel";
import Layout from "@theme/Layout";

const ServiceIcon = require('@site/static/img/icon/service-icon.svg').default

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      showServiceModel: false
    }
    this.stepForward = this.stepForward.bind(this)
    this.stepBackward = this.stepBackward.bind(this)
    this.showServiceModel = this.showServiceModel.bind(this)
    this.closeServiceModel = this.closeServiceModel.bind(this)
  }
  stepForward() {
    console.log(this.state.stepIndex)
    if (this.state.stepIndex < 2) {
      this.setState({
        stepIndex: this.state.stepIndex + 1,
      })
    }
  }
  stepBackward() {
    if (this.state.stepIndex > 0) {
      this.setState({
        stepIndex: this.state.stepIndex - 1,
      })
    }
  }
  showServiceModel(e) {
    e.stopPropagation()
    this.setState({ showServiceModel: true })
  }
  closeServiceModel() {
    this.setState({ showServiceModel: false })
  }
  render() {
    return (
      <Layout title="Shifu Demo" description="Hello Shifu">
          <div className={styles.demoContainer} onClick={() => this.closeServiceModel()}>
            <DemoHeader stepIndex={this.state.stepIndex}></DemoHeader>
            <DemoContent stepIndex={this.state.stepIndex} goBack={this.stepBackward}></DemoContent>
            <DemoFooter onClick={() => this.stepForward()} stepIndex={this.state.stepIndex} isReturn={() => this.setState({ stepIndex: 0 })} ></DemoFooter>
            <div className={styles.service}>
              <div className={styles.serviceIcon} onClick={(e) => this.showServiceModel(e)}><ServiceIcon></ServiceIcon></div>
              <p className={styles.serviceContent}><Translate>获取一对一操作指导</Translate></p>
            </div>
          </div>
          <ServiceModel showServiceModel={this.state.showServiceModel}></ServiceModel>
      </Layout>
    );
  }
}

export default Demo

