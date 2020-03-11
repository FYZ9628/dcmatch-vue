<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">学生管理</div>
<!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="studentList.filter(data => !search || data.user.name.toLowerCase().includes(search.toLowerCase())
          || data.user.account.toLowerCase().includes(search.toLowerCase())
          || data.user.phone.toLowerCase().includes(search.toLowerCase())
          || data.email.toLowerCase().includes(search.toLowerCase())
          || data.school.toLowerCase().includes(search.toLowerCase())
          || data.academy.toLowerCase().includes(search.toLowerCase())
          || data.major.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed
        label="学生证"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 120px; height: 80px"
            :src="scope.row.idImg"
            :preview-src-list="scope.row.bigIdImg">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="user.name"
        label="姓名"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="user.account"
        label="学号"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="user.phone"
        label="电话"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="academy"
        label="学院"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="admissionDate"
        label="入学日期"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="graduationDate"
        label="毕业日期"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editUser(scope.$index, studentList)"
            type="primary"
            size="mini">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteUser(scope.$index, studentList)"
            type="danger"
            size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button
        @click="allDelete"
        type="primary"
        size="small"
        style="display: block; float: right; margin: 20px 20px 0 0">
        全部删除
      </el-button>
    </div>
<!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="编辑学生信息"
               :visible.sync="editUserFormVisible"
               :before-close="editUserFormHandleClose">
      <div style="height: 800px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editUserForm" ref="editUserForm"
                 label-width="80px"
                 :rules="editUserFormRules"
                 style="width: 500px;">
          <el-form-item
            label="姓  名"
            prop="user.name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="editUserForm.user.name" placeholder="姓名" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="性  别"
            prop="sex">
            <el-radio-group v-model="editUserForm.sex" style="margin-left: 20px">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="邮  箱"
            prop="email">
            <el-input type="age" v-model="editUserForm.email" placeholder="请填写邮箱，用于比赛通知" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="电  话"
            prop="user.phone">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.user.phone" placeholder="电话" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="学  校"
            prop="school">
            <el-select v-model="editUserForm.school" filterable placeholder="请输入并在下拉框中选择学校" size="small"
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
            label="学  号"
            prop="user.account">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.user.account" placeholder="学号" :disabled="true" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="入学日期"
            prop="admissionDate">
            <el-date-picker
              v-model="editUserForm.admissionDate"
              type="date"
              placeholder="入学日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="毕业日期"
            prop="graduationDate">
            <el-date-picker
              v-model="editUserForm.graduationDate"
              type="date"
              placeholder="毕业日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="所在院系"
            prop="academy">
            <el-input v-model="editUserForm.academy" placeholder="所在院系" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="专  业"
            prop="major">
            <el-input v-model="editUserForm.major" placeholder="专业" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="学  历"
            prop="education">
            <el-select v-model="editUserForm.education" placeholder="请选择" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in educationList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 200px; padding-left: 26px">
          <p style="display: block; float: left">学生证</p>
          <img :src="editUserForm.idImg" style="height: 150px; width: 250px;
               display: block; float: left; margin: 10px 0 0 30px">
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editUserSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentUser',
  data () {
    return {
      studentList: [],
      student: {
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
        admissionDate: '',
        graduationDate: '',
        academy: '',
        major: '',
        education: '',
        idImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        bigIdImg: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]
      },
      editUserFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      editUserForm: {
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
        admissionDate: '',
        graduationDate: '',
        academy: '',
        major: '',
        education: '',
        idImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      editUserFormRules: {
        user: {
          account: [{required: true, message: '请输入学号', trigger: 'blur'}],
          phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
        },
        sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        admissionDate: [{required: true, message: '请输入入学日期', trigger: 'blur'}],
        graduationDate: [{required: true, message: '请输入毕业日期', trigger: 'blur'}],
        academy: [{required: true, message: '请输入所在院系', trigger: 'blur'}],
        major: [{required: true, message: '请输入专业', trigger: 'blur'}],
        education: [{required: true, message: '请选择学历', trigger: 'blur'}]
      },
      schoolList: [],
      educationList: [
        {
          id: 1,
          name: '本科'
        },
        {
          id: 2,
          name: '专科'
        },
        {
          id: 3,
          name: '硕士研究生'
        },
        {
          id: 4,
          name: '博士研究生'
        }
      ],
      tempAdmissionDate: '',
      tempGraduationDate: '',
      search: ''
    }
  },
  mounted: function () {
    this.loadStudent()
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
    loadStudent () {
      this.$axios.get('/getAllStudent').then(resp => {
        if (resp && resp.status === 200) {
          this.studentList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 3) {
              let tempStudent = {
                id: resp.data[i].id,
                user: {
                  id: resp.data[i].user.id,
                  account: resp.data[i].user.account,
                  phone: resp.data[i].user.phone,
                  password: resp.data[i].user.password,
                  name: resp.data[i].user.name,
                  type: resp.data[i].user.type
                },
                sex: resp.data[i].sex,
                email: resp.data[i].email,
                school: resp.data[i].school,
                admissionDate: resp.data[i].admissionDate,
                graduationDate: resp.data[i].graduationDate,
                academy: resp.data[i].academy,
                major: resp.data[i].major,
                education: resp.data[i].education,
                idImg: resp.data[i].idImg,
                bigIdImg: [resp.data[i].idImg]
              }
              this.studentList.push(tempStudent)
            }
          }
        }
      })
    },
    deleteUser (index, rows) {
      this.$axios
        .post('/deleteStudent', {
          id: rows[index].id,
          user: {
            id: rows[index].user.id,
            account: rows[index].user.account,
            phone: rows[index].user.phone,
            password: rows[index].user.password,
            name: rows[index].user.name,
            type: rows[index].user.type
          },
          sex: rows[index].sex,
          email: rows[index].email,
          school: rows[index].school,
          admissionDate: rows[index].admissionDate,
          graduationDate: rows[index].graduationDate,
          academy: rows[index].academy,
          major: rows[index].major,
          education: rows[index].education,
          idImg: rows[index].idImg
        })
        .then(successResponse => {
          this.$message({
            message: '删除了一名学生',
            type: 'success'
          })
          rows.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    editUser (index, rows) {
      this.editUserFormVisible = true
      this.editUserForm = {
        id: rows[index].id,
        user: {
          id: rows[index].user.id,
          account: rows[index].user.account,
          phone: rows[index].user.phone,
          password: rows[index].user.password,
          name: rows[index].user.name,
          type: 3
        },
        sex: rows[index].sex,
        email: rows[index].email,
        school: rows[index].school,
        admissionDate: rows[index].admissionDate,
        graduationDate: rows[index].graduationDate,
        academy: rows[index].academy,
        major: rows[index].major,
        education: rows[index].education,
        idImg: rows[index].idImg
      }
      this.tempAdmissionDate = rows[index].admissionDate
      this.tempGraduationDate = rows[index].graduationDate
    },
    editUserSubmit () {
      this.listenLoading = true
      if (this.tempAdmissionDate !== this.editUserForm.admissionDate) {
        this.tempAdmissionDate = this.editUserForm.admissionDate.toLocaleDateString()
      }
      if (this.tempGraduationDate !== this.editUserForm.graduationDate) {
        this.tempGraduationDate = this.editUserForm.graduationDate.toLocaleDateString()
      }
      this.$axios
        .post('/updateStudent', {
          id: this.editUserForm.id,
          user: {
            id: this.editUserForm.user.id,
            account: this.editUserForm.user.account,
            phone: this.editUserForm.user.phone,
            password: this.editUserForm.user.password,
            name: this.editUserForm.user.name,
            type: 3
          },
          sex: this.editUserForm.sex,
          email: this.editUserForm.email,
          school: this.editUserForm.school,
          admissionDate: this.tempAdmissionDate,
          graduationDate: this.tempGraduationDate,
          academy: this.editUserForm.academy,
          major: this.editUserForm.major,
          education: this.editUserForm.education,
          idImg: this.editUserForm.idImg
        })
        .then(successResponse => {
          this.listenLoading = false
          this.editUserFormVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          window.open(
            this.$router.resolve({
              path: '/admin/user/studentUser'
            }).href, '_self'
            // 打开新窗口：_blank
            // 在本地窗口打开：_self
          )
        })
        .catch(failResponse => {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        })
    },
    // 点击外面遮罩时提示，防止误点
    editUserFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    allDelete () {
      this.loadStudent()
      if (this.studentList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.studentList.length; i++) {
              this.$axios
                .post('/deleteStudent', {
                  id: this.studentList[i].id,
                  user: {
                    id: this.studentList[i].user.id,
                    account: this.studentList[i].user.account,
                    phone: this.studentList[i].user.phone,
                    password: this.studentList[i].user.password,
                    name: this.studentList[i].user.name,
                    type: this.studentList[i].user.type
                  },
                  sex: this.studentList[i].sex,
                  email: this.studentList[i].email,
                  school: this.studentList[i].school,
                  admissionDate: this.studentList[i].admissionDate,
                  graduationDate: this.studentList[i].graduationDate,
                  academy: this.studentList[i].academy,
                  major: this.studentList[i].major,
                  education: this.studentList[i].education,
                  idImg: this.studentList[i].idImg
                })
                .then(successResponse => {
                })
                .catch(failResponse => {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  })
                })
            }
            this.$message({
              message: '成功删除了' + this.studentList.length + '名学生',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/admin/user/studentUser'
                }).href, '_self'
                // 打开新窗口：_blank
                // 在本地窗口打开：_self
              )
            }, 1000)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message({
          message: '当前无数据',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
