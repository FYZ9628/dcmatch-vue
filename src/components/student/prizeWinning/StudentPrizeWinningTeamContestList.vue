<template>
  <div style=" height: 400px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
    <div style="font-weight: bolder">已参加的竞赛科目列表如下：</div>
    <div v-if="teamContestList.length !== 0">
      <!--  可通过竞赛标题查询  -->
      <el-table
        :data="teamContestList.filter(data => !search || data.contestDetail.contestTitle.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        max-height="300">
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
              删除
            </el-button>
            <el-button
              @click.native.prevent="gotoPrizeWinningTeamDetails(scope.$index, teamContestList)"
              type="primary"
              size="small">
              获奖查询
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 70px">
        <el-button
          @click="allDelete"
          type="danger"
          size="small"
          style="display: block; float: right; margin: 20px 20px 0 0">
          全部删除
        </el-button>
      </div>
    </div>
    <div v-if="teamContestList.length === 0" style="text-align: center; margin-top: 60px">
      <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
                height: 60px">暂无可查询的竞赛结果</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinningTeamContestList',
  data: function () {
    return {
      teamContestList: [],
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
          .post('/searchTeamContestByStudentAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teamContestList = []
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state === '查看成绩') {
                this.teamContestList.push(successResponse.data[i])
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
    gotoPrizeWinningTeamDetails: function (index, teamContestList) {
      let teamContestJson = JSON.stringify(teamContestList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('teamContestJson', teamContestJson)
      this.$router.push({
        path: '/student/prizeWinningTeamDetails'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    deleteTeamContest: function (index, teamContestList) {
      this.$axios
        .post('/deleteTeamContest', {
          // 后端接收的是整个 contest 对象，但是其实只用到了 id
          // 所以只要传 id 到后端就行了
          id: teamContestList[index].id
        })
        .then(successResponse => {
          this.loadTeamContest()
          this.$message({
            message: '删除了一个竞赛',
            type: 'success'
          })
          teamContestList.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    allDelete () {
      this.loadTeamContest()
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
                  // 后端接收的是整个 contest 对象，但是其实只用到了 id
                  // 所以只要传 id 到后端就行了
                  id: this.teamContestList[i].id
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
              message: '成功删除了' + this.teamContestList.length + '个竞赛',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/student/prizeWinning/teamContestList'
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
