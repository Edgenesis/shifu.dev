import React from "react";
import styles from "./styles.module.scss";
import SnowBg from "../../components/background";
import DemoHeader from "../../components/demo/demoHeader";
import DemoContent from "../../components/demo/demoContent";
import DemoFooter from "../../components/demo/demoFooter";

export default function Demo() {
  return (
    <SnowBg>
      <div className={styles.demoContainer}>
        <DemoHeader></DemoHeader>
        <DemoContent></DemoContent>
        <DemoFooter></DemoFooter>
      </div>
    </SnowBg>
  );
}
