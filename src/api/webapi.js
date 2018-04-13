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
  goLogin = (params) => fetch('POST', '/login', params);

}

// 实例化再导出
export default new WebApi();
