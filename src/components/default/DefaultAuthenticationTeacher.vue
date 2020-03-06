<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 300px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证</span>
      <div style="margin-top: 30px">
        <p>以下信息将用于准考证、获奖证书等申请、制作，请务必填写真实资料</p>
        <el-form :model="individualAuthenticationForm" ref="individualAuthenticationForm" label-width="80px" :rules="individualAuthenticationFormRules"
                 style="width: 500px; margin-top: 30px">
          <el-form-item
            label="姓  名"
            prop="name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="individualAuthenticationForm.name" placeholder="姓名" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="性  别"
            prop="sex">
            <el-radio-group v-model="individualAuthenticationForm.sex" style="margin-left: 20px">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="邮  箱"
            prop="email">
            <el-input type="age" v-model="individualAuthenticationForm.email" placeholder="请填写邮箱，用于比赛通知" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height: 900px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">院校认证</span>
      <div style="margin-top: 30px">
        <el-form :model="schoolAuthenticationForm" ref="schoolAuthenticationForm" label-width="80px" :rules="schoolAuthenticationFormRules"
                 style="width: 500px;">
          <el-form-item
            label="学  校"
            prop="school">
            <el-select v-model="schoolAuthenticationForm.school" filterable placeholder="请输入并在下拉框中选择学校" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学  号"
            prop="student_id">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model.number="schoolAuthenticationForm.student_id" placeholder="学号" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="入学日期"
            prop="admission_date">
            <el-date-picker
              v-model="schoolAuthenticationForm.admission_date"
              type="date"
              placeholder="入学日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="毕业日期"
            prop="graduation_date">
            <el-date-picker
              v-model="schoolAuthenticationForm.graduation_date"
              type="date"
              placeholder="毕业日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="所在院系"
            prop="academy">
            <el-input type="age" v-model.number="schoolAuthenticationForm.academy" placeholder="所在院系" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="专  业"
            prop="major">
            <el-input type="age" v-model.number="schoolAuthenticationForm.major" placeholder="专业" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="学  历"
            prop="education">
            <el-select v-model="schoolAuthenticationForm.education" placeholder="请选择" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 250px; margin-top: 30px">
          <p>学生证照片  2M以内的JPG、PNG格式，请上传学生证粘贴照片一页</p>
          <div style="width: 200px; height: 150px ; display: block; float: left">
            <p style="padding: 0; margin: 0">示例</p>
            <img src="../../assets/student_id_card.jpg" style="width: 200px; height: 150px; margin-top: 10px">
          </div>
          <el-upload
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            style="display: block; float: right; margin-top: 10px">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将照片拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
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
</template>

<script>
export default {
  name: 'DefaultAuthenticationTeacher',
  data: function () {
    return {
      individualAuthenticationForm: {
        name: '',
        sex: '',
        email: ''
      },
      individualAuthenticationFormRules: {
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
      },
      schoolAuthenticationForm: {
        school: '',
        student_id: '',
        admission_date: '',
        graduation_date: '',
        academy: '',
        major: '',
        education: ''
      },
      schoolAuthenticationFormRules: {
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        student_id: [{required: true, message: '请输入学号', trigger: 'blur'}],
        admission_date: [{required: true, message: '请输入入学日期', trigger: 'blur'}],
        graduation_date: [{required: true, message: '请输入毕业日期', trigger: 'blur'}],
        academy: [{required: true, message: '请输入所在院系', trigger: 'blur'}],
        major: [{required: true, message: '请输入专业', trigger: 'blur'}],
        education: [{required: true, message: '请选择学历', trigger: 'blur'}]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted: function () {
  },
  methods: {
    submitForm () {
      let i = 0
      let k = 0
      this.$refs.individualAuthenticationForm.validate((valid) => {
        if (valid) {
          i = 1
        }
      })
      this.$refs.schoolAuthenticationForm.validate((valid2) => {
        if (valid2) {
          k = 1
        }
      })
      if (i === 1 && k === 1) {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          console.log('测试authenticationForm')
          console.log('测试authenticationForm')
          console.log('测试authenticationForm')
          console.log(this.$refs.individualAuthenticationForm)
          console.log(this.$refs.schoolAuthenticationForm)
        })
      }
    },
    resetForm () {
      this.$refs.individualAuthenticationForm.resetFields()
      this.$refs.schoolAuthenticationForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
