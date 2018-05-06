import Vue from 'vue'
import Router from 'vue-router'

const Mlogin = resolve => require(['../views/common/Mlogin'], resolve)

const Bregister = resolve => require(['../views/common/Bregister'],resolve)
// const Blogin = resolve => require(['../views/common/Blogin'],resolve)

const Home = resolve => require(['../components/common/Home'], resolve)
const BaseCharts = resolve => require(['../components/page/BaseCharts'], resolve)
const BaseForm = resolve => require(['../components/page/BaseForm'], resolve)
const BaseTable = resolve => require(['../components/page/BaseTable'], resolve)
const DragList = resolve => require(['../components/page/DragList'], resolve)
const Markdown = resolve => require(['../components/page/Markdown'], resolve)
const Readme = resolve => require(['../components/page/Readme'], resolve)
const VueEditor = resolve => require(['../components/page/VueEditor'], resolve)
const VueTable = resolve => require(['../components/page/VueTable'], resolve)
const Upload = resolve => require(['../components/page/Upload'], resolve)
const Login = resolve => require(['../components/page/Login'], resolve)

const Bhome = resolve => require(['../views/Bpage/Bhome'], resolve)
const Bstore = resolve => require(['../views/Bpage/Bstore'], resolve)
const Bcapital = resolve => require(['../views/Bpage/Bcapital'], resolve)
const Bgoods = resolve => require(['../views/Bpage/Bgoods'], resolve)
const Bjurisdiction = resolve => require(['../views/Bpage/Bjurisdiction'], resolve)
const Bkefu = resolve => require(['../views/Bpage/Bkefu'], resolve)
const Bmember = resolve => require(['../views/Bpage/Bmember'], resolve)
const Border = resolve => require(['../views/Bpage/Border'], resolve)
const Bperson = resolve => require(['../views/Bpage/Bperson'], resolve)
const Bstaff = resolve => require(['../views/Bpage/Bstaff'], resolve)

const Mhome = resolve => require(['../views/Mpage/Mhome'], resolve)
const Muser = resolve => require(['../views/Mpage/Muser'], resolve)
const Mbusiness = resolve => require(['../views/Mpage/Mbusiness'], resolve)
const Madmin = resolve => require(['../views/Mpage/Madmin'], resolve)
const Mkefu = resolve => require(['../views/Mpage/Mkefu'], resolve)
const Mpersonalcenter = resolve => require(['../views/Mpage/Mpersonalcenter'], resolve)


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name:'login', component: Mlogin},        //  登录入口（统一）
    // {path: '/login', name: 'login', component: Mlogin},
    // {path: '/register', name: 'register', component: Mregister},
    {path: '/business/register', name: 'bregister', component: Bregister},   //  商家注册
    // {path: '/business/login', name: 'blogin', component:Blogin},
    {
       path: '/home',
       name: 'home',
       component: Home,
       children: [
         {path: '/readme', name: 'readme', component: Readme},
         {path: '/basetable', name: 'basetable', component:BaseTable},
         {path: '/vuetable', name: 'vuetable', component:VueTable},
         {path: '/baseform', name: 'baseform', component:BaseForm},
         {path: '/vueeditor', name: 'vueeditor', component:VueEditor},
         {path: '/markdown', name:'markdown', component:Markdown},
         {path: '/upload', name: 'upload', component:Upload},
         {path: '/basecharts', name: 'basecharts', component:BaseCharts},
         {path: '/drag', name: 'drag', component:DragList},
         {path: '/login', name: 'dlogin', component:Login},

         {path:'/bhome', name:'bhome', component: Bhome},                            // 商家管理主页
         {path: '/bstore', name: 'bstore', component: Bstore},                       // 店铺管理
         {path: '/bcapital', name: 'bcapital', component: Bcapital},                 // 资金管理
         {path: '/bgoods', name: 'bgoods', component: Bgoods},                       // 商品管理
         {path: '/bjurisdiction', name: 'bjurisdiction', component: Bjurisdiction},  // 权限管理
         {path: '/bkefu', name: 'bkefu', component: Bkefu},                          // 客服管理
         {path: '/bmember', name: 'bmember', component: Bmember},                    // 会员管理
         {path: '/border', name: 'border', component: Border},                       // 订单管理
         {path: '/bperson', name: 'bperson', component: Bperson},                    // 个人中心
         {path: '/bstaff', name: 'bstaff', component: Bstaff},                       // 员工管理


         {path:'/mhome', name:'mhome', component: Mhome},     // 管理主页
         {path:'/muser', name:'muser', component: Muser},     // 用户管理
         {path:'/madmin', name:'madmin', component: Madmin},  // 管理员管理
         {path:'/mbusiness', name:'mbusiness', component: Mbusiness},  //  商户管理
         {path:'/mkefu', name:'mkefu', component: Mkefu},              //  客服管理
         {path:'/mpersonalcenter', name:'mpersonalcenter', component: Mpersonalcenter},   // 个人中心
       ]
    }
  ]
})
