import Translate, { translate } from '@docusaurus/Translate';
import React from "react";
import styles from "./styles.module.scss";
import { ButtonSquare } from "../button";

const ReturnIcon = require('@site/static/img/icon/return-icon.svg').default

function DemoFooter(props) {
  let one = "none", two = "none", three = "none"
  switch (props.stepIndex) {
    case 0:
      one = "flex"
      break;
    case 1:
      two = "flex"
      break;
    case 2:
      three = "flex"
      break;
    default:
      one = "flex"
  }
  return (
    <div className={styles.demoFooterContainer}>
      <ButtonSquare style={{ display: `${one}` }} colorLevel="two" content={translate({ message: "Docker installed" })} onClick={props.onClick}></ButtonSquare>
      <ButtonSquare style={{ display: `${two}` }} colorLevel="two" content={translate({ message: "Shifu installed" })} target="_blank" href={translate({ message: "https://shifu.run/docs/tutorials/demo-try" })}></ButtonSquare>
      <div onClick={() => props.isReturn()} className={styles.returnBack} style={{ display: `${three}` }}>
        <ReturnIcon></ReturnIcon>
        <p className={styles.returnContent}><Translate>Read it again</Translate></p>
      </div>
    </div >
  );
}
export default DemoFooter