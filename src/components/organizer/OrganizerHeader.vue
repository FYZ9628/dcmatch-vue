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
          <img :src="organizerData.idImg"
               style="width: 40px; height: 40px; border-radius:50%"/>
        </span>

        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item divided @click.native="identification">个人认证</el-dropdown-item>
          <el-dropdown-item divided @click.native="myNotice">我的通知</el-dropdown-item>
          <el-dropdown-item divided @click.native="myContest">我的大赛</el-dropdown-item>
          <el-dropdown-item divided @click.native="inputScore">录入成绩</el-dropdown-item>
          <el-dropdown-item divided @click.native="prizeWinning">获奖查询</el-dropdown-item>
          <el-dropdown-item divided @click.native="dataAnalysis">数据分析</el-dropdown-item>
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
  name: 'OrganizerHeader',
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
    },
    identification: function () {
      this.$router.push({
        path: '/organizer/authentication'
      })
    },
    myNotice: function () {
      this.$router.push({
        path: '/organizer/myNotice'
      })
    },
    myContest: function () {
      this.$router.push({
        path: '/organizer/myContest'
      })
    },
    inputScore: function () {
      this.$router.push({
        path: '/organizer/inputScore'
      })
    },
    prizeWinning: function () {
      this.$router.push({
        path: '/organizer/prizeWinning'
      })
    },
    dataAnalysis: function () {
      this.$router.push({
        path: '/organizer/dataAnalysis'
      })
    },
    myOrder: function () {
      this.$router.push({
        path: '/organizer/myOrder'
      })
    },
    myNews: function () {
      this.$router.push({
        path: '/organizer/myNews'
      })
    },
    myAddress: function () {
      this.$router.push({
        path: '/organizer/myAddress'
      })
    },
    accountSetting: function () {
      this.$router.push({
        path: '/organizer/accountSetting'
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
