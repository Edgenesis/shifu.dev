import { translate } from '@docusaurus/Translate'
import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import common from '@site/src/css/common.module.scss'
import BanPC from '@site/static/img/home/ban.png'
import banMove from '@site/static/img/home/bannerMove.png'
import { Foot } from '../../components/footer/index'
export function Backbtn() {
  return (
    <a href="/deployment">
      <svg
        width="14"
        height="26"
        viewBox="0 0 14 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7998 1.7998L2.1998 12.9998L11.7998 24.1998"
          stroke="#399BFF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      back
    </a>
  )
}
export default function Company() {
  return (
    <Layout>
      <div className={styles.pageoutbox}>
        <img
          src={BanPC}
          alt=""
          className={`${styles.bookingimg} ${styles.bannerImg}`}
        />
        <img
          src={banMove}
          alt=""
          className={`${styles.bookingimg} ${styles.bannerMove}`}
        />
        <div className={styles.pagebox}>
          <div className={styles.pagecontent}>
            {/* <Backbtn></Backbtn> */}
            <h1 className={styles.title}>
              {translate({ message: 'Kindly register for a Shifu Cloud Demo' })}
            </h1>
            <div className={styles.textbox}>
              <p>
                {translate({
                  message: `Hello! Thank you for your interest and support in Shifu Cloud.`,
                })}
              </p>
              <p>
                {translate({
                  message: `In order to help you quickly get started with Shifu Cloud, we have arranged a 30-minute online demonstration for each user. Our team will walk you through the specific operations of Shifu Cloud and answer any questions you may have. Please schedule your service and time through the following methods.`,
                })}
              </p>
              {/*<p>*/}
              {/*  {translate({*/}
              {/*    message: `We will confirm your appointment via email and look forward to further communication with you!`*/}
              {/*  })}*/}
              {/*</p>*/}
            </div>
            <div className={common.block30}></div>
            {/* <iframe
              className={styles.bookingFream}
              src="https://calendly.com/shifu-demo/30min"
              frameBorder="0"
            >
              loading...
            </iframe> */}

            <div
              dangerouslySetInnerHTML={{
                __html: `<!-- Begin Mailchimp Signup Form -->
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

	#mc_embed_signup{ clear:left; font:14px Helvetica,Arial,sans-serif;  width:600px;}
	#mc_embed_signup form{margin:0px ;}
  ##mc_embed_signup .helper_text{display:none;}
  @media screen and (max-width: 620px) {
	#mc_embed_signup{ width:350px;}
  }

  .brandingLogo{display:none;}



	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
    <form action="https://cloud.us21.list-manage.com/subscribe/post?u=4b94c5fa06d95aba4e712c86c&amp;id=3d17d9dbb9&amp;f_id=00fbd5e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
        <h2>Subscribe</h2>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
</div>
	<div id="mce-responses" class="clear foot">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_4b94c5fa06d95aba4e712c86c_3d17d9dbb9" tabindex="-1" value=""></div>
        <div class="optionalParent">
            <div class="clear foot">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                <p class="brandingLogo"><a href="http://eepurl.com/ih5jWv" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
            </div>
        </div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->`,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* <Foot></Foot> */}
    </Layout>
  )
}