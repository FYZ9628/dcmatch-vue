<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的大赛</span>
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">已结束的竞赛科目列表如下：</div>
      <div v-if="contestDetailList.length !== 0">
        <!--  可通过竞赛标题查询  -->
        <el-table
          :data="contestDetailList.filter(data => !search || data.contestTitle.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          max-height="350">
          <el-table-column
            fixed
            prop="contestTitle"
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
                @click.native.prevent="deleteContestDetails(scope.$index, contestDetailList)"
                type="danger"
                size="small">
                删除
              </el-button>
              <el-button
                @click.native.prevent="gotoPrizeWinningDetails(scope.$index, contestDetailList)"
                type="primary"
                size="small">
                查看详情
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
      <!--  -------------------------------------------- 分界线 以下是另一种做法 -------------------------------------------------------  -->
      <!--      <div style="height: 160px; margin: 10px 0 0 20px">-->
      <!--        <span style="margin-top: 10px; font-weight: bolder">进行中的比赛科目列表如下：</span>-->
      <!--        <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">-->
      <!--          <div v-for="(item, index) in contestDetailList"-->
      <!--               :key="item.value"-->
      <!--               style="text-align: left; margin: 30px 30px 0 0">-->
      <!--            <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;-->
      <!--           padding: 20px 15px;">-->
      <!--              <div style="width: 450px; font-size: 18px; font-weight: bolder;-->
      <!--             line-height: 40px;  display: block; float: left;-->
      <!--              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">-->
      <!--                {{item.contestTitle}}-->
      <!--              </div>-->
      <!--              <el-button type="danger" @click="deleteContestDetails(index, contestDetailList)" style="height: 40px; display: block; float: left; margin-left: 10px">-->
      <!--                删除-->
      <!--              </el-button>-->
      <!--              <el-button type="primary" @click="gotoContestDetails(index, contestDetailList)" plain style="height: 40px; display: block; float: right">-->
      <!--                查看详情-->
      <!--              </el-button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="contestDetailList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无可查询的竞赛</el-tag>
      </div>
    </div>
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
  </div>
</template>

<script>
export default {
  name: 'OrganizerPrizeWinning',
  data: function () {
    return {
      organizerData: {
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
        schoolRunningType: ''
      },
      contestDetailList: [],
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
        type: '',
        state: ''
      },
      search: ''
    }
  },
  mounted: function () {
    this.loadOrganizer()
    this.loadContestDetail()
  },
  methods: {
    loadOrganizer () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchOrganizerByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.organizerData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    loadContestDetail () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestDetailByOrganizerAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.contestDetailList = []
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state === '查看成绩阶段') {
                this.contestDetailList.push(successResponse.data[i])
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
    gotoPrizeWinningDetails: function (index, contestDetailList) {
      let contestDetailJson = JSON.stringify(contestDetailList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('contestDetailJson', contestDetailJson)
      this.$router.push({
        path: '/organizer/prizeWinningDetails'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    deleteContestDetails: function (index, contestDetailList) {
      this.$axios
        .post('/deleteContestDetail', {
          id: contestDetailList[index].id,
          contestTitle: contestDetailList[index].contestTitle,
          organizer: this.organizerData,
          contestContent: contestDetailList[index].contestContent,
          signUpStartTime: contestDetailList[index].signUpStartTime,
          signUpEndTime: contestDetailList[index].signUpEndTime,
          // 获取当前时间
          publishTime: contestDetailList[index].publishTime,
          place: contestDetailList[index].place,
          holdDate: contestDetailList[index].holdDate,
          holdStartTime: contestDetailList[index].holdStartTime,
          holdEndTime: contestDetailList[index].holdEndTime,
          type: contestDetailList[index].type,
          upperLimit: contestDetailList[index].upperLimit,
          state: contestDetailList[index].state
        })
        .then(successResponse => {
          this.loadContestDetail()
          this.$message({
            message: '删除了一个竞赛',
            type: 'success'
          })
          contestDetailList.splice(index, 1)
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
      if (this.contestDetailList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.contestDetailList.length; i++) {
              this.$axios
                .post('/deleteContestDetail', {
                  id: this.contestDetailList[i].id,
                  contestTitle: this.contestDetailList[i].contestTitle,
                  organizer: this.organizerData,
                  contestContent: this.contestDetailList[i].contestContent,
                  signUpStartTime: this.contestDetailList[i].signUpStartTime,
                  signUpEndTime: this.contestDetailList[i].signUpEndTime,
                  // 获取当前时间
                  publishTime: this.contestDetailList[i].publishTime,
                  place: this.contestDetailList[i].place,
                  holdDate: this.contestDetailList[i].holdDate,
                  holdStartTime: this.contestDetailList[i].holdStartTime,
                  holdEndTime: this.contestDetailList[i].holdEndTime,
                  type: this.contestDetailList[i].type,
                  upperLimit: this.contestDetailList[i].upperLimit,
                  state: this.contestDetailList[i].state
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
              message: '成功删除了' + this.contestDetailList.length + '个比赛',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/organizer/myContest'
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
