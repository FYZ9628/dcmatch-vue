<template>
  <div style="background-color: #f6f6f6; height: 1000px">
    <div style="height: 500px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">竞赛数据</div>
      <div style="padding: 20px 0 10px 30px; font-weight: bolder">每个月发布的竞赛数量</div>
      <v-chart class="ContestBar" ref="chart1" :options="orgOptions" :auto-resize="true"></v-chart>
    </div>
    <div style="height: 400px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder"></div>
<!--      <div style="padding: 20px 0 10px 10px; font-weight: bolder">竞赛数据</div>-->
      <v-chart class="StudentGenderRatio" :options="options2" :auto-resize="true"></v-chart>
      <v-chart class="StudentGenderRatio" :options="options" :auto-resize="true"></v-chart>
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
  name: 'ContestData',
  data () {
    return {
      orgOptions: {},
      options: {},
      options2: {}
    }
  },
  mounted () {
    this.orgOptions = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: {
          textStyle: {
            color: '#000000',
            fontSize: 14
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#000000',
            fontSize: 14
          }
        }
      },
      series: [{
        name: '个人赛',
        // 柱子宽度
        barWidth: 30,
        barGap: '0%', /* 多个并排柱子设置柱子之间的间距 */
        data: [28, 18, 33, 44, 55, 43, 34, 25, 36, 16, 36, 28],
        type: 'bar',
        smooth: true
      },
      {
        name: '团队赛',
        // 柱子宽度
        barWidth: 30,
        data: [28, 18, 33, 44, 55, 43, 34, 25, 36, 16, 36, 28],
        type: 'bar',
        smooth: true
      }],
      // 标签是否显示，默认是显示的，但默认真的字体较小
      label: {
        show: true,
        fontSize: 16
      },
      // 工具提示(鼠标经过的时候出现的提示)
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>{a} : {c}'
      },
      // 图例说明
      legend: {
        x: 'center',
        data: ['个人赛', '团队赛'],
        textStyle: {
          color: '#1314ff',
          fontSize: 16
        }
      },
      // 各个部分的颜色
      color: ['#18DBDF', '#f65e28']
    }
    this.options = {
      // 标题
      title: {
        text: '竞赛发布者（前5）',
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
            {value: 335, name: '管理员'},
            {value: 310, name: '举办方'},
            {value: 234, name: '教师'},
            {value: 135, name: '学生'},
            {value: 1548, name: '未认证用户'}
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
        data: ['管理员', '举办方', '教师', '学生', '未认证用户'],
        textStyle: {
          color: '#1314ff',
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
              text: '200',
              textAlign: 'center',
              fill: '#3d383a',
              font: "22px 'Helvetica',sans-serif"
            }
          }
        ]
      }
    }
    this.options2 = {
      // 标题
      title: {
        text: '竞赛类型',
        x: 'center',
        textStyle: {
          color: '#000000',
          fontSize: 16,
          fontWeight: 'normal'
        }
      },
      series: [
        {
          name: '竞赛类型',
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
                formatter: '{d}%'
                // a 标题，b 标签，c 数量，d 百分比
                // formatter: '{b} :{c} ({d}%)'
              },
              labelLine: {
                show: true
              }
            }
          },
          // 数据
          data: [
            {value: 335, name: '个人赛'},
            {value: 310, name: '团队赛'}
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
        data: ['个人赛', '团队赛'],
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
              text: '200',
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
</script>

<style scoped>
  /**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
  .ContestBar {
    width: 1200px;
    height: 400px;
    /*background: #409EFF;*/
  }
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
