<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 460px; background-color: #ffffff; padding: 10px 0 0 30px">
      <span style="font-weight: bolder; background-color: #ffffff;">
        已报名竞赛科目列表（共 {{teamContestList.length}} 个竞赛）
      </span>
      <!--      <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">-->
      <!--        <div v-for="(item, index) in contestList"-->
      <!--             :key="item.value"-->
      <!--             style="text-align: left; margin: 30px 30px 0 0">-->
      <!--          <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;-->
      <!--           padding: 20px 15px;">-->
      <!--            <div style="width: 500px; font-size: 18px; font-weight: bolder;-->
      <!--             line-height: 40px;  display: block; float: left;-->
      <!--              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">-->
      <!--              {{item.contestDetail.contestTitle}}-->
      <!--            </div>-->
      <!--            <el-button type="primary" @click="gotoContestDetails(index, contestList)" plain style="height: 40px; display: block; float: right">-->
      <!--             查看详情-->
      <!--            </el-button>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--  可通过竞赛标题查询  -->
      <el-table
        :data="teamContestList.filter(data => !search || data.contestDetail.contestTitle.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="350">
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          fixed
          prop="contestDetail.contestTitle"
          width="500"
          align="left">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="160"
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteTeamContest(scope.$index, teamContestList)"
              type="danger"
              size="small">
              取消报名
            </el-button>
            <el-button
              @click.native.prevent="gotoTeamContestDetails(scope.$index, teamContestList)"
              type="primary"
              size="small">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherMyContestList',
  data: function () {
    return {
      teamContestList: [],
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
      search: ''
    }
  },
  mounted: function () {
    this.loadTeamContest()
  },
  methods: {
    loadTeamContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeamContestByTeacherAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teamContestList = []
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state !== '查看成绩') {
                // 去重
                let isExistTeacher = false
                for (let j = 0; j < this.teamContestList.length; j++) {
                  if (this.teamContestList[j].teamName === successResponse.data[i].teamName) {
                    isExistTeacher = true
                  }
                }
                if (isExistTeacher === false) {
                  this.teamContestList.push(successResponse.data[i])
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
    goBack () {
      this.$router.push({
        path: '/teacher/myContest'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    deleteTeamContest: function (index, teamContestList) {
      if (this.$store.getters.account === teamContestList[index].teacherAccount) {
        this.$confirm('确认取消报名？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(_ => {
            this.$axios
              .post('/deleteTeam', {
                // 后端接收的是整个 contest 对象，但是其实只用到了 id
                // 所以只要传 id 到后端就行了
                keywords: teamContestList[index].teamName
              })
              .then(successResponse => {
                this.loadTeamContest()
                this.$message({
                  message: '成功取消报名',
                  type: 'success'
                })
                teamContestList.splice(index, 1)
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
    },
    gotoTeamContestDetails: function (index, teamContestList) {
      // 用于返回时的判断用
      let gotoContestDetailState = {
        state: 2
      }
      let gotoContestDetailStateJson = JSON.stringify(gotoContestDetailState)
      sessionStorage.setItem('gotoContestDetailStateJson', gotoContestDetailStateJson)
      let teamContestJson = JSON.stringify(teamContestList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('teamContestJson', teamContestJson)
      this.$router.push({
        path: '/teacher/contestDetails'
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
