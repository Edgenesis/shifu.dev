import React from "react";
import styles from "./styles.module.scss"
import banner from "@site/static/img/home/banner.png";
export function Banner(props) {
  return (
      <div>
        <img src={banner} alt=""/>
      </div>
  )
}