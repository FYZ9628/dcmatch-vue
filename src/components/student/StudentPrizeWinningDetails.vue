<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 100px; background-color: #ffffff; padding: 20px 30px; margin-bottom: 10px">
      <span style="font-weight: bolder">{{contestDate.contestDetail.contestTitle}}</span>
      <el-steps :active="activeState" finish-status="success" simple style="margin-top: 20px">
        <el-step title="报名"></el-step>
        <el-step title="下载准考证" ></el-step>
        <el-step title="查看成绩" ></el-step>
      </el-steps>
    </div>
    <div style="height: 270px; background-color: #ffffff; padding: 30px 30px">
      <span style="font-weight: bolder">比赛结果</span>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 30px">
        <span style="display: block; float: left; color: #778a99">姓&emsp;&emsp;名：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.student.user.name}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">学&emsp;&emsp;号：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.student.user.account}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛科目：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.contestTitle}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛奖项：</span>
        <span style="display: block; float: left; margin-left: 30px">{{awardLevel}}</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinningDetails',
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
      awardLevel: ''
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
    if (this.contestDate) {
      if (this.contestDate.score >= 95) {
        this.awardLevel = '特等奖'
      } else if (this.contestDate.score >= 90) {
        this.awardLevel = '一等奖'
      } else if (this.contestDate.score >= 80) {
        this.awardLevel = '二等奖'
      } else if (this.contestDate.score >= 70) {
        this.awardLevel = '三等奖'
      } else {
        this.awardLevel = '优秀奖'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/student/prizeWinning'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    }
  }
}
</script>

<style scoped>

</style>
