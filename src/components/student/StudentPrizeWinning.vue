<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">获奖查询</span>
      <div style="height: 160px; margin: 20px 0 0 20px">
        <h4 style="margin-top: 10px">已参加的比赛科目列表如下：</h4>
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
              <el-button type="primary" @click="gotoPrizeWinningDetails(index, contestList)" plain style="height: 40px; display: block; float: right">
                获奖查询
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="contestList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无可查询的比赛结果</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinning',
  data: function () {
    return {
      contestList: []
    }
  },
  mounted: function () {
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
              if (successResponse.data[i].state === 3) {
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
    gotoPrizeWinningDetails: function (index, contestList) {
      let contestJson = JSON.stringify(contestList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('contestJson', contestJson)
      this.$router.push({
        path: '/student/prizeWinningDetails'
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
