<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 800px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的地址</span>
      <div style="margin-top: 50px; background-color: #f7f9fb">
        <el-table
          :data="tableData"
          :show-header="false"
          style="width: 100%"
          :row-style="{height: '80px', background: '#f4f6f9'}">
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="号码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="postalCode"
            label="邮编"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="地址"
            width="280">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleChange(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 30px">
        <span style="font-size: 16px; font-weight: bolder">新增联系地址</span>
        <div style="margin-top: 30px">
          <p>该地址将用于快递获奖证书及发票等，请如实填写。</p>
          <el-form :model="addMyAddressForm" ref="addMyAddressForm" label-width="80px" :rules="addMyAddressFormRules"
                   style="width: 500px;">
            <el-form-item
              label="收 件 人"
              prop="age">
              <!--              v-model.number 只有输入数字才不会提示错误-->
              <el-input type="age" v-model.number="addMyAddressForm.age" placeholder="收件人" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
            </el-form-item>
            <el-form-item
              label="联系电话"
              prop="age">
              <el-input type="age" v-model.number="addMyAddressForm.age" placeholder="联系电话" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
            </el-form-item>
            <el-form-item
              label="邮政编码"
              prop="age">
              <el-input type="age" v-model.number="addMyAddressForm.age" placeholder="邮政编码" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
            </el-form-item>
            <el-form-item
              label="联系地址">
              <el-cascader
                size="small"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 420px; margin-left: 20px">
              </el-cascader>
            </el-form-item>
            <el-form-item
              label="详细地址"
              prop="age">
              <el-input type="age" v-model.number="addMyAddressForm.age"
                        placeholder="建议您如实填写收货地址，例如街道名称，门牌号码，楼层和房间号等信息"
                        autocomplete="off" size="small" style="margin-left: 20px; width: 500px" >
              </el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center; margin-top: 40px">
            <el-divider style="margin-top: 800px"></el-divider>
          </div>
          <div style="margin-top: 30px;text-align: center">
            <el-button @click="resetForm" style="width: 100px">重置</el-button>
            <el-button type="primary" @click="submitForm" style="width: 100px">提交</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'TeacherMyAddress',
  data: function () {
    return {
      tableData: [{
        id: 1,
        name: '冯钰臻',
        phone: '18278539579',
        postalCode: '530006',
        address: '广西壮族自治区南宁市大学东路188号 广西民族大学东校区'
      }, {
        id: 1,
        name: '冯钰臻',
        phone: '18278539579',
        postalCode: '530006',
        address: '广西壮族自治区南宁市大学东路188号 广西民族大学东校区'
      }],
      addMyAddressFormRules: {
        age: [
          {required: false, message: '年龄不能为空'},
          {type: 'number', message: '年龄必须为数字值'}
        ]
      },
      addMyAddressForm: {
        age: ''
      },
      options: regionData,
      selectedOptions: []
    }
  },
  methods: {
    submitForm () {
      this.$refs.addMyAddressForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
          })
        }
      })
    },
    resetForm () {
      this.$refs.addMyAddressForm.resetFields()
    },
    handleChange (value) {
      // value值为区域码
      // 用CodeToText转换成中文
      console.log(value)
      console.log(CodeToText[value[0]])
      console.log(CodeToText[value[1]])
      console.log(CodeToText[value[2]])
    }
  }
}
</script>

<style scoped>

</style>
