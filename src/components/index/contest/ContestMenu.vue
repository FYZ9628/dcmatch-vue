<template>
<!--  router :default-active="$route.path"-->
  <el-menu class="nav-menu"
           router :default-active="$route.path"
           mode="horizontal"

           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           style="min-width: 100%;max-height: 120px"
  >
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="padding: 0 50px">
      {{ item.navItem }}
    </el-menu-item>

    <!--    <span style="color:#fff;position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">作业批改系统</span>-->
  </el-menu>
</template>

<script>
export default {
  name: 'ContestMenu',
  data: function () {
    return {
      navList: [
        {name: '/index/contestList/allContest', navItem: '全部大赛'},
        {name: '/index/contestList/individualContest', navItem: '个人赛'},
        {name: '/index/contestList/teamContest', navItem: '团队赛'}
      ]
    }
  }
  // methods:{
  //   handleSelect(key,keypath){
  //     if (key==='/teacherInfo') {this.$router.push('/teacherInfo')
  //     }else if(key==='/studentInfo') {this.$router.push('/studentInfo')
  //     }else if(key==='/classInfo') {this.$router.push('/classInfo')
  //     }else if(key==='/course') {this.$router.push('/course')
  //     }
  //   }
  // }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  span {
    pointer-events: none;
  }
  .nav-menu{
    /*margin-top: 80px;*/
  }
</style>
