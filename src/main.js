import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入axios包
import axios from 'axios'

// 配置axios基准url地址
axios.defaults.baseURL = 'http://localhost:3000'
// 将axios实例对象挂载到Vue原型对象上, 任何组件都可以通过this.$http发起ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
