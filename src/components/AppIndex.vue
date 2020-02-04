<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader style="width: 100%"></IndexHeader>
    </el-header>
    <el-header class="el-banner" style="height: 250px">
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
<!--    <div class="container">-->
<!--      <el-row style="height: 80px">-->
<!--        <IndexHeader style="position: absolute;width: 100%;"></IndexHeader>-->
<!--      </el-row>-->
<!--      <el-row style="height: 250px">-->
<!--        <IndexBanner style="position: absolute;width: 100%;"></IndexBanner>-->
<!--      </el-row>-->
<!--      <el-row style="height: 400px">-->
<!--        <IndexBody style="position: absolute;width: 100%;"></IndexBody>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <CommonFooter style="position: absolute;width: 100%;"></CommonFooter>-->
<!--      </el-row>-->
<!--      <router-view/>-->
<!--    </div>-->
</template>

<script>
import IndexHeader from './index/IndexHeader'
import CommonFooter from '@/components/common/CommonFooter'
import IndexBanner from '@/components/index/IndexBanner'
import IndexBody from '@/components/index/IndexBody'
import IndexAside from '@/components/index/IndexAside'
import IndexMain from '@/components/index/IndexMain'
export default {
  name: 'AppIndex',
  components: {IndexMain, IndexAside, IndexBody, IndexBanner, CommonFooter, IndexHeader},
  data: function () {
    return {
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
