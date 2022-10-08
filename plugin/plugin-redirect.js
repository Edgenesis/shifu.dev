module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin',
    injectHtmlTags({ content }) {
      return {
        preBodyTags: [
          {
            tagName: 'script',
            innerHTML:
            `
            let lang=navigator.languages;
            let href=window.location.href
            let host=window.location.port ? (document.domain + ':' + window.location.port ):document.domain 
            setTimeout(()=> {
            let elements = document.querySelectorAll('.dropdown__link')
            console.log(elements);
            for(let elem of elements) {
              elem.onclick=function(){
                localStorage.setItem('manuallySelectLanguage',true)
              }
            }
          }, 100)
            let manually= localStorage.getItem('manually')
            console.log(manually)
            if(lang[0]== 'zh-CN' && href.indexOf('/zh-Hans') == -1 && !manually)
      {
        console.log('切换到汉语');
        document.location.href = href.replace(\`\${host}\`, \`\${host}/zh-Hans\`) + ''
      }
      if(lang[0]!= 'zh-CN' && href.indexOf('/zh-Hans') != -1 &&  !manually)
      {
        console.log('changed into English');
        console.log(href.split('/zh-Hans').join(''));
        document.location.href = href.split('/zh-Hans').join('')
      }
      `,
          },
        ],
  };
},
  };
};

