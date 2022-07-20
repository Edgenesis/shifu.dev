import React from "react";
import styles from "./styles.module.scss";
import { GreenBtn } from "../../buttons";
function Content() {
  return <div className={styles.content}></div>;
}
function Footer() {
  return(
    <div>
      <GreenBtn content="成为赞助者"></GreenBtn>
    </div>
  )
}
export default function Sponsor() {
  return (
    <div className={styles.container}>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}
