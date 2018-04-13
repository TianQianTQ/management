import { Form, FormItem, Input, Button } from 'element-ui';
import WebApi from '../../../api/webapi';
export default {
  components:{
    ElForm:Form,
    ElFormItem:FormItem,
    ElInput:Input,
    ElButton:Button
  },
  name: 'login',
  data () {
    return {
      formLogin:{
        username:'',
        password:''
      },
      rulesLogin:{
        username:[
          { required : true, message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          { required : true, message:'请输入密码',trigger:'blur'}
        ]
      },
    showLogin:false,
    }
  },
  mounted(){
    const that = this;
    this.showLogin = true;
  },
  methods:{
    toRegister(){     //去注册
      console.log("去注册");
      this.$router.replace({
        name:'register',
        query:{
        }
      })
    },
    submitForm(name){
      const that = this;
      this.goLogin();
    },
    beforeDestroy () {
      const that = this
      if (that.interval) clearInterval(that.interval);
    },
    async goLogin(){
      const formLogin = this.formLogin;
      const params = {
        username:formLogin.username,
        password:formLogin.password
      }
      sessionStorage.setItem('name',JSON.stringify(formLogin.username))
       const res = await WebApi.goLogin(params);
      if(res.code === 200){
        this.$message('登录成功');
        this.$router.push({
          path:'/'
        })
      }
    }
  }
}
