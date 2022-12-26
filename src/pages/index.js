import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.scss";
// import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import {Banner} from '../components/home/banner/index'
import { Foot } from "../components/footer";
import 'antd/dist/reset.css';
import common from "@site/src/css/common.module.scss"
export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div className={common.content}>
        <Banner></Banner>
      </div>

      {/*<FirstPart></FirstPart>*/}
      {/*<SecondPart></SecondPart>*/}
      {/*<ThirdPart></ThirdPart>*/}
      <Foot></Foot>
    </Layout>
  );
}
