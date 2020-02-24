<template>
  <body id="poster">
  <el-form :model="registerForm" :rules="rules2" ref="loginForm" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="register_title">注 册</h3>
    <el-form-item prop="phone">
      <el-input type="text" v-model="registerForm.phone"
                auto-complete="off" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.password"
                auto-complete="off" placeholder="密码" v-on:keyup.enter.native="register"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;
      border: none" @click.native.prevent="register" :loading="logining">确 认 注 册</el-button>
    </el-form-item>
    <el-link href="http://localhost:8081/login" style="font-size: 10px; color: #409EFF">已有账号，登 录</el-link>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      logining: false,
      registerForm: {
        phone: '18278539579',
        password: '123456'
      },
      rules2: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    register () {
      let _this = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          this.$axios
            .post('/addRegister', {
              phone: this.registerForm.phone,
              password: this.registerForm.password
            })
            .then(successResponse => {
              console.log(successResponse.data.code)
              // 不管成功不成功，只要能通过后端就返回200
              // console.log(successResponse.status)
              let path
              this.logining = false
              if (successResponse.data.code === 200) { // 跳转到教师
                // this.$store.commit('addRegister', successResponse.data)
                // _this.$store.commit('login', _this.loginForm)
                const loading = this.$loading({
                  lock: true,
                  text: '注册成功，请登录',
                  spinner: 'el-icon-loading',
                  background: 'rgba(244,244,244,1)'
                  // 1是不透明，0是全透明
                })
                setTimeout(() => {
                  loading.close()
                }, 2000)
                path = this.$route.query.redirect
                this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
              } else {
                _this.$message({
                  message: '注册失败',
                  type: 'error'
                })
              }
            })
            .catch(failResponse => {
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
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
  .register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
