<template>
  <div style="height: 80px">
<!--    0 为未登录，1 为default登录，2 为student登录，3 为teacher登录-->
    <div v-if="isLoginState === 0">
      <IndexHeader></IndexHeader>
    </div>
    <div v-if="isLoginState === 1">
      <DefaultHeader style="width: 100%"></DefaultHeader>
    </div>
    <div v-if="isLoginState === 2">
      <StudentHeader style="width: 100%"></StudentHeader>
    </div>
    <div v-if="isLoginState === 3">
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
      this.isLoginState = 1
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
