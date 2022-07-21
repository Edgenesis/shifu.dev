import React from "react";
import Layout from "@theme/Layout";
import HomepageCards from "../components/Homepage/cards";
import styles from "./styles.module.scss";
import Header from "../components/Homepage/download";
// import Sponsor from "../components/Homepage/sponsor";

export default function Hello() {
  return (
    <Layout title="高效开发者工具，全场景物联网解决方案" description="让开发一个产业场景像开发一个APP一样简单！">
      <div className={styles.container}>
        <Header></Header>
        <HomepageCards title="我们的优势"></HomepageCards>
        {/* <Sponsor></Sponsor> */}
      </div>
    </Layout>
  );
}

