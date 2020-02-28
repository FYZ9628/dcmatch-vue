<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 250px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的大赛</span>
      <div style="height: 160px; margin: 30px 0 0 20px">
        <h4 style="margin-top: 30px">已报名比赛科目列表如下：</h4>
        <div v-for="(item, index) in NowSignUpData"
             :key="item.value"
             style="text-align: left; margin: 30px 30px 0 0; display: block; float: left">
          <el-button type="primary" plain style="height: 60px; width: 150px;
          overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
           font-weight: bolder; font-size: 14px; text-align: center">
            <i class="el-icon-search el-icon--right" ></i>
            {{item.name}}
          </el-button>
          <el-button v-if="index == 2" type="primary" plain style="height: 60px; margin-left: 80px">
            更多
            <i class="el-icon-d-arrow-right el-icon--right" ></i>
          </el-button>
        </div>
      </div>
    </div>
    <div style="height: 500px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证信息</span>
      <div style="height:300px; text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              变量数据
            </span>
          </el-row>
        </div>
        <div style="display: block; float: right">
          图片
        </div>
      </div>
      <div style="text-align: center; margin-top: 60px">
        <el-tag type="primary" style="width: 680px; font-weight: bolder;
         font-size: 16px; line-height:60px; height: 60px">说明：以上个人认证信息为报名生成准考证时用到的信息</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentMyContest',
  data: function () {
    return {
      studentData: [
        {id: '', user: {id: '', account: '', phone: '', password: '', name: '', type: ''}, sex: ''}
      ],
      NowSignUpData: [
        {name: '数学竞赛'},
        {name: '英语竞赛'},
        {name: '程序设计竞赛发送到发斯蒂芬'}
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
