<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 600px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">获奖查询</span>
      <div style="height: 160px; margin: 50px 0 0 20px">
        <h4 style="margin-top: 30px">已参加的比赛科目列表如下：</h4>
        <div v-for="(item, index) in NowSignUpData"
             :key="item.value"
             style="text-align: left; margin: 30px 30px 0 0">
          <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;
           padding: 20px 15px;">
            <div style="width: 500px; font-size: 18px; font-weight: bolder;
             line-height: 40px;  display: block; float: left;
              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">
              {{item.name}}
            </div>
            <el-button type="primary" plain style="height: 40px; display: block; float: right">
              获奖查询
            </el-button>
          </div>
          <el-button v-if="index == 2" type="primary" plain
                     style="display: block; float: right; height: 60px;
                      margin-top: 20px; ">
            更多
            <i class="el-icon-d-arrow-right el-icon--right" ></i>
          </el-button>
          <el-button v-if="NowSignUpData.length === 0" type="primary" plain
                     style="display: block; float: right; height: 60px;
                      margin-top: 20px; ">
            没有
            <i class="el-icon-d-arrow-right el-icon--right" ></i>
          </el-button>
        </div>
      </div>
      <div v-if="NowSignUpData.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无可查询的比赛结果</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPrizeWinning',
  data: function () {
    return {
      studentData: [
        {id: '', user: {id: '', account: '', phone: '', password: '', name: '', type: ''}, sex: ''}
      ],
      NowSignUpData: [
        {name: '数学竞赛'},
        {name: '英语竞赛'},
        {name: '程序设计竞赛给对方感发送到发送发送到发斯蒂芬水电费费到发给对方广东省法规申达股份送到发送到发斯蒂芬'}
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
