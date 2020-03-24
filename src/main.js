// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import ECharts from 'vue-echarts'

// 设置反向代理，前端请求默认发送到 http://localhost:8999/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8999/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.component('v-chart', ECharts)

// 引入日期工具类moment.js
// 日期获取，格式化等
// 执行 npm install moment --save
// 并import 上面两个文件
// 百度教程 https://segmentfault.com/a/1190000016117935
// 使用中文时间
moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.use(ElementUI)

/**
 * 前端拦截
 * 在访问每一个路由前调用
 * 这个的逻辑很简单，首先判断访问的路径是否需要登录，
 * 如果需要，判断 store 里有没有存储 user 的信息，
 * 如果存在，则放行，否则跳转到登录页面，
 * 并存储访问的页面路径（以便在登录后跳转到访问页）。
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.account) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
