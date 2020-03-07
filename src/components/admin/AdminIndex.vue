<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;  padding: 0; margin: 0">
      <AdminHeader style="position: absolute;width: 100%"></AdminHeader>
    </el-header>
    <!--<el-row style="height: 100%;">-->
    <el-container>
      <el-aside style="height: 560px; width: 250px; background-color: #545c64">
        <AdminMenu></AdminMenu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import AdminHeader from './AdminHeader'
import StudentMenu from '@/components/student/StudentMenu'

export default {
  name: 'AdminIndex',
  components: {StudentMenu, AdminMenu, AdminHeader},
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    // this.$router.replace('/admin/dashboard')
  }
}
</script>

<style scoped>
  #admin-body {
  height: 95vh;
}
</style>
