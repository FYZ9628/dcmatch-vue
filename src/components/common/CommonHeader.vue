<template>
  <div style="height: 80px">
<!--    0 为未登录，500 为default登录，300 为student登录，200 为teacher登录-->
    <div v-if="isLoginState === 0">
      <IndexHeader></IndexHeader>
    </div>
    <div v-if="isLoginState === 500">
      <DefaultHeader style="width: 100%"></DefaultHeader>
    </div>
    <div v-if="isLoginState === 300">
      <StudentHeader style="width: 100%"></StudentHeader>
    </div>
    <div v-if="isLoginState === 200">
      <TeacherHeader style="width: 100%"></TeacherHeader>
    </div>
  </div>
</template>

<script>
import IndexHeader from '@/components/index/IndexHeader'
import DefaultHeader from '@/components/default/DefaultHeader'
import StudentHeader from '@/components/student/StudentHeader'
import TeacherHeader from '@/components/teacher/TeacherHeader'
export default {
  name: 'CommonHeader',
  components: {IndexHeader, DefaultHeader, StudentHeader, TeacherHeader},
  data: function () {
    return {
      isLoginState: 0
    }
  },
  mounted: function () {
    if (this.$store.getters.name) {
      let code = this.$store.getters.code
      // 返回码：100对应管理员，200对应教师，300对应学生，400是错误码，500是默认用户(即还没有认证的用户)
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
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .common-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    background: #fff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    height: 70px;
    text-size:20px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
