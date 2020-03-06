<template>
    <el-card class="common-header">
    <a >
      <img src="../../assets/logoIcon.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;
      font-weight: bold;position:absolute;left: 100px">学科竞赛赛程管理信息系统</span>
      <div class="rightButton">
      <el-link :underline="false" class="el-link" href="http://localhost:8081/login">登 录</el-link>
      <el-link :underline="false"  href="http://localhost:8081/register">注 册</el-link>
      </div>
  </el-card>
</template>

<script>
export default {
  name: 'IndexHeader',
  data: function () {
    return {
      // username:''
    }
  },
  methods: {
    passwordModify: function () {
      this.$router.push({
        path: '/passwordModify'
      })
    },
    // 退出登录
    logOut: function () {
      let _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        _this.$store.commit('logout')
        // _this.$router.push('/login');
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
  .common-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    padding: 0;
    margin: 0;
  }
  .rightButton {
    float: right;
  }
  .el-link {
    height: 40px;
    text-align: center;
    line-height: 36px;
    font-size: 16px;
    color: #4ea2e2;
    border: solid 1px #4ea2e2;
    padding: 0px 12px;
    margin: auto 5px;
  }
</style>
