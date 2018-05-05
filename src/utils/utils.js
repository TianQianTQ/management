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
//添加对象
export function addObject(key,val){
  let data = {};
  data[key] = val;
  return data;
}

function padLeftZero(str) {
  return ('00'+str).substr(str.length);
}
export function formatDate(date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };

  // 遍历这个对象
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      // console.log(`${k}`)
      console.log(RegExp.$1)
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
};

