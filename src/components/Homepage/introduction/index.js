import React from "react";
import styles from "./styles.module.scss";

export default function DescriptionModel(props) {
  let flexDirection = props.isReverse ? "row-reverse" : "row";
  return (
    <div
      className={styles.descriptionModel}
      style={{ flexDirection: flexDirection }}
    >
      {props.img}
      <div className={styles.descript}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.content}>{props.descript}</p>
      </div>
    </div>
  );
}
