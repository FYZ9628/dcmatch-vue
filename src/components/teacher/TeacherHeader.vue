<template>
  <el-card class="common-header">
    <a href="http://localhost:8081/index">
      <img src="../../assets/logoIcon.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px; font-weight: bold; position:absolute;left: 100px">学科竞赛赛程管理信息系统</span>
    <el-dropdown style="float: right; padding-right: 10px">
      <!--      show-timeout="10" hide-timeout="100"-->
      <div class="el-dropdown-link" >
        <span>
          {{$store.getters.name}}
        </span>
        <span style="float: right; margin-left: 10px">
          <!--          <el-avatar :src="studentData.idImg"></el-avatar>-->
          <img :src="teacherData.idImg"
               style="width: 40px; height: 40px; border-radius:50%"/>
        </span>

        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item divided @click.native="identification">个人认证</el-dropdown-item>
          <el-dropdown-item divided @click.native="myContest">我的大赛</el-dropdown-item>
          <el-dropdown-item divided @click.native="prizeWinning">获奖查询</el-dropdown-item>
<!--          <el-dropdown-item divided @click.native="myOrder">我的订单</el-dropdown-item>-->
<!--          <el-dropdown-item divided @click.native="myNews">我的消息</el-dropdown-item>-->
<!--          <el-dropdown-item divided @click.native="myAddress">我的地址</el-dropdown-item>-->
          <el-dropdown-item divided @click.native="accountSetting">账号设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>

        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </el-dropdown>
  </el-card>
</template>

<script>
export default {
  name: 'TeacherHeader',
  data: function () {
    return {
      // username: ''
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
    },
    identification: function () {
      this.$router.push({
        path: '/teacher/authentication'
      })
    },
    myContest: function () {
      this.$router.push({
        path: '/teacher/myContest'
      })
    },
    prizeWinning: function () {
      this.$router.push({
        path: '/teacher/prizeWinning'
      })
    },
    myOrder: function () {
      this.$router.push({
        path: '/teacher/myOrder'
      })
    },
    myNews: function () {
      this.$router.push({
        path: '/teacher/myNews'
      })
    },
    myAddress: function () {
      this.$router.push({
        path: '/teacher/myAddress'
      })
    },
    accountSetting: function () {
      this.$router.push({
        path: '/teacher/accountSetting'
      })
    },
    // 退出登录
    logOut: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        _this.$store.commit('logout')
        // _this.$router.push('/login');
        window.open(
          this.$router.resolve({
            path: '/index'
          }).href, '_self'
          // 打开新窗口：_blank
          // 在本地窗口打开：_self
        )
        // // 下面这种方法不能实现在本页面退出登录后实时刷新
        // this.$router.push({
        //   path: '/index'
        // })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
  .common-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    background: #fff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    height: 70px;
    text-size:20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
