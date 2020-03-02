<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 600px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的消息</span>
      <div style="width: 740px; height: 30px; border-bottom: #f1f1f1 2px solid; font-size: 14px; line-height: 22px; margin: 30px 0 0 0">
        <el-link style="color: #409EFF; display: block; float: left; margin-left: 20px">有下划线</el-link>
        <div style="color: #778a99; display: block; float: left">（共 {{test}} 条，<el-link style="color: #409EFF">未读消息</el-link> {{test}} 条）</div>
        <el-link style="color: #409EFF; display: block; float: left">有下划线</el-link>
      </div>
      <div>
<!--        :row-style="{height: '80px'}"-->
        <el-table
          ref="multipleTable"
          :data="tableData"
          :show-header="false"
          max-height="430"
          tooltip-effect="dark"
          :row-style="{height: '80px'}"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <el-table-column
            prop="type"
            label="通知类型"
            width="120">
<!--            两种方法都可以引用数据-->
<!--            <template slot-scope="scope">{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop="content"
            label="通知内容"
            width="390">
          </el-table-column>
          <el-table-column
            prop="time"
            label="通知时间"
            width="200">
          </el-table-column>
        </el-table>
        <div style="width: 740px; padding-top: 20px; height: 30px; border-top: #f1f1f1 2px solid; font-size: 14px; line-height: 22px;">
          <el-button type="primary" @click="selectAll()">全选</el-button>
          <el-button type="danger" @click="deleteSelect()" style="margin-left: 30px">删除选中的</el-button>
<!--          <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentMyNewsMenu from '@/components/student/StudentMyNewsMenu'
export default {
  name: 'StudentMyNews',
  components: {StudentMyNewsMenu},
  data: function () {
    return {
      test: '3',
      tableData: [{
        id: 1,
        type: '申请结果通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 2,
        type: '申请结果通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 3,
        type: '订单通知',
        content: '您的报名申请已通过院校筛选并',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 4,
        type: '订单通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 5,
        type: '申请结果通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 6,
        type: '订单通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      }, {
        id: 7,
        type: '申请结果通知',
        content: '您的报名申请已通过院校筛选并完成缴费，请及时关注“我的大赛”查看报名进度~',
        time: '2018年12月13日 12:55:26'
      } ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    selectAll () {
      if (this.multipleSelection.length !== 0) {
        this.$refs.multipleTable.clearSelection()
      } else if (this.multipleSelection.length === 0) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
    },
    deleteSelect () {
      console.log(this.multipleSelection)
    }
    // toggleSelection (rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //     console.log(rows)
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
