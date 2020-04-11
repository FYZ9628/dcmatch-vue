<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 220px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
      <span style="font-size: 16px; font-weight: bolder">个人认证</span>
      <div style="margin-top: 30px">
        <p>以下信息将用于验证贵院校的真实信息，请务必填写真实资料</p>
        <el-form :model="individualAuthenticationForm" ref="individualAuthenticationForm" label-width="80px" :rules="individualAuthenticationFormRules"
                 style="width: 500px; margin-top: 30px">
          <el-form-item
            label="组织名称"
            prop="name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="individualAuthenticationForm.name" placeholder="组织名称" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="邮  箱"
            prop="email">
            <el-input type="age" v-model="individualAuthenticationForm.email" placeholder="请填写邮箱，用于比赛通知" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height: 720px; background-color: #ffffff; margin-bottom: 10px; padding: 30px 50px;">
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
                v-for="item in schoolList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="编  号"
            prop="organizer_id">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="schoolAuthenticationForm.organizer_id" placeholder="编号" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="创立日期"
            prop="establish_date">
            <el-date-picker
              v-model="schoolAuthenticationForm.establish_date"
              type="date"
              placeholder="创立日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="学校类型"
            prop="school_type">
            <el-select v-model="schoolAuthenticationForm.school_type" placeholder="请选择" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in schoolTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="办学类型"
            prop="school_running_type">
            <el-select v-model="schoolAuthenticationForm.school_running_type" placeholder="请选择" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in schoolRunningTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 200px; margin-top: 30px">
          <p>事业单位法人证书照片  2M以内的JPG、PNG格式，请上传事业单位法人证书粘贴照片一页</p>
          <el-upload
            id="avatar-uploader"
            action="http://localhost:8999/api/upLoadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <div v-if="!imageUrl" style="margin: 50px 85px 50px 85px; width: 50px; height: 50px; border: 2px solid #ffffff;border-radius: 60px">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div style="font-size: 12px; margin-top: 10px; color: #ffffff">点击上传</div>
            </div>
            <img v-if="imageUrl" :src="imageUrl" class="avatar" @click="removeImageUrl">
          </el-upload>
          <div v-if="!isImageUrl" style="display: block; float: left;
            margin-left: 30px; font-size: 16px; color: red;">
            请上传图片！
          </div>
        </div>
        <div style="text-align: center;">
          <el-divider ></el-divider>
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
  name: 'DefaultAuthenticationOrganizer',
  data: function () {
    return {
      individualAuthenticationForm: {
        name: '',
        email: ''
      },
      individualAuthenticationFormRules: {
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
      },
      schoolAuthenticationForm: {
        school: '',
        organizer_id: '',
        establish_date: '',
        school_type: '',
        school_running_type: ''
      },
      schoolAuthenticationFormRules: {
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        organizer_id: [{required: true, message: '请输入编号', trigger: 'blur'}],
        establish_date: [{required: true, message: '请输入创立日期', trigger: 'blur'}],
        school_type: [{required: true, message: '请选择学校类型', trigger: 'blur'}],
        school_running_type: [{required: true, message: '请选择办学类型', trigger: 'blur'}]
      },
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
        schoolRunningType: ''
      },
      schoolList: [],
      schoolTypeList: [
        {
          id: 1,
          name: '综合类'
        },
        {
          id: 2,
          name: '民族类'
        },
        {
          id: 3,
          name: '理工类'
        },
        {
          id: 4,
          name: '师范类'
        },
        {
          id: 5,
          name: '农林类'
        },
        {
          id: 6,
          name: '政法类'
        },
        {
          id: 7,
          name: '医药类'
        },
        {
          id: 8,
          name: '财经类'
        },
        {
          id: 9,
          name: '语言类'
        },
        {
          id: 10,
          name: '艺术类'
        },
        {
          id: 11,
          name: '体育类'
        },
        {
          id: 12,
          name: '军事类'
        },
        {
          id: 11,
          name: '旅游类'
        }
      ],
      schoolRunningTypeList: [
        {
          id: 1,
          name: '普通本科'
        },
        {
          id: 2,
          name: '211高校'
        },
        {
          id: 3,
          name: '985高校'
        },
        {
          id: 4,
          name: '高职（高专）高校'
        }
      ],
      imageUrl: '',
      isImageUrl: true
    }
  },
  mounted: function () {
    this.loadSchool()
  },
  methods: {
    loadSchool () {
      let _this = this
      this.$axios.get('/getAllSchool').then(resp => {
        if (resp && resp.status === 200) {
          _this.schoolList = resp.data
        }
      })
    },
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
      if (this.imageUrl) {
        if (i === 1 && k === 1) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.$axios
              .post('/addOrganizer', {
                id: '',
                user: {
                  id: '',
                  account: this.schoolAuthenticationForm.organizer_id,
                  phone: this.$store.getters.account,
                  password: this.$store.getters.password,
                  name: this.individualAuthenticationForm.name,
                  // 认证为教师 20，认证为学生 30 认证为院校 60
                  type: 60
                },
                email: this.individualAuthenticationForm.email,
                school: this.schoolAuthenticationForm.school,
                // 日期格式 2020/3/6
                establishDate: this.schoolAuthenticationForm.establish_date.toLocaleDateString(),
                schoolType: this.schoolAuthenticationForm.school_type,
                schoolRunningType: this.schoolAuthenticationForm.school_running_type,
                idImg: this.imageUrl
              })
              .then(successResponse => {
                // 只要数据库有添加了（只加在了一个表，但其它表不成功也算）
                // 就会返回 successResponse.status 状态码 200
                this.student = successResponse.data
                if (successResponse.data) {
                  this.$message({
                    message: '已发送认证信息',
                    type: 'success'
                  })
                  // 一秒后刷新
                  setTimeout(() => {
                    window.open(
                      this.$router.resolve({
                        path: '/default/authentication/authenticationOrganizer'
                      }).href, '_self'
                      // 打开新窗口：_blank
                      // 在本地窗口打开：_self
                    )
                  }, 1000)
                } else {
                  this.$message({
                    message: '编号已被认证',
                    type: 'error'
                  })
                }
              })
              .catch(failResponse => {
                this.$message({
                  message: '手机号码已被认证',
                  type: 'error'
                })
              })
          })
        }
      } else {
        this.isImageUrl = false
      }
    },
    resetForm () {
      this.$refs.individualAuthenticationForm.resetFields()
      this.$refs.schoolAuthenticationForm.resetFields()
    },
    handleAvatarSuccess (response, file) {
      // console.log('测试上传的图片')
      // console.log('这是获取回来的整个对象名')
      // console.log(file)
      // console.log('这是获取回来的图片url')
      // console.log(response)
      this.imageUrl = response
      // 这是另一种获取图片url的方法
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.isImageUrl = true
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    removeImageUrl () {
      this.$axios
        .post('/deleteImg', {
          // 发送的请求数据为类似 http://localhost:8999/api/file/48h2yv.jpg
          imagePath: this.imageUrl
        })
        .then(successResponse => {
          this.imageUrl = ''
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
  /*class用不了 所以用了 id*/
  #avatar-uploader {
    display: block;
    float: left;
    background: url('../../../assets/organizer_id_card.jpg') no-repeat;
    background-size: cover;
    width: 220px; height: 150px
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 150px;
    display: block;
  }
</style>
