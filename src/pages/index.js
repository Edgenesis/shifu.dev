import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.scss";
import { FirstPart, SecondPart, ThirdPart } from "../components/Homepage/parts";

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <FirstPart></FirstPart>
      <SecondPart></SecondPart>
      <ThirdPart></ThirdPart>
    </Layout>
  );
}

