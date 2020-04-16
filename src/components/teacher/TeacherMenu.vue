<template>
  <div style="height: 620px; width: 240px; background-color: white">
    <div>
      <!--      <el-avatar :src="studentData.idImg" :fit="fill"-->
      <!--                 style="height: 100px; width: 100px; margin-top: 40px">-->
      <!--      </el-avatar>-->
      <img :src="teacherData.idImg"
           style="height: 100px; width: 100px; margin-top: 40px; border-radius:50%"/>
      <h3>{{teacherData.user.name}}</h3>
    </div>
    <el-menu
      :default-active="this.$route.path"
      router>
      <el-menu-item index="/teacher/authentication">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
      <el-menu-item index="/teacher/myContest">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的大赛</span>
      </el-menu-item>
      <el-menu-item index="/teacher/prizeWinning">
        <i class="el-icon-trophy"></i>
        <span slot="title">获奖查询</span>
      </el-menu-item>
<!--      <el-menu-item index="/teacher/myOrder">-->
<!--        <i class="el-icon-s-order"></i>-->
<!--        <span slot="title">我的订单</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/teacher/myNews">-->
<!--        <i class="el-icon-chat-square"></i>-->
<!--        <span slot="title">我的消息</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/teacher/myAddress">-->
<!--        <i class="el-icon-location-outline"></i>-->
<!--        <span slot="title">我的地址</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/teacher/accountSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">账号设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'TeacherMenu',
  data: function () {
    return {
      teacherData: {
        id: '',
        user: {
          id: '',
          account: '',
          phone: '',
          password: '',
          name: '',
          type: ''
        },
        sex: '',
        email: '',
        school: '',
        entryDate: '',
        academy: '',
        professionalTitle: '',
        education: '',
        idImg: ''
      }
    }
  },
  mounted: function () {
    this.loadTeacher()
    // var path = this.$route.matched[1].path
    // console.log('测试路由')
    // console.log(path)
    // this.$router.push(path)
  },
  methods: {
    loadTeacher () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeacherByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teacherData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询教师失败',
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
