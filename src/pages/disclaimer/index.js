import Translate, {translate} from '@docusaurus/Translate';
import React from 'react'
import styles from './styles.module.scss'
import Layout from '@theme/Layout'
import localStorage from "localStorage"
import SnowBg from '../../components/background'
import {ButtonSquare} from '../../components/demo/button'
import {isMobile} from '../../utils/fit-helper'

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
      <div className={styles.disclaimerContainer}>
        <h1 className={styles.title}><Translate>Please be sure to read the following carefully</Translate></h1>
        <div className={styles.container} id='nowTextCon'>
          {
            localStorage.getItem('manuallySelectLanguage') === 'en' ? (
                <span>
          <h1>Privacy Policy</h1>
          <p>
            Effective Date: March 29, 2021<br/>

            <br/>

            <strong>Outline</strong><br/>
            We will help you understand our collection, use, storage and sharing of personal and Shifu-related information, as well as your rights with respect to it, through the Edgenesis Privacy Agreement ("the Privacy Agreement").<br/>
            In order to provide you with services related to Edgenesis, we need to collect information that you voluntarily provide when using the services or as a result of using the services, and we will explain to you the type of information and the corresponding use of said information.<br/>
            You can contact info@edgenesis.com for access, correction, deletion of your personal information and management of your authorization.<br/>
            We will use industry-leading security technology to protect your personal information.<br/>
            You can read the full version of the Edgenesis Privacy Agreement to learn more detailed rules for handling personal information, such as the correspondence between types of personal information and uses.<br/>
            If you understand and agree to accept the Privacy Agreement, please click "Agree" to begin receiving our services.<br/>

            <br/>

            <strong>Related definitions</strong><br/>
            Individual users: Individual users refer to individuals who use their personal cell phone numbers and micro-signals to register to use services related to Edgenesis.<br/>

            <br/>

            <strong>One. How we collect and use your information</strong><br/>
            In the course of your use of Edgenesis' services, we strictly comply with laws and regulations and our agreements with users to collect and use the information you voluntarily provide when using the services or as a result of using the services in the manner described below in the Privacy Agreement to provide you with the services, to optimize our services, and to protect your account security. If we use your personal information beyond the purposes for which it was collected and to which it is directly or reasonably related, we will again inform you and obtain your express consent before using your personal information.<br/>
            1.1 When you register to use Edgenesis-related services, we require you to voluntarily provide certain information:<br/>
            1.1.1 If you choose to create a new account, you will need to enter your cell phone number and name, which will be used to create your account for the Service at your request.<br/>
            1.1.2 If you choose to register using WeChat (WeChat ID), you will need to provide your WeChat account name, avatar, cell phone number, and region (location) for the purpose of creating an account for you for the Service upon your request.<br/>
            1.2 We collect your IP address when you use the Edgenesis related services, we use this data in order to allow you to connect to our servers and some of the features will not be available to provide you with a better service experience. To help you understand and diagnose the status of your connection to the Service, we collect the status of your wireless network, Internet connection, and whether you are authorized to connect to the Service and its network.<br/>
            1.3 In order to protect your normal use of our services, maintain the normal operation of our services, and improve and optimize your service experience, we collect your Shifu operation, device model, network type, unique device identifier, software crash records, and traffic statistics.<br/>
            1.4 To make your visiting experience easier, we may collect cookies from your use of the Software or the Website, or other local storage provided by the Software and your browser, which record your IP address, account number, password, browsing history, etc. These files are mainly used to identify users and record their actions. We collect and use the above information to provide you with better services.<br/>
            1.5 When you make feedback, you need to provide detailed background and information related to the feedback and your contact information, so that we can verify and deal with your comments as soon as possible.<br/>
            1.6 In accordance with relevant laws, regulations and national standards, we may collect and use your relevant personal information without seeking your authorized consent in the following cases:<br/>
            1) in connection with the performance of our obligations under laws and regulations.<br/>
            2) directly related to national security and national defense security.<br/>
            3) directly related to public safety, public health, and significant public interest. <br/>
            4) directly related to criminal investigation, prosecution, trial and sentence enforcement. <br/>
            5) For the purpose of safeguarding your or another individual's life, property or other significant legal rights and interests but where it is difficult to obtain my authorized consent.<br/>
            6) The personal information involved is disclosed by you to the public at your own discretion. <br/>
            7) necessary to enter into and perform the contract at your request. <br/>
            8) Where personal information is collected from legitimate publicly disclosed information, such as legitimate news reports, government information disclosure and other sources.<br/>
            9) Necessary to maintain the safe and stable operation of the product or service provided, such as detecting and disposing of malfunctions of the product or service.<br/>
            10) Other circumstances specified in laws and regulations.<br/>
            Please understand that the features and services we provide to you are constantly being updated and developed. If a feature or service is not described in the foregoing description and information is collected from you, we will separately explain the content, scope and purpose of information collection to you through page prompts, interactive processes, website announcements, etc. in order to obtain your consent.<br/>
            If in the future we need to obtain your personal information indirectly from a third party due to the evolution of product functions, we will inform you of the source, type and scope of use of your personal information before obtaining it, and if our personal information processing activities exceed the scope of your authorized consent when you originally provided your personal information to the third party, we will obtain your authorized consent before processing such personal information; in addition, we will also strictly comply with the provisions of relevant laws and regulations and require the third party to safeguard the legality of the information they provide.<br/>

            <br/>

            <strong>Two. Storage of information</strong> <br/>
            2.1 The way and duration of information storage<br/>
            We will only store your personal information in a secure manner for as long as is necessary to achieve the purpose of the service or under the conditions prescribed by law or regulation. We will follow the requirements of the "Network Security Law of the People's Republic of China" to keep relevant web logs for not less than six months regarding your use of the relevant services of Edgenesis.<br/>
            2.2 Geography of information storage<br/>
            We will transfer and store the personal information collected from users in accordance with the relevant laws and regulations according to the products and services you choose.<br/>
            2.3 Notification when a product or service ceases operation<br/>
            When our products or services cease operation, we will notify you by push notification, announcement, etc., and delete your personal information or anonymize it within a reasonable period of time, except as otherwise provided by laws and regulations.<br/>

            <br/>

            <strong>Three. Data Security</strong> <br/>
            3.1 Security protection measures<br/>
            We strive to provide security for users' information to prevent leakage, loss, improper use, unauthorized access and disclosure of information. We use multi-faceted security protection measures to ensure that the protection of users' personal information is at a reasonable level of security, including many aspects such as technical protection means, management system control, and security system protection.<br/>
            The technical protections we use include, but are not limited to, firewalls, encryption (e.g., TLS), de-identification or anonymization processing, access control measures, etc. In addition, we continually enhance the security capabilities installed on your device version. For example, we will complete some of the information encryption locally on your device to reinforce secure transmission.<br/>
            We have established management systems, processes and organizations dedicated to safeguarding the security of personal information. For example, we strictly limit the scope of persons who have access to information, require them to comply with confidentiality obligations and conduct audits, and impose penalties on those who violate their obligations in accordance with the provisions of our internal system. We also review this management system, process and organization from time to time to prevent unauthorized access, use or disclosure of user information by unauthorized persons.<br/>
            We recommend that you pay sufficient attention to the protection of personal information when using our products and services, and we provide as many personal information protection features as possible to assist you in protecting your personal information.<br/>
            3.2 Security incident handling measures<br/>
            In the event of a security incident such as leakage, destruction or loss of personal information, we will activate the emergency plan to stop the security incident from expanding. After a security incident occurs, we will promptly inform you of the basic situation of the incident, the disposal measures and remedial measures we are about to take or have taken, and our suggestions for your response in the form of push notifications, emails, phone calls, etc. in accordance with the requirements of laws and regulations. If it is difficult to inform you one by one, we will issue warnings through announcements and other means.<br/>

            <br/>

            <strong>Four.The information we share</strong> <br/>
            4.1 We strictly limit the sharing of information in compliance with laws and regulations. <br/>
            4.2 For external processing purposes only, we may share your personal information with third-party partners (third-party service providers, application developers, etc., for example, communication service providers who send email or push notifications on our behalf) to allow them to process said information for us in accordance with our instructions, privacy policy, and other relevant confidentiality and security measures, and for the following purposes.<br/>
            1) To provide our services to you;<br/>
            2) To achieve the purposes described in the "How we use the information we collect about you" section;<br/>
            3) To fulfill our obligations and exercise our rights under this policy;<br/>
            4) Understand, maintain and improve our services.<br/>
            If we share your information with these third parties, we will use encryption, anonymization and other means to keep your information secure.<br/>
            4.3 As our business continues to grow, when a merger, acquisition, asset transfer, or other transaction occurs that results in the sharing of your personal information to a third party, we will inform you of the circumstances through push notifications, announcements, etc., and continue to protect or require new administrators to continue to protect your personal information in accordance with laws and regulations and standards no less stringent than those required by this policy.<br/>
            4.4 We may use the information we collect for big data analysis. For example, we may use the information collected for analysis to form city heat maps or industry insight reports that do not contain any personal information.<br/>
            4.5 We may disclose and share statistically processed, non-identifiable information with our partners for the purpose of understanding how users use our Services or to inform the public about general usage trends of our Services.<br/>
            4.6 We may disclose your personal information for the following purposes:<br/>
            1) Compliance with applicable laws and regulations and other relevant provisions;<br/>
            2) directly related to national security and national defense security.<br/>
            3) directly related to public safety and public health;<br/>
            4) Compliance with the provisions of criminal investigations, prosecutions, court judgments or decisions, and other legal proceedings;<br/>
            5) Comply with the requirements of the relevant government agency or other legally authorized organization;<br/>
            6) For purposes that are reasonable and necessary to enforce the relevant service agreement or this policy, to protect the public interest, to protect the personal property of our customers (including you), our or our affiliates, other users or employees, or other legitimate rights and interests.<br/>
            7) The personal information involved is disclosed by you to the public at your own discretion.<br/>
            8) Those that collect personal information from legitimate publicly disclosed information, such as legitimate news reports, government information disclosure, and other sources.<br/>

            <br/>

            <strong>Five. Changes</strong><br/>
            We may revise this Privacy Agreement from time to time. When the terms of the Privacy Agreement are changed, we will notify you of the changed Privacy Agreement in an appropriate manner when the version is updated and indicate the effective date to you. Please read the revised Privacy Agreement carefully, and your continued use of Borders' services indicates that you agree to our handling of your personal information in accordance with the updated Privacy Agreement.<br/>

            <br/>

            <strong>Six. Third Party SDK Directory</strong><br/>
            In order to enable you to enjoy the services and functions listed in the table below, we may embed third-party software development kits (SDKs), code plug-ins or other similar applications of our partners in our applications. We will conduct security checks on the application programming interfaces (APIs), software tool development kits (SDKs) from which our partners obtain relevant information and agree with our authorized partners on strict data protection measures so that they handle personal information in accordance with the purpose of our engagement, our service descriptions, this Privacy Policy and any other relevant confidentiality and security measures.<br/>
            Android, iOS, macOS, Windows versions involving embedded third-party code, plug-ins to pass in personal information are listed below:<br/>

            <br/>

            <strong>Seven. Your rights</strong><br/>
            During your use of Edgenesis related services, in order to make it easier for you to check access, delete and correct your personal information, as well as to protect your right to withdraw your consent to the use of personal information and to cancel your account, we have set up a feedback channel and your comments will be dealt with in a timely manner.<br/>

            <br/>

            <strong>Eight. Contact Us</strong><br/>
            When you have other complaints, suggestions, problems related to personal information of minors or need to delete all access records, please contact us via info@edgenesis.com<br/>
            (Address: Room 511, Building 12, Venture Street, Haidian District, Beijing. Tel: +86 18515145818)<br/>
            We will review the issue as soon as possible and respond within fifteen days of verifying your user status.<br/>

            <br/>

            <strong className="company">Edgenesis (Beijing) Technology Co.</strong><br/>

          </p>
        </span>
            ) : (
                <span>
          <h1>隐私协议</h1>
          <p>
            生效日期:2021年03月29日<br/>

            <br/>

            <strong>概要</strong><br/>
            欢迎您使用Shifu！我们将通过《边无际隐私协议》（以下简称“本隐私协议”）帮助您了解我们收集、使用、存储和共享个人及Shifu相关信息的情况，以及您所享有的相关权利。<br/>
            为了向您提供边无际相关服务，我们需要收集您在使用服务时主动提供的或因为使用服务而产生的信息，我们会向您说明上述信息的类型和对应的用途；<br/>
            您可以联系info@edgenesis.com进行访问、更正、删除您的个人信息并管理您的授权；<br/>
            我们会采用业界领先的安全技术保护好您的个人信息。<br/>
            您可以通过阅读完整版《边无际隐私协议》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。<br/>
            如您理解并同意接受本隐私协议，请点击“同意”开始接受我们的服务。<br/>

            <br/>

            <strong>相关定义：</strong><br/>
            个人用户：个人用户指使用个人手机号码、微信号注册使用边无际相关服务的个人；<br/>

            <br/>

            <strong>一、我们如何收集和使用您的信息</strong><br/>
            在您使用边无际相关服务的过程中，我们严格遵守法律、法规的规定以及与用户的约定，按照本隐私协议如下所述方式收集、使用您在使用服务时主动提供的或因为使用服务而产生的信息，用以向您提供服务、优化我们的服务以及保障您的账户安全。如我们使用您的个人信息，超出了与收集时所称的目的及与其具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的明示同意。<br/>
            1.1 当您注册使用边无际相关服务时，我们需要您主动提供一些信息：<br/>
            1.1.1 如果您选择建立新账号，您需要输入您的手机号码和名称，用于根据您的要求为您建立本服务账号。<br/>
            1.1.2 如果您选择使用微信(微信ID)注册，您需要提供您的微信账号名、头像、手机号码、地区（位置），用于根据您的要求为您建立本服务账号。<br/>
            1.2 当您使用边无际相关服务时，我们会收集您的IP地址，我们使用此数据是为了让您连接我们的服务器，部分功能将无法实现，无法给您提供更好的服务体验。为了帮助您了解和诊断您与本服务的连接状态，我们会收集您的无线网络、互联网连接状态，以及您是否获得连接本服务及其网络的授权。<br/>
            1.3 为保障您正常使用我们的服务、维护我们服务的正常运行、改善及优化您的服务体验，我们会收集您的Shifu运行情况、设备型号、网络类型、唯一设备标识符、软件崩溃记录、流量统计。<br/>
            1.4 为使您获得更轻松的访问体验，我们会收集您使用本软件或网站的Cookie，或本软件和您的浏览器提供的其他本地存储，这些文件记录了您的IP地址、账号、密码、浏览记录等，主要用于辨别用户身份和记录用户操作。我们收集、使用以上信息将会为您提供更好的服务。<br/>
            1.5 当您进行意见反馈时，您需要提供与意见反馈相关的详细背景、信息及您的联系方式，以便于我们尽快核实并处理您的意见。<br/>
            1.6 根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意：<br/>
            1) 与我们履行法律法规规定的义务相关的；<br/>
            2) 与国家安全、国防安全直接相关的；<br/>
            3) 与公共安全、公共卫生、重大公共利益直接相关的； <br/>
            4) 与刑事侦查、起诉、审判和判决执行等直接相关的； <br/>
            5) 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；<br/>
            6) 所涉及的个人信息是您自行向社会公众公开的； <br/>
            7) 根据您要求签订和履行合同所必需的； <br/>
            8) 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；<br/>
            9) 维护所提供产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障；<br/>
            10) 法律法规规定的其他情形。<br/>
            请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。<br/>
            如未来因为产品功能演变需要从第三方间接获取您的个人信息，我们会在获取前向您告知个人信息的来源、类型及使用范围，如我们的个人信息处理活动超出您原本向第三方提供个人信息时的授权同意范围，我们将在处理您该等个人信息前征得您的授权同意；此外，我们也将会严格遵守相关法律法规的规定，并要求第三方保障其提供的信息的合法性。<br/>

            <br/>

            <strong>二、信息的存储</strong> <br/>
            2.1 信息存储的方式和期限<br/>
            我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下，通过安全的方式存储您的个人信息。我们将按照《中华人民共和国网络安全法》的要求，就您使用边无际相关服务留存相关的网络日志不少于六个月。<br/>
            2.2 信息存储的地域<br/>
            我们会按照法律法规规定，将收集的用户个人信息根据您选择的产品和服务按相关法律法规要求进行传输和存储。<br/>
            2.3 产品或服务停止运营时的通知<br/>
            当我们的产品或服务终止运营时，我们将以推送通知、公告等形式通知您，并在合理期限内删除您的个人信息或进行匿名化处理，法律法规另有规定的除外。<br/>

            <br/>

            <strong>三、信息安全</strong><br/>
            3.1 安全保护措施<br/>
            我们努力为用户的信息安全提供保障，以防止信息的泄露、丢失、不当使用、未经授权访问和披露等。我们使用多方位的安全保护措施，以确保用户的个人信息保护处于合理的安全水平，包括技术保护手段、管理制度控制、安全体系保障等诸多方面。<br/>
            我们使用的技术保护手段包括但不限于防火墙、加密（例如TLS）、去标识化或匿名化处理、访问控制措施等。此外，我们还会不断加强安装在您设备版的安全能力。例如，我们会在您的设备本地完成部分信息加密工作，以巩固安全传输。<br/>
            我们建立了保障个人信息安全专门的管理制度、流程和组织。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务并进行审计，并根据内部制度规定对违反义务的人员进行处罚。我们也会不定期审查该管理制度、流程和组织，以防未经授权的人员擅自访问、使用或披露用户的信息。<br/>
            我们建议您在使用产品和服务时充分注意对个人信息的保护，我们也会尽可能提供多种个人信息保护功能来协助您保护自己的个人信息。<br/>
            3.2 安全事件处置措施<br/>
            若发生个人信息泄露、损毁、丢失等安全事件，我们会启动应急预案，阻止安全事件扩大。安全事件发生后，我们将按照法律法规的要求及时以推送通知、邮件、电话等形式告知您该事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对您的应对建议。如果难以实现逐一告知，我们将通过公告等方式发布警示。<br/>

            <br/>

            <strong>四、我们分享的信息</strong> <br/>
            4.1 我们遵照法律法规的规定，对信息的分享进行严格的限制。 <br/>
            4.2 仅为实现外部处理的目的，我们可能会与第三方合作伙伴（第三方服务供应商、应用开发者等，例如，代表我们发出电子邮件或推送通知的通讯服务提供商）分享您的个人信息，让他们按照我们的说明、隐私政策以及其他相关的保密和安全措施来为我们处理上述信息，并用于以下用途：<br/>
            1) 向您提供我们的服务；<br/>
            2) 实现“我们如何使用收集您的信息”部分所述目的；<br/>
            3) 履行我们在本政策中的义务和行使我们的权利；<br/>
            4) 理解、维护和改善我们的服务。<br/>
            如我们与上述第三方分享您的信息，我们将会采用加密、匿名化处理等手段保障您的信息安全。<br/>
            4.3 随着我们业务的持续发展，当发生合并、收购、资产转让等交易导致向第三方分享您的个人信息时，我们将通过推送通知、公告等形式告知您相关情形，按照法律法规及不低于本政策所要求的标准继续保护或要求新的管理者继续保护您的个人信息。<br/>
            4.4 我们可能会将所收集到的信息用于大数据分析。例如，我们可能将收集到的信息用于分析形成不包含任何个人信息的城市热力图或行业洞察报告。<br/>
            4.5 我们可能对外公开并与我们的合作伙伴分享经统计加工后不含身份识别内容的信息，用于了解用户如何使用我们服务或让公众了解我们服务的总体使用趋势。<br/>
            4.6 我们可能基于以下目的披露您的个人信息：<br/>
            1) 遵守适用的法律法规等有关规定；<br/>
            2) 与国家安全、国防安全直接相关的；<br/>
            3) 与公共安全、公共卫生直接相关的；<br/>
            4) 遵守刑事侦查、起诉、法院判决或裁定以及其他法律程序的规定；<br/>
            5) 遵守相关政府机关或其他法定授权组织的要求；<br/>
            6) 为执行相关服务协议或本政策、维护社会公共利益，为保护我们的客户（包括您）、我们或我们的关联公司、其他用户或雇员的人身财产安全或其他合法权益合理且必要的用途。<br/>
            7) 所涉及的个人信息是您自行向社会公众公开的；<br/>
            8) 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。<br/>

            <br/>

            <strong>五、变更</strong><br/>
            我们可能会适时对本隐私协议进行修订。当隐私协议的条款发生变更时，我们会在版本更新时以适当的方式向您提示变更后的隐私协议，并向您说明生效日期。请您仔细阅读变更后的隐私协议内容，您继续使用边无际相关服务表示您同意我们按照更新后的隐私协议处理您的个人信息。<br/>

            <br/>

            <strong>六、第三方SDK目录</strong><br/>
            为了使您能够享受下表所列的服务及功能，我们会在应用中嵌入我们合作伙伴的第三方软件工具开发包（SDK）、代码插件或其他类似的应用程序。我们会对合作伙伴获取有关信息的应用程序接口（API）、软件工具开发包（SDK）进行安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。<br/>
            安卓、iOS、macOS、Windows版本涉及嵌入第三方代码、插件传入个人信息的情形列举如下：<br/>

            <br/>

            <strong>七、您的权利</strong><br/>
            在您使用边无际相关服务期间，为了让您更便捷地查询访问、删除、更正您的个人信息，同时保障您撤回个人信息使用的同意和注销账户的权利，我们设置了意见反馈渠道，您的意见将会得到及时的处理。<br/>

            <br/>

            <strong>八、联系我们</strong><br/>
            当您有其他的投诉、建议、未成年人个人信息相关问题或需要删除所有访问记录时，请通过info@edgenesis.com与我们联系。<br/>
            （地址：北京市海淀区创业大街12号楼511室，电话：18515145818）<br/>
            我们将尽快审核所涉问题，并在验证您的用户身份后的十五天内予以回复。<br/>

            <br/>

            <strong className="company">边无际（北京）科技有限公司</strong><br/>
          </p>
        </span>
            )
          }
        </div>
        <div className={styles.disclaimerConfirm}>
          <ButtonSquare
              href={localStorage.getItem('manuallySelectLanguage') === 'en'  ? '/' : '/zh-Hans/'}
              colorLevel="two" content={translate({message: "Decline"})}></ButtonSquare>
          <ButtonSquare
              href={localStorage.getItem('manuallySelectLanguage') === 'en' ? '/demo' : '/zh-Hans/demo'}
              colorLevel="two" content={translate({message: "Agree"})}></ButtonSquare>
        </div>
      </div>
}

export default function Disclaimer() {
  return (
      <Layout>
        {disclaimer}
      </Layout>
  )
}

