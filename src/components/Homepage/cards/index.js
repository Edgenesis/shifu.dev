import React from "react";
import styles from "./styles.module.scss"

export function CardOne(props) {
  const textAlign = props.isTextAlignRight ? "right" : "left"
  const shadow = `10px 10px 50px ${props.shadowColor}`
  return (
    <div className={styles.cardOneContainer} style={{ boxShadow: shadow }}>
      <div className={styles.cardOneContent} style={{ textAlign: textAlign }}>
        <h1 className={styles.cardOneTitle} style={{ backgroundColor: props.titleColor }}>{props.title}</h1>
        <p className={styles.cardOneDescript} >{props.descript}</p>
      </div>
    </div>
  )
}

const isEn = /\/(en)\//g
const localUrl = window.location.href

export function CardTwo(props) {
  let cardtwoClass
  if (localUrl.match(isEn)) {
    cardtwoClass = `${styles.cardtwoContainer} ${styles.cardtwoContainerEn}`
  } else {
    cardtwoClass = `${styles.cardtwoContainer}`
  }
  return (
    <div className={cardtwoClass}>
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