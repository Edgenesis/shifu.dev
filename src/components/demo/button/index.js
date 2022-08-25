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
    <a className={`${styles.buttonContainer} ${styles[colorLevel]} ${styles.square}`} href={props.href} target={props.target} onClick={props.onClick} style={props.style}>
      <div className={styles.buttonLeft}>{props.left}</div>
      <p className={styles.buttonContent} style={props.contentStyle}>{props.content}</p>
      <div className={styles.buttonRight}>{props.right}</div>
    </a >
  )
}