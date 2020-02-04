<template>
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
</template>

<script>
export default {
  name: 'IndexAside',
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
    font-size: 14px;
    margin-bottom: 18px;
    text-align: left;
    margin-left: 20px;
  }
</style>
