import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 前端拦截器
 * 在 index.js 里设置我们需要的状态变量和方法。
 * 为了实现登录拦截器，我们需要一个记录用户信息的变量。
 * 为了方便日后的扩展（权限认证等），我们使用一个用户对象而不是仅仅使用一个布尔变量。
 * 同时，设置一个方法，触发这个方法时可以为我们的用户对象赋值
 */
export default new Vuex.Store({
  state: {
    account: '' || localStorage.getItem('account'),
    password: '' || localStorage.getItem('password'),
    name: '' || localStorage.getItem('name'),
    code: '' || localStorage.getItem('code')
  },
  // user: {
  //   // 用于拦截没有登录的用户
  //   // 在路由中设置 requireAuth: true  就是表示当前页面要拦截
  //   // 同时在 main.js 也要写上 router.beforeEach 配置
  //   account: window.localStorage
  //     .getItem('user' || '[]') == null ? '' : JSON.parse(
  //       window.localStorage.getItem('user' || '[]')).account
  // },
  mutations: {
    login (state, user) {
      state.account = user.account
      localStorage.setItem('account', user.account)

      state.password = user.password
      localStorage.setItem('password', user.password)

      if (user.name === '') {
        state.name = user.name
        localStorage.setItem('name', '管理员')
      } else {
        state.name = user.name
        localStorage.setItem('name', user.name)
      }

      state.code = user.code
      localStorage.setItem('code', user.code)
    },
    logout (state) {
      localStorage.clear()
      state.account = null
      state.password = null
      state.name = null
      state.code = null
    }
  },
  getters: {
    account: (state) => state.account,
    password: (state) => state.password,
    name: (state) => state.name,
    code: (state) => state.code
  }
  // state: {
  //   user: {
  //     account: window.localStorage
  //       .getItem('user' || '[]') == null ? '' : JSON.parse(
  //         window.localStorage.getItem('user' || '[]')).account
  //   }
  // },
  // login (state, user) {
  //   state.user = user
  //   /**
  //    * 这里我们还用到了 localStorage，即本地存储，
  //    * 在项目打开的时候会判断本地存储中是否有 user 这个对象存在，
  //    * 如果存在就取出来并获得 account 的值，否则则把 account 设置为空。
  //    * 这样我们只要不清除缓存，登录的状态就会一直保存。
  //    */
  //   window.localStorage.setItem('user', JSON.stringify(user))
  // }
})
