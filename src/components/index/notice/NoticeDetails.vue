<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <!--      已登录就显示 CommonHeader 没有登录就显示 IndexHeader-->
      <div v-if="isLogin === true">
        <CommonHeader></CommonHeader>
      </div>
      <div v-if="isLogin === false">
        <IndexHeader></IndexHeader>
      </div>
    </el-header>
    <el-main style="margin: 0 auto">
      <el-container style="width: 800px; text-align: left; min-height: 300px">
        <el-header>
            <h3 style="float: left; font-size: 24px">{{noticeData.title}}</h3>
        </el-header>
        <el-header>
          <p style="font-size: 14px; color: #a0a0a0;; display: block; float: left">{{noticeData.time}}</p>
          <i class="el-icon-s-custom"></i>
          <p style="display: block; float: left; color: #000000;  font-size: 14px; line-height: 16px;">{{noticeData.organizer.user.name}}</p>
        </el-header>
        <el-main style="margin: 0; padding: 0">
          <p>{{noticeData.content}}</p>
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
import CommonHeader from '@/components/common/CommonHeader'
import CommonFooter from '@/components/common/CommonFooter'
export default {
  name: 'NoticeDetails',
  components: {IndexHeader, CommonHeader, CommonFooter},
  data: function () {
    return {
      noticeData: [],
      isLogin: false
    }
  },
  mounted: function () {
    console.log(this.noticeData)
    // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
    // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
    let noticeJson = sessionStorage.getItem('noticeJson')
    this.noticeData = JSON.parse(noticeJson)
    console.log(noticeJson)
    if (this.$store.getters.name) {
      this.isLogin = true
    }
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
