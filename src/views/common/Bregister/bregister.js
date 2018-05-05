import { Form, FormItem, Input, Button } from 'element-ui';
import {regexp} from "../../../utils/config";
import countDown from '../../../components/little/countDown'
import WebApi from "../../../api/webapi";

export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button,
    countDown
  },
  name: 'bregister',
  data() {
    return {
      timmer: false, // 验证码获取时间 ---
      formRegister: {
        username: '',
        mobile: '',
        password: '',
        captcha: ''
      },
      rulesRegister: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      showLogin: false,
      input10: '',
      uuid:'',
    }
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    toLogin() {     //去注册
      console.log("登录");
      this.$router.replace({
        name: 'Login',
        query: {}
      })
    },
    async getSmsCode() {    //获取验证码
      if (this.timmer) {
        return false;
      }
      let obj = {
        mobile: this.formRegister.mobile
      }
      const data = await WebApi.getSmsCode(obj)
      console.log(data);
      this.uuid = data.data.uuid;
      this.timmer = true;
    },
    timmerChange(val) { // 发送验证码数字变化---
      this.timmer = val;
    },
    submitForm(name) {
      this.goRegister();
    },
    beforeDestroy() {
      const that = this
      if (that.interval) clearInterval(that.interval);
    },
    async goRegister() {

      const formRegister = this.formRegister;
      //验证数据完整性
      //手机号验证  用户名验证  验证码   密码复杂性
      const params = {
        username: formRegister.username,
        uuid: this.uuid,
        captcha: formRegister.captcha,
        mobile: formRegister.mobile,
        password: formRegister.password,
      }
      localStorage.setItem('mobile', JSON.stringify(formRegister.mobile))
      const res = await WebApi.goRegister(params);
      if(res.code !==0){
        this.$alert(res.msg, '提示', {
          confirmButtonText: '确定',
        });
      }
      if(res.code===0){
        this.$message('注册成功');
        this.$router.push({
            name: 'login'
          })
      }
    }
  }
}
