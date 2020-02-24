<template>
  <div style="height: 600px; width: 240px; background-color: white">
    <div class="title">
      <a href="#img">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="height: 100px; width: 100px; margin-top: 40px"></el-avatar>
      </a>
      <h3>名 称</h3>
    </div>
    <el-menu
      default-active="this.$route.path"
      router=true>
      <el-menu-item index="/student/test1">
        <i class="el-icon-menu"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
      <el-menu-item index="/student/test2">
        <i class="el-icon-menu"></i>
        <span slot="title">我的大赛</span>
      </el-menu-item>
      <el-menu-item index="/student/test3">
        <i class="el-icon-document"></i>
        <span slot="title">获奖查询</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">我的消息</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-document"></i>
        <span slot="title">我的地址</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">账号设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'DefaultMenu'
}
</script>

<style scoped>

</style>
