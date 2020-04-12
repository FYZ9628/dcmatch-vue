<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">管理员登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.account"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'AdminLogin',
  data () {
    return {
      loginForm: {
        account: '1001',
        password: '123456'
      },
      checked: false,
      responseResult: []
    }
  },
  /**
     * 1.点击登录按钮，向后端发送数据
     * 2.受到后端返回的成功代码时，触发 store 中的 login() 方法，
     *    把 loginForm 对象传递给 store 中的 user 对象
     *  （*这里只是简单的实现，在后端我们可以通过用户名和密码查询数据库，
     *     获得 user 表的完整信息，比如用户昵称、用户级别等，返回前端，
     *     并传递给 user 对象，以实现更复杂的功能）
     * 3.获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
     */
  methods: {
    login () {
      let _this = this
      console.log(this.$store.state)
      this.$axios
        .post('/admin_login', {
          account: _this.loginForm.account,
          password: _this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 100) {
            _this.$store.commit('login', successResponse.data)
            console.log('管理员登录后返回的数据')
            console.log(successResponse.data)
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/admin' : path})
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style>
  #poster {
    background: url("../assets/login_background.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 20px;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
