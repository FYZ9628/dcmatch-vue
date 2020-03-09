<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 600px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">账号设置</span>
      <div style="margin: 50px 0 0 20px">
        <span style="font-size: 16px; font-weight: bolder">修改密码</span>
        <el-form :model="changePasswordForm" :rules="changePasswordFormRules" ref="changePasswordForm"
                 label-width="100px" style="width: 400px; margin: 30px 0 0 50px" >
          <el-form-item label="新密码" prop="password">
            <el-input size="small" type="password" v-model="changePasswordForm.password" autocomplete="off" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPassword">
            <el-input size="small" type="password" v-model="changePasswordForm.checkPassword" autocomplete="off" style="margin-left: 20px"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top: 30px;text-align: center">
          <el-button @click="resetChangePasswordForm" style="width: 100px">重置</el-button>
          <el-button type="primary" @click="submitChangePasswordForm" style="width: 100px">提交</el-button>
        </div>
      </div>
      <div style="margin: 50px 0 0 20px">
        <span style="font-size: 16px; font-weight: bolder">修改手机号码</span>
        <el-form :model="changePhoneForm" ref="changePhoneForm" label-width="80px" :rules="changePhoneFormRules"
                 style="width: 400px; margin: 30px 0 0 50px" >
          <el-form-item
            label="原号码"
            prop="oldPhone">
            <el-input type="age" :disabled="true" v-model="changePhoneForm.oldPhone" placeholder="原号码" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="新号码"
            prop="nowPhone">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="phone" v-model.number="changePhoneForm.nowPhone" placeholder="新号码" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top: 30px;text-align: center">
          <el-button @click="resetChangePhoneForm" style="width: 100px">重置</el-button>
          <el-button type="primary" @click="submitChangePhoneForm" style="width: 100px">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizerAccountSetting',
  data: function () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.changePasswordForm.checkPassword !== '') {
          this.$refs.changePasswordForm.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      changePasswordForm: {
        password: '',
        checkPassword: ''
      },
      changePasswordFormRules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      changePhoneFormRules: {
        nowPhone: [
          {required: false, message: '请输入新手机号码'},
          {type: 'number', message: '手机号码必须为数字值'}
        ]
      },
      changePhoneForm: {
        oldPhone: '',
        nowPhone: ''
      }
    }
  },
  methods: {
    submitChangePasswordForm () {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
          })
        }
      })
    },
    resetChangePasswordForm () {
      this.$refs.changePasswordForm.resetFields()
    },
    submitChangePhoneForm () {
      this.$refs.changePhoneForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
          })
        }
      })
    },
    resetChangePhoneForm () {
      this.$refs.changePhoneForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
