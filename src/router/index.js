import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import AdminLogin from '@/components/AdminLogin'
import DefaultHome from '@/components/default/DefaultHome'
import DefaultAuthentication from '@/components/default/authentication/DefaultAuthentication'
import DefaultAuthenticationStudent from '@/components/default/authentication/DefaultAuthenticationStudent'
import DefaultAuthenticationTeacher from '@/components/default/authentication/DefaultAuthenticationTeacher'
import DefaultAuthenticationOrganizer from '@/components/default/authentication/DefaultAuthenticationOrganizer'
import DefaultMyNews from '@/components/default/DefaultMyNews'
import DefaultAccountSetting from '@/components/default/DefaultAccountSetting'
import StudentHome from '@/components/student/StudentHome'
import StudentAuthentication from '@/components/student/StudentAuthentication'
import StudentMyContest from '@/components/student/myContest/StudentMyContest'
import StudentPrizeWinning from '@/components/student/prizeWinning/StudentPrizeWinning'
import StudentMyOrder from '@/components/student/StudentMyOrder'
import StudentMyNews from '@/components/student/StudentMyNews'
import StudentMyAddress from '@/components/student/StudentMyAddress'
import StudentAccountSetting from '@/components/student/StudentAccountSetting'
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
import SignUpSuccess from '@/components/index/contest/SignUpSuccess'
import Home from '@/components/Home'

Vue.use(Router)

// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }

export default new Router({
  mode: 'history', /* 访问时不用再写 # 号 */
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/index',
      component: Home
    },
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
      component: AppIndex
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
      component: SignUp,
      meta: {
        // 为了区分页面是否需要拦截
        requireAuth: true
      }
    },
    {
      path: '/index/teamSignUp',
      name: 'TeamSignUp',
      component: TeamSignUp,
      meta: {
        // 为了区分页面是否需要拦截
        requireAuth: true
      }
    },
    {
      path: '/index/signUpSuccess',
      name: 'SignUpSuccess',
      component: SignUpSuccess,
      meta: {
        // 为了区分页面是否需要拦截
        requireAuth: true
      }
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
              component: DefaultAuthenticationStudent,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'authenticationTeacher',
              name: 'DefaultAuthenticationTeacher',
              component: DefaultAuthenticationTeacher,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'authenticationOrganizer',
              name: 'DefaultAuthenticationOrganizer',
              component: DefaultAuthenticationOrganizer,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
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
          component: DefaultAccountSetting,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        }
      ]
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
          component: StudentAuthentication,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myContest',
          name: 'StudentMyContest',
          component: StudentMyContest,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
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
              component: StudentPrizeWinningContestList,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: '/student/prizeWinning/teamContestList',
              name: 'StudentPrizeWinningTeamContestList',
              component: StudentPrizeWinningTeamContestList,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'myOrder',
          name: 'StudentMyOrder',
          component: StudentMyOrder,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myNews',
          name: 'StudentMyNews',
          component: StudentMyNews,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myAddress',
          name: 'StudentMyAddress',
          component: StudentMyAddress,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'accountSetting',
          name: 'StudentAccountSetting',
          component: StudentAccountSetting,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestDetails',
          name: 'StudentMyContestDetails',
          component: StudentMyContestDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestList',
          name: 'StudentMyContestList',
          component: StudentMyContestList,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'teamContestDetails',
          name: 'StudentMyTeamContestDetails',
          component: StudentMyTeamContestDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'teamContestList',
          name: 'StudentMyTeamContestList',
          component: StudentMyTeamContestList,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningDetails',
          name: 'StudentPrizeWinningDetails',
          component: StudentPrizeWinningDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningTeamDetails',
          name: 'StudentPrizeWinningTeamDetails',
          component: StudentPrizeWinningTeamDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
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
          component: OrganizerAuthentication,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myNotice',
          name: 'OrganizerMyNotice',
          component: OrganizerMyNotice,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myContest',
          name: 'OrganizerMyContest',
          component: OrganizerMyContest,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'inputScore',
          name: 'OrganizerInputScore',
          component: OrganizerInputScore,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinning',
          name: 'OrganizerPrizeWinning',
          component: OrganizerPrizeWinning,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myOrder',
          name: 'OrganizerMyOrder',
          component: OrganizerMyOrder,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myNews',
          name: 'OrganizerMyNews',
          component: OrganizerMyNews,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myAddress',
          name: 'OrganizerMyAddress',
          component: OrganizerMyAddress,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'accountSetting',
          name: 'OrganizerAccountSetting',
          component: OrganizerAccountSetting,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'noticeDetails',
          name: 'OrganizerMyNoticeDetails',
          component: OrganizerMyNoticeDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestDetails',
          name: 'OrganizerMyContestDetails',
          component: OrganizerMyContestDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestSignUp',
          name: 'OrganizerMyContestSignUp',
          component: OrganizerMyContestSignUp,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestTeamSignUp',
          name: 'OrganizerMyContestTeamSignUp',
          component: OrganizerMyContestTeamSignUp,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningDetails',
          name: 'OrganizerPrizeWinningDetails',
          component: OrganizerPrizeWinningDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningList',
          name: 'OrganizerPrizeWinningList',
          component: OrganizerPrizeWinningList,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningTeamList',
          name: 'OrganizerPrizeWinningTeamList',
          component: OrganizerPrizeWinningTeamList,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
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
              component: OrganizerDataAnalysisSignUp,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'contestDetails',
              name: 'OrganizerDataAnalysisContestDetails',
              component: OrganizerDataAnalysisContestDetails,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'inputScoreSignUp',
          name: 'OrganizerInputScoreSignUp',
          component: OrganizerInputScoreSignUp,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'inputScoreTeamSignUp',
          name: 'OrganizerInputScoreTeamSignUp',
          component: OrganizerInputScoreTeamSignUp,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        }
      ]
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
          component: TeacherAuthentication,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myContest',
          name: 'TeacherMyContest',
          component: TeacherMyContest,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinning',
          name: 'TeacherPrizeWinning',
          component: TeacherPrizeWinning,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myOrder',
          name: 'TeacherMyOrder',
          component: TeacherMyOrder,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myNews',
          name: 'TeacherMyNews',
          component: TeacherMyNews,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'myAddress',
          name: 'TeacherMyAddress',
          component: TeacherMyAddress,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'accountSetting',
          name: 'TeacherAccountSetting',
          component: TeacherAccountSetting,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestDetails',
          name: 'TeacherMyContestDetails',
          component: TeacherMyContestDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contestList',
          name: 'TeacherMyContestList',
          component: TeacherMyContestList,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'prizeWinningDetails',
          name: 'TeacherPrizeWinningDetails',
          component: TeacherPrizeWinningDetails,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
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
          path: 'home',
          name: 'AdminHomeIndex',
          component: AdminHomeIndex,
          children: [
            {
              path: 'userData',
              name: 'UserData',
              component: UserData,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'contestData',
              name: 'ContestData',
              component: ContestData,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'signUpData',
              name: 'SignUpData',
              component: SignUpData,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'authentication',
          name: 'AuthenticationIndex',
          component: AuthenticationIndex,
          children: [
            {
              path: 'studentAuthentic',
              name: 'StudentAuthentic',
              component: StudentAuthentic,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'teacherAuthentic',
              name: 'TeacherAuthentic',
              component: TeacherAuthentic,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'organizerAuthentic',
              name: 'OrganizerAuthentic',
              component: OrganizerAuthentic,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
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
              component: StudentUser,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'teacherUser',
              name: 'TeacherUser',
              component: TeacherUser,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'organizerUser',
              name: 'OrganizerUser',
              component: OrganizerUser,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'registerUser',
              name: 'RegisterUser',
              component: RegisterUser,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'adminUser',
              name: 'AdminUser',
              component: AdminUser,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/admin/setting',
          name: 'AdminSetting',
          component: AdminSetting,
          meta: {
            // 为了区分页面是否需要拦截
            requireAuth: true
          }
        },
        {
          path: 'contest',
          name: 'AdminContestIndex',
          component: AdminContestIndex,
          children: [
            {
              path: 'individualContest',
              name: 'AdminIndividualContest',
              component: AdminIndividualContest,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'teamContest',
              name: 'AdminTeamContest',
              component: AdminTeamContest,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
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
              component: AdminIndividualSignUp,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            },
            {
              path: 'teamSignUp',
              name: 'AdminTeamSignUp',
              component: AdminTeamSignUp,
              meta: {
                // 为了区分页面是否需要拦截
                requireAuth: true
              }
            }
          ]
        }
      ]
    }
  ]
})
