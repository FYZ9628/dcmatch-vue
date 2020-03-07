<template>
  <el-menu
    default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-submenu index="/admin/home">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/home/test9">访客数据</el-menu-item>
        <el-menu-item index="/admin/home/test10">院校数据</el-menu-item>
        <el-menu-item index="/admin/home/test11">学生数据</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/admin/authentication">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>认证请求</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/authentication/studentAuthentic">学生认证</el-menu-item>
        <el-menu-item index="/admin/authentication/teacherAuthentic">教师认证</el-menu-item>
        <el-menu-item index="/admin/authentication/OrganizerAuthentic">院校认证</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/admin/user">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/user/test9">管理员信息</el-menu-item>
        <el-menu-item index="/admin/user/test10">院校信息</el-menu-item>
        <el-menu-item index="/admin/user/test11">学生信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/admin/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设 置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    text-align: left;
  }
</style>
