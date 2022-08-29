import React from 'react';
import styles from "./styles.module.scss";

const ArrowIcon = require('@site/static/img/icon/arrow-icon.svg').default

function SelectOption({ value }) {
  return (
    <div className={styles.optionContainer} data-value={value}>{value}</div>
  )
}

function SelectList({ list, getItem }) {
  const selectOptions = list.map((item) => {
    return <SelectOption key={item.id} {...item}></SelectOption>
  })
  return (
    <div className={styles.optiondHidden}>
      <div className={styles.optionsWrapper} onClick={getItem}>
        {selectOptions}
      </div>
    </div>
  )
}

let timer

class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      showOptions: false,
      zIndex: 0
    }
    this.selectItem = this.selectItem.bind(this)
  }
  componentWillMount() {
    this.state.value = this.props.title
  }
  selectItem(item) {
    if (item) {
      this.setState({ value: item })
      this.props.reciveData(item)
      this.closeTheOptions()
    }
  }
  active() {
    if (timer) {
      return
    }
    if (!this.state.showOptions) {
      this.setState({ zIndex: 10 })
      this.setState({ showOptions: true })
    } else if (this.state.showOptions) {
      this.closeTheOptions()
    }
  }
  closeTheOptions() {
    this.setState({ showOptions: false })
    timer = setTimeout(() => {
      this.setState({ zIndex: 0 })
      timer = null
    }, 500);
  }
  render() {
    return (
      <div style={{ zIndex: `${this.state.zIndex}` }} className={this.state.showOptions ? `${styles.selectContainer}  ${styles.active}` : `${styles.selectContainer}`} >
        <div className={styles.selectHeader} onClick={() => this.active()}>{this.state.value}<ArrowIcon className={styles.arrowIcon}></ArrowIcon> </div>
        <SelectList list={this.props.options} getItem={(e) => this.selectItem(e.target.dataset.value)}></SelectList>
      </div>
    )
  }
}

export default Select