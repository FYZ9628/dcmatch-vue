<template>
  <div style="background-color: #f6f6f6; height: 900px">
    <div style="height: 400px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">用户数据</div>
      <v-chart class="userType" :options="userOptions" :auto-resize="true" style="margin: 0 auto;"></v-chart>
    </div>
    <div style="height: 400px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">性别比例</div>
      <v-chart class="StudentGenderRatio" :options="studentOptions" :auto-resize="true"></v-chart>
      <v-chart class="StudentGenderRatio" :options="teacherOptions" :auto-resize="true"></v-chart>
    </div>
  </div>
</template>

<script>
// 折线
import 'echarts/lib/chart/line'
// 饼状图
import 'echarts/lib/chart/pie'
// 柱状图
import 'echarts/lib/chart/bar'
// 提示
import 'echarts/lib/component/tooltip'
// 图例
import 'echarts/lib/component/legend'
// 标题
import 'echarts/lib/component/title'
import 'echarts/lib/component/graphic'
export default {
  name: 'UserData',
  data () {
    return {
      adminList: [],
      organizerList: [],
      teacherList: [],
      studentList: [],
      registerList: [],
      orgOptions: {},
      userOptionsList: [],
      userOptions: {},
      teacherManNum: 0,
      teacherWomanNum: 0,
      studentManNum: 0,
      studentWomanNum: 0,
      studentOptions: {},
      teacherOptions: {}
    }
  },
  mounted () {
    this.loadAdmin()
    this.loadOrganizer()
    this.loadTeacher()
    this.loadStudent()
    this.loadRegister()
  },
  methods: {
    loadAdmin () {
      this.$axios.get('/getAllUser').then(resp => {
        if (resp && resp.status === 200) {
          this.adminList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].type === 1) {
              this.adminList.push(resp.data[i])
            }
          }
        }
      })
    },
    loadOrganizer () {
      this.$axios.get('/getAllOrganizer').then(resp => {
        if (resp && resp.status === 200) {
          this.organizerList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 6) {
              this.organizerList.push(resp.data[i])
            }
          }
        }
      })
    },
    loadTeacher () {
      this.$axios.get('/getAllTeacher').then(resp => {
        if (resp && resp.status === 200) {
          this.teacherList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 2) {
              this.teacherList.push(resp.data[i])
              if (resp.data[i].sex === '男') {
                this.teacherManNum++
              }
              if (resp.data[i].sex === '女') {
                this.teacherWomanNum++
              }
            }
          }
        }
      })
    },
    loadStudent () {
      this.$axios.get('/getAllStudent').then(resp => {
        if (resp && resp.status === 200) {
          this.studentList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 3) {
              this.studentList.push(resp.data[i])
              if (resp.data[i].sex === '男') {
                this.studentManNum++
              }
              if (resp.data[i].sex === '女') {
                this.studentWomanNum++
              }
            }
          }
        }
      })
    },
    loadRegister () {
      this.$axios.get('/getAllRegister').then(resp => {
        if (resp && resp.status === 200) {
          this.registerList = resp.data
          // 0.5秒后加载数据
          setTimeout(() => {
            this.userOptionsList = []
            this.userOptionsList.push({value: this.adminList.length, name: '管理员'})
            this.userOptionsList.push({value: this.organizerList.length, name: '举办方'})
            this.userOptionsList.push({value: this.teacherList.length, name: '教师'})
            this.userOptionsList.push({value: this.studentList.length, name: '学生'})
            this.userOptionsList.push({value: this.registerList.length, name: '未认证用户'})
            let totalUserNum = 0
            for (let i = 0; i < this.userOptionsList.length; i++) {
              totalUserNum += this.userOptionsList[i].value
            }
            this.loadUserOptions(this.userOptionsList, totalUserNum)
            this.loadStudentOptions(this.studentManNum, this.studentWomanNum)
            this.loadTeacherOptions(this.teacherManNum, this.teacherWomanNum)
          }, 500)
        }
      })
    },
    loadUserOptions (userOptionsList, totalUserNum) {
      this.userOptions = {
        // 标题
        title: {
          text: '用户类型',
          x: 'center',
          textStyle: {
            color: '#000000',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '用户类型',
            // 类型：这里是饼图
            type: 'pie',
            // radius: '50%',
            radius: ['40%', '60%'], // 饼图的半径，第一个为内半径，第二个为外半径
            // center 左右 上下
            center: ['50%', '50%'], // 默认就是50%
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // 标签内容显示的格式
                  formatter: '{d}%'
                },
                labelLine: {
                  show: true
                }
              }
            },
            // 数据
            data: userOptionsList
            // data: [
            //   {value: 335, name: '管理员'},
            //   {value: 310, name: '举办方'},
            //   {value: 234, name: '教师'},
            //   {value: 135, name: '学生'},
            //   {value: 1548, name: '未认证用户'}
            // ]
          }
        ],
        // 标签是否显示，默认是显示的，但默认真的字体较小
        label: {
          show: true,
          fontSize: 16
        },
        // 工具提示(鼠标经过的时候出现的提示)
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例说明
        legend: {
          show: true,
          orient: 'vertical', // 图例的布局，竖直    horizontal为水平
          // x: 'center', 水平的时候用
          x: 'right', // 垂直的时候用
          top: 10,
          data: ['管理员', '举办方', '教师', '学生', '未认证用户'],
          textStyle: {
            // color: '#1314ff',
            fontSize: 16
          }
        },
        // 各个部分的颜色
        color: ['#18DBDF', '#f65e28', '#3DE16F', '#EF69FB', '#FE5679'],
        graphic: {
          type: 'group',
          top: '45%',
          left: 'center',
          height: 60,
          children: [
            {
              type: 'text',
              left: 'center',
              top: '30%',
              style: {
                text: '用户人数',
                textAlign: 'center',
                fill: '#999',
                font: "15px 'Helvetica',sans-serif"
              }
            },
            {
              type: 'text',
              top: '60%',
              left: 'center',
              position: [0, 10],
              style: {
                text: totalUserNum,
                textAlign: 'center',
                fill: '#3d383a',
                font: "22px 'Helvetica',sans-serif"
              }
            }
          ]
        }
      }
    },
    loadStudentOptions (studentManNum, studentWomanNum) {
      this.studentOptions = {
        // 标题
        title: {
          text: '学生',
          x: 'center',
          textStyle: {
            color: '#000000',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '学生',
            // 类型：这里是饼图
            type: 'pie',
            // radius: '50%',
            radius: ['40%', '60%'], // 饼图的半径，第一个为内半径，第二个为外半径
            // center 左右 上下
            // center: ['50%', '50%'], // 默认就是50%
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // 标签内容显示的格式
                  // a 标题，b 标签，c 数量，d 百分比
                  formatter: '{d}%'
                },
                labelLine: {
                  show: true
                }
              }
            },
            // 数据
            data: [
              {value: studentManNum, name: '男'},
              {value: studentWomanNum, name: '女'}
            ]
          }
        ],
        // 标签是否显示，默认是显示的，但默认真的字体较小
        label: {
          show: true,
          fontSize: 16
        },
        // 工具提示(鼠标经过的时候出现的提示)
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例说明
        legend: {
          show: true,
          orient: 'vertical', // 图例的布局，竖直    horizontal为水平
          // x: 'center', 水平的时候用
          x: 'right', // 垂直的时候用
          top: 10,
          data: ['男', '女'],
          textStyle: {
            // color: '#1314ff',
            fontSize: 16
          }
        },
        // 各个部分的颜色
        color: ['#18DBDF', '#f65e28'],
        graphic: {
          type: 'group',
          top: '45%',
          left: 'center',
          height: 60,
          children: [
            {
              type: 'text',
              left: 'center',
              top: '30%',
              style: {
                text: '学生人数',
                textAlign: 'center',
                fill: '#999',
                font: "15px 'Helvetica',sans-serif"
              }
            },
            {
              type: 'text',
              top: '60%',
              left: 'center',
              position: [0, 10],
              style: {
                text: studentManNum + studentWomanNum,
                textAlign: 'center',
                fill: '#3d383a',
                font: "22px 'Helvetica',sans-serif"
              }
            }
          ]
        }
      }
    },
    loadTeacherOptions (teacherManNum, teacherWomanNum) {
      this.teacherOptions = {
        // 标题
        title: {
          text: '教师',
          x: 'center',
          textStyle: {
            color: '#000000',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '教师',
            // 类型：这里是饼图
            type: 'pie',
            // radius: '50%',
            radius: ['40%', '60%'], // 饼图的半径，第一个为内半径，第二个为外半径
            // center 左右 上下
            // center: ['50%', '50%'], // 默认就是50%
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // 标签内容显示的格式
                  // a 标题，b 标签，c 数量，d 百分比
                  formatter: '{d}%'
                },
                labelLine: {
                  show: true
                }
              }
            },
            // 数据
            data: [
              {value: teacherManNum, name: '男'},
              {value: teacherWomanNum, name: '女'}
            ]
          }
        ],
        // 标签是否显示，默认是显示的，但默认真的字体较小
        label: {
          show: true,
          fontSize: 16
        },
        // 工具提示(鼠标经过的时候出现的提示)
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例说明
        legend: {
          show: true,
          orient: 'vertical', // 图例的布局，竖直    horizontal为水平
          // x: 'center', 水平的时候用
          x: 'right', // 垂直的时候用
          top: 10,
          data: ['男', '女'],
          textStyle: {
            // color: '#1314ff',
            fontSize: 16
          }
        },
        // 各个部分的颜色
        color: ['#18DBDF', '#f65e28'],
        graphic: {
          type: 'group',
          top: '45%',
          left: 'center',
          height: 60,
          children: [
            {
              type: 'text',
              left: 'center',
              top: '30%',
              style: {
                text: '教师人数',
                textAlign: 'center',
                fill: '#999',
                font: "15px 'Helvetica',sans-serif"
              }
            },
            {
              type: 'text',
              top: '60%',
              left: 'center',
              position: [0, 10],
              style: {
                text: teacherManNum + teacherWomanNum,
                textAlign: 'center',
                fill: '#3d383a',
                font: "22px 'Helvetica',sans-serif"
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
  /**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
  .userType {
    width: 900px;
    height: 350px;
    /*background: #409EFF;*/
  }
  .StudentGenderRatio {
    display: block;
    float: left;
    width: 600px;
    height: 350px;
    /*background: #409EFF;*/
  }
</style>
