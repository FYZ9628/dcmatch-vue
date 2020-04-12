<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <CommonHeader></CommonHeader>
    </el-header>
    <el-main style="min-height: 300px; margin: 0 auto">
      <div style="border: 1.5px solid rgba(60,60,60,0.87); font-size: 16px; text-align: left; width: 800px; height: 760px; padding: 10px 30px">
        <el-row style="text-align: center">
          <h3>报名信息</h3>
        </el-row>
        <el-divider>个人信息</el-divider>
        <el-row style="margin: 20px 0 50px 0">
          <div style="display: block; float: left; width: 380px">
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span style="width: 60px;">姓 名：</span>
              <span style="width: 100px; ">{{studentData.user.name}}</span>
              <span style="width: 60px; margin-left: 100px">性 别：</span>
              <span style="width: 100px;">{{studentData.sex}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>学 校：</span>
              <span>{{studentData.school}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>院 系：</span>
              <span>{{studentData.academy}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>专 业：</span>
              <span>{{studentData.major}}</span>
            </el-row>
            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">
              <span>学 号：</span>
              <span>{{studentData.user.account}}</span>
            </el-row>
<!--            <el-row style="border-bottom: rgba(219,222,229,0.62) 1px solid; line-height: 30px; padding: 10px 0">-->
<!--              <span>电 话：</span>-->
<!--              <span>18278539579</span>-->
<!--            </el-row>-->
          </div>
          <div style="display: block; float: right; width: 380px; height: 250px; margin-top: 10px">
            <div style="width: 200px; height: 250px; border: 1px solid rgba(60,60,60,0.87); margin-left: 100px">
              <img :src="studentData.idImg" style="width: 200px; height: 250px;"/>
            </div>
          </div>
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
  name: 'SignUp',
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
      ticketNumber: ''
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
    confirmSignUp: function () {
      this.$confirm('确认报名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/addContest', {
            id: '',
            contestDetail: this.signUpContestDetailData,
            student: this.studentData,
            state: '已报名',
            ticketNumber: this.ticketNumber,
            score: null
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
