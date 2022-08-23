import React from "react";
import styles from "./styles.module.scss";
import SnowBg from "../../components/background";
import DemoHeader from "../../components/demo/demoHeader";
import DemoContent from "../../components/demo/demoContent";
import DemoFooter from "../../components/demo/demoFooter";

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
    }
    this.stepForward = this.stepForward.bind(this)
    this.stepBackward = this.stepBackward.bind(this)
  }
  stepForward() {
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
  render() {
    return (
      <SnowBg>
        <div className={styles.demoContainer}>
          <DemoHeader stepIndex={this.state.stepIndex}></DemoHeader>
          <DemoContent stepIndex={this.state.stepIndex}></DemoContent>
          <DemoFooter onClick={this.stepForward} stepIndex={this.state.stepIndex} ></DemoFooter>
        </div>
      </SnowBg>
    );
  }
}

export default Demo

