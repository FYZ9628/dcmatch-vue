<template>
  <body id="poster">
  <el-form :model="loginForm" :rules="rules2" ref="loginForm" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" v-on:keyup.enter.native="login"></el-input>
    </el-form-item>

    <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;
      border: none" @click.native.prevent="login" :loading="logining">登录</el-button>
    </el-form-item>
    <el-link href="http://localhost:8081/register" style="font-size: 10px; color: #409EFF">注 册</el-link>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: '',
        password: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false,
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      console.log(this.$store.state)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          this.$axios
            .post('/login', {
              account: this.loginForm.account,
              password: this.loginForm.password
            })
            .then(successResponse => {
              let path
              this.logining = false
              // 返回码：100对应管理员，200对应教师，300对应学生，400是错误码
              // 500是默认用户(即还没有认证的用户)，600对应院校
              if (successResponse.data.code === 200) { // 跳转到教师
                this.$store.commit('login', successResponse.data)
                // _this.$store.commit('login', _this.loginForm)
                path = this.$route.query.redirect

                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              } else if (successResponse.data.code === 300) { // 跳转到学生
                this.$store.commit('login', successResponse.data)
                // _this.$store.commit('login', _this.loginForm)
                path = this.$route.query.redirect

                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              } else if (successResponse.data.code === 500) { // 跳转到默认用户
                this.$store.commit('login', successResponse.data)
                // _this.$store.commit('login', _this.loginForm)
                path = this.$route.query.redirect

                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              } else if (successResponse.data.code === 600) { // 跳转到院校（举办方）
                this.$store.commit('login', successResponse.data)
                // _this.$store.commit('login', _this.loginForm)
                path = this.$route.query.redirect

                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
              } else {
                _this.$message({
                  message: '账号或密码错误',
                  type: 'error'
                })
              }
            })
            .catch(failResponse => {
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
  #poster {
    /*background: url("../assets/login_background.jpg") no-repeat center;*/
    background-color: #f6f6f6;
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
