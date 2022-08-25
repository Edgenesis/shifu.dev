import React from "react";
import styles from "./styles.module.scss";
import { ButtonSquare } from "../button";



//你好，你可以觉得这段代码有点蠢，为什么不用条件渲染ButtonSquare组件
//这里有个bug，当我条件渲染此组件时，点击第二步的按钮会触发第三步的href
//目前对react的执行机制不太熟悉，可能是react把条件渲染后的ButtonSquare当作一个了
//代码附上，帮忙看看
// ...
// switch (props.stepIndex) {
//   case 0:
//     footerBtnContent = "Docker部署已完成";
//     href = "javaScript:;"
//     break;
//   case 1:
//     footerBtnContent = "Shifu安装已完成";
//     href = "javaScript:;"
//     break;
//   case 2:
//     footerBtnContent = "进入Shifu Cloud";
//     href = 'https://cloud.shifu.run/'
//     break;
//   default:
//     footerBtnContent = "Docker部署已完成"
// }
// ...
//  <ButtonSquare style={{ display: `${three}` }} href={href} colorLevel="two" content={footerBtnContent} onClick={() => props.onClick()}></ButtonSquare>
// ...


function DemoFooter(props) {
  let one = "none", two = "none", three = "none"
  switch (props.stepIndex) {
    case 0:
      one = "flex"
      break;
    case 1:
      two = "flex"
      break;
    case 2:
      three = "flex"
      break;
    default:
      one = "flex"
  }
  return (
    <div className={styles.demoFooterContainer}>
      <ButtonSquare style={{ display: `${one}` }} colorLevel="two" content="Docker部署已完成" onClick={props.onClick}></ButtonSquare>
      <ButtonSquare style={{ display: `${two}` }} colorLevel="two" content="Shifu安装已完成" onClick={props.onClick}></ButtonSquare>
      <ButtonSquare style={{ display: `${three}` }} href={'https://cloud.shifu.run/'} colorLevel="two" content="进入Shifu Cloud" onClick={() => props.onClick()}></ButtonSquare>
    </div>
  );
}
export default DemoFooter