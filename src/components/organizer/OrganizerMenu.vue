<template>
  <div style="height: 620px; width: 240px; background-color: white">
    <div>
      <!--      <el-avatar :src="studentData.idImg" :fit="fill"-->
      <!--                 style="height: 100px; width: 100px; margin-top: 40px">-->
      <!--      </el-avatar>-->
      <img :src="organizerData.idImg"
           style="height: 100px; width: 100px; margin-top: 40px; border-radius:50%"/>
      <h3>{{organizerData.user.name}}</h3>
    </div>
    <el-menu
      :default-active="this.$route.path"
      router>
      <el-menu-item index="/organizer/authentication">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
      <el-menu-item index="/organizer/myNotice">
        <i class="el-icon-bell"></i>
        <span slot="title">我的通知</span>
      </el-menu-item>
      <el-menu-item index="/organizer/myContest">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的大赛</span>
      </el-menu-item>
      <el-menu-item index="/organizer/inputScore">
        <i class="el-icon-edit"></i>
        <span slot="title">录入成绩</span>
      </el-menu-item>
      <el-menu-item index="/organizer/prizeWinning">
        <i class="el-icon-trophy"></i>
        <span slot="title">获奖查询</span>
      </el-menu-item>
      <el-menu-item index="/organizer/dataAnalysis/signUp">
        <i class="el-icon-zoom-in"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
<!--      <el-menu-item index="/organizer/myOrder">-->
<!--        <i class="el-icon-s-order"></i>-->
<!--        <span slot="title">我的订单</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/organizer/myNews">-->
<!--        <i class="el-icon-chat-square"></i>-->
<!--        <span slot="title">我的消息</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/organizer/myAddress">-->
<!--        <i class="el-icon-location-outline"></i>-->
<!--        <span slot="title">我的地址</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/organizer/accountSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">账号设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'OrganizerMenu',
  data: function () {
    return {
      organizerData: {
        id: '',
        user: {
          id: '',
          account: '',
          phone: '',
          password: '',
          name: '',
          type: ''
        },
        email: '',
        school: '',
        establishDate: '',
        schoolType: '',
        schoolRunningType: '',
        idImg: ''
      }
    }
  },
  mounted: function () {
    this.loadOrganizer()
  },
  methods: {
    loadOrganizer () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchOrganizerByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.organizerData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
