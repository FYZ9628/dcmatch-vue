<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
<!--    <div style="height: 600px; background-color: #ffffff;">-->
<!--      -->
<!--    </div>-->
    <div style="height: 460px; background-color: #ffffff; padding: 10px 0 0 30px">
      <span style="font-weight: bolder; background-color: #ffffff;">已报名比赛科目列表</span>
      <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">
        <div v-for="(item, index) in contestList"
             :key="item.value"
             style="text-align: left; margin: 30px 30px 0 0">
          <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;
           padding: 20px 15px;">
            <div style="width: 500px; font-size: 18px; font-weight: bolder;
             line-height: 40px;  display: block; float: left;
              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">
              {{item.contestDetail.contestTitle}}
            </div>
            <el-button type="primary" @click="gotoContestDetails(index, contestList)" plain style="height: 40px; display: block; float: right">
             查看详情
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentMyContestList',
  data: function () {
    return {
      contestList: [],
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
    let contestJson = sessionStorage.getItem('contestJson')
    this.contestDate = JSON.parse(contestJson)
    this.loadContest()
  },
  methods: {
    loadContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestByStudentAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state !== 3) {
                this.contestList.push(successResponse.data[i])
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
        path: '/student/myContest'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    gotoContestDetails: function (index, contestList) {
      // 用于返回时的判断用
      let gotoContestDetailState = {
        state: 2
      }
      let gotoContestDetailStateJson = JSON.stringify(gotoContestDetailState)
      sessionStorage.setItem('gotoContestDetailStateJson', gotoContestDetailStateJson)
      let contestJson = JSON.stringify(contestList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('contestJson', contestJson)
      this.$router.push({
        path: '/student/contestDetails'
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
