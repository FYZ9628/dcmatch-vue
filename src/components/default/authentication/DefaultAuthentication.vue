<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 100%; background-color: #ffffff;">
      <div style="text-align: center;" v-if="isAuthentication === true">
        <el-tag style="font-weight: bolder; font-size: 16px; line-height:100px;
         width: 800px;  height: 100px">您的个人认证信息已经发送到后台管理，请耐心等待审核！</el-tag>
      </div>
      <DefaultAuthenticationMenu></DefaultAuthenticationMenu>
      <router-view/>
    </div>
  </div>
</template>

<script>
import DefaultAuthenticationMenu from '@/components/default/authentication/DefaultAuthenticationMenu'
export default {
  name: 'DefaultAuthentication',
  components: {DefaultAuthenticationMenu},
  data: function () {
    return {
      isAuthentication: false
    }
  },
  mounted: function () {
    this.searchUser(this.$store.getters.account)
  },
  methods: {
    searchUser (phone) {
      this.$axios
        .post('/searchUserByPhone', {
          keywords: phone
        })
        .then(successResponse => {
          // 只要数据库有添加了（只加在了一个表，但其它表不成功也算）
          // 就会返回 successResponse.status 状态码 200
          // this.student = successResponse.data
          // python版用
          if (JSON.stringify(successResponse.data) !== '{}') {
            this.isAuthentication = true
          }
          // java版用
          // if (successResponse.data !== '') {
          //   this.isAuthentication = true
          // }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>

</style>
