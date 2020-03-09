<template>
  <el-menu class="nav-menu"
           router :default-active="$route.path"
           mode="horizontal"
           text-color="#0d00ba"
           active-text-color="#ffd04b"
           style="min-width: 100%; max-height: 120px"
  >
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="padding: 0 50px">
      {{ item.navItem }}
    </el-menu-item>

    <!--    <span style="color:#fff;position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">作业批改系统</span>-->
  </el-menu>
</template>

<script>
export default {
  name: 'OrganizerMyNewsMenu',
  data: function () {
    return {
      navList: [
        {name: '/student/myNews/1', navItem: '所有消息'},
        {name: '/student/myNews/2', navItem: '（共 4 条，未读消息 0 条）'},
        {name: '/student/myNews/3', navItem: '全部标为已读'}
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
