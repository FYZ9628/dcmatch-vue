<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <!--      已登录就显示 CommonHeader 没有登录就显示 IndexHeader-->
      <div v-if="isLogin === true">
        <CommonHeader></CommonHeader>
      </div>
      <div v-if="isLogin === false">
        <IndexHeader></IndexHeader>
      </div>
    </el-header>
    <el-main style="padding: 0; margin: 0">
      <ContestMenu></ContestMenu>
      <router-view/>
    </el-main>
    <el-footer class="el-footer">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from '@/components/index/IndexHeader'
import CommonHeader from '@/components/common/CommonHeader'
import CommonFooter from '@/components/common/CommonFooter'
import ContestMenu from '@/components/index/contest/ContestMenu'
export default {
  name: 'ContestList',
  components: {ContestMenu, CommonHeader, CommonFooter, IndexHeader},
  data: function () {
    return {
      isLogin: false
    }
  },
  mounted: function () {
    if (this.$store.getters.name) {
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  .el-header {
    padding: 0;
    margin: 0;
  }
  .el-footer {
    padding: 0;
    margin: 10px 0 0 0;
  }
</style>
