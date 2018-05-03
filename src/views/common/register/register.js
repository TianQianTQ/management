import { Form, FormItem, Input, Button } from 'element-ui';
export default {
  components:{
    ElForm:Form,
    ElFormItem:FormItem,
    ElInput:Input,
    ElButton:Button
  },
  name: 'register',
  data () {
    return {
      formRegister:{
        username:'',
        password:'',
        repassword:''
      },
      rulesRegister:{
        username:[
          { required : true, message:'请输入用户名',trigger:'blur'}
        ],
        password:[
          { required : true, message:'请输入密码',trigger:'blur'}
        ],
        repassword:[
          { required : true, message:'请重复输入密码',trigger:'blur'}
        ]
      },
      showLogin:false
    }
  },
  mounted(){
    this.showLogin = true;
  },
  methods:{
    submitForm(name){
      const that = this;
      this.goLogin();
    },
    async goLogin(){
      const formLogin = this.formLogin;
      const params = {
        username:formLogin.username,
        password:formLogin.password
      }
      localStorage.setItem('name',formLogin.username)
      //const res = await WebApi.goLogin(params);
      // if(res.code === 200){
      //   this.$message('登录成功');
      //   this.$router.push({
      //     path:'/'
      //   })
      // }
      this.$message('登陆成功');
      this.$router.push({
        name:'mhome',
        query:{
          view:'administrator'
        }
      })
    },
    toLogin(){     //去注册
      console.log("登录");
      this.$router.replace({
        name:'Login',
        query:{

        }
      })
    }
  }
}
