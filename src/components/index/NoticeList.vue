<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader></IndexHeader>
    </el-header>
    <el-main>
      <h3>main</h3>
      <h3>main</h3>
      <h3>main</h3>
      <h3>main</h3>
      <h3>main</h3>
    </el-main>
    <el-footer class="el-footer">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from '@/components/index/IndexHeader'
import CommonFooter from '@/components/common/CommonFooter'
export default {
  name: 'NoticeList',
  components: {IndexHeader, CommonFooter}
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
    margin: 100px 0 0 0;
  }
</style>
