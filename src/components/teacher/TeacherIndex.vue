<template>
  <el-container>
    <el-header class="el-header">
      <TeacherHeader></TeacherHeader>
<!--      <CommonHeader></CommonHeader>-->
    </el-header>
    <el-container>
      <el-aside class="el-aside" style="width: 250px;">
        <TeacherMenu></TeacherMenu>
      </el-aside>
      <el-main class="el-main" style="background-color: #f6f6f6">
<!--        <h3>main内容</h3>-->
        <router-view/>
      </el-main>
    </el-container>
    <el-footer style="margin: 100px 0 0 0; padding: 0">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import TeacherHeader from '@/components/teacher/TeacherHeader'
import TeacherMenu from '@/components/teacher/TeacherMenu'
import CommonFooter from '@/components/common/CommonFooter'
import CommonHeader from '@/components/common/CommonHeader'
export default {
  name: 'TeacherIndex',
  components: {CommonHeader, CommonFooter, TeacherMenu, TeacherHeader}
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
    width: 800px;
    height: 600px;
    margin-left: 100px;
    margin-top: 100px;
    text-align: center;
  }
  .el-main{
    height: 100%;
    margin-top: 100px;
    margin-right: 100px;
    margin-left: 20px;
    padding: 0;
    text-align: left;
  }
</style>
