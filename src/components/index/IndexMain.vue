<template>
  <div class="main">
    <div>
      <el-button type="primary" class="sign-up" @click="signUp">报 名</el-button>
      <p class="sign-up-end">已报名人数: 1000</p>
    </div>
    <div>
      <el-link style="font-size: 16px; font-weight: bold">数学竞赛 简介</el-link>
      <p>为促进软件和信息领域专业技术人才培养，提升高校毕业生的就业竞争力，由教育部就业指导中心支持，工业和信息化部人才交流中心举办蓝桥杯大赛。十年来，包括北大、清华在内的超过 1200 余所院校，累计20万余名学子报名参赛，IBM、百度等知名企业全程参与，成为国内始终领跑的人才培养选拔模式并获得行业深度认可的IT类科技竞赛。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexMain',
  data: function () {
    return {
    }
  },
  methods: {
    signUp: function () {
      window.open(
        this.$router.resolve({
          path: '/index/contestList'
        }).href, '_blank'
        // 打开新窗口：_blank
        // 在本地窗口打开：_self
      )
    }
  }
}
</script>

<style scoped>
  .main{
    width: 500px;
    margin: 0 auto;
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
  .sign-up-end {
    line-height: 10px;
    font-size: 8px;
  }
</style>
