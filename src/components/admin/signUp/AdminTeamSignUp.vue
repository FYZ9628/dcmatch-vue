<template>
  <div style="background-color: #f6f6f6">
  <div style="background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="height: 60px">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder; display: block; float: left;">团队竞赛管理</div>
      <div style="padding: 20px 20px 10px 0; display: block; float: right;">
        <el-select v-model="contestDetailOptionsValue" filterable placeholder="请选择或输入搜索"
                   size="small" @change="contestDetailOptionChange" style="width: 250px">
          <el-option
            v-for="item in contestDetailOptions"
            :key="item.id"
            :label="item.contestTitle"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
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
    <div style="max-height: 600px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">团队管理</div>
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
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="150"
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
          min-width="200"
          align="right">
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
  name: 'AdminTeamSignUp',
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
      contestDetailList: [],
      contestDetailOptions: [], // 下拉选择
      contestDetailOptionsValue: '', // 选中后显示的值
      contestDetailId: ''
    }
  },
  mounted: function () {
    this.loadContestDetailList()
  },
  methods: {
    loadContestDetailList () {
      this.$axios.get('/getAllContestDetail').then(resp => {
        if (resp && resp.status === 200) {
          this.contestDetailList = []
          if (resp && resp.status === 200) {
            for (let i = 0; i < resp.data.length; i++) {
              if (resp.data[i].type === '团队赛') {
                this.contestDetailList.push(resp.data[i])
              }
            }
          }
          for (let i = 0; i < this.contestDetailList.length; i++) {
            this.contestDetailOptions.push({id: this.contestDetailList[i].id,
              contestTitle: this.contestDetailList[i].contestTitle})
          }
          if (this.contestDetailList.length !== 0) {
            this.contestDetailOptionsValue = this.contestDetailList[0].contestTitle
            this.contestDetailId = this.contestDetailList[0].id
            this.loadTeamContestList(this.contestDetailList[0].id)
          }
        }
      })
    },
    contestDetailOptionChange (query) {
      // console.log('选中后测试')
      // console.log(query)
      // 这个 query 就是 value 值，value 是 id 值
      this.contestDetailId = query
      this.$axios
        .post('/searchContestDetailById', {
          keywords: query
        })
        .then(successResponse => {
          this.contestDetail = successResponse.data
          this.loadTeamContestList(query)
        })
        .catch(failResponse => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    loadTeamContestList (contestDetailId) {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeamContestByContestDetailId', {
            keywords: contestDetailId
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
                teacher: ''
              })
            }
            for (let i = 0; i < this.teamDataList.length; i++) {
              for (let j = 0; j < this.teamContestList.length; j++) {
                if (this.teamDataList[i].name === this.teamContestList[j].teamName) {
                  this.teamDataList[i].ticketNumber = this.teamContestList[j].ticketNumber
                  this.teamDataList[i].teacher = this.teamContestList[j].teacherName
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
          // for (let i = 0; i < this.teamContestList.length; i++) {
          //   if (row.id === this.teamContestList[i].id) {
          //     // 在删除该行数据的同时，数组的长度也减 1
          //     this.teamContestList.splice(i, 1)
          //   }
          // }
          this.loadTeamContestList(this.contestDetailId)
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    allDelete () {
      // this.loadTeamContest()
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
                  path: '/admin/signUp/teamSignUp'
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
              this.loadTeamContestList(this.contestDetailId)
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
    }
  }
}
</script>

<style scoped>

</style>
