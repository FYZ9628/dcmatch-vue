<template>
  <div class="main">
    <div>
      <el-button type="primary" class="sign-up" @click="signUp">报 名</el-button>
<!--      <p class="sign-up-end">已报名人数: 1000</p>-->
    </div>
    <div style="margin-top: 30px">
      <el-link style="font-size: 16px; font-weight: bold">学科竞赛赛程管理信息 简介</el-link>
      <p>为了实现激发同学们对理论学习并用于指导实践和独立思考及团队合作，提高同学们发现问题、解决问题的能力，我们设计并实现了本系统，同学们可以在这里查看发布的竞赛信息，选择自己感兴趣的竞赛报名参加，欢迎同学们的踊跃参赛。</p>
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
