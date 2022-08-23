import React from 'react';
import styles from "./styles.module.scss";
import Select from '../select';

export default function DemoContent() {
  return (
    <div className={styles.demoContentContainer}>
      <Select></Select>
    </div>
  )
}