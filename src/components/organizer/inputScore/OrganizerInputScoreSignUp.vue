<template>
  <div style="width: 800px; height: 600px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <el-page-header @back="goBack" content="竞赛报名名单管理" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="padding: 0 0 10px 10px; font-weight: bolder">{{contestDetail.contestTitle}}</div>
    <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="contestList.filter(data => !search || data.student.user.name.toLowerCase().includes(search.toLowerCase())
          || data.student.user.account.toLowerCase().includes(search.toLowerCase())
          || data.student.user.phone.toLowerCase().includes(search.toLowerCase())
          || data.student.email.toLowerCase().includes(search.toLowerCase())
          || data.student.school.toLowerCase().includes(search.toLowerCase())
          || data.student.academy.toLowerCase().includes(search.toLowerCase())
          || data.student.major.toLowerCase().includes(search.toLowerCase())
          || data.ticketNumber.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="430">
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
        fixed
        prop="score"
        label="成绩"
        width="50"
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
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.state === 1">已报名</span>-->
<!--          <span v-if="scope.row.state === 2">已下载准考证</span>-->
<!--          <span v-if="scope.row.state === 3">已结束比赛</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteContest(scope.$index, scope.row)"
            type="danger"
            size="mini">
            删除
          </el-button>
          <el-button
            @click.native.prevent="editContest(scope.$index, scope.row)"
            type="primary"
            size="mini">
            录入成绩
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 80px;">
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
               :visible.sync="editContestFormVisible"
               :before-close="editContestFormHandleClose"
               width="720px">
      <div style="min-height: 200px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editContestForm" ref="editContestForm"
                 label-width="120px"
                 style="width: 540px;">
          <el-form-item
            label="姓  名"
            prop="name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input
              v-model="editContestForm.student.user.name"
              disabled
              placeholder="姓名"
              autocomplete="off"
              size="small"
              style="margin-left: 20px">
            </el-input>
          </el-form-item>
          <el-form-item
            label="学  号"
            prop="account">
            <el-input
              disabled
              placeholder="请输入学号"
              size="small" style="margin-left: 20px;"
              v-model="editContestForm.student.user.account">
            </el-input>
          </el-form-item>
          <el-form-item
            label="成  绩"
            prop="score">
            <el-input
              type="number"
              placeholder="请输入成绩"
              size="small" style="margin-left: 20px;"
              v-model="editContestForm.score">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editContestFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editContestFormSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrganizerInputScoreSignUp',
  data () {
    return {
      contestList: [],
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
      search: '',
      editContestFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      editContestForm: {
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
      editContestFormIndex: ''
    }
  },
  mounted: function () {
    // 接收contestDetail数据
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetail = JSON.parse(contestDetailJson)
    this.loadContest()
  },
  methods: {
    loadContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestByContestDetailId', {
            keywords: this.contestDetail.id
          })
          .then(successResponse => {
            this.contestList = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    deleteContest (index, row) {
      this.$axios
        .post('/deleteContest', {
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
          state: '',
          ticketNumber: '',
          score: ''
        })
        .then(successResponse => {
          this.$message({
            message: '成功删除了一名学生',
            type: 'success'
          })
          for (let i = 0; i < this.contestList.length; i++) {
            if (row.id === this.contestList[i].id) {
              this.contestList.splice(i, 1)
            }
          }
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    editContest (index, row) {
      this.editContestFormIndex = index
      this.editContestFormVisible = true
      this.editContestForm = {
        id: row.id,
        contestDetail: row.contestDetail,
        student: row.student,
        state: row.state,
        ticketNumber: row.ticketNumber,
        score: row.score
      }
    },
    editContestFormSubmit () {
      this.listenLoading = true
      this.$axios
        .post('/updateContest', {
          id: this.editContestForm.id,
          contestDetail: this.editContestForm.contestDetail,
          student: this.editContestForm.student,
          state: '查看成绩',
          ticketNumber: this.editContestForm.ticketNumber,
          score: this.editContestForm.score
        })
        .then(successResponse => {
          this.listenLoading = false
          this.editContestFormVisible = false
          if (successResponse.data !== '') {
            this.$message({
              message: '成功录入成绩',
              type: 'success'
            })
            this.contestList[this.editContestFormIndex].score = this.editContestForm.score
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
    },
    // 点击外面遮罩时提示，防止误点
    editContestFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    allDelete () {
      this.loadContest()
      if (this.contestList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.contestList.length; i++) {
              this.$axios
                .post('/deleteContest', {
                  // 主要是 id ，传 id 过去就行了
                  id: this.contestList[i].id,
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
              message: '成功删除了' + this.contestList.length + '条报名信息',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/organizer/inputScoreSignUp'
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
