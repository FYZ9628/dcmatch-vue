<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
<!--    <div style="height: 100px; background-color: #ffffff; padding: 20px 30px; margin-bottom: 10px">-->
<!--      <span style="font-weight: bolder">{{contestDate.contestDetail.contestTitle}}</span>-->
<!--    </div>-->
    <div style="height: 550px; background-color: #ffffff; padding: 10px 30px">
      <div>
        <span style="font-weight: bolder;">{{contestDetail.contestTitle}}</span>
        <div style="display: block; float: right">
          <el-button type="primary">修改比赛</el-button>
          <el-button type="primary" @click="gotoContestSignUp">查看报名名单</el-button>
        </div>
      </div>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 20px">
        <span style="display: block; float: left; color: #778a99">发布时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.publishTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">报名时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.signUpStartTime}}——{{contestDetail.signUpEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.holdDate}} {{contestDetail.holdStartTime}}-{{contestDate.contestDetail.holdEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">举办地点：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.place}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">详细内容：</span>
      </el-row>
      <div style="overflow-y: scroll; height: 250px; background-color: #ffffff; margin-bottom: 20px">
        <p>
          {{contestDetail.contestContent}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizerMyContestDetails',
  data: function () {
    return {
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
      }
    }
  },
  mounted: function () {
    // 接收contestDetail数据
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetail = JSON.parse(contestDetailJson)
    // this.loadContest()
  },
  methods: {
    loadContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestById', {
            keywords: this.contestDate.id
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            console.log('测试查询到的contest')
            console.log(successResponse.data)
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    updateContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/updateContest', {
            keywords: this.contestDate.id
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            console.log('测试查询到的contest')
            console.log(successResponse.data)
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
        path: '/organizer/myContest'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    gotoContestSignUp () {
      this.$router.push({
        path: '/organizer/contestSignUp'
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
