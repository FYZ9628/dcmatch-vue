<template>
  <div style="background-color: #f6f6f6; height: 600px">
    <div style="height: 500px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="height: 50px; width: 1230px;">
        <div style="padding: 20px 0 10px 10px; font-weight: bolder; display: block; float: left">报名数据</div>
        <div style="padding: 20px 20px 10px 0; display: block; float: right;">
          <el-select v-model="contestDetailOptionsValue" filterable placeholder="请选择或输入搜索"
                     size="small" @change="contestDetailOptionChange" style="width: 250px">
            <el-option
              v-for="item in contestDetailOptions"
              :key="item.id"
              :label="item.contestTitle"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <v-chart class="userType" :options="signUpDataOptions" :auto-resize="true" style="margin: 0 auto;"></v-chart>
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
  name: 'SignUpData',
  data () {
    return {
      contestDetailList: [],
      contestDetail: {
        id: '',
        contestTitle: '',
        organizer: {
          id: '',
          user: {
            id: '',
            account: '',
            phone: '',
            password: '',
            name: '',
            type: ''
          },
          email: '',
          school: '',
          establishDate: '',
          schoolType: '',
          schoolRunningType: '',
          idImg: ''
        },
        contestContent: '',
        signUpStartTime: '',
        signUpEndTime: '',
        publishTime: '',
        place: '',
        holdDate: '',
        holdStartTime: '',
        holdEndTime: '',
        type: '',
        state: ''
      },
      contestDetailOptions: [],
      contestDetailOptionsValue: '',
      contestList: [],
      studentManNum: 0,
      studentWomanNum: 0,
      signUpDataOptions: {}
    }
  },
  mounted () {
    this.loadContestDetailList()
  },
  methods: {
    loadContestDetailList () {
      this.$axios.get('/getAllContestDetail').then(resp => {
        if (resp && resp.status === 200) {
          this.contestDetailList = resp.data
          for (let i = 0; i < this.contestDetailList.length; i++) {
            this.contestDetailOptions.push({id: this.contestDetailList[i].id,
              contestTitle: this.contestDetailList[i].contestTitle})
          }
          if (this.contestDetailList.length !== 0) {
            this.contestDetailOptionsValue = this.contestDetailList[0].contestTitle
            this.loadContestList(this.contestDetailList[0].id)
          }
          if (this.contestDetailList.length === 0) {
            this.loadSignUpDataOptions(this.studentManNum, this.studentWomanNum)
          }
        }
      })
    },
    contestDetailOptionChange (query) {
      // console.log('选中后测试')
      // console.log(query)
      // 这个 query 就是 value 值，value 是 id 值
      this.$axios
        .post('/searchContestDetailById', {
          keywords: query
        })
        .then(successResponse => {
          this.contestDetail = successResponse.data
          this.loadContestList(query)
        })
        .catch(failResponse => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    loadContestList (contestDetailId) {
      this.$axios
        .post('/searchContestByContestDetailId', {
          keywords: contestDetailId
        })
        .then(successResponse => {
          this.contestList = successResponse.data
          this.studentManNum = 0
          this.studentWomanNum = 0
          for (let i = 0; i < this.contestList.length; i++) {
            if (this.contestList[i].student.sex === '男') {
              this.studentManNum++
            }
            if (this.contestList[i].student.sex === '女') {
              this.studentWomanNum++
            }
          }
          this.loadSignUpDataOptions(this.studentManNum, this.studentWomanNum)
        })
        .catch(failResponse => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    loadSignUpDataOptions (studentManNum, studentWomanNum) {
      this.signUpDataOptions = {
        // 标题
        title: {
          text: '性别比例',
          x: 'center',
          textStyle: {
            color: '#000000',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '性别比例',
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
            color: '#1314ff',
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
                text: '报名人数',
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
</style>
