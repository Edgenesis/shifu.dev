import Translate, { translate } from '@docusaurus/Translate';
import React from "react";
import styles from "./styles.module.scss";

function copy(item, callbackFn) {
  const tempNode = document.createElement('input')
  tempNode.value = item
  tempNode.id = "creatDom";
  document.body.appendChild(tempNode);
  tempNode.select();
  document.execCommand("Copy");
  let creatDom = document.getElementById("creatDom");
  creatDom.parentNode.removeChild(creatDom);
  callbackFn();
}

export default function CodeView(props) {
  function Copied() {
    console.log('Copied successfully.')
    const copyNode = document.getElementById(props.id);
    copyNode.classList.add(`${styles.copiedActive}`)
    copyNode.addEventListener("animationend", () => {
      copyNode.classList.remove(`${styles.copiedActive}`)
    })
  }
  return (
    <div className={styles.CodeViewContainer} style={props.style}>
      <h1 className={styles.CodeDescription} style={props.codeDescriptionStyle}>{props.description}</h1>
      <div id={props.id} className={styles.copied}><Translate>Copied successfully</Translate> ✔</div>
      <div className={styles.CodeBox}>
      <pre className={props.code ? `${styles.codeContent}` : `${styles.hidden} `}>
        {props.code +'     '}  {/* The extra space is for the content not to be blocked by the button */}
      </pre>
      <span onClick={() => copy(props.code, Copied)} className={props.isCopy ? `${styles.copy}` : `${styles.hidden} `}><Translate>Copy</Translate></span>
      </div>
      {props.insetCode}
    </div>
  );
}
