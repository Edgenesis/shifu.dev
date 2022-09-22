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
            let host=document.domain + ':' + window.location.port 
            setTimeout(()=> {
            let elements = document.querySelectorAll('.dropdown__link')
            console.log(elements);
            for(let elem of elements) {
              console.log(elem, elem.href);
              elem.href += '?manually=true'
            }
          }, 100)
            if(lang[0]== 'zh-CN' && href.indexOf('/zh-Hans') == -1 && href.indexOf('manually=true') == -1)
      {
        console.log('切换到汉语');
        document.location.href = href.replace(\`\${host}\`, \`\${host}/zh-Hans\`) + ''
      }
      `,
          },
        ],
  };
},
  };
};