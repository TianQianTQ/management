import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../views/common/Mlogin'
import Register from '../views/common/register'
import Bregister from '../views/common/Bregister'
import Blogin from '../views/common/Blogin'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },{
      path:'/business/register',
      name:'bregister',
      component:Bregister
    },{
      path:'/business/login',
      name:'blogin',
      component:Blogin
    }
  ]
})
