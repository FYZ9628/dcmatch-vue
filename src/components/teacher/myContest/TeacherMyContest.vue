<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 230px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <div>
        <span style="font-size: 16px; font-weight: bolder">我的大赛</span>
        <el-link type="primary" href="http://localhost:8081/index/contestList/allContest" target="_blank" style="display: block; float: right">去参加竞赛</el-link>
      </div>
      <div style="height: 145px; margin: 30px 0 0 20px">
        <h4 style="margin-top: 30px">已报名比赛科目列表如下：</h4>
        <h4 style="margin-top: 20px">团队赛：</h4>
        <div v-for="(item, index) in teamContestList"
             :key="item.value"
             style="text-align: left; margin: 0 30px 0 0; display: block; float: left">
          <el-button v-if="index <= 2 " @click="gotoContestDetails(index, teamContestList)" type="primary" plain style="height: 60px; width: 150px;
          overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
           font-weight: bolder; font-size: 14px; text-align: center">
            <i class="el-icon-search el-icon--right" ></i>
            {{item.contestDetail.contestTitle}}
          </el-button>
          <el-button v-if="index === 2" @click="gotoContestList" type="primary" plain style="height: 60px; margin-left: 80px">
            更多
            <i class="el-icon-d-arrow-right el-icon--right" ></i>
          </el-button>
        </div>
        <div v-if="teamContestList.length === 0" style="text-align: center; margin-top: 30px">
          <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无报名的竞赛</el-tag>
        </div>
      </div>
    </div>
    <div style="height: 500px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证信息</span>
      <div style="height:300px; text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.user.name}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              性&emsp;&emsp;别：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.sex}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              学&emsp;&emsp;校：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.school}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              院&emsp;&emsp;系：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.academy}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              职&emsp;&emsp;称：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.professionalTitle}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              工&emsp;&emsp;号：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
             {{teacherData.user.account}}
            </span>
          </el-row>
        </div>
        <div style="display: block; float: right">
          <img :src="teacherData.idImg" style="width: 200px; height: 250px;"/>
        </div>
      </div>
      <div style="text-align: center; margin-top: 60px">
        <el-tag type="primary" style="width: 680px; font-weight: bolder;
         font-size: 16px; line-height:60px; height: 60px">说明：以上个人认证信息为报名生成准考证时用到的信息</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherMyContest',
  data: function () {
    return {
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
      teamContestList: []
    }
  },
  mounted: function () {
    if (this.$store.getters.name) {
      let code = this.$store.getters.code
      // 返回码：100对应管理员，200对应教师，300对应学生，400是错误码
      // 500是默认用户(即还没有认证的用户)，600对应院校
      // 用 == 号的原因是登录后不能马上刷新
      // === 号是要值和类型都相等才行，而 == 号是只要值相等就行了
      // eslint-disable-next-line eqeqeq
      if (code == '200') {
        this.loadTeacher()
        this.loadTeamContest()
      }
    }
  },
  methods: {
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
    gotoContestDetails: function (index, teamContestList) {
      // 用于返回时的判断用
      let gotoContestDetailState = {
        state: 1
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
    },
    gotoContestList () {
      this.$router.push({
        path: '/teacher/contestList'
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
