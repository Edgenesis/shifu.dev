import Translate, { translate } from '@docusaurus/Translate';
import React from 'react';
import styles from "./styles.module.scss";
import StepOne from './components/stepOne';
import StepTwo from './components/stepTwo';
import StepThree from './components/stepThree';

const GoBackIcon = require('@site/static/img/icon/goback-icon.svg').default

class DemoContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const stepView = {
      0: <StepOne></StepOne>,
      1: <StepTwo></StepTwo>,
      2: <StepThree></StepThree>
    }
    return (
      <div className={styles.demoContentContainer} >
        {/* <div className={styles.goBack} onClick={() => this.props.goBack()}>
          <span>返回上一步</span>
          <GoBackIcon></GoBackIcon>
        </div> */}
        <div className={styles.stepContent}>
          {stepView[this.props.stepIndex]}
        </div>
      </div>
    )
  }
}
export default DemoContent