import React from "react";
import Header from "../download";
import Sponsor from "../sponsor";
import Introduction from "../introduction";
import styles from "./styles.module.scss";
import AdvantageCards from "../advantageCards";
import SnowBg from "../../background";

export function FirstPart() {
  return (
    <div className={styles.FirstContainer}>
      {/* <SnowBg> */}
        <Header></Header>
      {/* </SnowBg> */}
    </div>
  );
}
export function SecondPart() {
  return (
    <div className={styles.SecondContainer}>
      <Sponsor></Sponsor>
    </div>
  );
}
export function ThirdPart() {
  return (
    <div className={styles.ThirdContainer}>
      <Introduction></Introduction>
      <AdvantageCards></AdvantageCards>
    </div>
  );
}
