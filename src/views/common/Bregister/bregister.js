import { Form, FormItem, Input, Button } from 'element-ui';
import {regexp} from "../../../utils/config";

export default {
  components:{
    ElForm:Form,
    ElFormItem:FormItem,
    ElInput:Input,
    ElButton:Button
  },
  name: 'bregister',
  data () {
    return {
      formLogin:{
        username:'',
        password:''
      },
      showLogin:false,
      input10: ''
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
