<template>
  <el-card class="common-header">
    <a >
      <img src="../../assets/logoIcon.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">学科竞赛赛程管理信息系统</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
export default {
  name: 'AdminHeader',
  data: function () {
    return {
    }
  },
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/index')
          // 清空路由，防止路由重复加载
          // const newRouter = createRouter()
          // _this.$router.matcher = newRouter.matcher
        }
      }).catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .common-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    background: #fff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    text-size:20px;
    height: 70px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
