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
      formLogin:{
        username:'',
        password:''
      },
      showLogin:false
    }
  },
  mounted(){
    this.showLogin = true;
  },
  methods:{
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
