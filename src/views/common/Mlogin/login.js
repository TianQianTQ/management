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
        mobile:'',
        password:''
      },
      rulesLogin:{
        mobile:[
          { required : true, message:'请输入手机号',trigger:'blur'}
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
        name:'bregister',
        query:{
        }
      })
    },
    submitForm(name){
      this.goLogin();
    },
    beforeDestroy () {
      const that = this
      if (that.interval) clearInterval(that.interval);
    },
    async goLogin(){
      const formLogin = this.formLogin;
      const params = {
        mobile:formLogin.mobile,
        password:formLogin.password
      }
      const res = await WebApi.goLogin(params);
      if(res.code === 0){
        this.$message('登录成功');
        localStorage.setItem('username',res.data.username);
        if(res.data.isAdmin === 0) {
          this.$router.push({
            name: 'bhome',
            query: {
              view: 'business'
            }
          })
        }else{
          this.$router.push({
            name: 'mhome',
            query: {
              view: 'admin'
            }
          })
        }
      }
    }
  }
}
