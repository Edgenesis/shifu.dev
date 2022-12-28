import React, { useState } from "react";
import styles from "./styles.module.scss"
import common from "@site/src/css/common.module.scss"
import Translate,{translate}   from '@docusaurus/Translate';
import { Radio } from 'antd';
const options = [
  {
    label: translate({message: 'Camera'}),
    value: 0,
  },
  {
    label: translate({message: 'PLC'}),
    value: 1,
  },
];
let Lists=[
  {
    url:require('@site/static/img/home/demo-camera-origin.gif').default,
  },
  {
    url:require('@site/static/img/home/demo-plc-origin.gif').default,
  },
]

export function Device() {
  const [value, setValue] = useState(0);
  const [imgUrl, setImg] = useState(Lists[0].url);
  const onChange = ({ target: { value } }) => {
    setValue(value);
    setImg(Lists[value].url)
  };
  return (
      <div className={`${styles.devBox} `}>
        <div className={common.block80}></div>
        <div className={common.comTitle}>
          <h1><Translate>Empowering IoT development</Translate></h1>
        </div>
        <div className={common.block60}></div>
        <div className={styles.tab}>
          <Radio.Group options={options} onChange={onChange} value={value} optionType="button" />
        </div>
        <div className={common.block30}></div>
        <div className={`${styles.lists} ${common.content}`}>
          <img src={imgUrl} alt=""/>
        </div>
        <div className={common.block80}></div>
      </div>

  )
}