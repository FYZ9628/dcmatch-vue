<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <CommonHeader></CommonHeader>
    </el-header>
    <el-main style="min-height: 300px; margin: 0 auto">
      <div style="border: 1.5px solid rgba(60,60,60,0.87); font-size: 16px; text-align: left; width: 800px; min-height: 760px; padding: 10px 30px">
        <el-row style="text-align: center">
          <h3>报名信息</h3>
        </el-row>
        <el-divider>个人信息</el-divider>
        <el-row style="margin: 20px 0 50px 0">
<!--          <div style="display: block; float: left; width: 380px">-->
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span style="width: 60px;">姓 名：</span>-->
<!--              <span style="width: 100px; ">{{studentData.user.name}}</span>-->
<!--              <span style="width: 60px; margin-left: 100px">性 别：</span>-->
<!--              <span style="width: 100px;">{{studentData.sex}}</span>-->
<!--            </el-row>-->
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span>学 校：</span>-->
<!--              <span>{{studentData.school}}</span>-->
<!--            </el-row>-->
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span>院 系：</span>-->
<!--              <span>{{studentData.academy}}</span>-->
<!--            </el-row>-->
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span>专 业：</span>-->
<!--              <span>{{studentData.major}}</span>-->
<!--            </el-row>-->
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span>学 号：</span>-->
<!--              <span>{{studentData.user.account}}</span>-->
<!--            </el-row>-->
<!--            &lt;!&ndash;            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">&ndash;&gt;-->
<!--            &lt;!&ndash;              <span>电 话：</span>&ndash;&gt;-->
<!--            &lt;!&ndash;              <span>18278539579</span>&ndash;&gt;-->
<!--            &lt;!&ndash;            </el-row>&ndash;&gt;-->
<!--          </div>-->
<!--          <div style="display: block; float: right; width: 380px; height: 250px; margin-top: 10px">-->
<!--            <div style="width: 200px; height: 250px; border: 1px solid rgba(60,60,60,0.87); margin-left: 100px">-->
<!--              <img :src="studentData.idImg" style="width: 200px; height: 250px;"/>-->
<!--            </div>-->
<!--          </div>-->
          <el-table
            :data="studentList"
            style="width: 100%"
            max-height="430">
            <el-table-column
              fixed
              label="证件照"
              width="120"
              align="center">
              <template slot-scope="scope">
                <img
                  style="width: 120px; height: 80px"
                  :src="scope.row.idImg" />
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="user.name"
              label="姓名"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="user.account"
              label="学号"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="academy"
              label="院系"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="major"
              label="专业"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              label="备注"
              width="100"
              align="center">
              <template slot-scope="scope">
                <div v-if="scope.$index === captainState.index">队长</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
              align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="setCaptain(scope.$index, studentList)"
                  type="primary"
                  size="mini">
                  设为队长
                </el-button>
                <el-button
                  @click.native.prevent="deleteStudent(scope.$index, studentList)"
                  type="danger"
                  size="mini">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-row>
            <span style="display: block; float: left; line-height: 30px">
              添加队员，团队人数上限为 {{signUpContestDetailData.upperLimit}} 人
            </span>
            <div style="display: block; float: left; margin-left: 30px">
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :limit="1"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
                <el-button type="primary" size="small">
                  Excel导入
                </el-button>
              </el-upload>
            </div>
            <el-button type="primary" size="small" @click="exportExcel"
                       style="display: block; float: left; margin-left: 30px">
              导出模板
            </el-button>
          </el-row>
        </el-row>
        <el-row>
          <div style="display: block; float: left">
            <el-form :inline="true" :model="addStudentForm" :rules="addStudentFormRules" ref="addStudentForm">
              <el-form-item label="账  号" prop="account">
                <el-input v-model="addStudentForm.account" placeholder="学号或电话" size="small" style="width: 250px">
                </el-input>
              </el-form-item>
              <el-form-item label="密  码" prop="password">
                <el-input v-model="addStudentForm.password" placeholder="密码" size="small" style="width: 250px">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            @click="addStudent"
            type="primary"
            size="small"
            style="display: block; float: right; margin: 5px 20px 0 0">
            添加队员
          </el-button>
        </el-row>
        <el-row>
          <div style="display: block; float: left">
            <el-form :inline="true" :model="teamContestForm" :rules="teamContestFormRules" ref="teamContestForm"
            style="height: 40px">
              <el-form-item label="团队名称" prop="teamName">
                <el-input v-model="teamContestForm.teamName" placeholder="团队名称" size="small" style="width: 250px">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-switch
            v-model="isHasTeacher"
            style="display: block; float: right; margin: 5px 20px 0 0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="有指导老师"
            inactive-text="无指导老师">
          </el-switch>
        </el-row>
        <el-row v-if="isHasTeacher === true">
          <el-divider>指导老师</el-divider>
          <el-table
            :data="teacherList"
            style="width: 100%"
            max-height="430">
            <el-table-column
              fixed
              label="证件照"
              width="120"
              align="center">
              <template slot-scope="scope">
                <img
                  style="width: 120px; height: 80px"
                  :src="scope.row.idImg" />
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="user.name"
              label="姓名"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="user.account"
              label="工号"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="academy"
              label="院系"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="professionalTitle"
              label="职称"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteTeacher(scope.$index, teacherList)"
                  type="danger"
                  size="mini">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin: 20px 0">
            <span style="display: block; float: left; line-height: 30px">添加指导老师，只能添加一人</span>
            <el-button type="primary" v-if="$store.getters.code === '200'" size="small" @click="addMySelfAsTeacher"
                       style="display: block; float: right; margin-right: 20px">
              添加自己作为指导老师
            </el-button>
          </el-row>
          <el-row>
            <div style="display: block; float: left">
              <el-form :inline="true" :model="addTeacherForm" :rules="addTeacherFormRules" ref="addTeacherForm">
                <el-form-item label="账  号" prop="account">
                  <el-input v-model="addTeacherForm.account" placeholder="工号或电话" size="small" style="width: 250px">
                  </el-input>
                </el-form-item>
                <el-form-item label="姓  名" prop="name">
                  <el-input v-model="addTeacherForm.name" placeholder="姓名" size="small" style="width: 250px">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <el-button
              @click="addTeacher"
              type="primary"
              size="small"
              style="display: block; float: right; margin: 5px 20px 0 0">
              添加导师
            </el-button>
          </el-row>
        </el-row>
        <el-divider>比赛信息</el-divider>
        <el-row style="margin-top: 30px">
          <div style="display: block; float: left; width: 380px">
            <div style="margin-top: 0px">
              <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
                <span>比 赛：</span>
                <span>{{signUpContestDetailData.contestTitle}}</span>
              </el-row>
              <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
                <span>举办方：</span>
                <span>{{signUpContestDetailData.organizer.school}}{{signUpContestDetailData.organizer.user.name}}</span>
              </el-row>
              <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
                <span>准考证号：</span>
                <span>{{ticketNumber}}</span>
              </el-row>
            </div>
          </div>
          <div style="display: block; float: right; width: 380px">
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>比赛地点：</span>
              <span>{{signUpContestDetailData.place}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>比赛日期：</span>
              <span>{{signUpContestDetailData.holdDate}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>比赛时间：</span>
              <span>{{signUpContestDetailData.holdStartTime}}-{{signUpContestDetailData.holdEndTime}}</span>
            </el-row>
          </div>
        </el-row>
        <el-row>
          <el-divider></el-divider>
          <el-button type="primary" class="sign-up" @click="confirmSignUp"
                     style="margin-top: 30px">
            确认报名
          </el-button>
        </el-row>
      </div>
    </el-main>
    <el-footer class="el-footer">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
import CommonFooter from '@/components/common/CommonFooter'
export default {
  name: 'TeamSignUp',
  components: {CommonHeader, CommonFooter},
  data: function () {
    return {
      signUpContestDetailData: '',
      studentData: {
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
      studentList: [],
      teacherList: [],
      teacherData: {
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
        entryDate: '',
        academy: '',
        professionalTitle: '',
        education: '',
        idImg: ''
      },
      ticketNumber: '',
      addStudentForm: {
        account: '',
        password: ''
      },
      addStudentFormRules: {
        account: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      // 设置为队长（默认第一个为队长）
      captainState: {
        index: 0,
        state: '队长'
      },
      teamContestForm: {
        teamName: ''
      },
      teamContestFormRules: {
        teamName: [{required: true, message: '请输入团队名称', trigger: 'blur'}]
      },
      isHasTeacher: false,
      addTeacherForm: {
        account: '',
        name: ''
      },
      addTeacherFormRules: {
        account: [{required: true, message: '请输入账号', trigger: 'blur'}],
        name: [{required: true, message: '请输入导师名称', trigger: 'blur'}]
      },
      fileList: [],
      ExcelList: [],
      // Excel导出模板用到的数据
      tableList: [
        {
          account: '116263000909',
          password: '123456'
        }
      ]
      // contest: {
      //   id: '',
      //   contestDetail: {
      //     id: this.signUpContestDetailData.id,
      //     contestTitle: this.signUpContestDetailData.contestTitle,
      //     organizer: {
      //       id: this.signUpContestDetailData.organizer.id,
      //       user: {
      //         id: this.signUpContestDetailData.organizer.user.id,
      //         account: this.signUpContestDetailData.organizer.user.account,
      //         phone: this.signUpContestDetailData.organizer.user.phone,
      //         password: this.signUpContestDetailData.organizer.user.password,
      //         name: this.signUpContestDetailData.organizer.user.name,
      //         type: this.signUpContestDetailData.organizer.user.type
      //       },
      //       email: this.signUpContestDetailData.organizer.email,
      //       school: this.signUpContestDetailData.organizer.school,
      //       establishDate: this.signUpContestDetailData.organizer.establishDate,
      //       schoolType: this.signUpContestDetailData.organizer.schoolType,
      //       schoolRunningType: this.signUpContestDetailData.organizer.schoolRunningType,
      //       idImg: this.signUpContestDetailData.organizer.idImg
      //     },
      //     contestContent: this.signUpContestDetailData.contestContent,
      //     signUpStartTime: this.signUpContestDetailData.signUpStartTime,
      //     signUpEndTime: this.signUpContestDetailData.signUpEndTime,
      //     publishTime: this.signUpContestDetailData.publishTime,
      //     place: this.signUpContestDetailData.place,
      //     holdDate: this.signUpContestDetailData.holdDate,
      //     holdStartTime: this.signUpContestDetailData.holdStartTime,
      //     holdEndTime: this.signUpContestDetailData.holdEndTime,
      //     type: this.signUpContestDetailData.type
      //   },
      //   student: {
      //     id: this.studentData.id,
      //     user: {
      //       id: this.studentData.user.id,
      //       account: this.studentData.user.account,
      //       phone: this.studentData.user.phone,
      //       password: this.studentData.user.password,
      //       name: this.studentData.user.name,
      //       type: this.studentData.user.type
      //     },
      //     sex: this.studentData.sex,
      //     email: this.studentData.email,
      //     school: this.studentData.school,
      //     admissionDate: this.studentData.admissionDate,
      //     graduationDate: this.studentData.graduationDate,
      //     academy: this.studentData.academy,
      //     major: this.studentData.major,
      //     education: this.studentData.education,
      //     idImg: this.studentData.idImg
      //   },
      //   state: 1,
      //   ticketNumber: this.ticketNumber,
      //   score: null
      // }
    }
  },
  mounted: function () {
    // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
    // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
    let signUpContestDetailJson = sessionStorage.getItem('signUpContestDetailJson')
    this.signUpContestDetailData = JSON.parse(signUpContestDetailJson)
    if (this.$store.getters.name) {
      let code = this.$store.getters.code
      // 返回码：100对应管理员，200对应教师，300对应学生，400是错误码
      // 500是默认用户(即还没有认证的用户)，600对应院校
      // 用 == 号的原因是登录后不能马上刷新
      // === 号是要值和类型都相等才行，而 == 号是只要值相等就行了
      // eslint-disable-next-line eqeqeq
      if (code == '300') {
        this.loadStudent()
        this.getRandomNum(12)
      }
      // eslint-disable-next-line eqeqeq
      if (code == '200') {
        this.loadTeacher()
        this.getRandomNum(12)
      }
    }
  },
  methods: {
    loadStudent () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchStudentByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.studentData = successResponse.data
            this.studentList = []
            this.studentList.push(this.studentData)
          })
          .catch(failResponse => {
            this.$message({
              message: '查询学生失败',
              type: 'error'
            })
          })
      }
    },
    loadTeacher () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeacherByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teacherData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询教师失败',
              type: 'error'
            })
          })
      }
    },
    // 获取随机数
    getRandomNum (n) {
      let rnd = ''
      for (let i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10)
      }
      this.ticketNumber = rnd
    },
    setCaptain (index, rows) {
      // id: rows[index].id,
      // 设置为队长（默认第一个为队长）
      this.captainState.index = index
      this.$message({
        message: '设置成功',
        type: 'success'
      })
    },
    deleteStudent (index, rows) {
      if (index === 0) {
        this.$message({
          message: '不能删除自己',
          type: 'error'
        })
      } else {
        if (this.captainState.index === index) {
          this.captainState.index = 0
        }
        rows.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    addStudent () {
      if (this.studentList.length < this.signUpContestDetailData.upperLimit) {
        this.$refs.addStudentForm.validate((valid) => {
          if (valid) {
            let isAddStudent = false
            for (let i = 0; i < this.studentList.length; i++) {
              if (this.addStudentForm.account === this.studentList[i].user.account ||
                this.addStudentForm.account === this.studentList[i].user.phone) {
                this.$message({
                  message: '该学生已添加',
                  type: 'error'
                })
                isAddStudent = true
              }
            }
            if (isAddStudent === false) {
              this.$axios
                .post('/teamSignUpAddStudent', {
                  account: this.addStudentForm.account,
                  password: this.addStudentForm.password
                })
                .then(successResponse => {
                  if (successResponse.data !== '') {
                    if (successResponse.data.user.type === 3) {
                      this.studentList.push(successResponse.data)
                      this.$message({
                        message: '添加成功',
                        type: 'success'
                      })
                      this.addStudentForm.account = ''
                      this.addStudentForm.password = ''
                    } else {
                      this.$message({
                        message: '该学生未通过认证',
                        type: 'error'
                      })
                    }
                  } else {
                    this.$message({
                      message: '该学生不存在',
                      type: 'error'
                    })
                  }
                })
                .catch(failResponse => {
                  this.$message({
                    message: '该学生不存在或未认证',
                    type: 'error'
                  })
                })
            }
          }
        })
      } else {
        this.$message({
          message: '超出人数上限',
          type: 'error'
        })
      }
    },
    addMySelfAsTeacher () {
      if (this.teacherList.length < 1) {
        this.$axios
          .post('/teamSignUpAddTeacher', {
            account: this.teacherData.user.account,
            name: this.teacherData.user.name
          })
          .then(successResponse => {
            if (successResponse.data !== '') {
              if (successResponse.data.user.type === 2) {
                this.teacherList.push(successResponse.data)
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '该老师未通过认证',
                  type: 'error'
                })
              }
            } else {
              this.$message({
                message: '该老师不存在',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            this.$message({
              message: '该老师不存在或未认证',
              type: 'error'
            })
          })
      } else {
        this.$message({
          message: '只能添加一名指导老师',
          type: 'error'
        })
      }
    },
    addTeacher () {
      if (this.teacherList.length < 1) {
        this.$refs.addTeacherForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/teamSignUpAddTeacher', {
                account: this.addTeacherForm.account,
                name: this.addTeacherForm.name
              })
              .then(successResponse => {
                if (successResponse.data !== '') {
                  if (successResponse.data.user.type === 2) {
                    this.teacherList.push(successResponse.data)
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                    this.addTeacherForm.account = ''
                    this.addTeacherForm.name = ''
                  } else {
                    this.$message({
                      message: '该老师未通过认证',
                      type: 'error'
                    })
                  }
                } else {
                  this.$message({
                    message: '该老师不存在',
                    type: 'error'
                  })
                }
              })
              .catch(failResponse => {
                this.$message({
                  message: '该老师不存在或未认证',
                  type: 'error'
                })
              })
          }
        })
      } else {
        this.$message({
          message: '只能添加一名指导老师',
          type: 'error'
        })
      }
    },
    deleteTeacher (index, rows) {
      rows.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    confirmSignUp: function () {
      if (this.studentList.length >= 1) {
        this.$refs.teamContestForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/searchTeamContestByTeamName', {
                keywords: this.teamContestForm.teamName
              })
              .then(successResponse => {
                if (successResponse.data.length === 0) {
                  let tempTeacher = {
                    account: '',
                    name: ''
                  }
                  if (this.isHasTeacher === true && this.teacherList.length !== 0) {
                    tempTeacher = {
                      account: this.teacherList[0].user.account,
                      name: this.teacherList[0].user.name
                    }
                  }
                  if (this.isHasTeacher === true && this.teacherList.length === 0) {
                    this.$message({
                      message: '请添加指导老师信息',
                      type: 'error'
                    })
                  } else {
                    this.$confirm('确认报名', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$axios
                        .post('/addTeamContest', {
                          id: '',
                          contestDetail: this.signUpContestDetailData,
                          // student: this.studentData,
                          studentList: this.studentList,
                          teacherAccount: tempTeacher.account,
                          teacherName: tempTeacher.name,
                          state: '已报名',
                          ticketNumber: this.ticketNumber,
                          score: null,
                          teamName: this.teamContestForm.teamName,
                          remarksIndex: this.captainState.index
                        })
                        .then(successResponse => {
                          this.$message({
                            message: '报名成功',
                            type: 'success'
                          })
                          // 一秒后刷新
                          setTimeout(() => {
                            window.open(
                              this.$router.resolve({
                                path: '/index/signUpSuccess'
                              }).href, '_self'
                              // 打开新窗口：_blank
                              // 在本地窗口打开：_self
                            )
                          }, 1000)
                        })
                        .catch(failResponse => {
                          this.$message({
                            message: '报名失败',
                            type: 'error'
                          })
                        })
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消报名'
                      })
                    })
                  }
                } else {
                  this.$message({
                    message: '该团队名称已被使用，请重新填写',
                    type: 'error'
                  })
                }
              })
              .catch(failResponse => {
                this.$message({
                  message: '查询失败',
                  type: 'error'
                })
              })
          } else {
            this.$message({
              message: '请填写团队名称',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请先添加学生',
          type: 'error'
        })
      }
    },
    // Excel导入
    importExcel (fileObj) {
      // 通过DOM取文件数据
      let _this = this
      this.file = fileObj
      let rABS = false // 是否将文件读取为二进制字符串
      let f = this.file
      let reader = new FileReader()
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = ''
        let rABS = false // 是否将文件读取为二进制字符串
        let wb // 读取完成的数据
        let outData
        let reader = new FileReader()
        reader.onload = function (e) {
          let bytes = new Uint8Array(reader.result)
          let length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          let XLSX = require('xlsx')
          if (rABS) {
            // wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
            wb = XLSX.read(btoa(outData(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          // outData就是你想要的东西
          outData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          _this.ExcelList = []
          for (let i = 0; i < outData.length; i++) {
            _this.ExcelList.push({account: outData[i].账号, password: outData[i].密码})
          }
          _this.addStudentByExcel(_this.ExcelList)
          this.da = [...outData]
          let arr = []
          this.da.map(v => {
            let obj = {}
            obj.id = v.id
            obj.status = v.status
            arr.push(obj)
          })
          // _this.$message({
          //   message: '导入成功',
          //   type: 'success'
          // })
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    addStudentByExcel (ExcelList) {
      let tempCount = this.signUpContestDetailData.upperLimit - this.studentList.length
      if (this.studentList.length < this.signUpContestDetailData.upperLimit && ExcelList.length <= tempCount) {
        let addSuccessCount = 0
        let addFailCount = 0
        for (let i = 0; i < ExcelList.length; i++) {
          let isAddStudent = false
          for (let j = 0; j < this.studentList.length; j++) {
            if (ExcelList[i].account === this.studentList[j].user.account ||
              ExcelList[i].account === this.studentList[j].user.phone) {
              addFailCount++
              isAddStudent = true
              break
            }
          }
          if (isAddStudent === false) {
            this.$axios
              .post('/teamSignUpAddStudent', {
                account: ExcelList[i].account,
                password: ExcelList[i].password
              })
              .then(successResponse => {
                if (successResponse.data !== '') {
                  if (successResponse.data.user.type === 3) {
                    addSuccessCount++
                    this.studentList.push(successResponse.data)
                  } else {
                    addFailCount++
                  }
                } else {
                  addFailCount++
                }
              })
              .catch(failResponse => {
              })
          }
        }
        // 一秒后刷新
        setTimeout(() => {
          this.$message(addSuccessCount + '名同学添加成功，' + addFailCount + '名同学添加失败')
        }, 500)
      } else {
        this.$message({
          message: '超出人数上限，无法添加',
          type: 'error'
        })
      }
    },
    // 选择Excel表格时
    handleChange (file, fileList) {
      if (file.raw) {
        if ((file.raw.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
          (file.raw.type === 'application/vnd.ms-excel')) {
          this.importExcel(file.raw)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    // 文件数量超出上限时
    handleExceed (files, fileList) {
      this.$message.warning(`只能选择一个文件，如需重选，请先删除旧文件`)
    },
    // excel数据导出
    exportExcel () {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require('../../../excel/Export2Excel')
        const tHeader = ['账号', '密码']
        const filterVal = ['account', 'password']
        const list = this.tableList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '添加队员Excel模板')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }

  }
}
</script>

<style scoped>
  .container{
    /*height: 100%;*/
    min-height: 300px;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  .el-header {
    padding: 0;
    margin: 0;
  }
  .sign-up {
    display: block;
    float: right;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: #4ea2e2;
    color: white;
    padding: 0;
    font-size: 18px;
    margin-right: 20px;
  }
  .el-footer {
    padding: 0;
    margin: 0 0 0 0;
  }
</style>
