<template>
  <div>
    <div style="width: 800px; max-height: 630px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
      <el-page-header @back="goBack" content="竞赛获奖名单管理" style="padding: 20px 20px; background-color: #ffffff">
      </el-page-header>
      <div style="padding: 0 0 10px 10px; font-weight: bolder">{{contestDetail.contestTitle}}</div>
      <div style="padding: 0 0 10px 10px; font-weight: bolder">所有名单</div>
      <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
      <el-table
        :data="teamContestList.filter(data => !search || data.student.user.name.toLowerCase().includes(search.toLowerCase())
          || data.student.user.account.toLowerCase().includes(search.toLowerCase())
          || data.student.user.phone.toLowerCase().includes(search.toLowerCase())
          || data.student.email.toLowerCase().includes(search.toLowerCase())
          || data.student.school.toLowerCase().includes(search.toLowerCase())
          || data.student.academy.toLowerCase().includes(search.toLowerCase())
          || data.student.major.toLowerCase().includes(search.toLowerCase())
          || data.teamName.toLowerCase().includes(search.toLowerCase())
          || data.teacherName.toLowerCase().includes(search.toLowerCase())
          || data.ticketNumber.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="430">
        <el-table-column
          fixed
          prop="score"
          label="获奖"
          width="120"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.score >= 95">特等奖</span>
            <span v-else-if="scope.row.score >= 90">一等奖</span>
            <span v-else-if="scope.row.score >= 80">二等奖</span>
            <span v-else-if="scope.row.score >= 70">三等奖</span>
            <span v-else>优秀奖</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="score"
          label="分数"
          width="50"
          align="center">
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
          prop="teamName"
          label="所在团队"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teacherName"
          label="导师"
          width="80"
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
          prop="ticketNumber"
          label="准考证号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100"
          align="center">
          <template slot-scope="scope">
            <!--          <span v-if="scope.row.state === 1">已报名</span>-->
            <!--          <span v-if="scope.row.state === 2">已下载准考证</span>-->
            <!--          <span v-if="scope.row.state === 3">已结束比赛</span>-->
            <span>已结束比赛</span>
          </template>
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
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteTeamContest(scope.$index, scope.row)"
              type="danger"
              size="mini">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 80px">
        <el-button
          @click="allDelete"
          type="danger"
          size="small"
          style="display: block; float: right; margin: 20px 20px 0 0">
          全部删除
        </el-button>
      </div>
    </div>
    <div style="width: 800px; max-height: 600px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">团队管理</div>
      <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
      <el-table
        :data="teamDataList.filter(data => !searchTeam || data.name.toLowerCase().includes(searchTeam.toLowerCase())
        || data.teacher.toLowerCase().includes(searchTeam.toLowerCase())
        || data.prize.toLowerCase().includes(searchTeam.toLowerCase()))"
        style="width: 100%"
        max-height="430">
        <el-table-column
          fixed
          prop="prize"
          label="获奖"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="score"
          label="分数"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="团队名称"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="number"
          label="人数"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="upperLimit"
          label="人数上限"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="指导老师"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="130"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ticketNumber"
          label="准考证号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchTeam"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteTeam(scope.$index, scope.row)"
              type="danger"
              size="mini">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 80px">
        <el-button
          @click="allDelete"
          type="danger"
          size="small"
          style="display: block; float: right; margin: 20px 20px 0 0">
          全部删除
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizerPrizeWinningTeamList',
  data () {
    return {
      teamContestList: [],
      teamDataList: [],
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
      search: '',
      searchTeam: ''
    }
  },
  mounted: function () {
    // 接收contestDetail数据
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetail = JSON.parse(contestDetailJson)
    this.loadTeamContest()
  },
  methods: {
    loadTeamContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeamContestByContestDetailId', {
            keywords: this.contestDetail.id
          })
          .then(successResponse => {
            this.teamContestList = successResponse.data
            let tempTeamData = {}
            // 得到的结果是类似
            // {软信学院: 2, 信工学院: 1, 文学院: 1}
            for (let i = 0; i < this.teamContestList.length; i++) {
              let item = this.teamContestList[i].teamName
              tempTeamData[item] = (tempTeamData[item] + 1) || 1
            }
            // 从对象中分离放到 list 中
            this.teamDataList = []
            for (let i in tempTeamData) {
              this.teamDataList.push({
                name: i,
                number: tempTeamData[i],
                upperLimit: this.contestDetail.upperLimit,
                state: this.contestDetail.state,
                ticketNumber: '',
                teacher: '',
                score: 0,
                prize: ''
              })
            }
            for (let i = 0; i < this.teamDataList.length; i++) {
              for (let j = 0; j < this.teamContestList.length; j++) {
                if (this.teamDataList[i].name === this.teamContestList[j].teamName) {
                  this.teamDataList[i].ticketNumber = this.teamContestList[j].ticketNumber
                  this.teamDataList[i].teacher = this.teamContestList[j].teacherName
                  this.teamDataList[i].score = this.teamContestList[j].score
                  if (this.teamContestList[j].score >= 95) {
                    this.teamDataList[i].prize = '特等奖'
                  } else if (this.teamContestList[j].score >= 90) {
                    this.teamDataList[i].prize = '一等奖'
                  } else if (this.teamContestList[j].score >= 80) {
                    this.teamDataList[i].prize = '二等奖'
                  } else if (this.teamContestList[j].score >= 70) {
                    this.teamDataList[i].prize = '三等奖'
                  } else {
                    this.teamDataList[i].prize = '优秀奖'
                  }
                }
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
    deleteTeamContest (index, row) {
      this.$axios
        .post('/deleteTeamContest', {
          // 主要是 id ，传 id 过去就行了
          id: row.id,
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
        })
        .then(successResponse => {
          this.$message({
            message: '成功删除了一名学生',
            type: 'success'
          })
          for (let i = 0; i < this.teamContestList.length; i++) {
            if (row.id === this.teamContestList[i].id) {
              // 在删除该行数据的同时，数组的长度也减 1
              this.teamContestList.splice(i, 1)
            }
          }
          this.loadTeamContest()
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    allDelete () {
      this.loadTeamContest()
      if (this.teamContestList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.teamContestList.length; i++) {
              this.$axios
                .post('/deleteTeamContest', {
                  // 主要是 id ，传 id 过去就行了
                  id: this.teamContestList[i].id,
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
                })
                .then(successResponse => {
                })
                .catch(failResponse => {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  })
                })
            }
            this.$message({
              message: '成功删除了' + this.teamContestList.length + '条报名信息',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/organizer/contestTeamSignUp'
                }).href, '_self'
                // 打开新窗口：_blank
                // 在本地窗口打开：_self
              )
            }, 1000)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message({
          message: '当前无数据',
          type: 'warning'
        })
      }
    },
    deleteTeam (index, row) {
      for (let i = 0; i < this.teamContestList.length; i++) {
        if (this.teamContestList[i].teamName === row.name) {
          this.$axios
            .post('/deleteTeamContest', {
              // 主要是 id ，传 id 过去就行了
              id: this.teamContestList[i].id,
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
            })
            .then(successResponse => {
              // this.teamContestList.splice(i, 1)
              // console.log('删除测试')
              // console.log(i)
              this.loadTeamContest()
            })
            .catch(failResponse => {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            })
        }
      }
      for (let i = 0; i < this.teamDataList.length; i++) {
        if (row.name === this.teamDataList[i].name) {
          this.teamDataList.splice(i, 1)
        }
      }
      this.$message({
        message: '成功删除了 ' + row.name + ' 团队 ' + row.number + ' 名学生',
        type: 'success'
      })
    },
    goBack () {
      this.$router.push({
        path: '/organizer/prizeWinningDetails'
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
