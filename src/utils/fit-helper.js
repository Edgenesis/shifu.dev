export function isMobile() {
  //Test whether it is a mobile terminal
  let flag = global.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

export function isEn() {
  const enModel = /\/(en)\//g
  let flag = window.location.href.match(enModel)
  return flag
}
