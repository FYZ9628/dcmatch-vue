<template>
  <el-container class="container">
    <el-header class="el-header" style="height: 80px">
      <IndexHeader></IndexHeader>
    </el-header>
    <el-main style="min-height: 300px; margin: 0 auto">
      <div style="border: 1.5px solid rgba(60,60,60,0.87); font-size: 16px; text-align: left; width: 800px; height: 800px; padding: 30px">
        <el-divider>个人信息</el-divider>
        <el-row style="margin-top: 50px">
          <div style="display: block; float: left; width: 380px; height: 250px;">
            <div style="width: 200px; height: 250px; border: 1.5px solid rgba(60,60,60,0.87);">
            图片
            </div>
          </div>
          <div style="display: block; float: right;width: 380px">
            <el-row>
              <div style="width: 60px; display: block; float: left">姓 名：</div>
              <div style="width: 100px; display: block; float: left">冯钰臻</div>
              <div style="width: 60px; display: block; float: left">性 别：</div>
              <div style="width: 100px; display: block; float: left">男</div>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>院 校：</span>
              <span>广西民族大学</span>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>专 业：</span>
              <span>软件工程</span>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>学 号：</span>
              <span>116263000202</span>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>电 话：</span>
              <span>18278539579</span>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-row>
        <el-divider>比赛信息</el-divider>
        <el-row style="margin-top: 50px">
          <div style="display: block; float: left; width: 380px">
            <div style="margin-top: 0px">
              <el-row>
                <span>比 赛：</span>
                <span>{{signUpContestDetailData.contestTitle}}</span>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <span>举办方：</span>
                <span>广西民族大学文学院</span>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <span>准考证号：</span>
                <span>随机数</span>
              </el-row>
              <el-divider></el-divider>
            </div>
          </div>
          <div style="display: block; float: right; width: 380px">
            <el-row>
              <span>比赛地点：</span>
              <span>广西民族大学学友楼201教室</span>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>比赛日期：</span>
              <span>2019年5月2日</span>
            </el-row>
            <el-divider></el-divider>
            <el-row>
              <span>比赛时间：</span>
              <span>09:00-11:00</span>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-row>
        <el-row>
          <el-divider></el-divider>
          <el-button type="primary" class="sign-up" @click="confirmSignUp">确认报名</el-button>
        </el-row>
      </div>
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
  name: 'SignUp',
  components: {IndexHeader, CommonFooter},
  data: function () {
    return {
      signUpContestDetailData: ''
    }
  },
  mounted: function () {
    console.log(this.signUpContestDetailData)
    // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
    // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
    let signUpContestDetailJson = sessionStorage.getItem('signUpContestDetailJson')
    this.signUpContestDetailData = JSON.parse(signUpContestDetailJson)
  },
  methods: {
    confirmSignUp: function () {
      this.$confirm('确认报名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '报名成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消报名'
        })
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
  }
  .sign-up {
    display: block;
    float: right;
    width: 100px;
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
