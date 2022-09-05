import Translate, { translate } from '@docusaurus/Translate';
import React from 'react'
import styles from './styles.module.scss'
import Layout from '@theme/Layout'
import SnowBg from '../../components/background'
import { ButtonSquare } from '../../components/demo/button'
import { isMobile } from '../../utils/fit-helper'
var isNode = require('detect-node');

if (isNode) {
  isMobile = () => {
    return false;
  };
}

const ShifuLogo = require('@site/static/img/logo/shifu-mini.svg').default

let disclaimer;
if (isMobile()) {
  disclaimer =
    <div className={styles.isMobile}>
      <ShifuLogo className={styles.logo}></ShifuLogo>
      <div className={styles.isMobileContent}>
        <Translate>Please open this site on PC</Translate>
      </div>
    </div>
} else {
  disclaimer =
    // <SnowBg>
      <div className={styles.disclaimerContainer}>
        <h1 className={styles.title}><Translate>Please be sure to read the following carefully</Translate></h1>
        <div className={styles.container}>
          <h1><Translate>Privacy Policy</Translate></h1>
          <p>
            <Translate>Effective Date: March 29, 2021</Translate><br />
            <strong><Translate>Outline</Translate></strong><br />
            <Translate>We will help you understand our collection, use, storage and sharing of personal and Shifu-related information, as well as your rights with respect to it, through the Edgenesis Privacy Agreement ("the Privacy Agreement").</Translate><br />
            <Translate>In order to provide you with services related to Edgenesis, we need to collect information that you voluntarily provide when using the services or as a result of using the services, and we will explain to you the type of information and the corresponding use of said information.</Translate><br />
            <Translate>You can contact info@edgenesis.com for access, correction, deletion of your personal information and management of your authorization.</Translate><br />
            <Translate>We will use industry-leading security technology to protect your personal information.</Translate><br />
            <Translate>You can read the full version of the Edgenesis Privacy Agreement to learn more detailed rules for handling personal information, such as the correspondence between types of personal information and uses.</Translate><br />
            <Translate>If you understand and agree to accept the Privacy Agreement, please click "Agree" to begin receiving our services.</Translate><br />
            <strong><Translate>Related definitions:</Translate></strong><br />
            <Translate>Individual users: Individual users refer to individuals who use their personal cell phone numbers and micro-signals to register to use services related to Edgenesis.</Translate><br />

            <br />

            <strong><Translate>One</Translate>、<Translate>How we collect and use your information</Translate></strong><br />
            <Translate>In the course of your use of Edgenesis' services, we strictly comply with laws and regulations and our agreements with users to collect and use the information you voluntarily provide when using the services or as a result of using the services in the manner described below in the Privacy Agreement to provide you with the services, to optimize our services, and to protect your account security. If we use your personal information beyond the purposes for which it was collected and to which it is directly or reasonably related, we will again inform you and obtain your express consent before using your personal information.</Translate><br />
            1.1 <Translate>When you register to use Edgenesis-related services, we require you to voluntarily provide certain information:</Translate><br />
            1.1.1 <Translate>If you choose to create a new account, you will need to enter your cell phone number and name, which will be used to create your account for the Service at your request.</Translate><br />
            1.1.2 <Translate>If you choose to register using WeChat (WeChat ID), you will need to provide your WeChat account name, avatar, cell phone number, and region (location) for the purpose of creating an account for you for the Service upon your request.</Translate><br />
            1.2 <Translate>We collect your IP address when you use the Edgenesis related services, we use this data in order to allow you to connect to our servers and some of the features will not be available to provide you with a better service experience. To help you understand and diagnose the status of your connection to the Service, we collect the status of your wireless network, Internet connection, and whether you are authorized to connect to the Service and its network.</Translate><br />
            1.3 <Translate>In order to protect your normal use of our services, maintain the normal operation of our services, and improve and optimize your service experience, we collect your Shifu operation, device model, network type, unique device identifier, software crash records, and traffic statistics.</Translate><br />
            1.4 <Translate>To make your visiting experience easier, we may collect cookies from your use of the Software or the Website, or other local storage provided by the Software and your browser, which record your IP address, account number, password, browsing history, etc. These files are mainly used to identify users and record their actions. We collect and use the above information to provide you with better services.</Translate><br />
            1.5 <Translate>When you make feedback, you need to provide detailed background and information related to the feedback and your contact information, so that we can verify and deal with your comments as soon as possible.</Translate><br />
            1.6 <Translate>In accordance with relevant laws, regulations and national standards, we may collect and use your relevant personal information without seeking your authorized consent in the following cases:</Translate><br />
            1) <Translate>in connection with the performance of our obligations under laws and regulations.</Translate><br />
            2) <Translate>directly related to national security and national defense security.</Translate><br />
            3) <Translate>directly related to public safety, public health, and significant public interest.</Translate> <br />
            4) <Translate>directly related to criminal investigation, prosecution, trial and sentence enforcement.</Translate> <br />
            5) <Translate>For the purpose of safeguarding your or another individual's life, property or other significant legal rights and interests but where it is difficult to obtain my authorized consent.</Translate><br />
            6) <Translate>The personal information involved is disclosed by you to the public at your own discretion.</Translate> <br />
            7) <Translate>necessary to enter into and perform the contract at your request.</Translate> <br />
            8) <Translate>Where personal information is collected from legitimate publicly disclosed information, such as legitimate news reports, government information disclosure and other sources.</Translate><br />
            9) <Translate>Necessary to maintain the safe and stable operation of the product or service provided, such as detecting and disposing of malfunctions of the product or service.</Translate><br />
            10) <Translate>Other circumstances specified in laws and regulations.</Translate><br />
            <Translate>Please understand that the features and services we provide to you are constantly being updated and developed. If a feature or service is not described in the foregoing description and information is collected from you, we will separately explain the content, scope and purpose of information collection to you through page prompts, interactive processes, website announcements, etc. in order to obtain your consent.</Translate><br />
            <Translate>If in the future we need to obtain your personal information indirectly from a third party due to the evolution of product functions, we will inform you of the source, type and scope of use of your personal information before obtaining it, and if our personal information processing activities exceed the scope of your authorized consent when you originally provided your personal information to the third party, we will obtain your authorized consent before processing such personal information; in addition, we will also strictly comply with the provisions of relevant laws and regulations and require the third party to safeguard the legality of the information they provide.</Translate><br />

            <br />

            <strong><Translate>Two</Translate>、<Translate>Storage of information</Translate></strong> <br />
            2.1 <Translate>The way and duration of information storage</Translate><br />
            <Translate>We will only store your personal information in a secure manner for as long as is necessary to achieve the purpose of the service or under the conditions prescribed by law or regulation. We will follow the requirements of the "Network Security Law of the People's Republic of China" to keep relevant web logs for not less than six months regarding your use of the relevant services of Edgenesis.</Translate><br />
            2.2 <Translate>Geography of information storage</Translate><br />
            <Translate>We will transfer and store the personal information collected from users in accordance with the relevant laws and regulations according to the products and services you choose.</Translate><br />
            2.3 <Translate>Notification when a product or service ceases operation</Translate><br />
            <Translate>When our products or services cease operation, we will notify you by push notification, announcement, etc., and delete your personal information or anonymize it within a reasonable period of time, except as otherwise provided by laws and regulations.</Translate><br />

            <br />
            
            <strong><Translate>Three</Translate>、<Translate>Data Security</Translate><br />
            3.1 <Translate>Security protection measures</Translate></strong><br />
            <Translate>We strive to provide security for users' information to prevent leakage, loss, improper use, unauthorized access and disclosure of information. We use multi-faceted security protection measures to ensure that the protection of users' personal information is at a reasonable level of security, including many aspects such as technical protection means, management system control, and security system protection.</Translate><br />
            <Translate>The technical protections we use include, but are not limited to, firewalls, encryption (e.g., TLS), de-identification or anonymization processing, access control measures, etc. In addition, we continually enhance the security capabilities installed on your device version. For example, we will complete some of the information encryption locally on your device to reinforce secure transmission.</Translate><br />
            <Translate>We have established management systems, processes and organizations dedicated to safeguarding the security of personal information. For example, we strictly limit the scope of persons who have access to information, require them to comply with confidentiality obligations and conduct audits, and impose penalties on those who violate their obligations in accordance with the provisions of our internal system. We also review this management system, process and organization from time to time to prevent unauthorized access, use or disclosure of user information by unauthorized persons.</Translate><br />
            <Translate>We recommend that you pay sufficient attention to the protection of personal information when using our products and services, and we provide as many personal information protection features as possible to assist you in protecting your personal information.</Translate><br />
            3.2 <Translate>Security incident handling measures</Translate><br />
            <Translate>In the event of a security incident such as leakage, destruction or loss of personal information, we will activate the emergency plan to stop the security incident from expanding. After a security incident occurs, we will promptly inform you of the basic situation of the incident, the disposal measures and remedial measures we are about to take or have taken, and our suggestions for your response in the form of push notifications, emails, phone calls, etc. in accordance with the requirements of laws and regulations. If it is difficult to inform you one by one, we will issue warnings through announcements and other means.</Translate><br />

            <br />

            <strong><Translate>Four</Translate>、<Translate>The information we share</Translate></strong> <br />
            4.1 <Translate>We strictly limit the sharing of information in compliance with laws and regulations.</Translate> <br />
            4.2 <Translate>For external processing purposes only, we may share your personal information with third-party partners (third-party service providers, application developers, etc., for example, communication service providers who send email or push notifications on our behalf) to allow them to process said information for us in accordance with our instructions, privacy policy, and other relevant confidentiality and security measures, and for the following purposes.</Translate><br />
            1) <Translate>To provide our services to you;</Translate><br />
            2) <Translate>To achieve the purposes described in the "How we use the information we collect about you" section;</Translate><br />
            3) <Translate>To fulfill our obligations and exercise our rights under this policy;</Translate><br />
            4) <Translate>Understand, maintain and improve our services.</Translate><br />
            <Translate>If we share your information with these third parties, we will use encryption, anonymization and other means to keep your information secure.</Translate><br />
            4.3 <Translate>As our business continues to grow, when a merger, acquisition, asset transfer, or other transaction occurs that results in the sharing of your personal information to a third party, we will inform you of the circumstances through push notifications, announcements, etc., and continue to protect or require new administrators to continue to protect your personal information in accordance with laws and regulations and standards no less stringent than those required by this policy.</Translate><br />
            4.4 <Translate>We may use the information we collect for big data analysis. For example, we may use the information collected for analysis to form city heat maps or industry insight reports that do not contain any personal information.</Translate><br />
            4.5 <Translate>We may disclose and share statistically processed, non-identifiable information with our partners for the purpose of understanding how users use our Services or to inform the public about general usage trends of our Services.</Translate><br />
            4.6 <Translate>We may disclose your personal information for the following purposes:</Translate><br />
            1) <Translate>Compliance with applicable laws and regulations and other relevant provisions;</Translate><br />
            2) <Translate>directly related to national security and national defense security.</Translate><br />
            3) <Translate>directly related to public safety and public health;</Translate><br />
            4) <Translate>Compliance with the provisions of criminal investigations, prosecutions, court judgments or decisions, and other legal proceedings;</Translate><br />
            5) <Translate>Comply with the requirements of the relevant government agency or other legally authorized organization;</Translate><br />
            6) <Translate>For purposes that are reasonable and necessary to enforce the relevant service agreement or this policy, to protect the public interest, to protect the personal property of our customers (including you), our or our affiliates, other users or employees, or other legitimate rights and interests.</Translate><br />
            7) <Translate>The personal information involved is disclosed by you to the public at your own discretion.</Translate><br />
            8) <Translate>Those that collect personal information from legitimate publicly disclosed information, such as legitimate news reports, government information disclosure, and other sources.</Translate><br />

            <br />

            <strong><Translate>Five</Translate>、<Translate>Changes</Translate></strong><br />
            <Translate>We may revise this Privacy Agreement from time to time. When the terms of the Privacy Agreement are changed, we will notify you of the changed Privacy Agreement in an appropriate manner when the version is updated and indicate the effective date to you. Please read the revised Privacy Agreement carefully, and your continued use of Borders' services indicates that you agree to our handling of your personal information in accordance with the updated Privacy Agreement.</Translate><br />

            <br />

            <strong><Translate>Six</Translate>、<Translate>Third Party SDK Directory</Translate></strong><br />
            <Translate>In order to enable you to enjoy the services and functions listed in the table below, we may embed third-party software development kits (SDKs), code plug-ins or other similar applications of our partners in our applications. We will conduct security checks on the application programming interfaces (APIs), software tool development kits (SDKs) from which our partners obtain relevant information and agree with our authorized partners on strict data protection measures so that they handle personal information in accordance with the purpose of our engagement, our service descriptions, this Privacy Policy and any other relevant confidentiality and security measures.</Translate><br />
            <Translate>Android, iOS, macOS, Windows versions involving embedded third-party code, plug-ins to pass in personal information are listed below:</Translate><br />

            <br />

            <strong><Translate>Seven</Translate>、<Translate>Your rights</Translate></strong><br />
            <Translate>During your use of Edgenesis related services, in order to make it easier for you to check access, delete and correct your personal information, as well as to protect your right to withdraw your consent to the use of personal information and to cancel your account, we have set up a feedback channel and your comments will be dealt with in a timely manner.</Translate><br />

            <br />

            <strong><Translate>Eight</Translate>、<Translate>Contact Us</Translate></strong><br />
            <Translate>When you have other complaints, suggestions, problems related to personal information of minors or need to delete all access records, please contact us via info@edgenesis.com.@edgenesis.com与我们联系。</Translate>（<Translate>Address: Room 511, Building 12, Venture Street, Haidian District, Beijing</Translate> <Translate>Tel: +86 18515145818</Translate>）<br />
            <Translate>We will review the issue as soon as possible and respond within fifteen days of verifying your user status.</Translate><br />

            <br />
            
            <strong class="company"><Translate>Edgenesis (Beijing) Technology Co.</Translate></strong><br />
          </p>
        </div>
        <div className={styles.disclaimerConfirm}>
          <ButtonSquare href="/" colorLevel="two" content={translate({ message: "Decline" })}></ButtonSquare>
          <ButtonSquare href="/demo" colorLevel="two" content={translate({ message: "Agree" })}></ButtonSquare>
        </div>
      </div>
    // </SnowBg>
}

export default function Disclaimer() {
  return (
    <Layout>
      {disclaimer}
    </Layout>
  )
}
