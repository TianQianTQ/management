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
  // 登录
  goLogin = (params) => fetch('POST', '/api-business/business/login', params);
  // 注册
  goRegister = (params) => fetch('POST','/api-business/business/register',params);
  // 获取验证码
  getSmsCode = (params) => fetch('GET','/api-business/business/send-captcha',params);
  // 退出
  goOut = () => fetch('POST','/api-business/business/logout');
  // 搜索用户
  searchUser = (params) => fetch('POST','/api-business/business/users',params);
  // 修改用户信息
  updateUser = (params) => fetch('POST','/api-business/business/update-user',params);
  // 删除用户
  deleteUser = (params) => fetch('GET','/api-business/business/delete-user',params);
  // 商铺列表
  searchShop = (params) => fetch('POST','/api-business/business/list-shop',params);

  //商铺审核
  auditingShop = (params) => fetch('POST','/api-business/business/auditing-shop',params);
  // 管理员列表
  adminList = (params) => fetch('POST','/api-business/business/list',params);
  // 创建管理员
  createAdmin = (params) => fetch('POST','/api-business/business/create',params);
  // 删除管理员
  deleteAdmin = (params) => fetch('GET','/api-business/business/delete-admin',params);
  // 修改个人信息
  updatePerson = (params) => fetch('POST','/api-business/business/update-person',params);

  // 创建商铺
  createShop = (params) => fetch('POST','/api-business/business/create-shop',params);
  // 城市信息
  getCity = (params) => fetch('GET','/api-business/business/city',params);
  // 商品列表
  category = (params) => fetch('GET','/api-products/products/category',params);
  // 商铺状态
  infoShop = (params) => fetch('GET','/api-business/business/info-shop',params);
  // 添加商品
  addProduct = (params) => fetch('POST','/api-business/business/add-product',params);
  // 商品列表
  listProduct = (params) => fetch('POST','/api-business/business/list-product',params);
  // 编辑商品
  updateProduct = (params) => fetch('POST','/api-business/business/update-product',params);
  // 删除商品
  deleteProduct = (params) => fetch('GET','/api-business/business/delete-product',params);

}

// 实例化再导出
export default new WebApi();
