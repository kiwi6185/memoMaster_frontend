import Vue from 'vue'
import App from './App.vue'

import store from './vuex/store' // 导入 store 对象

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局注册
Vue.use(ElementUI);

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8088'
// 如果想写拦截器可能可以写在这里
let token = sessionStorage.getItem("token");  // 在这里拿到 login 后 set 的 token
axios.interceptors.request.use(
  config => {
    // 把 token 放入头。如果用手机号作为 key，存在内存泄漏的风险。一般业务也用的 token。
    if(token) config.headers['authorization'] = sessionStorage.getItem("token") // 我改了这里
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
);
  
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router: router, // 名称和值一致的话，可以直接写一个，如 router
  store // 将 store 对象传递给 Vue 实例，可以直接写一个
}).$mount('#app')
