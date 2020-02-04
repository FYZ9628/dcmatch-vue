<template>
  <div class="body">
    <div class="clear-fix">
      <div class="aside">
        <div class="aside-top">
          <p class="aside-title">大赛通知</p>
          <a href="" target="_blank">MORE>></a>
        </div>
        <div v-for="item in notice"
             :key="item.value" class="content">
          {{item.title +"    "}}{{item.time }}
        </div>
      </div>
      <div class="main">
        <div>
          <el-button type="primary" class="sign-up">报 名</el-button>
          <h6 class="sign-up-end">已报名人数: 1000</h6>
        </div>
        <div>
          <h3>数学竞赛简介</h3>
          <p>为促进软件和信息领域专业技术人才培养，提升高校毕业生的就业竞争力，由教育部就业指导中心支持，工业和信息化部人才交流中心举办蓝桥杯大赛。十年来，包括北大、清华在内的超过 1200 余所院校，累计20万余名学子报名参赛，IBM、百度等知名企业全程参与，成为国内始终领跑的人才培养选拔模式并获得行业深度认可的IT类科技竞赛。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexBody',
  data: function () {
    return {
      notice: [
        {title: '第一', time: '2019-12-12'},
        {title: '第二', time: '2019-12-12'},
        {title: '第三', time: '2019-12-12'},
        {title: '第四', time: '2019-12-12'}
      ]
    }
  }
}
</script>

<style scoped>
  .body {
    height: 400px;
    padding: 50px 0px;
  }
  .body .clear-fix {
    width: 1200px;
    margin: 0 auto;
  }
  .body .aside{
    height: 200px;
    width: 640px;
    text-align: center;
    float: left;
    /*background-color: #409EFF;*/
    border:10px solid #f4f4f4;
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
  .body .aside a {
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
    font-size: 14px;
    margin-bottom: 18px;
    text-align: left;
    margin-left: 20px;
  }
  .body .main{
    width: 500px;
    float: right;
    border:10px solid #f4f4f4;
  }
  .sign-up {
    width: 80px;
    height: 40px;
    line-height: 40px;
    background-color: #4ea2e2;
    color: white;
    padding: 0;
    font-size: 18px;
    margin-top: 20px;
  }
</style>
