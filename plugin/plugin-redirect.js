module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin',
    injectHtmlTags({ content }) {
      return {
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
            innerHTML:
                `
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
                elem.setAttribute('href','javascript:void(0)')
                elem.onclick = function () {
                  let lang=elem.getAttribute('lang')
                  localStorage.setItem('manuallySelectLanguage',lang)
                  window.setTimeout(async () => {
                    if (lang==='en') {
                       document.location.href = href.split('/zh-Hans').join('')
                    }else{
                       document.location.href =
                        href.replace(\`\${host}\`, \`\${host}/zh-Hans\`) + ''
                    }
                 }, 100)
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
                        elem.setAttribute('href','javascript:void(0)')
                        elem.onclick = function () {
                          let lang=elem.getAttribute('lang')
                          localStorage.setItem('manuallySelectLanguage',lang)
                           window.setTimeout(async () => {
                            if (lang==='en') {
                               document.location.href = href.split('/zh-Hans').join('')
                            }else{
                               document.location.href =
                                href.replace(\`\${host}\`, \`\${host}/zh-Hans\`) + ''
                            }
                           }, 100)
                     
                        }
                        console.log(elem)
                      }
                    }, 0)
                  }
                }
            }
            
            document.addEventListener('DOMContentLoaded', () => {
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
        //   postBodyTags: [
        //     {
        //       tagName: 'script',
        //       innerHTML: `
        //       let href=window.location.href
        //       let timer=null
        //       let predo=()=>{
        //        return new Promise((resolve, reject) => {
        //         if(href.indexOf('/zh-Hans')==-1)
        //         {
        //           document.body.classList.add('EN');
        //           console.log('add EN');
        //         }
        //         else
        //          {
        //           console.log('add CN');
        //
        //           document.body.classList.add('CN');
        //          }
        //          if(document.querySelector('body').classList.contains('CN')||document.querySelector('body').classList.contains('EN')){
        //             clearoff()
        //             window.clearInterval(timer)
        //          }
        //          resolve()
        //        })
        //
        //       }
        //       let clearoff=()=>{
        //         //删除之前双语的不显示css
        //         //这样实现的效果是加载完成后再显示特定的语言 而不是 在开始就显示两种语言堆在一起
        //         document.getElementById('temp_showoff')?.remove()
        //       }
        //       // 在0.07秒的之前的class 都会被框架的js行为清掉
        //       //为了保证这个效果的稳定实现 我们的策略是多次执行
        //       function initialization(){
        //         timer = window.setInterval(() => {
        //           window.setTimeout(async () => {
        //            await predo()
        //           }, 0)
        //         }, 200)
        //
        //       }
        //       document.addEventListener('DOMContentLoaded', () => {
        //          initialization()
        //       })
        //
        //
        //       // 监测页面路径发生变化
        //       class Dep { // 订阅池
        //         constructor(name) {
        //           this.subs = [] //该事件下被订阅对象的集合
        //         }
        //         defined(watch) {
        //           this.subs.push(watch)
        //         }
        //         notify() { //通知订阅者有变化
        //           console.log('this.subs',this.subs)
        //           this.subs.forEach((e, i) => {
        //             if (typeof e.update === 'function') {
        //               try {
        //                 e.update.apply(e) //触发订阅者更新函数
        //               } catch (err) {
        //                 console.error(err)
        //               }
        //             }
        //           })
        //         }
        //       }
        //
        //       class Watch {
        //         constructor(name, fn) {
        //           this.name = name; //订阅消息的名称
        //           this.callBack = fn; //订阅消息发送改变时->订阅者执行的回调函数
        //         }
        //         add(dep) { //将订阅者放入dep订阅池
        //           dep.subs.push(this);
        //         }
        //         update() { //将订阅者更新方法
        //           var cb = this.callBack; //赋值为了不改变函数内调用的this
        //           cb(this.name);
        //         }
        //       }
        //       function addMethod() {
        //         let historyDep = new Dep();
        //         return function (name) {
        //           if (name === 'historychange') {
        //             return function (name, fn) {
        //               let event = new Watch(name, fn)
        //               historyDep.defined(event);
        //             }
        //           } else if (name === 'pushState' ) {
        //             let method = history[name];
        //             return function () {
        //               console.log('pushState','arguments',arguments[2])
        //               method.apply(history, arguments);
        //               historyDep.notify();
        //             }
        //           }else if ( name === 'replaceState') {
        //             let method = history[name];
        //             return function () {
        //               console.log('replaceState','arguments',arguments[2])
        //               method.apply(history, arguments);
        //               historyDep.notify();
        //             }
        //           }
        //
        //         }
        //       }
        //       let addHistoryMethod = new addMethod()
        //       window.addHistoryListener = addHistoryMethod('historychange');
        //       history.pushState = addHistoryMethod('pushState');
        //       history.replaceState = addHistoryMethod('replaceState');
        //
        //       window.addHistoryListener('history',function(){
        //          console.log('窗口的history改变了');
        //         initialization()
        //       })
        // `,
        //     },
        //     {
        //       tagName: 'style',
        //       innerHTML: `
        //         .lang_zh,.lang_en{
        //           visibility: hidden;
        //         }
        //         .EN .lang_zh{
        //           display:none!important
        //         }
        //         .EN .lang_en{
        //           visibility: visible!important
        //         }
        //         .CN .lang_en{
        //           display:none!important
        //         }
        //         .CN .lang_zh{
        //           visibility: visible!important
        //         }
        // `,
        //     },
        //   ],
      }
    },
  }
}
