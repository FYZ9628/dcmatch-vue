<template>
  <el-card class="common-header">
    <a  href="http://localhost:8081/index">
      <img src="../../assets/logoIcon.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">学科竞赛赛程管理信息系统</span>
    <div style="display: block; float: right">
      <span style="display: block; font-size: 16px;float: left">
          {{$store.getters.name}}
      </span>
      <i class="el-icon-switch-button" v-on:click="logOut"
         style="display: block; font-size: 40px;float: right; margin-left: 20px"></i>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AdminHeader',
  data: function () {
    return {
    }
  },
  mounted: function () {
    console.log('测试')
    console.log(this.$store.getters)
  },
  methods: {
    // 退出登录
    logOut: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        _this.$store.commit('logout')
        // _this.$router.push('/login');
        window.open(
          this.$router.resolve({
            path: '/index'
          }).href, '_self'
          // 打开新窗口：_blank
          // 在本地窗口打开：_self
        )
        // // 下面这种方法不能实现在本页面退出登录后实时刷新
        // this.$router.push({
        //   path: '/index'
        // })
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
