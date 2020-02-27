<template>
  <div class="aside">
    <div class="aside-top">
      <p class="aside-title">大赛通知</p>
      <a href="http://localhost:8081/index/noticeList" target="_blank">MORE>></a>
    </div>
    <div style="margin-top: 18px">
      <div v-for="item in tempNotice"
           :key="item.value" class="content">
        <div class="content_title">
          <el-link :underline="false" style="display: block" v-on:click="gotoNoticeDetail(item)" target="_blank">
            <i class="el-icon-caret-right"></i>
            <p class="content_title_text">{{item.title +"    "}}</p>
            <p class="content_title_time">{{item.time }}</p>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexAside',
  data: function () {
    return {
      notice: [],
      tempNotice: [],
      contestDetail: [],
      tempContestDetail: []
    }
  },
  mounted: function () {
    this.loadNotice()
    this.loadContestDetail()
  },
  methods: {
    loadNotice () {
      let _this = this
      this.$axios.get('/getAllNotice').then(resp => {
        if (resp && resp.status === 200) {
          _this.notice = resp.data
          if (_this.notice.length >= 7) {
            for (let i = 0; i < 7; ++i) {
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
              tempNotice.id = _this.noticeData[i].id
              tempNotice.title = _this.noticeData[i].title
              tempNotice.time = _this.noticeData[i].time
              tempNotice.organizer.id = _this.noticeData[i].organizer.id
              tempNotice.organizer.phone = _this.noticeData[i].organizer.phone
              tempNotice.organizer.name = _this.noticeData[i].organizer.name
              tempNotice.organizer.user.id = _this.noticeData[i].organizer.user.id
              tempNotice.organizer.user.account = _this.noticeData[i].organizer.user.account
              tempNotice.organizer.user.phone = _this.noticeData[i].organizer.user.phone
              tempNotice.organizer.user.password = _this.noticeData[i].organizer.user.password
              tempNotice.organizer.user.name = _this.noticeData[i].organizer.user.name
              tempNotice.organizer.user.type = _this.noticeData[i].organizer.user.type
              tempNotice.content = this.noticeData[i].content
              _this.tempNotice.push(tempNotice)
            }
          } else {
            _this.tempNotice = _this.notice
          }
        }
      })
    },
    loadContestDetail () {
      let _this = this
      this.$axios.get('/getAllContestDetail').then(resp => {
        if (resp && resp.status === 200) {
          _this.contestDetail = resp.data
          if (_this.contestDetail.length >= 7) {
            for (let i = 0; i < 7; ++i) {
              let tempContestDetail = {
                id: '',
                contestTitle: '',
                organizerId: '',
                contestContent: '',
                startTime: '',
                endTime: '',
                publishTime: '',
                link: ''
              }
              tempContestDetail.id = _this.contestDetail[i].id
              tempContestDetail.contestTitle = _this.contestDetail[i].contestTitle
              tempContestDetail.organizerId = _this.contestDetail[i].organizerId
              tempContestDetail.contestContent = _this.contestDetail[i].contestContent
              tempContestDetail.startTime = _this.contestDetail[i].startTime
              tempContestDetail.endTime = _this.contestDetail[i].endTime
              tempContestDetail.publishTime = _this.contestDetail[i].publishTime
              tempContestDetail.link = _this.contestDetail[i].link
              _this.tempContestDetail.push(tempContestDetail)
            }
            console.log(_this.tempContestDetail)
          } else {
            _this.tempContestDetail = _this.contestDetail
            console.log(_this.tempContestDetail)
          }
        }
      })
    },
    gotoNoticeDetail: function (notice) {
      let noticeJson = JSON.stringify(notice)
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('noticeJson', noticeJson)
      // 点击后新开一个窗口
      window.open(
        this.$router.resolve({
          path: '/index/noticeDetails'
        }).href, '_blank'
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
    }
  }
}
</script>

<style scoped>
  .aside {
    /*height: 300px;*/
  }
  .aside-top {
    height: 50px;
    width: 100%;
    border-bottom: solid 1px #eee;
  }
  .aside-top p {
    padding: 0;
    margin: 0 0 0 20px;
  }
  .aside-title {
    display: block;
    font-size: 18px;
    color: #4ea2e2;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    float: left;
  }
  .aside-top a {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #999999;
    margin-right: 20px;
    float: right;
    text-decoration: none;
  }
  .content {
    display: block;
    font-size: 14px;
    text-align: left;
    margin-left: 20px;
    line-height: 36px;
  }
  .content_title {
    height: 36px;
    width: 100%;
    /*border-bottom: solid 1px #eee;*/
  }
  .content_title_text {
    padding: 0;
    margin: 0;
    display: block;
    font-size: 14px;
    line-height: 30px;
    float: left;
  }
  .content_title_time {
    padding: 0;
    margin: 0 20px 0 0;
    font-size: 14px;
    line-height: 30px;
    display: block;
    float: right;
  }
  .el-icon-caret-right {
    padding: 0;
    margin: 0 5px 0 0;
    display: block;
    line-height: 30px;
    float: left;
  }
</style>
