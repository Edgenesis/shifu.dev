import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '设备接入/管控',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Shifu Framework 让开发者轻松调用所有种类的设备，支持公有、私有协议平台和驱动设备
        的接入。同时 Shifu 自带了设备管理框架，可以便捷地实现查看设备的运行状态、
        更新设备驱动、进行安全配置等操作。
      </>
    ),
  },
  {
    title: '应用开发',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        在Shifu中, 每一个设备都会生成与其相对应的数字孪生 (deviceShifu) 。 开发者只需调
        用 DeviceShifu 所暴露出来的 API, 即可以无比便捷地使用设备的能力。
      </>
    ),
  },
  {
    title: 'Kubernetes 原生',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Shifu Framework 是 Kubernetes 原生架构，可以在现有集群实现 IoT 设备的互联，无需构
        建额外的运维设施。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
