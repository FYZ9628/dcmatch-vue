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
      <el-row>
        <span style="font-weight: bolder">比赛结果</span>
        <el-button
          @click="deleteContest"
          type="danger"
          style="display: block; float: right;">
          删  除
        </el-button>
      </el-row>
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
      // this.activeState = this.contestDate.state
      this.activeState = 3
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
    },
    deleteContest: function () {
      this.$confirm('确认删除？', '提示', {
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
            })
            .then(successResponse => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              // 一秒后刷新
              setTimeout(() => {
                window.open(
                  this.$router.resolve({
                    path: '/student/prizeWinning/contestList'
                  }).href, '_self'
                  // 打开新窗口：_blank
                  // 在本地窗口打开：_self
                )
              }, 1000)
            })
            .catch(failResponse => {
              this.$message({
                message: '删除失败',
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
    }
  }
}
</script>

<style scoped>

</style>
