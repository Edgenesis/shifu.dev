import React from "react";
import Layout from "@theme/Layout";
import HomepageCards from "../components/Homepage/cards";
import styles from "./styles.module.scss";
import Header from "../components/Homepage/download";
// import Sponsor from "../components/Homepage/sponsor";

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div className={styles.container}>
        <Header></Header>
        <HomepageCards title="我们的优势"></HomepageCards>
        {/* <Sponsor></Sponsor> */}
      </div>
    </Layout>
  );
}

