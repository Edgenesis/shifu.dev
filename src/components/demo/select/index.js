import React from 'react';
import styles from "./styles.module.scss";
import { ButtonSquare } from '../button';

const ArrowIcon = require('@site/static/img/icon/arrow-icon.svg').default

function SelectOption({ value }) {
  return (
    <div className={styles.optionContainer} data-value={value}>{value}</div>
  )
}

function SelectList({ list, optionsActive, getItem }) {
  const selectOptions = list.map((item) => {
    return <SelectOption key={item.id} {...item}></SelectOption>
  })
  let translateY = optionsActive ? 0 : -100
  return (
    <div className={styles.optiondHidden}>
      <div className={styles.optionsWrapper} style={{ transform: `translateY(${translateY}%)` }} onClick={getItem}>
        {selectOptions}
      </div>
    </div>
  )
}

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "选择",
      optionsActive: false
    }
    this.selectItem = this.selectItem.bind(this)
  }
  selectItem(item) {
    if (item) {
      this.setState({ value: item })
    }
  }
  active() {
    this.setState((state) => ({
      optionsActive: !state.optionsActive
    }))
  }
  render() {
    return (
      <div className={styles.selectContainer} >
        <div className={styles.selectHeader}>
          {/* <div className='' colorLevel="three" content={this.state.value} onClick={() => this.active()} right={<ArrowIcon></ArrowIcon>}></div> */}
        </div>
        <SelectList list={this.props.options} optionsActive={this.state.optionsActive} getItem={(e) => this.selectItem(e.target.dataset.value)}></SelectList>
      </div>
    )
  }
}

export default Select