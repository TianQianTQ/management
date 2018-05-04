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

const Bhome = resolve => require(['../views/Bpage/Bhome'], resolve)
const Bstore = resolve => require(['../views/Bpage/Bstore'], resolve)

const Mhome = resolve => require(['../views/Mpage/Mhome'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name:'login', component: Mlogin},
    // {path: '/login', name: 'login', component: Mlogin},
    // {path: '/register', name: 'register', component: Mregister},
    {path: '/business/register', name: 'bregister', component: Bregister},
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

         {path:'/bhome', name:'bhome', component: Bhome},
         {path: '/Bstore', name: 'bstore', component: Bstore},

         {path:'/mhome', name:'mhome', component:Mhome},
       ]
    }
  ]
})
