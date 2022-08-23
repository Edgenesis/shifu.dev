import React from 'react';
import styles from "./styles.module.scss";


export function ButtonSquare(props) {
  let colorLevel = "";
  switch (props.colorLevel) {
    case "one":
      colorLevel = "squareOne"
      break
    case "two":
      colorLevel = "squareTwo"
      break
    case "three":
      colorLevel = "squareThree"
      break
    default:
      colorLevel = "squareOne"
  }
  return (
    <a className={`${styles.buttonContainer} ${styles[colorLevel]} ${styles.square}`} href={props.href} target={props.target} onClick={props.onClick}>
      <div className={styles.buttonLeft}>{props.left}</div>
      <p className={styles.buttonContent}>{props.content}</p>
      <div className={styles.buttonRight}>{props.right}</div>
    </a >
  )
}

export function ButtonTransparent(props) {
  return (
    <a className={`${styles.buttonContainer}  ${styles.transparent}`} href={props.href} target={props.target}>
      <div className={styles.buttonLeft}>{props.left}</div>
      <p className={styles.buttonContent}>{props.content}</p>
      <div className={styles.buttonRight}>{props.right}</div>
    </a >
  )
}