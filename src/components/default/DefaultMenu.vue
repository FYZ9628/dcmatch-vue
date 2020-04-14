<template>
  <div style="height: 620px; width: 240px; background-color: white">
    <div class="title">
      <a href="#img">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="height: 100px; width: 100px; margin-top: 40px"></el-avatar>
      </a>
      <h3>名 称</h3>
    </div>
    <el-menu
      :default-active="this.$route.path"
      router>
      <el-menu-item index="/default/authentication/authenticationStudent">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
<!--      <el-menu-item index="/default/myNews">-->
<!--        <i class="el-icon-chat-square"></i>-->
<!--        <span slot="title">我的消息</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/default/accountSetting">
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
