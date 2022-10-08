module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin',
    injectHtmlTags({ content }) {
      return {
        preBodyTags: [
          {
            tagName: 'style',
            attributes: {
               id:'temp_showoff',
            },
            innerHTML: `
              ._cn ,._en{
                display:none
              }
      `,
          },
          {
            tagName: 'script',
            innerHTML: `
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
            let manually= localStorage.getItem('manuallySelectLanguage')
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
        postBodyTags: [
          {
            tagName: 'script',
            innerHTML: `
            let time=0
            console.log(document.body.className,document.className,document)
            let predo=()=>{
              time++
              let href=window.location.href
              if(href.indexOf('/zh-Hans')==-1)
              document.body.classList.add('EN'); 
              else
              document.body.classList.add('CN'); 
            }
            let clearoff=()=>{
              //删除之前双语的不显示css
              //这样实现的效果是加载完成后再显示特定的语言 而不是 在开始就显示两种语言堆在一起
              document.getElementById('temp_showoff').remove()
            }
            setTimeout(()=>{
              predo()
              clearoff()
            }, 200)
            //一次好像都不保险
            setTimeout(()=>{
              predo()
              clearoff()
            }, 400)
            // 在0.07秒的之前的class 都会被清掉
            document.body.classList.add('te');    
            document.addEventListener("DOMContentLoaded", ()=>{
              console.log('ready')
              console.log(document.body.className)
              document.body.classList.add('CN');  
              console.log(document.body.className)
            });
      `,
          },
          {
            tagName: 'style',
            innerHTML: `
              .EN ._cn{
                display:none
              }

              .CN ._en{
                display:none
              }
      `,
          },
        ],
      }
    },
  }
}
