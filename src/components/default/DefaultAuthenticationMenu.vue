<template>
<!--  router :default-active="$route.path"-->
  <el-menu class="nav-menu"
           router :default-active="$route.path"
           mode="horizontal"
           background-color="#7e8083"
           text-color="#fff"
           active-text-color="#ffd04b"
           style="min-width: 100%;max-height: 120px"
  >
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="padding: 0 50px">
      {{ item.navItem }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'ContestMenu',
  data: function () {
    return {
      navList: [
        {name: '/default/authentication/authenticationStudent', navItem: '认证为学生'},
        {name: '/default/authentication/authenticationTeacher', navItem: '认证为教师'},
        {name: '/default/authentication/authenticationOrganizer', navItem: '认证为院校'}
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
