<template>
  <el-container class="container">
    <el-header class="el-header" style="padding-left: 50px">
      <el-input
        @keyup.enter.native="searchClick"
        placeholder="通过竞赛名称或发布方搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 400px;margin-right: 10px; margin-top: 20px"
        v-model="keywords">
      </el-input>
      <el-button size="medium" type="primary" icon="el-icon-search" style="background-color: #545c64"
                 @click="searchClick">搜 索</el-button>
    </el-header>
    <el-main style="min-width: 1050px; margin: 0 50px">
      <el-container  v-for="(item, index) in currentPageData"
                     :key="item.value">
        <el-container>
<!--          {{ currentPage - 1 > 0 ? ((currentPage - 1) * pageSize + index) : index }}-->
          <el-header>
            <el-button type="text" style="display: block; float: left; font-size: 18px" v-on:click="gotoCompetitionDetail(item)">{{currentPageData[index].contestTitle}}</el-button>
            <!--            <el-link :underline="false" style="display: block; float: left; font-size: 18px" :href="item.link" target="_blank">{{currentPageData[index].contestTitle}}</el-link>-->
            <el-container style="line-height: 30px; font-size: 12px; display: block; float: right">
              <i class="el-icon-s-custom"></i>
              <p style="line-height: 7px; font-size: 12px; display: block; float: right">{{currentPageData[index].organizer.school}}{{currentPageData[index].organizer.user.name}}</p>
            </el-container>
          </el-header>
          <el-main style="text-align: left; padding: 0">
            <p style="font-size: 16px; max-height: 105px; overflow: hidden; text-overflow:ellipsis;">{{currentPageData[index].contestContent}}</p>
          </el-main>
          <el-footer style="padding: 0; margin: 0">
            <p style="font-size: 12px; color: #a0a0a0;; display: block; float: left">发布时间：{{currentPageData[index].publishTime}}</p>
            <p style="font-size: 12px; color: #5c5c5c;; display: block; float: left; margin-left: 50px">报名开始时间：{{currentPageData[index].signUpStartTime}}</p>
            <p style="font-size: 12px; color: #5c5c5c;; display: block; float: left; margin-left: 50px">报名截止时间：{{currentPageData[index].signUpEndTime}}</p>
            <p style="font-size: 12px; color: #5c5c5c;; display: block; float: left; margin-left: 50px">
              举办时间：{{currentPageData[index].holdDate}}  {{currentPageData[index].holdStartTime}} - {{currentPageData[index].holdEndTime}}
            </p>
            <el-button type="text" style="display: block; float: right; color: #409EFF; line-height: 30px; font-size: 12px;" v-on:click="gotoCompetitionDetail(item)">详 情</el-button>
          </el-footer>
          <el-divider></el-divider>
        </el-container>
      </el-container>
    </el-main>
    <el-footer class="el-footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        style="padding-top: 10px; padding-right: 50px; text-align:right;"
        :total="currentTotal">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'AllContest',
  data: function () {
    return {
      currentPage: 1,
      pageSize: 2,
      currentTotal: 0,
      noticeData: [],
      contestDetailData: [],
      currentPageData: [],
      keywords: '',
      searchResult: []
    }
  },
  mounted: function () {
    // this.loadNotice()
    this.loadContestDetail()
  },
  methods: {
    loadContestDetail () {
      let _this = this
      this.$axios.get('/getAllContestDetail').then(resp => {
        if (resp && resp.status === 200) {
          _this.contestDetailData = resp.data
          _this.currentTotal = _this.contestDetailData.length
          let currentNum1 = this.pageSize * (this.currentPage - 1)
          let endNum = currentNum1 + this.pageSize
          for (let currentNum = 0; currentNum < endNum; currentNum++) {
            if (currentNum <= this.contestDetailData.length - 1) {
              let tempContestDetail = {
                id: _this.contestDetailData[currentNum].id,
                contestTitle: _this.contestDetailData[currentNum].contestTitle,
                organizer: {
                  id: _this.contestDetailData[currentNum].organizer.id,
                  user: {
                    id: _this.contestDetailData[currentNum].organizer.user.id,
                    account: _this.contestDetailData[currentNum].organizer.user.account,
                    phone: _this.contestDetailData[currentNum].organizer.user.phone,
                    password: _this.contestDetailData[currentNum].organizer.user.password,
                    name: _this.contestDetailData[currentNum].organizer.user.name,
                    type: _this.contestDetailData[currentNum].organizer.user.type
                  },
                  email: _this.contestDetailData[currentNum].organizer.email,
                  school: _this.contestDetailData[currentNum].organizer.school,
                  establishDate: _this.contestDetailData[currentNum].organizer.establishDate,
                  schoolType: _this.contestDetailData[currentNum].organizer.schoolType,
                  schoolRunningType: _this.contestDetailData[currentNum].organizer.schoolRunningType,
                  idImg: _this.contestDetailData[currentNum].organizer.idImg
                },
                contestContent: _this.contestDetailData[currentNum].contestContent,
                signUpStartTime: _this.contestDetailData[currentNum].signUpStartTime,
                signUpEndTime: _this.contestDetailData[currentNum].signUpEndTime,
                publishTime: _this.contestDetailData[currentNum].publishTime,
                place: _this.contestDetailData[currentNum].place,
                holdDate: _this.contestDetailData[currentNum].holdDate,
                holdStartTime: _this.contestDetailData[currentNum].holdStartTime,
                holdEndTime: _this.contestDetailData[currentNum].holdEndTime,
                type: _this.contestDetailData[currentNum].type,
                upperLimit: _this.contestDetailData[currentNum].upperLimit,
                state: _this.contestDetailData[currentNum].state
              }
              this.currentPageData.push(tempContestDetail)
            }
          }
        }
      })
    },
    handleSizeChange (val) {
      let _this = this
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      let currentNum1 = this.pageSize * (this.currentPage - 1)
      let endNum = currentNum1 + this.pageSize
      this.currentPageData = []
      for (let currentNum = currentNum1; currentNum < endNum; currentNum++) {
        if (currentNum < this.contestDetailData.length) {
          let tempContestDetail = {
            id: _this.contestDetailData[currentNum].id,
            contestTitle: _this.contestDetailData[currentNum].contestTitle,
            organizer: {
              id: _this.contestDetailData[currentNum].organizer.id,
              user: {
                id: _this.contestDetailData[currentNum].organizer.user.id,
                account: _this.contestDetailData[currentNum].organizer.user.account,
                phone: _this.contestDetailData[currentNum].organizer.user.phone,
                password: _this.contestDetailData[currentNum].organizer.user.password,
                name: _this.contestDetailData[currentNum].organizer.user.name,
                type: _this.contestDetailData[currentNum].organizer.user.type
              },
              email: _this.contestDetailData[currentNum].organizer.email,
              school: _this.contestDetailData[currentNum].organizer.school,
              establishDate: _this.contestDetailData[currentNum].organizer.establishDate,
              schoolType: _this.contestDetailData[currentNum].organizer.schoolType,
              schoolRunningType: _this.contestDetailData[currentNum].organizer.schoolRunningType,
              idImg: _this.contestDetailData[currentNum].organizer.idImg
            },
            contestContent: _this.contestDetailData[currentNum].contestContent,
            signUpStartTime: _this.contestDetailData[currentNum].signUpStartTime,
            signUpEndTime: _this.contestDetailData[currentNum].signUpEndTime,
            publishTime: _this.contestDetailData[currentNum].publishTime,
            place: _this.contestDetailData[currentNum].place,
            holdDate: _this.contestDetailData[currentNum].holdDate,
            holdStartTime: _this.contestDetailData[currentNum].holdStartTime,
            holdEndTime: _this.contestDetailData[currentNum].holdEndTime,
            type: _this.contestDetailData[currentNum].type,
            upperLimit: _this.contestDetailData[currentNum].upperLimit,
            state: _this.contestDetailData[currentNum].state
          }
          this.currentPageData.push(tempContestDetail)
        }
      }
    },
    handleCurrentChange (val) {
      let _this = this
      this.currentPage = val
      console.log(`当前页: ${val}`)
      let currentNum1 = this.pageSize * (this.currentPage - 1)
      let endNum = currentNum1 + this.pageSize
      this.currentPageData = []
      for (let currentNum = currentNum1; currentNum < endNum; currentNum++) {
        if (currentNum < this.contestDetailData.length) {
          let tempContestDetail = {
            id: _this.contestDetailData[currentNum].id,
            contestTitle: _this.contestDetailData[currentNum].contestTitle,
            organizer: {
              id: _this.contestDetailData[currentNum].organizer.id,
              user: {
                id: _this.contestDetailData[currentNum].organizer.user.id,
                account: _this.contestDetailData[currentNum].organizer.user.account,
                phone: _this.contestDetailData[currentNum].organizer.user.phone,
                password: _this.contestDetailData[currentNum].organizer.user.password,
                name: _this.contestDetailData[currentNum].organizer.user.name,
                type: _this.contestDetailData[currentNum].organizer.user.type
              },
              email: _this.contestDetailData[currentNum].organizer.email,
              school: _this.contestDetailData[currentNum].organizer.school,
              establishDate: _this.contestDetailData[currentNum].organizer.establishDate,
              schoolType: _this.contestDetailData[currentNum].organizer.schoolType,
              schoolRunningType: _this.contestDetailData[currentNum].organizer.schoolRunningType,
              idImg: _this.contestDetailData[currentNum].organizer.idImg
            },
            contestContent: _this.contestDetailData[currentNum].contestContent,
            signUpStartTime: _this.contestDetailData[currentNum].signUpStartTime,
            signUpEndTime: _this.contestDetailData[currentNum].signUpEndTime,
            publishTime: _this.contestDetailData[currentNum].publishTime,
            place: _this.contestDetailData[currentNum].place,
            holdDate: _this.contestDetailData[currentNum].holdDate,
            holdStartTime: _this.contestDetailData[currentNum].holdStartTime,
            holdEndTime: _this.contestDetailData[currentNum].holdEndTime,
            type: _this.contestDetailData[currentNum].type,
            upperLimit: _this.contestDetailData[currentNum].upperLimit,
            state: _this.contestDetailData[currentNum].state
          }
          this.currentPageData.push(tempContestDetail)
        }
      }
    },
    gotoCompetitionDetail: function (contestDetail) {
      let contestDetailJson = JSON.stringify(contestDetail)
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('contestDetailJson', contestDetailJson)
      this.$router.push({
        path: '/index/contestDetails'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    // 查询
    searchClick () {
      let _this = this
      this.$axios
        .post('/searchContestDetail', {
          keywords: this.keywords
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.searchResult = resp.data
            _this.contestDetailData = _this.searchResult
            console.log(resp.data)
            _this.handleCurrentChange(1)
            _this.currentTotal = _this.contestDetailData.length
          }
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
    text-align: left;
  }
  .el-icon-s-custom {
    padding: 0;
    margin: 0 5px 0 0;
    display: block;
    line-height: 30px;
    float: left;
  }
  .el-footer {
    padding: 0;
    margin: 10px 0 0 0;
  }
</style>
