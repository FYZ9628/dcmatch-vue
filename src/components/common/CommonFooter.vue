<template>
<div class="footer">
  <div class="bg1">
    <div class="clear-fix wrap">
      <div class="item item1">
        <p class="p1">支持单位</p>
        <p class="p2">主办单位：</p>
        <p class="p2">广西民族大学</p>
        <p class="p2">技术支持：</p>
        <p class="p2">广西民族大学软信学院16软件冯钰臻</p>
      </div>
      <div class="item item2">
        <p class="p1">联系我们</p>
        <p class="p2">地址：广西民族大学四坡四A606宿舍 </p><!--  邮编: 100846 -->
        <p class="p2">电话：15277000557      传真：000-00000000 </p>
        <p class="p2">Email：973022024@qq.com</p>
        <p class="p2">商务合作：15277000557  973022024@qq.com</p>
      </div>
    </div>
  </div>
  <div class="bg2">
    <div class="clear-fix wrap">
      <p class="p1">桂ICP备11024192号</p>
      <p class="p2">桂公网安备 11010802020352号</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style scoped>
  body{
    min-width: 1200px;
    line-height: 1;
    background: #fff;
  }
  .footer {
    /*height: 100px;*/
    /*width: 100%;*/
    margin-top: 0;
    box-sizing: border-box;
    background: #fff;
    min-width: 1070px;
  }
  .bg1 {
    background: #1a1a1a;
    height: 250px;
  }
  .clear-fix {
    width: 1200px;
  }
  .wrap {
    margin: 0 auto;
    width: 1130px;
    text-align: center;
  }
  .footer .item {
    /*float: left;*/
    /*margin: 0 auto;*/
    /*text-align: center;*/
  }
  .footer .item1 {
    width: 285px;
    margin-left: 145px;
    display: inline-block;
  }
  .footer .item2 {
    width: 430px;
    display: inline-block;
  }
  .footer .item1 .p1, .footer .item2 .p1 {
    color: #d2d2d2;
    font-size: 16px;
    text-align: left;
    padding: 50px 0 10px 0;
    border-bottom: #737373 solid 1px;
    width: 250px;
  }
  .footer .item1 .p2, .footer .item2 .p2 {
    font-size: 14px;
    text-align: left;
    color: #737373;
    line-height: 16px;
  }
  .bg2 {
    background: #101010;
    height: 100px;
  }
  .bg2 p {
    height: 80px;
    line-height: 80px;
    color: #666666;
    font-size: 12px;
    float: left;
  }
  .bg2 .p1 {
     display: inline;
     width: 300px;
     margin-left: 290px;
   }
  .bg2 .p2 {
    display: inline;
    width: 320px;
    margin-right: 100px;
  }
</style>
