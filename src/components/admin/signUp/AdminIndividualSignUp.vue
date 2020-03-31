<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div>
      <div style="padding: 20px 0 10px 10px; font-weight: bolder; display: block; float: left;">个人竞赛管理</div>
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
        <template slot-scope="scope">
          <span v-if="scope.row.state === 1">已报名</span>
          <span v-if="scope.row.state === 2">已下载准考证</span>
          <span v-if="scope.row.state === 3">已结束比赛</span>
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
            @click.native.prevent="deleteContest(scope.$index, scope.row)"
            type="danger"
            size="mini">
            删除
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
  </div>
</template>

<script>
export default {
  name: 'AdminIndividualSignUp',
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
      contestDetailList: [],
      contestDetailOptions: [], // 下拉选择
      contestDetailOptionsValue: '' // 选中后显示的值
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
              if (resp.data[i].type === '个人赛') {
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
            this.loadContestList(this.contestDetailList[0].id)
          }
        }
      })
    },
    contestDetailOptionChange (query) {
      // console.log('选中后测试')
      // console.log(query)
      // 这个 query 就是 value 值，value 是 id 值
      this.$axios
        .post('/searchContestDetailById', {
          keywords: query
        })
        .then(successResponse => {
          this.contestDetail = successResponse.data
          this.loadContestList(query)
        })
        .catch(failResponse => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    loadContestList (contestDetailId) {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestByContestDetailId', {
            keywords: contestDetailId
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
    allDelete () {
      // this.loadContestList(this.contestDetailList[0].id)
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
                  path: '/admin/signUp/individualSignUp'
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
    }
  }
}
</script>

<style scoped>

</style>
