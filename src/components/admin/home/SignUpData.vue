<template>
  <div style="background-color: #f6f6f6; height: 600px">
    <div style="height: 400px; width: 1230px; background-color: #ffffff;
     margin-bottom: 10px; text-align: left;">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">报名数据</div>
      <v-chart class="userType" :options="options" :auto-resize="true" style="margin: 0 auto;"></v-chart>
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
      options: {}
    }
  },
  mounted () {
    this.options = {
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
          data: [
            {value: 335, name: '男'},
            {value: 310, name: '女'}
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
  .userType {
    width: 900px;
    height: 350px;
    /*background: #409EFF;*/
  }
</style>
