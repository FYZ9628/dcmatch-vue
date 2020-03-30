<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 100px; background-color: #ffffff; padding: 20px 30px; margin-bottom: 10px">
      <span style="font-weight: bolder">{{teamContestDate.contestDetail.contestTitle}}</span>
      <el-steps :active="activeState" finish-status="success" simple style="margin-top: 20px">
        <el-step title="报名"></el-step>
        <el-step title="下载准考证" ></el-step>
        <el-step title="查看成绩" ></el-step>
      </el-steps>
    </div>
    <div style="height: 300px; background-color: #ffffff; padding: 30px 30px">
      <span style="font-weight: bolder">比赛结果</span>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 30px">
        <span style="display: block; float: left; color: #778a99">团队名称：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.teamName}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">指导老师：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.teacherName}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛科目：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.contestDetail.contestTitle}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛奖项：</span>
        <span style="display: block; float: left; margin-left: 30px">{{awardLevel}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99; margin-right: 30px">团队成员：</span>
        <div style=" margin-left: 110px">
          <div v-for="(item,index) in myTeamContestDateList" :key="index"
                style="display: block; float: left;">
            {{item.student.user.name}}
            <span v-if="item.remarks === '队长'">（队长）</span>
            <span v-if="myTeamContestDateList.length-1 !== index">、</span>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinningTeamDetails',
  data: function () {
    return {
      teamContestDate: {
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
      awardLevel: '',
      myTeamContestDateList: []
    }
  },
  mounted: function () {
    // 接收contest数据
    let teamContestJson = sessionStorage.getItem('teamContestJson')
    this.teamContestDate = JSON.parse(teamContestJson)
    if (this.teamContestDate) {
      // state 说明
      // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
      if (this.teamContestDate.state === '已报名') {
        this.activeState = 1
      }
      if (this.teamContestDate.state === '下载准考证') {
        this.activeState = 2
      }
      if (this.teamContestDate.state === '查看成绩') {
        this.activeState = 3
      }
    }
    if (this.teamContestDate) {
      if (this.teamContestDate.score >= 95) {
        this.awardLevel = '特等奖'
      } else if (this.teamContestDate.score >= 90) {
        this.awardLevel = '一等奖'
      } else if (this.teamContestDate.score >= 80) {
        this.awardLevel = '二等奖'
      } else if (this.teamContestDate.score >= 70) {
        this.awardLevel = '三等奖'
      } else {
        this.awardLevel = '优秀奖'
      }
    }
    this.loadMyTeamContest()
  },
  methods: {
    loadMyTeamContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeamContestByTeamName', {
            keywords: this.teamContestDate.teamName
          })
          .then(successResponse => {
            this.myTeamContestDateList = successResponse.data
            // for (let i = 0; i < successResponse.data.length; i++) {
            //   if (successResponse.data[i].state !== '查看成绩') {
            //     this.myTeamContestDateList.push(successResponse.data[i])
            //   }
            // }
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
        path: '/student/prizeWinning/teamContestList'
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
