// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'element-ui/lib/theme-default/index.css'    //默认主题
 // import '../static/css/theme-green/index.css';       // 浅绿色主题
import echarts from 'echarts'              //引入图表
Vue.prototype.$echarts = echarts

Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  router,
  render:h => h(App)
}).$mount('#app');
