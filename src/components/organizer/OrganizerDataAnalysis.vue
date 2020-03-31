<template>
  <div style="min-height: 600px; width: 800px; background-color: #ffffff">
    <div style="font-size: 16px; font-weight: bolder; padding: 20px 0 20px 30px">数据分析</div>
    <el-menu
      class="nav-menu"
      router
      :default-active="$route.path"
      mode="horizontal"
      text-color="#000"
      active-text-color="#409eff"
      style="text-align: center; font-size: 16px; font-weight: bolder; margin: 0 30px"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name"
                    style="width: 370px;">
        {{ item.navItem }}
      </el-menu-item>

      <!--    <span style="color:#fff;position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">作业批改系统</span>-->
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'OrganizerDataAnalysis',
  data: function () {
    return {
      navList: [
        {name: '/organizer/dataAnalysis/signUp', navItem: '报名数据'},
        {name: '/organizer/dataAnalysis/contestDetails', navItem: '竞赛数据'}
      ]
    }
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
