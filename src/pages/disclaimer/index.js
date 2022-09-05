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
        <Translate>请使用PC端打开此页面</Translate>
      </div>
    </div>
} else {
  disclaimer =
    // <SnowBg>
      <div className={styles.disclaimerContainer}>
        <h1 className={styles.title}><Translate>请务必认真阅读以下内容</Translate></h1>
        <div className={styles.container}>
          <h1><Translate>隐私协议</Translate></h1>
          <p>
            <Translate>生效日期:2021年03月29日</Translate><br />
            <strong><Translate>概要</Translate></strong><br />
            <Translate>欢迎您使用Shifu！我们将通过《边无际隐私协议》（以下简称“本隐私协议”）帮助您了解我们收集、使用、存储和共享个人及Shifu相关信息的情况，以及您所享有的相关权利。</Translate><br />
            <Translate>为了向您提供边无际相关服务，我们需要收集您在使用服务时主动提供的或因为使用服务而产生的信息，我们会向您说明上述信息的类型和对应的用途；</Translate><br />
            <Translate>您可以联系info@edgenesis.com进行访问、更正、删除您的个人信息并管理您的授权；</Translate><br />
            <Translate>我们会采用业界领先的安全技术保护好您的个人信息。</Translate><br />
            <Translate>您可以通过阅读完整版《边无际隐私协议》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。</Translate><br />
            <Translate>如您理解并同意接受本隐私协议，请点击“同意”开始接受我们的服务。</Translate><br />
            <strong><Translate>相关定义：</Translate></strong><br />
            <Translate>个人用户：个人用户指使用个人手机号码、微信号注册使用边无际相关服务的个人；</Translate><br />

            <br />

            <strong><Translate>一</Translate>、<Translate>我们如何收集和使用您的信息</Translate></strong><br />
            <Translate>在您使用边无际相关服务的过程中，我们严格遵守法律、法规的规定以及与用户的约定，按照本隐私协议如下所述方式收集、使用您在使用服务时主动提供的或因为使用服务而产生的信息，用以向您提供服务、优化我们的服务以及保障您的账户安全。如我们使用您的个人信息，超出了与收集时所称的目的及与其具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的明示同意。</Translate><br />
            1.1 <Translate>当您注册使用边无际相关服务时，我们需要您主动提供一些信息：</Translate><br />
            1.1.1 <Translate>如果您选择建立新账号，您需要输入您的手机号码和名称，用于根据您的要求为您建立本服务账号。</Translate><br />
            1.1.2 <Translate>如果您选择使用微信(微信ID)注册，您需要提供您的微信账号名、头像、手机号码、地区（位置），用于根据您的要求为您建立本服务账号。</Translate><br />
            1.2 <Translate>当您使用边无际相关服务时，我们会收集您的IP地址，我们使用此数据是为了让您连接我们的服务器，部分功能将无法实现，无法给您提供更好的服务体验。为了帮助您了解和诊断您与本服务的连接状态，我们会收集您的无线网络、互联网连接状态，以及您是否获得连接本服务及其网络的授权。</Translate><br />
            1.3 <Translate>为保障您正常使用我们的服务、维护我们服务的正常运行、改善及优化您的服务体验，我们会收集您的Shifu运行情况、设备型号、网络类型、唯一设备标识符、软件崩溃记录、流量统计。</Translate><br />
            1.4 <Translate>为使您获得更轻松的访问体验，我们会收集您使用本软件或网站的Cookie，或本软件和您的浏览器提供的其他本地存储，这些文件记录了您的IP地址、账号、密码、浏览记录等，主要用于辨别用户身份和记录用户操作。我们收集、使用以上信息将会为您提供更好的服务。</Translate><br />
            1.5 <Translate>当您进行意见反馈时，您需要提供与意见反馈相关的详细背景、信息及您的联系方式，以便于我们尽快核实并处理您的意见。</Translate><br />
            1.6 <Translate>根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意：</Translate><br />
            1) <Translate>与我们履行法律法规规定的义务相关的；</Translate><br />
            2) <Translate>与国家安全、国防安全直接相关的；</Translate><br />
            3) <Translate>与公共安全、公共卫生、重大公共利益直接相关的；</Translate> <br />
            4) <Translate>与刑事侦查、起诉、审判和判决执行等直接相关的；</Translate> <br />
            5) <Translate>出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；</Translate><br />
            6) <Translate>所涉及的个人信息是您自行向社会公众公开的；</Translate> <br />
            7) <Translate>根据您要求签订和履行合同所必需的；</Translate> <br />
            8) <Translate>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</Translate><br />
            9) <Translate>维护所提供产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障；</Translate><br />
            10) <Translate>法律法规规定的其他情形。</Translate><br />
            <Translate>请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。</Translate><br />
            <Translate>如未来因为产品功能演变需要从第三方间接获取您的个人信息，我们会在获取前向您告知个人信息的来源、类型及使用范围，如我们的个人信息处理活动超出您原本向第三方提供个人信息时的授权同意范围，我们将在处理您该等个人信息前征得您的授权同意；此外，我们也将会严格遵守相关法律法规的规定，并要求第三方保障其提供的信息的合法性。</Translate><br />

            <br />

            <strong><Translate>二</Translate>、<Translate>信息的存储</Translate></strong> <br />
            2.1 <Translate>信息存储的方式和期限</Translate><br />
            <Translate>我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下，通过安全的方式存储您的个人信息。我们将按照《中华人民共和国网络安全法》的要求，就您使用边无际相关服务留存相关的网络日志不少于六个月。</Translate><br />
            2.2 <Translate>信息存储的地域</Translate><br />
            <Translate>我们会按照法律法规规定，将收集的用户个人信息根据您选择的产品和服务按相关法律法规要求进行传输和存储。</Translate><br />
            2.3 <Translate>产品或服务停止运营时的通知</Translate><br />
            <Translate>当我们的产品或服务终止运营时，我们将以推送通知、公告等形式通知您，并在合理期限内删除您的个人信息或进行匿名化处理，法律法规另有规定的除外。</Translate><br />

            <br />
            
            <strong><Translate>三</Translate>、<Translate>信息安全</Translate><br />
            3.1 <Translate>安全保护措施</Translate></strong><br />
            <Translate>我们努力为用户的信息安全提供保障，以防止信息的泄露、丢失、不当使用、未经授权访问和披露等。我们使用多方位的安全保护措施，以确保用户的个人信息保护处于合理的安全水平，包括技术保护手段、管理制度控制、安全体系保障等诸多方面。</Translate><br />
            <Translate>我们使用的技术保护手段包括但不限于防火墙、加密（例如TLS）、去标识化或匿名化处理、访问控制措施等。此外，我们还会不断加强安装在您设备版的安全能力。例如，我们会在您的设备本地完成部分信息加密工作，以巩固安全传输。</Translate><br />
            <Translate>我们建立了保障个人信息安全专门的管理制度、流程和组织。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务并进行审计，并根据内部制度规定对违反义务的人员进行处罚。我们也会不定期审查该管理制度、流程和组织，以防未经授权的人员擅自访问、使用或披露用户的信息。</Translate><br />
            <Translate>我们建议您在使用产品和服务时充分注意对个人信息的保护，我们也会尽可能提供多种个人信息保护功能来协助您保护自己的个人信息。</Translate><br />
            3.2 <Translate>安全事件处置措施</Translate><br />
            <Translate>若发生个人信息泄露、损毁、丢失等安全事件，我们会启动应急预案，阻止安全事件扩大。安全事件发生后，我们将按照法律法规的要求及时以推送通知、邮件、电话等形式告知您该事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对您的应对建议。如果难以实现逐一告知，我们将通过公告等方式发布警示。</Translate><br />

            <br />

            <strong><Translate>四</Translate>、<Translate>我们分享的信息</Translate></strong> <br />
            4.1 <Translate>我们遵照法律法规的规定，对信息的分享进行严格的限制。</Translate> <br />
            4.2 <Translate>仅为实现外部处理的目的，我们可能会与第三方合作伙伴（第三方服务供应商、应用开发者等，例如，代表我们发出电子邮件或推送通知的通讯服务提供商）分享您的个人信息，让他们按照我们的说明、隐私政策以及其他相关的保密和安全措施来为我们处理上述信息，并用于以下用途：</Translate><br />
            1) <Translate>向您提供我们的服务；</Translate><br />
            2) <Translate>实现“我们如何使用收集您的信息”部分所述目的；</Translate><br />
            3) <Translate>履行我们在本政策中的义务和行使我们的权利；</Translate><br />
            4) <Translate>理解、维护和改善我们的服务。</Translate><br />
            <Translate>如我们与上述第三方分享您的信息，我们将会采用加密、匿名化处理等手段保障您的信息安全。</Translate><br />
            4.3 <Translate>随着我们业务的持续发展，当发生合并、收购、资产转让等交易导致向第三方分享您的个人信息时，我们将通过推送通知、公告等形式告知您相关情形，按照法律法规及不低于本政策所要求的标准继续保护或要求新的管理者继续保护您的个人信息。</Translate><br />
            4.4 <Translate>我们可能会将所收集到的信息用于大数据分析。例如，我们可能将收集到的信息用于分析形成不包含任何个人信息的城市热力图或行业洞察报告。</Translate><br />
            4.5 <Translate>我们可能对外公开并与我们的合作伙伴分享经统计加工后不含身份识别内容的信息，用于了解用户如何使用我们服务或让公众了解我们服务的总体使用趋势。</Translate><br />
            4.6 <Translate>我们可能基于以下目的披露您的个人信息：</Translate><br />
            1) <Translate>遵守适用的法律法规等有关规定；</Translate><br />
            2) <Translate>与国家安全、国防安全直接相关的；</Translate><br />
            3) <Translate>与公共安全、公共卫生直接相关的；</Translate><br />
            4) <Translate>遵守刑事侦查、起诉、法院判决或裁定以及其他法律程序的规定；</Translate><br />
            5) <Translate>遵守相关政府机关或其他法定授权组织的要求；</Translate><br />
            6) <Translate>为执行相关服务协议或本政策、维护社会公共利益，为保护我们的客户（包括您）、我们或我们的关联公司、其他用户或雇员的人身财产安全或其他合法权益合理且必要的用途。</Translate><br />
            7) <Translate>所涉及的个人信息是您自行向社会公众公开的；</Translate><br />
            8) <Translate>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</Translate><br />

            <br />

            <strong><Translate>五</Translate>、<Translate>变更</Translate></strong><br />
            <Translate>我们可能会适时对本隐私协议进行修订。当隐私协议的条款发生变更时，我们会在版本更新时以适当的方式向您提示变更后的隐私协议，并向您说明生效日期。请您仔细阅读变更后的隐私协议内容，您继续使用边无际相关服务表示您同意我们按照更新后的隐私协议处理您的个人信息。</Translate><br />

            <br />

            <strong><Translate>六</Translate>、<Translate>第三方SDK目录</Translate></strong><br />
            <Translate>为了使您能够享受下表所列的服务及功能，我们会在应用中嵌入我们合作伙伴的第三方软件工具开发包（SDK）、代码插件或其他类似的应用程序。我们会对合作伙伴获取有关信息的应用程序接口（API）、软件工具开发包（SDK）进行安全检测，并与授权合作伙伴约定严格的数据保护措施，令其按照我们的委托目的、服务说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。</Translate><br />
            <Translate>安卓、iOS、macOS、Windows版本涉及嵌入第三方代码、插件传入个人信息的情形列举如下：</Translate><br />

            <br />

            <strong><Translate>七</Translate>、<Translate>您的权利</Translate></strong><br />
            <Translate>在您使用边无际相关服务期间，为了让您更便捷地查询访问、删除、更正您的个人信息，同时保障您撤回个人信息使用的同意和注销账户的权利，我们设置了意见反馈渠道，您的意见将会得到及时的处理。</Translate><br />

            <br />

            <strong><Translate>八</Translate>、<Translate>联系我们</Translate></strong><br />
            <Translate>当您有其他的投诉、建议、未成年人个人信息相关问题或需要删除所有访问记录时，请通过info@edgenesis.com与我们联系。</Translate>（<Translate>地址：北京市海淀区创业大街12号楼511室</Translate> <Translate>电话：18515145818</Translate>）<br />
            <Translate>我们将尽快审核所涉问题，并在验证您的用户身份后的十五天内予以回复。</Translate><br />

            <br />
            
            <strong class="company"><Translate>边无际（北京）科技有限公司</Translate></strong><br />
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
