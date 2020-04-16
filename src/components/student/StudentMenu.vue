<template>
  <div style="height: 620px; width: 240px; background-color: white">
    <div>
<!--      <el-avatar :src="studentData.idImg" :fit="fill"-->
<!--                 style="height: 100px; width: 100px; margin-top: 40px">-->
<!--      </el-avatar>-->
      <img :src="studentData.idImg"
           style="height: 100px; width: 100px; margin-top: 40px; border-radius:50%"/>
      <h3>{{studentData.user.name}}</h3>
    </div>
    <el-menu
      :default-active="this.$route.path"
      router>
      <el-menu-item index="/student/authentication">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人认证</span>
      </el-menu-item>
      <el-menu-item index="/student/myContest">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的大赛</span>
      </el-menu-item>
      <el-menu-item index="/student/prizeWinning/contestList">
        <i class="el-icon-trophy"></i>
        <span slot="title">获奖查询</span>
      </el-menu-item>
<!--      <el-menu-item index="/student/myOrder">-->
<!--        <i class="el-icon-s-order"></i>-->
<!--        <span slot="title">我的订单</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/student/myNews">-->
<!--        <i class="el-icon-chat-square"></i>-->
<!--        <span slot="title">我的消息</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/student/myAddress">-->
<!--        <i class="el-icon-location-outline"></i>-->
<!--        <span slot="title">我的地址</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/student/accountSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">账号设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'StudentMenu',
  data: function () {
    return {
      studentData: {
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
        admissionDate: '',
        graduationDate: '',
        academy: '',
        major: '',
        education: '',
        idImg: ''
      }
    }
  },
  mounted: function () {
    this.loadStudent()
    // var path = this.$route.matched[1].path
    // console.log('测试路由')
    // console.log(path)
    // this.$router.push(path)
  },
  methods: {
    loadStudent () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchStudentByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.studentData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询学生失败',
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
