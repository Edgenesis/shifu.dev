import React from "react";
import styles from './styles.module.scss';

const CardList = [
  {
    title: "轻松",
    description: (
      <>
        Shifu Framework
        让开发者轻松调用所有种类的设备，支持公有、私有协议平台和驱动设备
        的接入。同时 Shifu
        自带了设备管理框架，可以便捷地实现查看设备的运行状态、
        更新设备驱动、进行安全配置等操作。
      </>
    ),
  },
  {
    title: "便捷",
    description: (
      <>
        在Shifu中, 每一个设备都会生成与其相对应的数字孪生 (deviceShifu) 。
        开发者只需调 用 DeviceShifu 所暴露出来的 API,
        即可以无比便捷地使用设备的能力。
      </>
    ),
  },
  {
    title: "互联",
    description: (
      <>
        Shifu Framework 是 Kubernetes 原生架构，可以在现有集群实现 IoT
        设备的互联，无需构 建额外的运维设施。
      </>
    ),
  },
];

function Card({ title, description }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className="card-descriptin">{description}</p>
    </div>
  );
}

export default function HomepageCards(props) {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <div className={styles.row}>
        {CardList.map((props, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
