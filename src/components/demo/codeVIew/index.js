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
    console.log('复制成功')
    const copyNode = document.getElementById("copied");
    copyNode.classList.add(`${styles.copiedActive}`)
    copyNode.addEventListener("animationend", () => {
      copyNode.classList.remove(`${styles.copiedActive}`)
    })
  }
  return (
    <div className={styles.CodeViewContainer} style={props.style}>
      <h1 className={styles.CodeDescription} style={props.codeDescriptionStyle}>{props.description}</h1>
      <div id="copied" className={styles.copied}>复制成功 ✔</div>
      <pre className={props.code ? `${styles.codeContent}` : `${styles.hidden} `}>
        {props.code}
        <span onClick={() => copy(props.code, Copied)} className={props.isCopy ? `${styles.copy}` : `${styles.hidden} `}>复制</span>
      </pre>
      {props.insetCode}
    </div>
  );
}
