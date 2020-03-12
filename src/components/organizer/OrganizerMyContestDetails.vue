<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 100px; background-color: #ffffff; padding: 20px 30px; margin-bottom: 10px">
      <el-row>
        <div style="display: block; float: left">
          <span style="font-weight: bolder">{{contestDate.contestDetail.contestTitle}}</span>
          <span>当前进行到的阶段</span>
        </div>
        <div style="display: block; float: right">
          <el-button type="primary" @click="backwardOne">上一阶段</el-button>
          <el-button type="primary" @click="forwardOne">下一阶段</el-button>
        </div>
      </el-row>
      <el-steps :active="activeState" finish-status="success" simple style="margin-top: 20px">
        <el-step title="报名"></el-step>
        <el-step title="下载准考证" ></el-step>
        <el-step title="查看成绩" ></el-step>
      </el-steps>
    </div>
    <div style="height: 270px; background-color: #ffffff; padding: 30px 30px">
      <span style="font-weight: bolder">报名信息</span>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 30px">
        <span style="display: block; float: left; color: #778a99">报名科目：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.contestTitle}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">&emsp;举办方：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.organizer.school}}{{contestDate.contestDetail.organizer.user.name}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛日期：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.holdDate}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.holdStartTime}}-{{contestDate.contestDetail.holdEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">准考证号：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.ticketNumber}}</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizerMyContestDetails',
  data: function () {
    return {
      contestDate: {
        id: '',
        contestDetail: {
          id: '',
          contestTitle: '',
          organizer: {
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
          },
          contestContent: '',
          signUpStartTime: '',
          signUpEndTime: '',
          publishTime: '',
          place: '',
          holdDate: '',
          holdStartTime: '',
          holdEndTime: '',
          type: ''
        },
        student: {
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
        },
        state: '',
        ticketNumber: '',
        score: ''
      },
      activeState: 1,
      gotoContestDetailState: {
        state: ''
      }
    }
  },
  mounted: function () {
    // 接收contest数据
    let contestJson = sessionStorage.getItem('contestJson')
    this.contestDate = JSON.parse(contestJson)
    if (this.contestDate) {
      // state 说明
      // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
      this.activeState = this.contestDate.state
    }
    this.loadContest()
  },
  methods: {
    loadContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestById', {
            keywords: this.contestDate.id
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            console.log('测试查询到的contest')
            console.log(successResponse.data)
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    updateContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/updateContest', {
            keywords: this.contestDate.id
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            console.log('测试查询到的contest')
            console.log(successResponse.data)
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    goBack () {
      this.$router.push({
        path: '/organizer/myContest'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    backwardOne () {
      if (this.activeState > 1) {
        this.activeState--
      }
    },
    forwardOne () {
      if (this.activeState < 3) {
        this.activeState++
      }
    }
  }
}
</script>

<style scoped>

</style>
