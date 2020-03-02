<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 600px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的订单</span>
      <el-table
        :data="tableData"
        max-height="500"
        border
        style="width: 100%; margin-top: 50px;">
        <el-table-column
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="订单信息"
          width="230">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentMyOrder',
  data: function () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .el-table .cell {
    white-space: pre-line;
  }
</style>
