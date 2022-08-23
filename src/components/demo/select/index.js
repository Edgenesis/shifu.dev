import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from '../button';

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
    this.selectItem = this.selectItem.bind(this)
  }
  selectItem(item) {
    
    this.setState({ value: item })
  }
  render() {
    return (
      <div className={styles.selectContainer} >
        <div className={styles.selectHeader}>
          <ButtonSquare colorLevel="three" onClick={this.selectItem()} content="test"></ButtonSquare>
        </div>
      </div>
    )
  }
}

export default Select