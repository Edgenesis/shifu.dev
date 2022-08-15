import React from "react";
import styles from "./styles.module.scss"

export function CardOne(props) {
  const textAlign = props.isTextAlignRight ? "right" : "left"
  return (
    <div className={styles.cardOneContainer}>
      <div className={styles.cardOneContent} style={{ textAlign: textAlign }}>
        <h1 className={styles.cardOneTitle} style={{ backgroundColor: props.titleColor }}>{props.title}</h1>
        <p className={styles.cardOneDescript} >{props.descript}</p>
      </div>
    </div>
  )
}

export function CardTwo(props) {
  return (
    <div className={styles.cardtwoContainer}>
      <div className={styles.cardTwoContent}>
        <div className={styles.cardTowIcon} style={{ backgroundColor: props.iconBg }}>
          {props.img}
        </div>
        <h1 className={styles.cardTwoTitle}>{props.title}</h1>
        <p className={styles.cardTwoDescript}>{props.descript}</p>
      </div>
    </div>
  )
}