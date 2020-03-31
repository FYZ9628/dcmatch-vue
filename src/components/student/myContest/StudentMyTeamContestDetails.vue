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
    <div style="height: 370px; background-color: #ffffff; padding: 30px 30px">
      <el-row>
        <span style="font-weight: bolder">报名信息</span>
        <el-button
          @click="deleteTeamContest"
          type="danger"
          style="display: block; float: right;">
          取消报名
        </el-button>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 30px">
        <span style="display: block; float: left; color: #778a99">报名科目：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.contestDetail.contestTitle}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">&emsp;举办方：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.contestDetail.organizer.school}}{{teamContestDate.contestDetail.organizer.user.name}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛日期：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.contestDetail.holdDate}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.contestDetail.holdStartTime}}-{{teamContestDate.contestDetail.holdEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">团队名称：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.teamName}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">团队人数：</span>
        <span style="display: block; float: left; margin-left: 30px">
          {{myTeamContestDateList.length}}人（ 上限为 {{teamContestDate.contestDetail.upperLimit}} 人）
        </span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">指导老师：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.teacherName}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">准考证号：</span>
        <span style="display: block; float: left; margin-left: 30px">{{teamContestDate.ticketNumber}}</span>
      </el-row>
    </div>
    <div style="max-height: 500px; background-color: #ffffff; padding: 30px 30px">
      <el-row>
        <span style="font-weight: bolder">队员信息</span>
      </el-row>
      <el-table
        :data="myTeamContestDateList.filter(data => !search || data.student.user.name.toLowerCase().includes(search.toLowerCase())
          || data.student.user.account.toLowerCase().includes(search.toLowerCase())
          || data.student.user.phone.toLowerCase().includes(search.toLowerCase())
          || data.student.email.toLowerCase().includes(search.toLowerCase())
          || data.student.school.toLowerCase().includes(search.toLowerCase())
          || data.student.academy.toLowerCase().includes(search.toLowerCase())
          || data.student.major.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="400">
        <el-table-column
          fixed
          label="学生证"
          width="120"
          align="center">
          <template slot-scope="scope">
            <img style="width: 120px; height: 80px" :src="scope.row.student.idImg"/>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="student.user.name"
          label="姓名"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.user.account"
          label="学号"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.user.phone"
          label="电话"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.sex"
          label="性别"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.email"
          label="邮箱"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.school"
          label="学校"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.academy"
          label="学院"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.major"
          label="专业"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="student.education"
          label="学历"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100"
          align="center">
          <!--        <template slot-scope="scope">-->
          <!--          <span v-if="scope.row.state === 1">已报名</span>-->
          <!--          <span v-if="scope.row.state === 2">已下载准考证</span>-->
          <!--          <span v-if="scope.row.state === 3">已结束比赛</span>-->
          <!--        </template>-->
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentMyTeamContestDetails',
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
        teacherAccount: '',
        teacherName: '',
        state: '',
        ticketNumber: '',
        score: '',
        teamName: '',
        remarks: ''
      },
      activeState: 1,
      gotoContestDetailState: {
        state: ''
      },
      myTeamContestDateList: [],
      search: ''
    }
  },
  mounted: function () {
    // 接收返回判断值
    let gotoContestDetailStateJson = sessionStorage.getItem('gotoContestDetailStateJson')
    this.gotoContestDetailState = JSON.parse(gotoContestDetailStateJson)
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
          path: '/student/teamContestList'
          // name: 'noticeDetails/'
          // query: {
          //   data: contestDetailJson
          // // 以加问号接续的方式显示内容
          // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
          // }
        })
      }
    },
    deleteTeamContest: function () {
      if (this.teamContestDate.remarks === '队长') {
        this.$confirm('确认取消报名？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            this.$axios
              .post('/deleteTeam', {
                // 后端接收的是整个 contest 对象，但是其实只用到了 id
                // 所以只要传 id 到后端就行了
                keywords: this.teamContestDate.teamName
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
                        path: '/student/teamContestList'
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
      } else {
        this.$message({
          message: '只有导师或者队长才可以取消报名',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
