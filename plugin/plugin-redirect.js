module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin',
    injectHtmlTags({ content }) {
      return {
        postBodyTags: [
          {
            tagName: 'script',
            innerHTML: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();(function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65f104fd9131ed19d9794995/1hoqnn0ae';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();`,
          },
        ],
        preBodyTags: [
          {
            tagName: 'style',
            attributes: {
              id: 'temp_showoff',
            },
            innerHTML: `
              // .lang_zh, .lang_en {
              //   display:none
              // }
      `,
          },
          {
            tagName: 'script',
            /***
             * 我们会查询用户的语言偏好 并在用户打开页面时自动跳转到对应的语言页面
             * 页面的逻辑是 有一个在996px 宽度的媒体查询
             * 然后大于996的语言栏在上方, 宽度小于996的语言栏在侧边 ,这两处的语言选项其实是不同的内容有相同的功能
             * 然后我们需要将这两个地方的点击按钮都绑定上事件 , 即 点击之后存一个变量manuallySelectLanguage到localstorage里面
             * 后续如果检测到这个变量我们就不再做跳转了
             * 需要注意的问题是 窄屏下的多语言菜单只有在窄屏模式才会出现在DOM中
             * 而具体语言选择的按钮也只有只有点击多语言菜单才会出现在DOM中
             * 解决方案是分别监听媒体查询和多语言按钮的点击
             * 然后保证具体的语言选择按钮出现时就带有点击事件
             ***/
            innerHTML: `
                let href = window.location.href
                let host = window.location.port
                ? document.domain + ':' + window.location.port
                : document.domain
            function autoredirect() {
              let manually = localStorage.getItem('manuallySelectLanguage')

              if (manually) {
                if (href.indexOf('/zh-Hans')!==-1) {
                    localStorage.setItem('manuallySelectLanguage','zh-Hans')
                }else{
                   localStorage.setItem('manuallySelectLanguage','en')
                } 
                return
              } else {
                let lang = navigator.languages
                console.log('automatically change')
                if (lang[0] == 'zh-CN' && href.indexOf('/zh-Hans') == -1) {
                  console.log('切换到汉语')
                  localStorage.setItem('manuallySelectLanguage','zh-Hans')
                  document.location.href =
                    href.replace(\`\${host}\`, \`\${host}/zh-Hans\`) + ''
                }
                if (lang[0] != 'zh-CN' && href.indexOf('/zh-Hans') != -1) {
                  console.log('changed into English')
                   localStorage.setItem('manuallySelectLanguage','en')
                  document.location.href = href.split('/zh-Hans').join('')
                }
              }
            }
            
            autoredirect()
            
            function widedo() {
              console.log('This is a wide screen — more than 996px wide.')
              //这里会拿到一个数组
              let elements = document.querySelectorAll('.langDropdown~ul .dropdown__link')
              console.log('wide', elements)
              for (let elem of elements) {
                elem.onclick = function () {
                  let lang=elem.getAttribute('lang')
                  localStorage.setItem('manuallySelectLanguage',lang)
                }
                console.log(elem.getAttribute('href'))
              }
            }
            
            function narrowdo() {
              console.log('This is a narrow screen — less than 996px wide.')
              //这里会拿到一个数组
              let temps = document.querySelectorAll('.langDropdown')
              console.log(temps)
              //具体来说就是 窄屏会加载宽屏的dom内容 但是宽屏不会加载窄屏的dom内容
              //如果数组只有一个元素那说明前者没有加载完
              if (temps.length < 2) {
                console.log('没有加载完')
                setTimeout(narrowdo, 500)
              } else
                for (let temp of temps) {
                  temp.onclick = function () {
                    console.log('got dropdown')
                    //点击之后要等待dom的生成
                    setTimeout(() => {
                      let elesEles = document.querySelectorAll(
                        '.langDropdown~ul .menu__link'
                      )
                      console.log('narrow', elesEles)
                      for (let elem of elesEles) {
                        elem.onclick = function () {
                          let lang=elem.getAttribute('lang')
                          localStorage.setItem('manuallySelectLanguage',lang)
                        }
                        console.log(elem)
                      }
                    }, 0)
                  }
                }
            }
            
            document.addEventListener('DOMContentLoaded', () => {
              let specialLink= document.querySelectorAll('.special a')
               if (href.indexOf('/zh-Hans')!==-1) {
                  specialLink.forEach(e=>{
                    let linkHref=e.getAttribute('href')
                    if(linkHref.indexOf('/zh-Hans')===-1){
                       e.setAttribute('href','/zh-Hans'+linkHref)
                    }
                  })
                }else{
                  specialLink.forEach(e=>{
                    let linkHref=e.getAttribute('href')
                    if(linkHref.indexOf('/zh-Hans')!==-1){
                       e.setAttribute('href',linkHref.replace('/zh-Hans',''))
                    }
                  })
                } 
              let mql = window.matchMedia('(max-width: 996px)')
              //初始检测
              if (mql.matches) {
                //小于996px
                narrowdo()
              } else {
                widedo()
              }
            
              //保证和样式变化同步
              mql.onchange = (e) => {
                if (e.matches) {
                  //小于996px
                  narrowdo()
                } else {
                  widedo()
                }
              }
            })
      `,
          },
        ],
        postBodyTags: [
          {
            tagName: 'script',
            innerHTML: `
            class Dep {
              // 订阅池
              constructor(name) {
                  this.id = new Date(); //这里简单的运用时间戳做订阅池的ID
                  this.subs = []; //该事件下被订阅对象的集合
              }
                  defined() {
                      // 添加订阅者
                      Dep.watch.add(this);
                  }
                  notify() {
                      //通知订阅者有变化
                      this.subs.forEach((e, i) => {
                          if (typeof e.update === 'function') {
                              try {
                                e.update.apply(e); //触发订阅者更新函数
                              } catch (err) {
                                  console.warr(err);
                              }
                          }
                      });
                  }
              }
              Dep.watch = null;
              
              class Watch {
                  constructor(name, fn) {
                      this.name = name; //订阅消息的名称
                      this.id = new Date(); //这里简单的运用时间戳做订阅者的ID
                      this.callBack = fn; //订阅消息发送改变时->订阅者执行的回调函数
                  }
                  add(dep) {
                      //将订阅者放入dep订阅池
                      dep.subs.push(this);
                  }
                  update() {
                      //将订阅者更新方法
                      var cb = this.callBack; //赋值为了不改变函数内调用的this
                      cb(this.name);
                  }
            }
          
            var addHistoryMethod = (function () {
              var historyDep = new Dep();
              return function (name) {
                  if (name === 'historychange') {
                      return function (name, fn) {
                          // 订阅一下
                          var event = new Watch(name, fn);
                          Dep.watch = event;
                          historyDep.defined();
                          Dep.watch = null; //置空供下一个订阅者使用
                      }
                  }else if (name === 'pushState' || name === 'replaceState') {
                      var method = history[name];
                      return function () {
                          /**
                           * 1，arguments 是每一个函数都自带的属性
                           * 2，arguments 会自动的将所有的实参存储其中
                           * **/
                          method.apply(history, arguments);
                          historyDep.notify();
                      }
                  }
              }
          })();

          window.addHistoryListener = addHistoryMethod('historychange');
          history.pushState = addHistoryMethod('pushState');
          history.replaceState = addHistoryMethod('replaceState');

          function addHide(){
            let timer = setInterval(() => {
              if(!document.getElementById('foot').classList.contains('hide')){
                document.getElementById('foot').classList.add('hide')
              }else{
                clearInterval(timer)
              }
            }, 200)
           
          }

          function addClass(){
            let href = window.location.href
            if(href.includes('shifu.dev')){
              addHide()
            }
          }

          window.addHistoryListener('history', function () {
            addClass()
          });
          document.addEventListener('DOMContentLoaded', () => {
            addClass()
          })

            `
            
          }

        ],
      }
    },
  }
}
