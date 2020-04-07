<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px 0 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 110px; background-color: #ffffff; padding: 0 30px 20px 30px; margin-bottom: 10px">
      <el-row>
        <span style="font-weight: bolder; display: block; float: left; margin-top: 20px">
          {{contestDate.contestDetail.contestTitle}}
        </span>
        <el-button type="primary" @click="downloadTicket" style="display: block; float: right">
          下载准考证
        </el-button>
      </el-row>
      <el-row>
        <el-steps :active="activeState" finish-status="success" simple style="margin-top: 20px">
          <el-step title="报名"></el-step>
          <el-step title="下载准考证" ></el-step>
          <el-step title="查看成绩" ></el-step>
        </el-steps>
      </el-row>
    </div>
    <div style="height: 270px; background-color: #ffffff; padding: 30px 30px">
      <el-row>
        <span style="font-weight: bolder">报名信息</span>
        <el-button
          @click="deleteContest"
          type="danger"
          style="display: block; float: right;">
          取消报名
        </el-button>
      </el-row>
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
    <div style="height: 270px; background-color: #ffffff; padding: 30px 30px">
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentMyContestDetails',
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
    // 接收返回判断值
    let gotoContestDetailStateJson = sessionStorage.getItem('gotoContestDetailStateJson')
    this.gotoContestDetailState = JSON.parse(gotoContestDetailStateJson)
    // 接收contest数据
    let contestJson = sessionStorage.getItem('contestJson')
    this.contestDate = JSON.parse(contestJson)
    if (this.contestDate) {
      // state 说明
      // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
      if (this.contestDate.state === '已报名') {
        this.activeState = 1
      }
      if (this.contestDate.state === '已下载准考证') {
        this.activeState = 2
      }
      if (this.contestDate.state === '查看成绩') {
        this.activeState = 3
      }
    }
  },
  methods: {
    loadMyContest (contestId) {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestById', {
            keywords: contestId
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            if (this.contestDate) {
              // state 说明
              // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
              if (this.contestDate.state === '已报名') {
                this.activeState = 1
              }
              if (this.contestDate.state === '已下载准考证') {
                this.activeState = 2
              }
              if (this.contestDate.state === '查看成绩') {
                this.activeState = 3
              }
            }
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
      if (this.gotoContestDetailState.state === 1) {
        this.$router.push({
          path: '/student/myContest'
          // name: 'noticeDetails/'
          // query: {
          //   data: contestDetailJson
          // // 以加问号接续的方式显示内容
          // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
          // }
        })
      }
      if (this.gotoContestDetailState.state === 2) {
        this.$router.push({
          path: '/student/contestList'
          // name: 'noticeDetails/'
          // query: {
          //   data: contestDetailJson
          // // 以加问号接续的方式显示内容
          // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
          // }
        })
      }
    },
    deleteContest: function () {
      this.$confirm('确认取消报名？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true })
        .then(_ => {
          this.$axios
            .post('/deleteContest', {
              // 后端接收的是整个 contest 对象，但是其实只用到了 id
              // 所以只要传 id 到后端就行了
              id: this.contestDate.id
              // contestDetail: this.contestDate.contestDetail,
              // student: this.contestDate.student,
              // state: this.contestDate.state,
              // ticketNumber: this.contestDate.ticketNumber,
              // score: this.contestDate.score
            })
            .then(successResponse => {
              this.$message({
                message: '成功取消报名',
                type: 'success'
              })
              if (this.gotoContestDetailState.state === 1) {
                // 一秒后刷新
                setTimeout(() => {
                  window.open(
                    this.$router.resolve({
                      path: '/student/myContest'
                    }).href, '_self'
                    // 打开新窗口：_blank
                    // 在本地窗口打开：_self
                  )
                }, 1000)
              }
              if (this.gotoContestDetailState.state === 2) {
                // 一秒后刷新
                setTimeout(() => {
                  window.open(
                    this.$router.resolve({
                      path: '/student/contestList'
                    }).href, '_self'
                    // 打开新窗口：_blank
                    // 在本地窗口打开：_self
                  )
                }, 1000)
              }
            })
            .catch(failResponse => {
              this.$message({
                message: '取消报名失败',
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    downloadTicket () {
      this.$axios
        .post('/updateContest', {
          // 后端接收的是整个 contest 对象，但是其实只用到了 id
          // 所以只要传 id 到后端就行了
          id: this.contestDate.id,
          contestDetail: this.contestDate.contestDetail,
          student: this.contestDate.student,
          state: '已下载准考证',
          ticketNumber: this.contestDate.ticketNumber,
          score: this.contestDate.score
        })
        .then(successResponse => {
          this.$message({
            message: '成功下载准考证',
            type: 'success'
          })
          this.loadMyContest(this.contestDate.id)
        })
        .catch(failResponse => {
          this.$message({
            message: '下载失败',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
