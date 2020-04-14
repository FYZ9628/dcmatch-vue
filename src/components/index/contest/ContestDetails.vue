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
    <el-main style="margin: 0 auto;">
      <el-container style="width: 800px; text-align: left; min-height: 300px">
        <el-header>
          <h3 style="float: left; font-size: 24px">{{contestDetailData.contestTitle}}</h3>
        </el-header>
        <el-header height="50px">
          <div style="display: block; float: left">
            <el-row style="line-height: 30px">
              <p style="width: 280px; font-size: 14px; color: #a0a0a0; display: block; float: left; padding: 0; margin: 0">发布时间：{{contestDetailData.publishTime}}</p>
              <i class="el-icon-s-custom"></i>
              <p style="display: block; float: left; color: #000000; line-height: 28px; font-size: 14px; padding: 0; margin: 0">{{contestDetailData.organizer.school}}{{contestDetailData.organizer.user.name}}</p>
            </el-row>
            <el-row>
              <p style="width: 280px; font-size: 14px; color: #5c5c5c; display: block; float: left; padding: 0; margin: 0">报名开始时间：{{contestDetailData.signUpStartTime}}</p>
              <p style="font-size: 14px; color: #5c5c5c; display: block; float: left; margin: 0 0 0 50px; padding: 0;">报名截止时间：{{contestDetailData.signUpEndTime}}</p>
            </el-row>
            <el-row>
              <p style="width: 280px; font-size: 14px; color: #5c5c5c; display: block; float: left; padding: 0; margin: 0">
                举办时间：{{contestDetailData.holdDate}}  {{contestDetailData.holdStartTime}} - {{contestDetailData.holdEndTime}}
              </p>
            </el-row>
          </div>
          <div  style="display: block; float: right">
            <el-button class="sign-up" @click="signUp">报名</el-button>
          </div>
        </el-header>
        <el-main style="margin: 0; padding: 30px 0">
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
import CommonHeader from '@/components/common/CommonHeader'
import CommonFooter from '@/components/common/CommonFooter'
export default {
  name: 'ContestDetails',
  components: {CommonHeader, CommonFooter, IndexHeader},
  data: function () {
    return {
      contestDetailData: '',
      isLogin: false,
      isLoginState: 0
    }
  },
  mounted: function () {
    console.log(this.contestDetailData)
    // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
    // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetailData = JSON.parse(contestDetailJson)
    console.log(contestDetailJson)
    if (this.$store.getters.name) {
      this.isLogin = true
      let code = this.$store.getters.code
      // 返回码：100对应管理员，200对应教师，300对应学生，400是错误码
      // 500是默认用户(即还没有认证的用户)，600对应院校
      // 用 == 号的原因是登录后不能马上刷新
      // === 号是要值和类型都相等才行，而 == 号是只要值相等就行了
      // eslint-disable-next-line eqeqeq
      if (code == '200') {
        this.isLoginState = 200
      }
      // eslint-disable-next-line eqeqeq
      if (code == '300') {
        this.isLoginState = 300
      }
      // eslint-disable-next-line eqeqeq
      if (code == '500') {
        this.isLoginState = 500
      }
      // eslint-disable-next-line eqeqeq
      if (code == '600') {
        this.isLoginState = 600
      }
    }
  },
  methods: {
    signUp: function () {
      if (this.$store.getters.name) {
        if (this.contestDetailData.type === '个人赛') {
          let signUpContestDetailJson = JSON.stringify(this.contestDetailData)
          // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
          // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
          sessionStorage.setItem('signUpContestDetailJson', signUpContestDetailJson)
          if (this.isLoginState === 300) {
            this.$router.push({
              path: '/index/signUp'
              // name: 'noticeDetails/'
              // query: {
              //   data: contestDetailJson
              // // 以加问号接续的方式显示内容
              // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
              // }
            })
          } else if (this.isLoginState === 500) {
            this.$message({
              message: '请先认证',
              type: 'error'
            })
          } else {
            this.$message({
              message: '只有学生才可以报名个人赛',
              type: 'error'
            })
          }
        }
        if (this.contestDetailData.type === '团队赛') {
          let signUpContestDetailJson = JSON.stringify(this.contestDetailData)
          // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
          // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
          sessionStorage.setItem('signUpContestDetailJson', signUpContestDetailJson)
          if (this.isLoginState === 300 || this.isLoginState === 200) {
            this.$router.push({
              path: '/index/teamSignUp'
              // name: 'noticeDetails/'
              // query: {
              //   data: contestDetailJson
              // // 以加问号接续的方式显示内容
              // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
              // }
            })
          } else if (this.isLoginState === 500) {
            this.$message({
              message: '请先认证',
              type: 'error'
            })
          } else {
            this.$message({
              message: '只有学生和教师才可以报名团队赛',
              type: 'error'
            })
          }
        }
      } else {
        this.$message({
          message: '请先登录',
          type: 'error'
        })
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
  .el-icon-s-custom {
    padding: 0;
    margin: 0 5px 0 50px;
    display: block;
    line-height: 25px;
    float: left;
  }
  .sign-up {
    width: 80px;
    height: 40px;
    line-height: 40px;
    background-color: #4ea2e2;
    color: white;
    padding: 0;
    font-size: 18px;
    margin-right: 20px;
  }
  .el-footer {
    padding: 0;
    margin: 0 0 0 0;
  }
</style>
