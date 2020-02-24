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
          <el-link :underline="false" style="display: block" :href="item.link" target="_blank">
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
      tempNotice: []
    }
  },
  mounted: function () {
    this.loadNotice()
  },
  methods: {
    loadNotice () {
      let _this = this
      this.$axios.get('/getAllNotice').then(resp => {
        if (resp && resp.status === 200) {
          _this.notice = resp.data
          if (_this.notice.length >= 7) {
            for (let i = 0; i < 7; ++i) {
              let temp = {
                id: '',
                title: '',
                time: '',
                link: ''
              }
              temp.id = _this.notice[i].id
              temp.title = _this.notice[i].title
              temp.time = _this.notice[i].time
              temp.link = _this.notice[i].link
              _this.tempNotice.push(temp)
            }
          } else {
            _this.tempNotice = _this.notice
          }
        }
      })
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
