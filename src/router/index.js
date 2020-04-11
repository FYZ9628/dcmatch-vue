import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import DefaultIndex from '@/components/default/DefaultIndex'
import DefaultHome from '@/components/default/DefaultHome'
import DefaultAuthentication from '@/components/default/authentication/DefaultAuthentication'
import DefaultAuthenticationStudent from '@/components/default/authentication/DefaultAuthenticationStudent'
import DefaultAuthenticationTeacher from '@/components/default/authentication/DefaultAuthenticationTeacher'
import DefaultAuthenticationOrganizer from '@/components/default/authentication/DefaultAuthenticationOrganizer'
import DefaultMyNews from '@/components/default/DefaultMyNews'
import DefaultAccountSetting from '@/components/default/DefaultAccountSetting'
import StudentIndex from '@/components/student/StudentIndex'
import StudentHome from '@/components/student/StudentHome'
import StudentAuthentication from '@/components/student/StudentAuthentication'
import StudentMyContest from '@/components/student/myContest/StudentMyContest'
import StudentPrizeWinning from '@/components/student/prizeWinning/StudentPrizeWinning'
import StudentMyOrder from '@/components/student/StudentMyOrder'
import StudentMyNews from '@/components/student/StudentMyNews'
import StudentMyAddress from '@/components/student/StudentMyAddress'
import StudentAccountSetting from '@/components/student/StudentAccountSetting'
import TeacherIndex from '@/components/teacher/TeacherIndex'
import TeacherHome from '@/components/teacher/TeacherHome'
import TeacherAuthentication from '@/components/teacher/TeacherAuthentication'
import TeacherMyContest from '@/components/teacher/myContest/TeacherMyContest'
import TeacherPrizeWinning from '@/components/teacher/TeacherPrizeWinning'
import TeacherMyOrder from '@/components/teacher/TeacherMyOrder'
import TeacherMyNews from '@/components/teacher/TeacherMyNews'
import TeacherMyAddress from '@/components/teacher/TeacherMyAddress'
import TeacherAccountSetting from '@/components/teacher/TeacherAccountSetting'
import AdminIndex from '@/components/admin/AdminIndex'
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
import OrganizerMyContest from '@/components/organizer/myContest/OrganizerMyContest'
import OrganizerPrizeWinning from '@/components/organizer/prizeWinning/OrganizerPrizeWinning'
import OrganizerMyOrder from '@/components/organizer/OrganizerMyOrder'
import OrganizerMyNews from '@/components/organizer/OrganizerMyNews'
import OrganizerMyAddress from '@/components/organizer/OrganizerMyAddress'
import OrganizerAccountSetting from '@/components/organizer/OrganizerAccountSetting'
import StudentMyContestDetails from '@/components/student/myContest/StudentMyContestDetails'
import StudentMyContestList from '@/components/student/myContest/StudentMyContestList'
import StudentPrizeWinningDetails from '@/components/student/prizeWinning/StudentPrizeWinningDetails'
import OrganizerMyContestDetails from '@/components/organizer/myContest/OrganizerMyContestDetails'
import OrganizerMyContestSignUp from '@/components/organizer/myContest/OrganizerMyContestSignUp'
import OrganizerPrizeWinningDetails from '@/components/organizer/prizeWinning/OrganizerPrizeWinningDetails'
import OrganizerPrizeWinningList from '@/components/organizer/prizeWinning/OrganizerPrizeWinningList'
import OrganizerMyNotice from '@/components/organizer/myNotice/OrganizerMyNotice'
import OrganizerMyNoticeDetails from '@/components/organizer/myNotice/OrganizerMyNoticeDetails'
import UserData from '@/components/admin/home/UserData'
import AdminHomeIndex from '@/components/admin/home/AdminHomeIndex'
import ContestData from '@/components/admin/home/ContestData'
import SignUpData from '@/components/admin/home/SignUpData'
import TeamSignUp from '@/components/index/contest/TeamSignUp'
import OrganizerMyContestTeamSignUp from '@/components/organizer/myContest/OrganizerMyContestTeamSignUp'
import OrganizerPrizeWinningTeamList from '@/components/organizer/prizeWinning/OrganizerPrizeWinningTeamList'
import StudentMyTeamContestDetails from '@/components/student/myContest/StudentMyTeamContestDetails'
import StudentMyTeamContestList from '@/components/student/myContest/StudentMyTeamContestList'
import StudentPrizeWinningContestList from '@/components/student/prizeWinning/StudentPrizeWinningContestList'
import StudentPrizeWinningTeamContestList from '@/components/student/prizeWinning/StudentPrizeWinningTeamContestList'
import StudentPrizeWinningTeamDetails from '@/components/student/prizeWinning/StudentPrizeWinningTeamDetails'
import TeacherMyContestDetails from '@/components/teacher/myContest/TeacherMyContestDetails'
import TeacherMyContestList from '@/components/teacher/myContest/TeacherMyContestList'
import TeacherPrizeWinningDetails from '@/components/teacher/TeacherPrizeWinningDetails'
import AdminContestIndex from '@/components/admin/contest/AdminContestIndex'
import AdminIndividualContest from '@/components/admin/contest/AdminIndividualContest'
import AdminTeamContest from '@/components/admin/contest/AdminTeamContest'
import AdminSignUpIndex from '@/components/admin/signUp/AdminSignUpIndex'
import AdminIndividualSignUp from '@/components/admin/signUp/AdminIndividualSignUp'
import AdminTeamSignUp from '@/components/admin/signUp/AdminTeamSignUp'
import OrganizerDataAnalysis from '@/components/organizer/dataAnalysis/OrganizerDataAnalysis'
import OrganizerDataAnalysisSignUp from '@/components/organizer/dataAnalysis/OrganizerDataAnalysisSignUp'
import OrganizerDataAnalysisContestDetails from '@/components/organizer/dataAnalysis/OrganizerDataAnalysisContestDetails'
import OrganizerInputScore from '@/components/organizer/inputScore/OrganizerInputScore'
import OrganizerInputScoreSignUp from '@/components/organizer/inputScore/OrganizerInputScoreSignUp'
import OrganizerInputScoreTeamSignUp from '@/components/organizer/inputScore/OrganizerInputScoreTeamSignUp'

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
          path: 'allContest',
          name: 'AllContest',
          component: AllContest
        },
        {
          path: 'individualContest',
          name: 'IndividualContest',
          component: IndividualContest
        },
        {
          path: 'teamContest',
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
      path: '/index/teamSignUp',
      name: 'TeamSignUp',
      component: TeamSignUp
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
          component: StudentPrizeWinning,
          redirect: '/student/prizeWinning/contestList',
          children: [
            {
              path: '/student/prizeWinning/contestList',
              name: 'StudentPrizeWinningContestList',
              component: StudentPrizeWinningContestList
            },
            {
              path: '/student/prizeWinning/teamContestList',
              name: 'StudentPrizeWinningTeamContestList',
              component: StudentPrizeWinningTeamContestList
            }
          ]
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
          path: 'teamContestDetails',
          name: 'StudentMyTeamContestDetails',
          component: StudentMyTeamContestDetails
        },
        {
          path: 'teamContestList',
          name: 'StudentMyTeamContestList',
          component: StudentMyTeamContestList
        },
        {
          path: 'prizeWinningDetails',
          name: 'StudentPrizeWinningDetails',
          component: StudentPrizeWinningDetails
        },
        {
          path: 'prizeWinningTeamDetails',
          name: 'StudentPrizeWinningTeamDetails',
          component: StudentPrizeWinningTeamDetails
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
          path: 'myNotice',
          name: 'OrganizerMyNotice',
          component: OrganizerMyNotice
        },
        {
          path: 'myContest',
          name: 'OrganizerMyContest',
          component: OrganizerMyContest
        },
        {
          path: 'inputScore',
          name: 'OrganizerInputScore',
          component: OrganizerInputScore
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
          path: 'noticeDetails',
          name: 'OrganizerMyNoticeDetails',
          component: OrganizerMyNoticeDetails
        },
        {
          path: 'contestDetails',
          name: 'OrganizerMyContestDetails',
          component: OrganizerMyContestDetails
        },
        {
          path: 'contestSignUp',
          name: 'OrganizerMyContestSignUp',
          component: OrganizerMyContestSignUp
        },
        {
          path: 'contestTeamSignUp',
          name: 'OrganizerMyContestTeamSignUp',
          component: OrganizerMyContestTeamSignUp
        },
        {
          path: 'prizeWinningDetails',
          name: 'OrganizerPrizeWinningDetails',
          component: OrganizerPrizeWinningDetails
        },
        {
          path: 'prizeWinningList',
          name: 'OrganizerPrizeWinningList',
          component: OrganizerPrizeWinningList
        },
        {
          path: 'prizeWinningTeamList',
          name: 'OrganizerPrizeWinningTeamList',
          component: OrganizerPrizeWinningTeamList
        },
        {
          path: 'dataAnalysis',
          name: 'OrganizerDataAnalysis',
          component: OrganizerDataAnalysis,
          redirect: '/organizer/dataAnalysis/signUp',
          children: [
            {
              path: 'signUp',
              name: 'OrganizerDataAnalysisSignUp',
              component: OrganizerDataAnalysisSignUp
            },
            {
              path: 'contestDetails',
              name: 'OrganizerDataAnalysisContestDetails',
              component: OrganizerDataAnalysisContestDetails
            }
          ]
        },
        {
          path: 'inputScoreSignUp',
          name: 'OrganizerInputScoreSignUp',
          component: OrganizerInputScoreSignUp
        },
        {
          path: 'inputScoreTeamSignUp',
          name: 'OrganizerInputScoreTeamSignUp',
          component: OrganizerInputScoreTeamSignUp
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
        },
        {
          path: 'contestDetails',
          name: 'TeacherMyContestDetails',
          component: TeacherMyContestDetails
        },
        {
          path: 'contestList',
          name: 'TeacherMyContestList',
          component: TeacherMyContestList
        },
        {
          path: 'prizeWinningDetails',
          name: 'TeacherPrizeWinningDetails',
          component: TeacherPrizeWinningDetails
        }
      ]
    },
    {
      path: '/admin',
      name: 'AdminIndex',
      redirect: '/admin/home/userData',
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
          path: 'home',
          name: 'AdminHomeIndex',
          component: AdminHomeIndex,
          children: [
            {
              path: 'userData',
              name: 'UserData',
              component: UserData
            },
            {
              path: 'contestData',
              name: 'ContestData',
              component: ContestData
            },
            {
              path: 'signUpData',
              name: 'SignUpData',
              component: SignUpData
            }
          ]
        },
        {
          path: '/admin/setting',
          name: 'AdminSetting',
          component: AdminSetting
        },
        {
          path: 'contest',
          name: 'AdminContestIndex',
          component: AdminContestIndex,
          children: [
            {
              path: 'individualContest',
              name: 'AdminIndividualContest',
              component: AdminIndividualContest
            },
            {
              path: 'teamContest',
              name: 'AdminTeamContest',
              component: AdminTeamContest
            }
          ]
        },
        {
          path: 'signUp',
          name: 'AdminSignUpIndex',
          component: AdminSignUpIndex,
          children: [
            {
              path: 'individualSignUp',
              name: 'AdminIndividualSignUp',
              component: AdminIndividualSignUp
            },
            {
              path: 'teamSignUp',
              name: 'AdminTeamSignUp',
              component: AdminTeamSignUp
            }
          ]
        }
      ]
    }
  ]
})
