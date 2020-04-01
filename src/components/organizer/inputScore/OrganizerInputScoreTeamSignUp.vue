<template>
  <div style="width: 800px; min-height: 600px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <el-page-header @back="goBack" content="竞赛报名名单管理" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="padding: 0 0 10px 10px; font-weight: bolder">{{contestDetail.contestTitle}}</div>
    <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="teamDataList.filter(data => !searchTeam || data.name.toLowerCase().includes(searchTeam.toLowerCase())
        || data.teacher.toLowerCase().includes(searchTeam.toLowerCase()))"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed
        prop="name"
        label="团队名称"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="score"
        label="成绩"
        width="50"
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
        width="200"
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
          <el-button
            @click.native.prevent="editTeamContest(scope.$index, scope.row)"
            type="primary"
            size="mini">
            录入成绩
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
    <!--编辑界面-->
    <el-dialog title="录入成绩"
               :visible.sync="editTeamContestFormVisible"
               :before-close="editTeamContestFormHandleClose"
               width="720px">
      <div style="min-height: 200px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editTeamContestForm" ref="editTeamContestForm"
                 label-width="120px"
                 style="width: 540px;">
          <el-form-item
            label="团队名称"
            prop="name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input
              v-model="editTeamContestForm.name"
              disabled
              placeholder="团队名称"
              autocomplete="off"
              size="small"
              style="margin-left: 20px">
            </el-input>
          </el-form-item>
          <el-form-item
            label="成  绩"
            prop="score">
            <el-input
              type="number"
              placeholder="请输入成绩"
              size="small" style="margin-left: 20px;"
              v-model="editTeamContestForm.score">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editTeamContestFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editTeamContestFormSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrganizerInputScoreTeamSignUp',
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
      searchTeam: '',
      editTeamContestFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      editTeamContestForm: {
        name: '',
        number: '',
        score: '',
        upperLimit: '',
        state: '',
        ticketNumber: '',
        teacher: ''
      },
      editTeamContestFormIndex: ''
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
                score: 0,
                upperLimit: this.contestDetail.upperLimit,
                state: this.contestDetail.state,
                ticketNumber: '',
                teacher: ''
              })
            }
            for (let i = 0; i < this.teamDataList.length; i++) {
              for (let j = 0; j < this.teamContestList.length; j++) {
                if (this.teamDataList[i].name === this.teamContestList[j].teamName) {
                  this.teamDataList[i].ticketNumber = this.teamContestList[j].ticketNumber
                  this.teamDataList[i].teacher = this.teamContestList[j].teacherName
                  this.teamDataList[i].score = this.teamContestList[j].score
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
    editTeamContest (index, row) {
      this.editTeamContestFormIndex = index
      this.editTeamContestFormVisible = true
      this.editTeamContestForm = {
        name: row.name,
        number: row.number,
        score: row.score,
        upperLimit: row.upperLimit,
        state: row.state,
        ticketNumber: row.ticketNumber,
        teacher: row.teacher
      }
    },
    editTeamContestFormSubmit () {
      this.listenLoading = true
      for (let i = 0; i < this.teamContestList.length; i++) {
        if (this.teamContestList[i].teamName === this.editTeamContestForm.name) {
          this.$axios
            .post('/updateTeamContest', {
              id: this.teamContestList[i].id,
              contestDetail: this.teamContestList[i].contestDetail,
              student: this.teamContestList[i].student,
              teacherAccount: this.teamContestList[i].teacherAccount,
              teacherName: this.teamContestList[i].teacherName,
              state: '查看成绩',
              ticketNumber: this.teamContestList[i].ticketNumber,
              // 只改了成绩
              score: this.editTeamContestForm.score,
              teamName: this.teamContestList[i].teamName,
              remarks: this.teamContestList[i].remarks
            })
            .then(successResponse => {
              this.listenLoading = false
              this.editTeamContestFormVisible = false
              if (successResponse.data !== '') {
                this.teamDataList[this.editTeamContestFormIndex].score = this.editTeamContestForm.score
              } else {
                this.$message({
                  message: '录入成绩失败',
                  type: 'error'
                })
              }
            })
            .catch(failResponse => {
              this.$message({
                message: '录入成绩失败',
                type: 'error'
              })
            })
        }
      }
      this.$message({
        message: '成功录入成绩',
        type: 'success'
      })
    },
    // 点击外面遮罩时提示，防止误点
    editTeamContestFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
        path: '/organizer/inputScore'
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
