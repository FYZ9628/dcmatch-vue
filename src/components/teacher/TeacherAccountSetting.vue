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
            prop="newPhone">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="phone" v-model.number="changePhoneForm.newPhone" placeholder="新号码" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
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
  name: 'TeacherAccountSetting',
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
      teacherData: {
        id: '',
        user: {
          id: '',
          account: '',
          phone: '',
          password: '',
          name: '',
          type: ''
        },
        sex: '',
        email: '',
        school: '',
        entryDate: '',
        academy: '',
        professionalTitle: '',
        education: '',
        idImg: ''
      },
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
        newPhone: [
          {required: false, message: '请输入新手机号码'},
          {type: 'number', message: '手机号码必须为数字值'}
        ]
      },
      changePhoneForm: {
        oldPhone: '',
        newPhone: ''
      }
    }
  },
  mounted: function () {
    this.loadTeacher()
  },
  methods: {
    loadTeacher () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchTeacherByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.teacherData = successResponse.data
            this.changePhoneForm.oldPhone = successResponse.data.user.phone
          })
          .catch(failResponse => {
            this.$message({
              message: '查询教师失败',
              type: 'error'
            })
          })
      }
    },
    submitChangePasswordForm () {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认修改密码？', '提示', {}).then(() => {
            if (this.$store.getters.name) {
              this.$axios
                .post('/updateUser', {
                  id: this.teacherData.user.id,
                  account: this.teacherData.user.account,
                  phone: this.teacherData.user.phone,
                  password: this.changePasswordForm.password,
                  name: this.teacherData.user.name,
                  type: this.teacherData.user.type
                })
                .then(successResponse => {
                  this.changePasswordForm.password = ''
                  this.changePasswordForm.checkPassword = ''
                  this.loadTeacher()
                  this.$message({
                    message: '修改密码成功',
                    type: 'success'
                  })
                })
                .catch(failResponse => {
                  this.$message({
                    message: '修改密码失败',
                    type: 'error'
                  })
                })
            }
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
          this.$confirm('确认修改号码？', '提示', {}).then(() => {
            if (this.$store.getters.name) {
              this.$axios
                .post('/updateUser', {
                  id: this.teacherData.user.id,
                  account: this.teacherData.user.account,
                  phone: this.changePhoneForm.newPhone,
                  password: this.teacherData.user.password,
                  name: this.teacherData.user.name,
                  type: this.teacherData.user.type
                })
                .then(successResponse => {
                  this.changePhoneForm.newPhone = null
                  this.changePhoneForm.oldPhone = successResponse.data.phone
                  this.loadTeacher()
                  this.$message({
                    message: '修改号码成功',
                    type: 'success'
                  })
                })
                .catch(failResponse => {
                  this.$message({
                    message: '修改密码失败',
                    type: 'error'
                  })
                })
            }
          })
        }
      })
    },
    resetChangePhoneForm () {
      // this.$refs.changePhoneForm.resetFields()
      this.changePhoneForm.newPhone = null
    }
  }
}
</script>

<style scoped>

</style>
