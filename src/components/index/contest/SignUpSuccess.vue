<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <CommonHeader></CommonHeader>
    </el-header>
    <el-main style="min-height: 300px; margin: 0 auto">
      <h1>报名成功</h1>
      <div style="margin-top: 50px">
        <el-link :underline="false" v-on:click="gotoContestList"
                 style="display: block; float: left; font-size: 16px">
          返回竞赛列表
        </el-link>
        <el-link :underline="false" v-on:click="gotoMyContest"
                 style="display: block; float: right; margin-left: 50px; font-size: 16px">
          查看我参加的竞赛
        </el-link>
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
  name: 'SignUpSuccess',
  components: {CommonHeader, CommonFooter},
  data: function () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    gotoContestList: function () {
      // 点击后新开一个窗口
      window.open(
        this.$router.resolve({
          path: '/index/contestList/allContest'
        }).href, '_self'
        // 打开新窗口：_blank
        // 在本地窗口打开：_self
      )
      // // 以加问号接续的方式显示内容
      // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
      // this.$router.push({
      //   path: '/index/noticeDetails',
      //   // name: 'noticeDetails/'
      //   query: {
      //     data: notice
      //   }
      // })
    },
    gotoMyContest: function () {
      if (this.$store.getters.code === '300') {
        // 点击后新开一个窗口
        window.open(
          this.$router.resolve({
            path: '/student/myContest'
          }).href, '_self'
          // 打开新窗口：_blank
          // 在本地窗口打开：_self
        )
      }
      if (this.$store.getters.code === '200') {
        // 点击后新开一个窗口
        window.open(
          this.$router.resolve({
            path: '/teacher/myContest'
          }).href, '_self'
          // 打开新窗口：_blank
          // 在本地窗口打开：_self
        )
      }
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
  .el-footer {
    padding: 0;
    margin: 0 0 0 0;
  }
</style>
