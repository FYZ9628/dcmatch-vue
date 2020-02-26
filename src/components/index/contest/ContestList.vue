<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader></IndexHeader>
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
import CommonFooter from '@/components/common/CommonFooter'
import ContestMenu from '@/components/index/contest/ContestMenu'
export default {
  name: 'ContestList',
  components: {ContestMenu, IndexHeader, CommonFooter}
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
