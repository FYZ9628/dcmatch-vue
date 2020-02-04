import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import StudentIndex from '@/components/student/StudentIndex'
import TeacherIndex from '@/components/teacher/TeacherIndex'
import test1 from '@/components/teacher/test1'
import test2 from '@/components/teacher/test2'
import test3 from '@/components/teacher/test3'
import AdminIndex from '@/components/admin/AdminIndex'
import test9 from '@/components/admin/home/test9'
import test10 from '@/components/admin/home/test10'
import test11 from '@/components/admin/home/test11'
import AdminSetting from '@/components/admin/setting/AdminSetting'

Vue.use(Router)

export default new Router({
  mode: 'history', /* 访问时不用再写 # 号 */
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin_login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        /**
         * 为了区分页面是否需要拦截
         */
        requireAuth: true
      }
    },
    {
      path: '/student',
      name: 'StudentIndex',
      component: StudentIndex,
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: test1
        },
        {
          path: 'test2',
          name: 'test2',
          component: test2
        },
        {
          path: 'test3',
          name: 'test3',
          component: test3
        }
      ]
    },
    {
      path: '/teacher',
      name: 'TeacherIndex',
      component: TeacherIndex,
      children: [
        {
          path: 'test1',
          name: 'test1',
          component: test1
        },
        {
          path: 'test2',
          name: 'test2',
          component: test2
        },
        {
          path: 'test3',
          name: 'test3',
          component: test3
        }
      ]
    },
    {
      path: '/admin',
      name: 'AdminIndex',
      redirect: '/admin/home/test9',
      component: AdminIndex,
      children: [
        {
          path: '/admin/home/test9',
          name: 'test9',
          component: test9
        },
        {
          path: '/admin/home/test10',
          name: 'test10',
          component: test10
        },
        {
          path: '/admin/home/test11',
          name: 'test11',
          component: test11
        },
        {
          path: '/admin/user/test9',
          name: 'test9',
          component: test9
        },
        {
          path: '/admin/user/test10',
          name: 'test10',
          component: test10
        },
        {
          path: '/admin/user/test11',
          name: 'test11',
          component: test11
        },
        {
          path: '/admin/setting',
          name: 'AdminSetting',
          component: AdminSetting
        }
      ]
    }
  ]
})
