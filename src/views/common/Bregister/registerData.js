import WebApi from '../../../api/webapi';
const getSmsCode = async (obj) => {
  try {
    let res = await WebApi.getSmsCode(obj);
    if (res.code === 802) {
      return {
        hasPicCode: true
      };
    }
    if (res.code !== 200) {
      // return {
      //   err: true,
      //   message: res.message
      // };
      return res.result;
    }
    return res.result;
  }
  catch (e) {
    // return {
    //   err: true,
    //   message: '服务器出现错误'
    // };
    let res = await WebApi.getSmsCode(obj);
    return res.result;
  }
};
const goRegister = async (obj) => {
  try {
    let res = await WebApi.getSmsCode(obj);
    if (res.code === 802) {
      return {
        hasPicCode: true
      };
    }
    if (res.code !== 200) {
      return {
        err: true,
        message: res.message
      };
    }
    return res.result;
  }
  catch (e) {
    return {
      err: true,
      message: '服务器出现错误'
    };
  }
}
export default { getSmsCode, goRegister};
