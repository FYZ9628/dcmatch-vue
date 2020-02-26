<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader></IndexHeader>
    </el-header>
    <el-main>
      <el-container style="margin: 0 200px; text-align: left">
        <el-header>
            <h3 style="float: left; font-size: 24px">{{contestDetailData.contestTitle}}</h3>
        </el-header>
        <el-header>
          <p style="font-size: 14px; color: #a0a0a0;; display: block; float: left">{{contestDetailData.publishTime}}</p>
          <i class="el-icon-s-custom"></i>
          <p style="display: block; float: left; color: #000000;  font-size: 14px; line-height: 16px;">{{contestDetailData.organizer.user.name}}</p>
        </el-header>
        <el-main style="margin: 0; padding: 0">
          <p>{{contestDetailData.contestContent}}</p>
        </el-main>
      </el-container>
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
  name: 'NoticeDetails',
  components: {IndexHeader, CommonFooter},
  data: function () {
    return {
      contestDetailData: '',
      noticeData: []
    }
  },
  mounted: function () {
    // this.loadNotice()
    console.log(this.contestDetailData)
    // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
    // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetailData = JSON.parse(contestDetailJson)
    console.log(contestDetailJson)
  },
  methods: {
    // loadNotice () {
    //   let _this = this
    //   this.$axios.get('/getAllNotice').then(resp => {
    //     if (resp && resp.status === 200) {
    //       _this.noticeData = resp.data
    //       console.log(_this.noticeData)
    //     }
    //   })
    // }
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
    margin: 0 5px 0 50px;
    display: block;
    line-height: 43px;
    float: left;
  }
  .el-footer {
    padding: 0;
    margin: 0 0 0 0;
  }
</style>
