import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from "echarts"
import ElementUI from 'element-ui'//引入element组件库
import 'element-ui/lib/theme-chalk/index.css'
import "./tailwind.css"

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts//将echarts挂载到全局vue上，之后可以通过this.$echarts来使用
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
