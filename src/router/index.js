import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import DefaultIndex from '@/components/default/DefaultIndex'
import DefaultHome from '@/components/default/DefaultHome'
import DefaultAuthentication from '@/components/default/DefaultAuthentication'
import DefaultAuthenticationStudent from '@/components/default/DefaultAuthenticationStudent'
import DefaultAuthenticationTeacher from '@/components/default/DefaultAuthenticationTeacher'
import DefaultAuthenticationOrganizer from '@/components/default/DefaultAuthenticationOrganizer'
import DefaultMyNews from '@/components/default/DefaultMyNews'
import DefaultAccountSetting from '@/components/default/DefaultAccountSetting'
import StudentIndex from '@/components/student/StudentIndex'
import StudentHome from '@/components/student/StudentHome'
import StudentAuthentication from '@/components/student/StudentAuthentication'
import StudentMyContest from '@/components/student/StudentMyContest'
import StudentPrizeWinning from '@/components/student/StudentPrizeWinning'
import StudentMyOrder from '@/components/student/StudentMyOrder'
import StudentMyNews from '@/components/student/StudentMyNews'
import StudentMyAddress from '@/components/student/StudentMyAddress'
import StudentAccountSetting from '@/components/student/StudentAccountSetting'
import TeacherIndex from '@/components/teacher/TeacherIndex'
import TeacherHome from '@/components/teacher/TeacherHome'
import TeacherAuthentication from '@/components/teacher/TeacherAuthentication'
import TeacherMyContest from '@/components/teacher/TeacherMyContest'
import TeacherPrizeWinning from '@/components/teacher/TeacherPrizeWinning'
import TeacherMyOrder from '@/components/teacher/TeacherMyOrder'
import TeacherMyNews from '@/components/teacher/TeacherMyNews'
import TeacherMyAddress from '@/components/teacher/TeacherMyAddress'
import TeacherAccountSetting from '@/components/teacher/TeacherAccountSetting'
import AdminIndex from '@/components/admin/AdminIndex'
import test9 from '@/components/admin/home/test9'
import test10 from '@/components/admin/home/test10'
import test11 from '@/components/admin/home/test11'
import AdminSetting from '@/components/admin/setting/AdminSetting'
import NoticeList from '@/components/index/notice/NoticeList'
import NoticeDetails from '@/components/index/notice/NoticeDetails'
import ContestList from '@/components/index/contest/ContestList'
import ContestDetails from '@/components/index/contest/ContestDetails'
import AllContest from '@/components/index/contest/AllContest'
import IndividualContest from '@/components/index/contest/IndividualContest'
import TeamContest from '@/components/index/contest/TeamContest'
import SignUp from '@/components/index/contest/SignUp'
import Register from '@/components/Register'
import AuthenticationIndex from '@/components/admin/authentication/AuthenticationIndex'
import StudentAuthentic from '@/components/admin/authentication/StudentAuthentic'
import TeacherAuthentic from '@/components/admin/authentication/TeacherAuthentic'
import OrganizerAuthentic from '@/components/admin/authentication/OrganizerAuthentic'
import UserIndex from '@/components/admin/user/UserIndex'
import StudentUser from '@/components/admin/user/StudentUser'
import TeacherUser from '@/components/admin/user/TeacherUser'
import OrganizerUser from '@/components/admin/user/OrganizerUser'
import RegisterUser from '@/components/admin/user/RegisterUser'
import AdminUser from '@/components/admin/user/AdminUser'
import OrganizerHome from '@/components/organizer/OrganizerHome'
import OrganizerAuthentication from '@/components/organizer/OrganizerAuthentication'
import OrganizerMyContest from '@/components/organizer/OrganizerMyContest'
import OrganizerPrizeWinning from '@/components/organizer/OrganizerPrizeWinning'
import OrganizerMyOrder from '@/components/organizer/OrganizerMyOrder'
import OrganizerMyNews from '@/components/organizer/OrganizerMyNews'
import OrganizerMyAddress from '@/components/organizer/OrganizerMyAddress'
import OrganizerAccountSetting from '@/components/organizer/OrganizerAccountSetting'
import StudentMyContestDetails from '@/components/student/StudentMyContestDetails'
import StudentMyContestList from '@/components/student/StudentMyContestList'
import StudentPrizeWinningDetails from '@/components/student/StudentPrizeWinningDetails'
import OrganizerMyContestDetails from '@/components/organizer/OrganizerMyContestDetails'

Vue.use(Router)

export default new Router({
  mode: 'history', /* 访问时不用再写 # 号 */
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
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
        requireAuth: false
      }
    },
    {
      path: '/index/noticeList',
      name: 'NoticeList',
      component: NoticeList
    },
    {
      path: '/index/noticeDetails',
      name: 'NoticeDetails',
      component: NoticeDetails
    },
    {
      path: '/index/contestList',
      name: 'ContestList',
      component: ContestList,
      redirect: '/index/contestList/allContest',
      children: [
        {
          path: '/index/contestList/allContest',
          name: 'AllContest',
          component: AllContest
        },
        {
          path: '/index/contestList/individualContest',
          name: 'IndividualContest',
          component: IndividualContest
        },
        {
          path: '/index/contestList/teamContest',
          name: 'TeamContest',
          component: TeamContest
        }
      ]
    },
    {
      path: '/index/contestDetails',
      name: 'ContestDetails',
      component: ContestDetails
    },
    {
      path: '/index/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/defaultIndex',
      name: 'DefaultIndex',
      component: DefaultIndex
    },
    {
      path: '/default',
      name: 'DefaultHome',
      component: DefaultHome,
      redirect: '/default/authentication/authenticationStudent',
      children: [
        {
          path: 'authentication',
          name: 'DefaultAuthentication',
          component: DefaultAuthentication,
          children: [
            {
              path: 'authenticationStudent',
              name: 'DefaultAuthenticationStudent',
              component: DefaultAuthenticationStudent
            },
            {
              path: 'authenticationTeacher',
              name: 'DefaultAuthenticationTeacher',
              component: DefaultAuthenticationTeacher
            },
            {
              path: 'authenticationOrganizer',
              name: 'DefaultAuthenticationOrganizer',
              component: DefaultAuthenticationOrganizer
            }
          ]
        },
        {
          path: 'myNews',
          name: 'DefaultMyNews',
          component: DefaultMyNews
        },
        {
          path: 'accountSetting',
          name: 'DefaultAccountSetting',
          component: DefaultAccountSetting
        }
      ]
    },
    {
      path: '/studentIndex',
      name: 'StudentIndex',
      component: StudentIndex
    },
    {
      path: '/student',
      name: 'StudentHome',
      component: StudentHome,
      redirect: '/student/authentication',
      children: [
        {
          path: 'authentication',
          name: 'StudentAuthentication',
          component: StudentAuthentication
        },
        {
          path: 'myContest',
          name: 'StudentMyContest',
          component: StudentMyContest
        },
        {
          path: 'prizeWinning',
          name: 'StudentPrizeWinning',
          component: StudentPrizeWinning
        },
        {
          path: 'myOrder',
          name: 'StudentMyOrder',
          component: StudentMyOrder
        },
        {
          path: 'myNews',
          name: 'StudentMyNews',
          component: StudentMyNews
        },
        {
          path: 'myAddress',
          name: 'StudentMyAddress',
          component: StudentMyAddress
        },
        {
          path: 'accountSetting',
          name: 'StudentAccountSetting',
          component: StudentAccountSetting
        },
        {
          path: 'contestDetails',
          name: 'StudentMyContestDetails',
          component: StudentMyContestDetails
        },
        {
          path: 'contestList',
          name: 'StudentMyContestList',
          component: StudentMyContestList
        },
        {
          path: 'prizeWinningDetails',
          name: 'StudentPrizeWinningDetails',
          component: StudentPrizeWinningDetails
        }
      ]
    },
    {
      path: '/organizer',
      name: 'OrganizerHome',
      component: OrganizerHome,
      redirect: '/organizer/authentication',
      children: [
        {
          path: 'authentication',
          name: 'OrganizerAuthentication',
          component: OrganizerAuthentication
        },
        {
          path: 'myContest',
          name: 'OrganizerMyContest',
          component: OrganizerMyContest
        },
        {
          path: 'prizeWinning',
          name: 'OrganizerPrizeWinning',
          component: OrganizerPrizeWinning
        },
        {
          path: 'myOrder',
          name: 'OrganizerMyOrder',
          component: OrganizerMyOrder
        },
        {
          path: 'myNews',
          name: 'OrganizerMyNews',
          component: OrganizerMyNews
        },
        {
          path: 'myAddress',
          name: 'OrganizerMyAddress',
          component: OrganizerMyAddress
        },
        {
          path: 'accountSetting',
          name: 'OrganizerAccountSetting',
          component: OrganizerAccountSetting
        },
        {
          path: 'contestDetails',
          name: 'OrganizerMyContestDetails',
          component: OrganizerMyContestDetails
        }
      ]
    },
    {
      path: '/teacherIndex',
      name: 'TeacherIndex',
      component: TeacherIndex
    },
    {
      path: '/teacher',
      name: 'TeacherHome',
      component: TeacherHome,
      redirect: '/teacher/authentication',
      children: [
        {
          path: 'authentication',
          name: 'TeacherAuthentication',
          component: TeacherAuthentication
        },
        {
          path: 'myContest',
          name: 'TeacherMyContest',
          component: TeacherMyContest
        },
        {
          path: 'prizeWinning',
          name: 'TeacherPrizeWinning',
          component: TeacherPrizeWinning
        },
        {
          path: 'myOrder',
          name: 'TeacherMyOrder',
          component: TeacherMyOrder
        },
        {
          path: 'myNews',
          name: 'TeacherMyNews',
          component: TeacherMyNews
        },
        {
          path: 'myAddress',
          name: 'TeacherMyAddress',
          component: TeacherMyAddress
        },
        {
          path: 'accountSetting',
          name: 'TeacherAccountSetting',
          component: TeacherAccountSetting
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
          path: 'authentication',
          name: 'AuthenticationIndex',
          component: AuthenticationIndex,
          children: [
            {
              path: 'studentAuthentic',
              name: 'StudentAuthentic',
              component: StudentAuthentic
            },
            {
              path: 'teacherAuthentic',
              name: 'TeacherAuthentic',
              component: TeacherAuthentic
            },
            {
              path: 'organizerAuthentic',
              name: 'OrganizerAuthentic',
              component: OrganizerAuthentic
            }
          ]
        },
        {
          path: 'user',
          name: 'UserIndex',
          component: UserIndex,
          children: [
            {
              path: 'studentUser',
              name: 'StudentUser',
              component: StudentUser
            },
            {
              path: 'teacherUser',
              name: 'TeacherUser',
              component: TeacherUser
            },
            {
              path: 'organizerUser',
              name: 'OrganizerUser',
              component: OrganizerUser
            },
            {
              path: 'registerUser',
              name: 'RegisterUser',
              component: RegisterUser
            },
            {
              path: 'adminUser',
              name: 'AdminUser',
              component: AdminUser
            }
          ]
        },
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
