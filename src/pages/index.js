import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.scss";
import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";
import { Foot } from "../components/footer";
import 'antd/dist/reset.css';
export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <FirstPart></FirstPart>
      <SecondPart></SecondPart>
      <ThirdPart></ThirdPart>
      <Foot></Foot>
    </Layout>
  );
}
