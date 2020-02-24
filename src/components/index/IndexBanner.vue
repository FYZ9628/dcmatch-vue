<template>
  <el-carousel height="350px" indicator-position="outside" arrow="always">
    <el-carousel-item v-for="item in bannerImg" :key="item">
      <img :src="item.src">
<!--      <h3 class="small">{{ item.name }}</h3>-->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'IndexBanner',
  data: function () {
    return {
      bannerImg: []
    }
  },
  mounted: function () {
    this.loadBannerImg()
  },
  methods: {
    loadBannerImg () {
      let _this = this
      this.$axios.get('/getAllBanner').then(resp => {
        if (resp && resp.status === 200) {
          _this.bannerImg = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
