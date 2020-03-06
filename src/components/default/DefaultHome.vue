<template>
  <el-container>
    <el-header class="el-header">
      <!--      <TeacherHeader></TeacherHeader>-->
      <DefaultHeader></DefaultHeader>
      <!--      <CommonHeader></CommonHeader>-->
    </el-header>
    <el-container style="margin: 0 auto">
      <el-aside class="el-aside" style="width: 250px;">
        <DefaultMenu></DefaultMenu>
      </el-aside>
      <el-main class="el-main" style="background-color: #f6f6f6">
        <!--        <h3>main内容</h3>-->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="margin: 100px 0 0 0; padding: 0">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
  import CommonFooter from '@/components/common/CommonFooter'
  import DefaultMenu from '@/components/default/DefaultMenu'
  import DefaultHeader from '@/components/default/DefaultHeader'
  export default {
    name: 'DefaultIndex',
    components: {DefaultHeader, DefaultMenu, CommonFooter}
  }
</script>

<style scoped>
  .el-header{
    /*background-color: #475669;*/
    margin: 0;
    padding: 0;
  }
  .el-aside{
    /*background-color: #1a1a1a;*/
    height: 620px;
    margin-top: 100px;
    text-align: center;
  }
  .el-main{
    height: 100%;
    margin-top: 100px;
    margin-left: 20px;
    padding: 0;
    text-align: left;
  }
</style>
