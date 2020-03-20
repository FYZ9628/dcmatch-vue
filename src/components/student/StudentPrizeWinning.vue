<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">获奖查询</span>
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">已参加的竞赛科目列表如下：</div>
<!--      <div style="height: 160px; margin: 20px 0 0 20px">-->
<!--        <h4 style="margin-top: 10px">已参加的比赛科目列表如下：</h4>-->
<!--        <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">-->
<!--          <div v-for="(item, index) in contestList"-->
<!--               :key="item.value"-->
<!--               style="text-align: left; margin: 30px 30px 0 0">-->
<!--            <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;-->
<!--           padding: 20px 15px;">-->
<!--              <div style="width: 500px; font-size: 18px; font-weight: bolder;-->
<!--             line-height: 40px;  display: block; float: left;-->
<!--              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">-->
<!--                {{item.contestDetail.contestTitle}}-->
<!--              </div>-->
<!--              <el-button type="primary" @click="gotoPrizeWinningDetails(index, contestList)" plain style="height: 40px; display: block; float: right">-->
<!--                获奖查询-->
<!--              </el-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div v-if="contestList.length !== 0">
        <!--  可通过竞赛标题查询  -->
        <el-table
          :data="contestList.filter(data => !search || data.contestDetail.contestTitle.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          max-height="350">
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
                @click.native.prevent="deleteContest(scope.$index, contestList)"
                type="danger"
                size="small">
                删除
              </el-button>
              <el-button
                @click.native.prevent="gotoPrizeWinningDetails(scope.$index, contestList)"
                type="primary"
                size="small">
                获奖查询
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button
            @click="allDelete"
            type="primary"
            size="small"
            style="display: block; float: right; margin: 20px 20px 0 0">
            全部删除
          </el-button>
        </div>
      </div>
      <div v-if="contestList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无可查询的竞赛结果</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinning',
  data: function () {
    return {
      contestList: [],
      search: ''
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
            this.contestList = []
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
    },
    deleteContest: function (index, contestList) {
      this.$axios
        .post('/deleteContest', {
          // 后端接收的是整个 contest 对象，但是其实只用到了 id
          // 所以只要传 id 到后端就行了
          id: contestList[index].id
        })
        .then(successResponse => {
          this.loadContest()
          this.$message({
            message: '删除了一个竞赛',
            type: 'success'
          })
          contestList.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    allDelete () {
      this.loadContest()
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
                  // 后端接收的是整个 contest 对象，但是其实只用到了 id
                  // 所以只要传 id 到后端就行了
                  id: this.contestList[i].id
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
              message: '成功删除了' + this.contestList.length + '个竞赛',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/student/prizeWinning'
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
