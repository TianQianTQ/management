export function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    // console.log(r[2])
    return decodeURIComponent(r[2]);
  }
  return null;
}
//获取页面view
export function getView() {
  return getUrlParam('view');
}
