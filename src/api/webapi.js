import fetch from './fetch/index';
/**
 * 封装基础ajax请求
 * @param {any}
 */
class WebApi {
  /**
   * 登录界面
   * @param {username} 用户名
   * @param {password} 密码
   * @return {登录信息}
   */
  //登录
  goLogin = (params) => fetch('POST', '/api-business/business/login', params);
  //注册
  goRegister = (params) => fetch('POST','/api-business/business/register',params);
  //获取验证码
  getSmsCode = (params) => fetch('GET','/api-business/business/send-captcha',params);
  //退出
  goOut = () => fetch('POST','/api-business/business/logout');
  //搜索用户
  searchUser =() => fetch('POST','/api-business/business/users');
}

// 实例化再导出
export default new WebApi();
