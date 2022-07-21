import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
function GreenBtn(props) {
  return (
    <div className={styles.wrapper}>
      <a
        href={props.href}
        target={props.target}
        className={styles.green}
        style={{ width: props.width }}
      >
        {props.content}
      </a>
    </div>
  );
}
function GreenBorderBtn(props) {
  return (
    <div className={styles.wrapper}>
      <a
        href={props.href}
        target={props.target}
        className={styles.greenBorder}
        style={{ width: props.width }}
      >
        {props.content}
      </a>
    </div>
  );
}
function YellowBtn(props) {
  return (
    <div className={styles.wrapper}>
      <a
        href={props.href}
        target={props.target}
        className={styles.yellow}
        style={{ width: props.width }}
      >
        <i
          className={styles.icon}
          style={{
            // backgroundImage: 'url("@site/static/img/icon-download.png") ',
          }}
        ></i>
        <span>{props.content}</span>
      </a>
    </div>
  );
}
export { GreenBtn, GreenBorderBtn, YellowBtn };
