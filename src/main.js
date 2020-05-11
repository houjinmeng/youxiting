import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import axios from 'axios'
import store from './vuex/store.js'
// 引入字体图标
import './assets/fonts/iconfont.css'
// 引入element-ui组件库模块
import ElementUI from 'element-ui'
import Promises from 'fs'
// 把element-ui注册给vue
Vue.use(ElementUI)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://192.168.1.3:8080/'

// axios的请求拦截器（在其中配置token）
axios.interceptors.request.use(
  function(config) {
    // config:代表axios的子级配置对象
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promises.reject(error)
  }
)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
