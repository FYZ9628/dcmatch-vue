<template>
  <el-container>
    <el-header class="el-header">
      <OrganizerHeader></OrganizerHeader>
    </el-header>
    <el-container style="margin: 0 auto">
      <el-aside class="el-aside" style="width: 250px;">
        <OrganizerMenu></OrganizerMenu>
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
import OrganizerMenu from '@/components/organizer/OrganizerMenu'
import CommonFooter from '@/components/common/CommonFooter'
import CommonHeader from '@/components/common/CommonHeader'
import OrganizerHeader from '@/components/organizer/OrganizerHeader'
export default {
  name: 'OrganizerIndex',
  components: {OrganizerHeader, CommonHeader, CommonFooter, OrganizerMenu}
}
</script>

<style scoped>
  .el-header{
    /*background-color: #475669;*/
    margin: 0;
    padding: 0;
    min-width: 1070px;
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
