<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <!--      已登录就显示 CommonHeader 没有登录就显示 IndexHeader-->
      <div v-if="isLogin === true">
        <CommonHeader style="width: 100%"></CommonHeader>
      </div>
      <div v-if="isLogin === false">
        <IndexHeader></IndexHeader>
      </div>
    </el-header>
    <el-header class="el-banner" style="height: 350px">
      <IndexBanner></IndexBanner>
    </el-header>
    <el-container style=" margin: 100px 50px 0 50px">
      <el-aside  class="el-aside" style="width: 640px">
        <IndexAside></IndexAside>
      </el-aside>
      <el-main class="el-main" style="width: 500px;  overflow-x: hidden;">
        <IndexMain></IndexMain>
      </el-main>
    </el-container>
    <el-footer class="el-footer">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from './index/IndexHeader'
import CommonHeader from '@/components/common/CommonHeader'
import CommonFooter from '@/components/common/CommonFooter'
import IndexBanner from '@/components/index/IndexBanner'
import IndexBody from '@/components/index/IndexBody'
import IndexAside from '@/components/index/IndexAside'
import IndexMain from '@/components/index/IndexMain'
export default {
  name: 'AppIndex',
  components: {IndexMain, IndexAside, IndexBody, IndexBanner, CommonFooter, CommonHeader, IndexHeader},
  data: function () {
    return {
      isLogin: false
    }
  },
  mounted: function () {
    if (this.$store.getters.name) {
      this.isLogin = true
    }
  },
  methods: {
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
  .el-banner {
    height: 250px;
    padding: 0;
  }
  .el-aside {
    height: 350px;
    text-align: center;
    float: left;
    /*background-color: #409EFF;*/
    border:10px solid #f4f4f4;
  }
  .el-main {
    height: 350px;
    float: right;
    text-align: center;
    margin-left: 30px;
    border:10px solid #f4f4f4
  }
  .el-footer {
    padding: 0;
    margin: 100px 0 0 0;
  }
</style>
