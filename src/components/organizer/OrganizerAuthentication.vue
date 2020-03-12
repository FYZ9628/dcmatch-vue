<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 150px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证</span>
      <div style="text-align: center; margin-top: 50px">
        <el-tag type="success" style="color: #33ba9b;
        font-weight: bolder; font-size: 16px; line-height:60px;
         width: 680px;  height: 60px">恭喜，您的个人认证信息已经通过后台审核！</el-tag>
      </div>
    </div>
    <div style="height: 150px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证信息</span>
      <div style="text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              组织名称：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.user.name}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              邮&emsp;&emsp;箱：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.email}}
            </span>
          </el-row>
        </div>
        <!--        <div style="display: block; float: right">-->
        <!--            图片-->
        <!--        </div>-->
      </div>
    </div>
    <div style="height: 300px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">院校认证信息</span>
      <div style="text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              学&emsp;&emsp;校：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.school}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              编&emsp;&emsp;号：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.user.account}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              创立日期：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.establishDate}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              学校类型：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{organizerData.schoolType}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
             办学类型：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
             {{organizerData.schoolRunningType}}
            </span>
          </el-row>
        </div>
        <div style="width: 300px; height: 200px; display: block; float: right">
          <img :src="organizerData.idImg" style="width: 300px; height: 200px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizerAuthentication',
  data: function () {
    return {
      organizerData: {
        id: '',
        user: {
          id: '',
          account: '',
          phone: '',
          password: '',
          name: '',
          type: ''
        },
        email: '',
        school: '',
        establishDate: '',
        schoolType: '',
        schoolRunningType: ''
      }
    }
  },
  mounted: function () {
    this.loadOrganizer()
  },
  methods: {
    loadOrganizer () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchOrganizerByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.organizerData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
