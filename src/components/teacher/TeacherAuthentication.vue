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
    <div style="height: 180px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证信息</span>
      <div style="text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              姓&emsp;&emsp;名：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.user.name}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              性&emsp;&emsp;别：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.sex}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              邮&emsp;&emsp;箱：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.email}}
            </span>
          </el-row>
        </div>
        <!--        <div style="display: block; float: right">-->
        <!--            图片-->
        <!--        </div>-->
      </div>
    </div>
    <div style="height: 350px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">院校认证信息</span>
      <div style="text-align: center; margin-top: 30px">
        <div style="display: block; float: left">
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              学&emsp;&emsp;校：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.school}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              工&emsp;&emsp;号：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.user.account}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              入职日期：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.entryDate}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
             所在院系：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
             {{teacherData.academy}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              职&emsp;&emsp;称：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.professionalTitle}}
            </span>
          </el-row>
          <el-row style="line-height: 24px; padding: 10px 0">
            <span style="display: block; float: left; color: #778a99">
              学&emsp;&emsp;历：
            </span>
            <span style="display: block; float: left; margin-left: 30px">
              {{teacherData.education}}
            </span>
          </el-row>
        </div>
        <div style="width: 300px; height: 200px; display: block; float: right">
          <img :src="teacherData.idImg" style="width: 300px; height: 200px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherAuthentication',
  data: function () {
    return {
      teacherData: {
        id: '',
        user: {
          id: '',
          account: '',
          phone: '',
          password: '',
          name: '',
          type: ''
        },
        sex: '',
        email: '',
        school: '',
        entryDate: '',
        academy: '',
        professionalTitle: '',
        education: '',
        idImg: ''
      }
    }
  },
  mounted: function () {
    this.loadTeacher()
  },
  methods: {
    loadTeacher () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeacherByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teacherData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询教师失败',
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
