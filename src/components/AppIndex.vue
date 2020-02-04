<template>
    <div class="container">
      <el-row style="height: 80px">
        <IndexHeader style="position: absolute;width: 100%;"></IndexHeader>
      </el-row>
      <el-row style="height: 250px">
        <IndexBanner style="position: absolute;width: 100%;"></IndexBanner>
      </el-row>
      <el-row style="height: 400px">
        <IndexBody style="position: absolute;width: 100%;"></IndexBody>
      </el-row>
      <el-row>
        <CommonFooter style="position: absolute;width: 100%;"></CommonFooter>
      </el-row>
      <router-view/>
    </div>
</template>

<script>
import IndexHeader from './index/IndexHeader'
import CommonFooter from '@/components/common/CommonFooter'
import IndexBanner from '@/components/index/IndexBanner'
import IndexBody from '@/components/index/IndexBody'
export default {
  name: 'AppIndex',
  components: {IndexBody, IndexBanner, CommonFooter, IndexHeader},
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
  }
</style>
