
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import informationState from './modules/informationState '


/** 插件注册 */
Vue.use(Vuex)

/** 创建store */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
  ],
  modules: {  // 子模块
    informationState
  },
})

export default store
