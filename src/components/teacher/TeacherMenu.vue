<template>
  <div style="height: 620px; width: 240px; background-color: white">
    <div class="title">
      <a href="#img">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="height: 100px; width: 100px; margin-top: 40px"></el-avatar>
      </a>
      <h3>名 称</h3>
    </div>
    <el-menu
      default-active="this.$route.path"
      router=true>
      <el-menu-item index="/teacher/authentication">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myContest">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的大赛</span>
      </el-menu-item>
      <el-menu-item index="/teacher/prizeWinning">
        <i class="el-icon-star-off"></i>
        <span slot="title">获奖查询</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myOrder">
        <i class="el-icon-s-order"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myNews">
        <i class="el-icon-chat-square"></i>
        <span slot="title">我的消息</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myAddress">
        <i class="el-icon-location-outline"></i>
        <span slot="title">我的地址</span>
      </el-menu-item>
      <el-menu-item index="/teacher/accountSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">账号设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'TeacherMenu'
}
</script>

<style scoped>

</style>
