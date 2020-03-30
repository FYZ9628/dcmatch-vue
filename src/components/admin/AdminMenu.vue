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
        <el-menu-item index="/admin/home/userData">用户数据</el-menu-item>
        <el-menu-item index="/admin/home/contestData">竞赛数据</el-menu-item>
        <el-menu-item index="/admin/home/signUpData">报名数据</el-menu-item>
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
        <el-menu-item index="/admin/authentication/organizerAuthentic">院校认证</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/admin/user">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/user/studentUser">学生管理</el-menu-item>
        <el-menu-item index="/admin/user/teacherUser">教师管理</el-menu-item>
        <el-menu-item index="/admin/user/organizerUser">院校管理</el-menu-item>
        <el-menu-item index="/admin/user/registerUser">未认证用户管理</el-menu-item>
        <el-menu-item index="/admin/user/adminUser">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/admin/contest">
      <template slot="title">
        <i class="el-icon-s-flag"></i>
        <span>竞赛管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/contest/individualContest">个人竞赛</el-menu-item>
        <el-menu-item index="/admin/contest/teamContest">团队竞赛</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/admin/signUp">
      <template slot="title">
        <i class="el-icon-s-management"></i>
        <span>报名管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/signUp/individualSignUp">个人竞赛</el-menu-item>
        <el-menu-item index="/admin/signUp/teamSignUp">团队竞赛</el-menu-item>
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
