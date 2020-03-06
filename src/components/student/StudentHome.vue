<template>
  <el-container>
    <el-header class="el-header">
      <StudentHeader></StudentHeader>
    </el-header>
    <el-container style="margin: 0 auto">
      <el-aside class="el-aside" style="width: 250px;">
        <StudentMenu></StudentMenu>
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
import StudentMenu from '@/components/student/StudentMenu'
import CommonFooter from '@/components/common/CommonFooter'
import CommonHeader from '@/components/common/CommonHeader'
import StudentHeader from '@/components/student/StudentHeader'
export default {
  name: 'StudentHome',
  components: {StudentHeader, CommonHeader, CommonFooter, StudentMenu}
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
