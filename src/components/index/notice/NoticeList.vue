<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader></IndexHeader>
    </el-header>
    <el-main style="margin: 0 30px">
      <el-container  v-for="(item, index) in currentPageData"
                     :key="item.value" style="min-height: 300px">
        <el-container>
          {{ currentPage - 1 > 0 ? ((currentPage - 1) * pageSize + index) : index }}
          <el-header>
            <el-button type="text" style="display: block; float: left; font-size: 18px" v-on:click="gotoNoticeDetail(item)">{{currentPageData[index].title}}</el-button>
<!--            <el-link :underline="false" style="display: block; float: left; font-size: 18px" :href="item.link" target="_blank">{{currentPageData[index].contestTitle}}</el-link>-->
            <el-container style="line-height: 30px; font-size: 12px; display: block; float: right">
              <i class="el-icon-s-custom"></i>
              <p style="line-height: 7px; font-size: 12px; display: block; float: right">{{currentPageData[index].organizer.user.name}}</p>
            </el-container>
          </el-header>
          <el-main style="text-align: left">
            <p style="font-size: 16px; max-height: 105px; overflow: hidden; text-overflow:ellipsis;">{{currentPageData[index].content}}</p>
          </el-main>
          <el-footer style="padding: 0; margin: 0">
            <p style="font-size: 12px; color: #a0a0a0;; display: block; float: left">{{currentPageData[index].time}}</p>
            <el-button type="text" style="display: block; float: right; color: #409EFF; line-height: 30px; font-size: 12px;" v-on:click="gotoNoticeDetail(item)">阅读全文</el-button>
          </el-footer>
          <el-divider></el-divider>
        </el-container>
      </el-container>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        style="padding-top: 10px; padding-right: 10px; text-align:right;"
        :total="currentTotal">
      </el-pagination>
    </el-main>
    <el-footer class="el-footer">
      <CommonFooter></CommonFooter>
    </el-footer>
  </el-container>
</template>

<script>
import IndexHeader from '@/components/index/IndexHeader'
import CommonFooter from '@/components/common/CommonFooter'
export default {
  name: 'NoticeList',
  components: {IndexHeader, CommonFooter},
  data: function () {
    return {
      currentPage: 1,
      pageSize: 2,
      currentTotal: 0,
      noticeData: [],
      contestDetailData: [],
      currentPageData: []
    }
  },
  mounted: function () {
    this.loadNotice()
    // this.loadContestDetail()
  },
  methods: {
    loadNotice () {
      let _this = this
      this.$axios.get('/getAllNotice').then(resp => {
        if (resp && resp.status === 200) {
          _this.noticeData = resp.data
          _this.currentTotal = _this.noticeData.length
          console.log(_this.noticeData)
          let currentNum1 = this.pageSize * (this.currentPage - 1)
          let endNum = currentNum1 + this.pageSize
          for (let currentNum = 0; currentNum < endNum; currentNum++) {
            if (currentNum <= this.noticeData.length - 1) {
              let tempNotice = {
                id: '',
                title: '',
                time: '',
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
                  phone: '',
                  name: ''
                },
                content: ''
              }
              tempNotice.id = _this.noticeData[currentNum].id
              tempNotice.title = _this.noticeData[currentNum].title
              tempNotice.time = _this.noticeData[currentNum].time
              tempNotice.organizer.id = _this.noticeData[currentNum].organizer.id
              tempNotice.organizer.phone = _this.noticeData[currentNum].organizer.phone
              tempNotice.organizer.name = _this.noticeData[currentNum].organizer.name
              tempNotice.organizer.user.id = _this.noticeData[currentNum].organizer.user.id
              tempNotice.organizer.user.account = _this.noticeData[currentNum].organizer.user.account
              tempNotice.organizer.user.phone = _this.noticeData[currentNum].organizer.user.phone
              tempNotice.organizer.user.password = _this.noticeData[currentNum].organizer.user.password
              tempNotice.organizer.user.name = _this.noticeData[currentNum].organizer.user.name
              tempNotice.organizer.user.type = _this.noticeData[currentNum].organizer.user.type
              tempNotice.content = this.noticeData[currentNum].content
              this.currentPageData.push(tempNotice)
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
        if (currentNum < this.noticeData.length) {
          let tempNotice = {
            id: '',
            title: '',
            time: '',
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
              phone: '',
              name: ''
            },
            content: ''
          }
          tempNotice.id = _this.noticeData[currentNum].id
          tempNotice.title = _this.noticeData[currentNum].title
          tempNotice.time = _this.noticeData[currentNum].time
          tempNotice.organizer.id = _this.noticeData[currentNum].organizer.id
          tempNotice.organizer.phone = _this.noticeData[currentNum].organizer.phone
          tempNotice.organizer.name = _this.noticeData[currentNum].organizer.name
          tempNotice.organizer.user.id = _this.noticeData[currentNum].organizer.user.id
          tempNotice.organizer.user.account = _this.noticeData[currentNum].organizer.user.account
          tempNotice.organizer.user.phone = _this.noticeData[currentNum].organizer.user.phone
          tempNotice.organizer.user.password = _this.noticeData[currentNum].organizer.user.password
          tempNotice.organizer.user.name = _this.noticeData[currentNum].organizer.user.name
          tempNotice.organizer.user.type = _this.noticeData[currentNum].organizer.user.type
          tempNotice.content = this.noticeData[currentNum].content
          this.currentPageData.push(tempNotice)
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
        if (currentNum < this.noticeData.length) {
          let tempNotice = {
            id: '',
            title: '',
            time: '',
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
              phone: '',
              name: ''
            },
            content: ''
          }
          tempNotice.id = _this.noticeData[currentNum].id
          tempNotice.title = _this.noticeData[currentNum].title
          tempNotice.time = _this.noticeData[currentNum].time
          tempNotice.organizer.id = _this.noticeData[currentNum].organizer.id
          tempNotice.organizer.phone = _this.noticeData[currentNum].organizer.phone
          tempNotice.organizer.name = _this.noticeData[currentNum].organizer.name
          tempNotice.organizer.user.id = _this.noticeData[currentNum].organizer.user.id
          tempNotice.organizer.user.account = _this.noticeData[currentNum].organizer.user.account
          tempNotice.organizer.user.phone = _this.noticeData[currentNum].organizer.user.phone
          tempNotice.organizer.user.password = _this.noticeData[currentNum].organizer.user.password
          tempNotice.organizer.user.name = _this.noticeData[currentNum].organizer.user.name
          tempNotice.organizer.user.type = _this.noticeData[currentNum].organizer.user.type
          tempNotice.content = this.noticeData[currentNum].content
          this.currentPageData.push(tempNotice)
        }
      }
    },
    gotoNoticeDetail: function (notice) {
      let noticeJson = JSON.stringify(notice)
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('noticeJson', noticeJson)
      this.$router.push({
        path: '/index/noticeDetails'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    }
    // loadContestDetail () {
    //   let _this = this
    //   this.$axios.get('/getAllContestDetail').then(resp => {
    //     if (resp && resp.status === 200) {
    //       _this.contestDetailData = resp.data
    //       _this.currentTotal = _this.contestDetailData.length
    //       let currentNum1 = this.pageSize * (this.currentPage - 1)
    //       let endNum = currentNum1 + this.pageSize
    //       for (let currentNum = 0; currentNum < endNum; currentNum++) {
    //         if (currentNum < this.contestDetailData.length - 1) {
    //           let tempContestDetail = {
    //             id: '',
    //             contestTitle: '',
    //             organizer: {
    //               id: '',
    //               user: {
    //                 id: '',
    //                 account: '',
    //                 phone: '',
    //                 password: '',
    //                 name: '',
    //                 type: ''
    //               },
    //               phone: '',
    //               name: ''
    //             },
    //             contestContent: '',
    //             startTime: '',
    //             endTime: '',
    //             publishTime: '',
    //             link: ''
    //           }
    //           tempContestDetail.id = _this.contestDetailData[currentNum].id
    //           tempContestDetail.contestTitle = _this.contestDetailData[currentNum].contestTitle
    //           tempContestDetail.organizer.id = _this.contestDetailData[currentNum].organizer.id
    //           tempContestDetail.organizer.phone = _this.contestDetailData[currentNum].organizer.phone
    //           tempContestDetail.organizer.name = _this.contestDetailData[currentNum].organizer.name
    //           tempContestDetail.organizer.user.id = _this.contestDetailData[currentNum].organizer.user.id
    //           tempContestDetail.organizer.user.account = _this.contestDetailData[currentNum].organizer.user.account
    //           tempContestDetail.organizer.user.phone = _this.contestDetailData[currentNum].organizer.user.phone
    //           tempContestDetail.organizer.user.password = _this.contestDetailData[currentNum].organizer.user.password
    //           tempContestDetail.organizer.user.name = _this.contestDetailData[currentNum].organizer.user.name
    //           tempContestDetail.organizer.user.type = _this.contestDetailData[currentNum].organizer.user.type
    //           tempContestDetail.contestContent = _this.contestDetailData[currentNum].contestContent
    //           tempContestDetail.startTime = _this.contestDetailData[currentNum].startTime
    //           tempContestDetail.endTime = _this.contestDetailData[currentNum].endTime
    //           tempContestDetail.publishTime = _this.contestDetailData[currentNum].publishTime
    //           tempContestDetail.link = _this.contestDetailData[currentNum].link
    //           this.currentPageData.push(tempContestDetail)
    //         }
    //       }
    //     }
    //   })
    // },
    // handleSizeChange (val) {
    //   let _this = this
    //   this.pageSize = val
    //   console.log(`每页 ${val} 条`)
    //   let currentNum1 = this.pageSize * (this.currentPage - 1)
    //   let endNum = currentNum1 + this.pageSize
    //   this.currentPageData = []
    //   for (let currentNum = currentNum1; currentNum < endNum; currentNum++) {
    //     if (currentNum < this.contestDetailData.length) {
    //       let tempContestDetail = {
    //         id: '',
    //         contestTitle: '',
    //         organizer: {
    //           id: '',
    //           user: {
    //             id: '',
    //             account: '',
    //             phone: '',
    //             password: '',
    //             name: '',
    //             type: ''
    //           },
    //           phone: '',
    //           name: ''
    //         },
    //         contestContent: '',
    //         startTime: '',
    //         endTime: '',
    //         publishTime: '',
    //         link: ''
    //       }
    //       tempContestDetail.id = _this.contestDetailData[currentNum].id
    //       tempContestDetail.contestTitle = _this.contestDetailData[currentNum].contestTitle
    //       tempContestDetail.organizer.id = _this.contestDetailData[currentNum].organizer.id
    //       tempContestDetail.organizer.phone = _this.contestDetailData[currentNum].organizer.phone
    //       tempContestDetail.organizer.name = _this.contestDetailData[currentNum].organizer.name
    //       tempContestDetail.organizer.user.id = _this.contestDetailData[currentNum].organizer.user.id
    //       tempContestDetail.organizer.user.account = _this.contestDetailData[currentNum].organizer.user.account
    //       tempContestDetail.organizer.user.phone = _this.contestDetailData[currentNum].organizer.user.phone
    //       tempContestDetail.organizer.user.password = _this.contestDetailData[currentNum].organizer.user.password
    //       tempContestDetail.organizer.user.name = _this.contestDetailData[currentNum].organizer.user.name
    //       tempContestDetail.organizer.user.type = _this.contestDetailData[currentNum].organizer.user.type
    //       tempContestDetail.contestContent = _this.contestDetailData[currentNum].contestContent
    //       tempContestDetail.startTime = _this.contestDetailData[currentNum].startTime
    //       tempContestDetail.endTime = _this.contestDetailData[currentNum].endTime
    //       tempContestDetail.publishTime = _this.contestDetailData[currentNum].publishTime
    //       tempContestDetail.link = _this.contestDetailData[currentNum].link
    //       this.currentPageData.push(tempContestDetail)
    //     }
    //   }
    // },
    // handleCurrentChange (val) {
    //   let _this = this
    //   this.currentPage = val
    //   console.log(`当前页: ${val}`)
    //   let currentNum1 = this.pageSize * (this.currentPage - 1)
    //   let endNum = currentNum1 + this.pageSize
    //   this.currentPageData = []
    //   for (let currentNum = currentNum1; currentNum < endNum; currentNum++) {
    //     if (currentNum < this.contestDetailData.length) {
    //       let tempContestDetail = {
    //         id: '',
    //         contestTitle: '',
    //         organizer: {
    //           id: '',
    //           user: {
    //             id: '',
    //             account: '',
    //             phone: '',
    //             password: '',
    //             name: '',
    //             type: ''
    //           },
    //           phone: '',
    //           name: ''
    //         },
    //         contestContent: '',
    //         startTime: '',
    //         endTime: '',
    //         publishTime: '',
    //         link: ''
    //       }
    //       tempContestDetail.id = _this.contestDetailData[currentNum].id
    //       tempContestDetail.contestTitle = _this.contestDetailData[currentNum].contestTitle
    //       tempContestDetail.organizer.id = _this.contestDetailData[currentNum].organizer.id
    //       tempContestDetail.organizer.phone = _this.contestDetailData[currentNum].organizer.phone
    //       tempContestDetail.organizer.name = _this.contestDetailData[currentNum].organizer.name
    //       tempContestDetail.organizer.user.id = _this.contestDetailData[currentNum].organizer.user.id
    //       tempContestDetail.organizer.user.account = _this.contestDetailData[currentNum].organizer.user.account
    //       tempContestDetail.organizer.user.phone = _this.contestDetailData[currentNum].organizer.user.phone
    //       tempContestDetail.organizer.user.password = _this.contestDetailData[currentNum].organizer.user.password
    //       tempContestDetail.organizer.user.name = _this.contestDetailData[currentNum].organizer.user.name
    //       tempContestDetail.organizer.user.type = _this.contestDetailData[currentNum].organizer.user.type
    //       tempContestDetail.contestContent = _this.contestDetailData[currentNum].contestContent
    //       tempContestDetail.startTime = _this.contestDetailData[currentNum].startTime
    //       tempContestDetail.endTime = _this.contestDetailData[currentNum].endTime
    //       tempContestDetail.publishTime = _this.contestDetailData[currentNum].publishTime
    //       tempContestDetail.link = _this.contestDetailData[currentNum].link
    //       this.currentPageData.push(tempContestDetail)
    //     }
    //   }
    // },
  }
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  .el-header {
    padding: 0;
    margin: 0;
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
