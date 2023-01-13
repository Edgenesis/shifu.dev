import localStorage from 'localStorage'
import React, { Component } from 'react'

const styleString = `<!-- Begin Mailchimp Signup Form -->
<style type="text/css">
#mc_embed_signup form {display:block; position:relative; text-align:left; margin: 20px}
#mc_embed_signup h2 {font-weight:bold; padding:0; margin:15px 0; font-size:1.4em;}
#mc_embed_signup input {border: 1px solid #ABB0B2; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;}
#mc_embed_signup input[type=checkbox]{-webkit-appearance:checkbox;}
#mc_embed_signup input[type=radio]{-webkit-appearance:radio;}
#mc_embed_signup input:focus {border-color:#333;}
#mc_embed_signup .button {clear:both; background-color: #aaa; border: 0 none; border-radius:4px; transition: all 0.23s ease-in-out 0s; color: #FFFFFF; cursor: pointer; display: inline-block; font-size:15px; font-weight: normal; height: 32px; line-height: 32px; margin: 0 5px 10px 0; padding: 0 22px; text-align: center; text-decoration: none; vertical-align: top; white-space: nowrap; width: fit-content; width: -moz-fit-content;}
#mc_embed_signup .button:hover {background-color:#777;}
#mc_embed_signup .small-meta {font-size: 11px;}
#mc_embed_signup .nowrap {white-space:nowrap;}

#mc_embed_signup .mc-field-group {clear:left; position:relative; width:96%; padding-bottom:3%; min-height:50px; display:grid;}
#mc_embed_signup .size1of2 {clear:none; float:left; display:inline-block; width:46%; margin-right:4%;}
* html #mc_embed_signup .size1of2 {margin-right:2%; /* Fix for IE6 double margins. */}
#mc_embed_signup .mc-field-group label {display:block; margin-bottom:3px;}
#mc_embed_signup .mc-field-group input {display:block; width:100%; padding:8px 0; text-indent:2%;}
#mc_embed_signup .mc-field-group select {display:inline-block; width:99%; padding:5px 0; margin-bottom:2px;}
#mc_embed_signup .mc-address-fields-group {display:flex; flex-direction:row; justify-content:space-evenly; width:96%; gap:15px;}

#mc_embed_signup .datefield, #mc_embed_signup .phonefield-us{padding:5px 0;}
#mc_embed_signup .datefield input, #mc_embed_signup .phonefield-us input{display:inline; width:60px; margin:0 2px; letter-spacing:1px; text-align:center; padding:5px 0 2px 0;}
#mc_embed_signup .phonefield-us .phonearea input, #mc_embed_signup .phonefield-us .phonedetail1 input{width:40px;}
#mc_embed_signup .datefield .monthfield input, #mc_embed_signup .datefield .dayfield input{width:30px;}
#mc_embed_signup .datefield label, #mc_embed_signup .phonefield-us label{display:none;}

#mc_embed_signup .indicates-required {text-align:right; font-size:11px; margin-right:4%;}
#mc_embed_signup .asterisk {color:#e85c41; font-size:150%; font-weight:normal; position:relative; top:5px;}     
#mc_embed_signup .clear {clear:both;}
#mc_embed_signup .foot {display:grid; grid-template-columns: 3fr 1fr; width:96%; align-items: center;}
@media screen and (max-width:400px) {#mc_embed_signup .foot {display:grid; grid-template-columns: 1fr; width:100%; align-items: center;}}

@media screen and (max-width:400px) {#mc_embed_signup .referralBadge {width:50%;}}

#mc_embed_signup .brandingLogo {justify-self:right;}
@media screen and (max-width:400px) {#mc_embed_signup .brandingLogo {justify-self:left;}}

#mc_embed_signup .mc-field-group.input-group ul {margin:0; padding:5px 0; list-style:none;}
#mc_embed_signup .mc-field-group.input-group ul li {display:block; padding:3px 0; margin:0;}
#mc_embed_signup .mc-field-group.input-group label {display:inline;}
#mc_embed_signup .mc-field-group.input-group input {display:inline; width:auto; border:none;}

#mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%; margin: 0 5%; clear: both;}
#mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
#mc_embed_signup #mce-error-response {display:none;}
#mc_embed_signup #mce-success-response {color:#529214; display:none;}
#mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}
#mc_embed_signup .helper_text {color: #8d8985; margin-top: 2px; display: inline-block; padding: 3px; background-color: rgba(255,255,255,0.85); -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; font-size: 14px; font-weight: normal; z-index: 1;}

#mc-embedded-subscribe {clear:both; width:auto; display:block; margin:1em 0 1em 5%;}
#mc_embed_signup #num-subscribers {font-size:1.1em;}
#mc_embed_signup #num-subscribers span {padding:.5em; border:1px solid #ccc; margin-right:.5em; font-weight:bold;}

#mc_embed_signup #mc-embedded-subscribe-form div.mce_inline_error {display:inline-block; margin:2px 0 1em 0; padding:3px; background-color:rgba(255,255,255,0.85); -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; font-size:14px; font-weight:normal; z-index:1; color:#e85c41;}
#mc_embed_signup #mc-embedded-subscribe-form input.mce_inline_error {border:2px solid #e85c41;}

/* 上面的部分本来应该是走cdn的,但是不挂梯子可能下不下来. */
/* The upper part was supposed to take the cdn, but it may not come down without hanging a ladder. */

.indicates-required{display:none}
	#mc_embed_signup{ clear:left; font:14px Helvetica,Arial,sans-serif;  width:600px;}
	#mc_embed_signup form{margin:0px ;}
  ##mc_embed_signup .helper_text{display:none;}
  #mc_embed_signup .helper_text {background-color:transparent}
  @media screen and (max-width: 620px) {
	#mc_embed_signup{ width:350px;}
  }

  .brandingLogo{display:none;}
  #mc_embed_signup h2{margin:-10px 0 15px 0}
  .formTitle{color:#2580DE ;margin-top:10px;line-height:1.5}



	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>`
export default class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      htmlString: getHtmlString('en'),
    }
  }

  componentDidMount() {
    if (window.location.href.includes('zh-Hans')) {
      this.setState({
        htmlString: getHtmlString('zh-Hans'),
      })
    } else {
      this.setState({
        htmlString: getHtmlString('en'),
      })
    }
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: this.state.htmlString,
        }}
      ></div>
    )
  }
}
function getHtmlString(_type) {
  console.log('module get type:', _type, 'hereis type end')
  // let temp=______typefff != 'zh-Hans' ? `<h1>En</h1>`:`<h1>Cn</h1>`
  // console.log('即将渲染的值是',temp)
  // return temp
  let htmlEle =
    _type != 'zh-Hans'
      ? `<div id="mc_embed_signup">
        <form action="https://edgenesis.us13.list-manage.com/subscribe/post?u=4ed581b6b30c95ec0d40b981d&amp;id=c148e7d4e4&amp;f_id=005a8de2f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
            <h2 class="formTitle">Shifu Cloud is coming soon! Please join the waitlist below, and we'll notify you whenever Shifu Cloud is ready!</h2>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group">
        <strong> <label for="mce-MMERGE4">How should we address you? </label></strong>
        <input type="text" value="" name="MMERGE4" class="" id="mce-MMERGE4">
        <span id="mce-MMERGE4-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group">
        <strong><label for="mce-EMAIL"> Address  <span class="asterisk">*</span></strong>
    </label>
        <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
        <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group input-group">
        <strong>How many IoT devices do you work with?  <span class="asterisk">*</span>
    </strong>
        <ul><li>
        <input type="radio" value="100+" name="MMERGE1" id="mce-MMERGE1-0">
        <label for="mce-MMERGE1-0">100+</label>
    </li>
    <li>
        <input type="radio" value="50-100" name="MMERGE1" id="mce-MMERGE1-1">
        <label for="mce-MMERGE1-1">50-100</label>
    </li>
    <li>
        <input type="radio" value="10-50" name="MMERGE1" id="mce-MMERGE1-2">
        <label for="mce-MMERGE1-2">10-50</label>
    </li>
    <li>
        <input type="radio" value="1-10" name="MMERGE1" id="mce-MMERGE1-3">
        <label for="mce-MMERGE1-3">1-10</label>
    </li>
    <li>
        <input type="radio" value="None" name="MMERGE1" id="mce-MMERGE1-4">
        <label for="mce-MMERGE1-4">None</label>
    </li>
    </ul>
        <span id="mce-MMERGE1-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group">
        <strong> <label for="mce-MMERGE2">What kinds of IoT devices have you worked with? </label></strong>
        <input type="text" value="" name="MMERGE2" class="" id="mce-MMERGE2">
        <span id="mce-MMERGE2-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group input-group">
        <strong>How do you plan to use Shifu Cloud?  <span class="asterisk">*</span>
    </strong>
        <ul><li>
        <input type="radio" value="Connect IoT devices via public protocols (HTTP, OPCUA, Socket, MQTT, Modbus, etc.)" name="MMERGE5" id="mce-MMERGE5-0">
        <label for="mce-MMERGE5-0">Connect IoT devices via public protocols (HTTP, OPCUA, Socket, MQTT, Modbus, etc.)</label>
    </li>
    <li>
        <input type="radio" value="Connect IoT devices via proprietary protocols (SiemensS7, HikVision, etc.)" name="MMERGE5" id="mce-MMERGE5-1">
        <label for="mce-MMERGE5-1">Connect IoT devices via proprietary protocols (SiemensS7, HikVision, etc.)</label>
    </li>
    <li>
        <input type="radio" value="Develop IoT applications" name="MMERGE5" id="mce-MMERGE5-2">
        <label for="mce-MMERGE5-2">Develop IoT applications</label>
    </li>
    <li>
        <input type="radio" value="Build complete IoT solutions" name="MMERGE5" id="mce-MMERGE5-3">
        <label for="mce-MMERGE5-3">Build complete IoT solutions</label>
    </li>
    <li>
        <input type="radio" value="else" name="MMERGE5" id="mce-MMERGE5-4">
        <label for="mce-MMERGE5-4">else</label>
    </li>
    </ul>
        <span id="mce-MMERGE5-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group input-group">
        <strong>Your experience with k8s?  <span class="asterisk">*</span>
    </strong>
        <ul><li>
        <input type="radio" value="0-1 year" name="MMERGE6" id="mce-MMERGE6-0">
        <label for="mce-MMERGE6-0">0-1 year</label>
    </li>
    <li>
        <input type="radio" value="1-2 years" name="MMERGE6" id="mce-MMERGE6-1">
        <label for="mce-MMERGE6-1">1-2 years</label>
    </li>
    <li>
        <input type="radio" value="2 year+" name="MMERGE6" id="mce-MMERGE6-2">
        <label for="mce-MMERGE6-2">2 year+</label>
    </li>
    </ul>
        <span id="mce-MMERGE6-HELPERTEXT" class="helper_text"></span>
    </div>
    <div class="mc-field-group input-group">
    <strong>Your industry?  <span class="asterisk">*</span></strong>
        <ul><li>
        <input type="radio" value="Agriculture" name="MMERGE3" id="mce-MMERGE3-0">
        <label for="mce-MMERGE3-0">Agriculture</label>
    </li>
    <li>
        <input type="radio" value="Education" name="MMERGE3" id="mce-MMERGE3-1">
        <label for="mce-MMERGE3-1">Education</label>
    </li>
    <li>
        <input type="radio" value="Health Care" name="MMERGE3" id="mce-MMERGE3-2">
        <label for="mce-MMERGE3-2">Health Care</label>
    </li>
    <li>
        <input type="radio" value="Information Services" name="MMERGE3" id="mce-MMERGE3-3">
        <label for="mce-MMERGE3-3">Information Services</label>
    </li>
    <li>
        <input type="radio" value="Manufacturing" name="MMERGE3" id="mce-MMERGE3-4">
        <label for="mce-MMERGE3-4">Manufacturing</label>
    </li>
    <li>
        <input type="radio" value="Transportation" name="MMERGE3" id="mce-MMERGE3-5">
        <label for="mce-MMERGE3-5">Transportation</label>
    </li>
    <li>
        <input type="radio" value="Utilities" name="MMERGE3" id="mce-MMERGE3-6">
        <label for="mce-MMERGE3-6">Utilities</label>
    </li>
    <li>
        <input type="radio" value="else" name="MMERGE3" id="mce-MMERGE3-7">
        <label for="mce-MMERGE3-7">else</label>
    </li>
    </ul>
        <span id="mce-MMERGE3-HELPERTEXT" class="helper_text"></span>
    </div>
        <div id="mce-responses" class="clear foot">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_4ed581b6b30c95ec0d40b981d_c148e7d4e4" tabindex="-1" value=""></div>
            <div class="optionalParent">
                <div class="clear foot">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                    <p class="brandingLogo"><a href="http://eepurl.com/ih50pr" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
                </div>
            </div>
        </div>
    </form>
    </div>
    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[3]='MMERGE3';ftypes[3]='radio';fnames[4]='MMERGE4';ftypes[4]='text';fnames[1]='MMERGE1';ftypes[1]='radio';fnames[2]='MMERGE2';ftypes[2]='text';fnames[5]='MMERGE5';ftypes[5]='radio';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    <!--End mc_embed_signup-->`
      : `<div id="mc_embed_signup">
    <form action="https://edgenesis.us13.list-manage.com/subscribe/post?u=4ed581b6b30c95ec0d40b981d&amp;id=c148e7d4e4&amp;f_id=005a8de2f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
        <h2 class="formTitle">Shifu Cloud即将上线！请在下方留下您的信息，我们将在Shifu Cloud上线后与您联系！</h2>
        <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
        <div class="mc-field-group">
    <strong> <label for="mce-MMERGE4">如何称呼您？ </label></strong>
    <input type="text" value="" name="MMERGE4" class="" id="mce-MMERGE4">
    <span id="mce-MMERGE4-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group">
    <strong><label for="mce-EMAIL">请留下您的邮箱 <span class="asterisk">*</span></strong>
</label>
    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
    <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group input-group">
    <strong>您手头有多少物联网设备？ <span class="asterisk">*</span>
</strong>
    <ul><li>
    <input type="radio" value="100+" name="MMERGE1" id="mce-MMERGE1-0">
    <label for="mce-MMERGE1-0">100+</label>
</li>
<li>
    <input type="radio" value="50-100" name="MMERGE1" id="mce-MMERGE1-1">
    <label for="mce-MMERGE1-1">50-100</label>
</li>
<li>
    <input type="radio" value="10-50" name="MMERGE1" id="mce-MMERGE1-2">
    <label for="mce-MMERGE1-2">10-50</label>
</li>
<li>
    <input type="radio" value="1-10" name="MMERGE1" id="mce-MMERGE1-3">
    <label for="mce-MMERGE1-3">1-10</label>
</li>
<li>
    <input type="radio" value="None" name="MMERGE1" id="mce-MMERGE1-4">
    <label for="mce-MMERGE1-4">没有</label>
</li>
</ul>
    <span id="mce-MMERGE1-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group">
    <strong> <label for="mce-MMERGE2">您手上的物联网设备是哪种类型？ </label></strong>
    <input type="text" value="" name="MMERGE2" class="" id="mce-MMERGE2">
    <span id="mce-MMERGE2-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group input-group">
    <strong>您想用Shifu来解决什么问题？ <span class="asterisk">*</span>
</strong>
    <ul><li>
    <input type="radio" value="Connect IoT devices via public protocols (HTTP, OPCUA, Socket, MQTT, Modbus, etc.)" name="MMERGE5" id="mce-MMERGE5-0">
    <label for="mce-MMERGE5-0">连接公有协议设备(HTTP, OPCUA, Socket, MQTT, Modbus, etc.)</label>
</li>
<li>
    <input type="radio" value="Connect IoT devices via proprietary protocols (SiemensS7, HikVision, etc.)" name="MMERGE5" id="mce-MMERGE5-1">
    <label for="mce-MMERGE5-1">连接私有协议设备 (SiemensS7, HikVision, etc.)</label>
</li>
<li>
    <input type="radio" value="Develop IoT applications" name="MMERGE5" id="mce-MMERGE5-2">
    <label for="mce-MMERGE5-2">进行应用开发</label>
</li>
<li>
    <input type="radio" value="Build complete IoT solutions" name="MMERGE5" id="mce-MMERGE5-3">
    <label for="mce-MMERGE5-3">开发完整的物联网解决方案</label>
</li>
<li>
    <input type="radio" value="else" name="MMERGE5" id="mce-MMERGE5-4">
    <label for="mce-MMERGE5-4">其他</label>
</li>
</ul>
    <span id="mce-MMERGE5-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group input-group">
    <strong>您有k8s相关的经验吗？<span class="asterisk">*</span>
</strong>
    <ul><li>
    <input type="radio" value="0-1 year" name="MMERGE6" id="mce-MMERGE6-0">
    <label for="mce-MMERGE6-0">0-1 年</label>
</li>
<li>
    <input type="radio" value="1-2 years" name="MMERGE6" id="mce-MMERGE6-1">
    <label for="mce-MMERGE6-1">1-2 年</label>
</li>
<li>
    <input type="radio" value="2 year+" name="MMERGE6" id="mce-MMERGE6-2">
    <label for="mce-MMERGE6-2">2 年以上</label>
</li>
</ul>
    <span id="mce-MMERGE6-HELPERTEXT" class="helper_text"></span>
</div>
<div class="mc-field-group input-group">
<strong>您所在的行业是？ <span class="asterisk">*</span></strong>
    <ul><li>
    <input type="radio" value="Agriculture" name="MMERGE3" id="mce-MMERGE3-0">
    <label for="mce-MMERGE3-0">农业</label>
</li>
<li>
    <input type="radio" value="Education" name="MMERGE3" id="mce-MMERGE3-1">
    <label for="mce-MMERGE3-1">教育</label>
</li>
<li>
    <input type="radio" value="Health Care" name="MMERGE3" id="mce-MMERGE3-2">
    <label for="mce-MMERGE3-2">医疗健康</label>
</li>
<li>
    <input type="radio" value="Information Services" name="MMERGE3" id="mce-MMERGE3-3">
    <label for="mce-MMERGE3-3">信息服务</label>
</li>
<li>
    <input type="radio" value="Manufacturing" name="MMERGE3" id="mce-MMERGE3-4">
    <label for="mce-MMERGE3-4">制造业</label>
</li>
<li>
    <input type="radio" value="Transportation" name="MMERGE3" id="mce-MMERGE3-5">
    <label for="mce-MMERGE3-5">交通运输业</label>
</li>
<li>
    <input type="radio" value="Utilities" name="MMERGE3" id="mce-MMERGE3-6">
    <label for="mce-MMERGE3-6">公共事业</label>
</li>
<li>
    <input type="radio" value="else" name="MMERGE3" id="mce-MMERGE3-7">
    <label for="mce-MMERGE3-7">其他</label>
</li>
</ul>
    <span id="mce-MMERGE3-HELPERTEXT" class="helper_text"></span>
</div>
    <div id="mce-responses" class="clear foot">
        <div class="response" id="mce-error-response" style="display:none"></div>
        <div class="response" id="mce-success-response" style="display:none"></div>
    </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_4ed581b6b30c95ec0d40b981d_c148e7d4e4" tabindex="-1" value=""></div>
        <div class="optionalParent">
            <div class="clear foot">
                <input type="submit" value="提交" name="subscribe" id="mc-embedded-subscribe" class="button">
                <p class="brandingLogo"><a href="http://eepurl.com/ih50pr" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
            </div>
        </div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[3]='MMERGE3';ftypes[3]='radio';fnames[4]='MMERGE4';ftypes[4]='text';fnames[1]='MMERGE1';ftypes[1]='radio';fnames[2]='MMERGE2';ftypes[2]='text';fnames[5]='MMERGE5';ftypes[5]='radio';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->`
  return styleString + htmlEle
}
