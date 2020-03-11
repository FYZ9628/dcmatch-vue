<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">教师管理</div>
    <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="organizerList.filter(data => !search || data.user.name.toLowerCase().includes(search.toLowerCase())
          || data.user.account.toLowerCase().includes(search.toLowerCase())
          || data.user.phone.toLowerCase().includes(search.toLowerCase())
          || data.email.toLowerCase().includes(search.toLowerCase())
          || data.school.toLowerCase().includes(search.toLowerCase())
          || data.schoolType.toLowerCase().includes(search.toLowerCase())
          || data.schoolRunningType.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed
        label="证  书"
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
        label="编号"
        width="125"
        align="center">
      </el-table-column>
      <el-table-column
        prop="user.phone"
        label="电话"
        width="120"
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
        prop="schoolType"
        label="学校类型"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="schoolRunningType"
        label="办学类型"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="establishDate"
        label="创立日期"
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
            @click.native.prevent="editUser(scope.$index, organizerList)"
            type="primary"
            size="mini">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteUser(scope.$index, organizerList)"
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
    <el-dialog title="编辑教师信息"
               :visible.sync="editUserFormVisible"
               :before-close="editUserFormHandleClose">
      <div style="height: 680px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editUserForm" ref="editUserForm"
                 label-width="80px"
                 :rules="editUserFormRules"
                 style="width: 500px;">
          <el-form-item
            label="组织名称"
            prop="user.name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="editUserForm.user.name" placeholder="姓名" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
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
            label="编  号"
            prop="user.account">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.user.account" placeholder="编号" :disabled="true" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="创立日期"
            prop="establishDate">
            <el-date-picker
              v-model="editUserForm.establishDate"
              type="date"
              placeholder="创立日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="学校类型"
            prop="schoolType">
            <el-select v-model="editUserForm.schoolType" placeholder="请选择" size="small"
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
            prop="schoolRunningType">
            <el-select v-model="editUserForm.schoolRunningType" placeholder="请选择" size="small"
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
        <div style="height: 200px; padding-left: 26px">
          <p style="display: block; float: left">认证书</p>
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
  name: 'OrganizerUser',
  data () {
    return {
      organizerList: [],
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
        schoolRunningType: '',
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
        email: '',
        school: '',
        establishDate: '',
        schoolType: '',
        schoolRunningType: '',
        idImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      editUserFormRules: {
        user: {
          account: [{required: true, message: '请输入学号', trigger: 'blur'}],
          phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
        },
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        establishDate: [{required: true, message: '请输入创立日期', trigger: 'blur'}],
        schoolType: [{required: true, message: '请选择学校类型', trigger: 'blur'}],
        schoolRunningType: [{required: true, message: '请选择办学类型', trigger: 'blur'}]
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
      tempEstablishDate: '',
      search: ''
    }
  },
  mounted: function () {
    this.loadOrganizer()
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
    loadOrganizer () {
      this.$axios.get('/getAllOrganizer').then(resp => {
        if (resp && resp.status === 200) {
          this.organizerList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 6) {
              let tempOrganizer = {
                id: resp.data[i].id,
                user: {
                  id: resp.data[i].user.id,
                  account: resp.data[i].user.account,
                  phone: resp.data[i].user.phone,
                  password: resp.data[i].user.password,
                  name: resp.data[i].user.name,
                  type: resp.data[i].user.type
                },
                email: resp.data[i].email,
                school: resp.data[i].school,
                establishDate: resp.data[i].establishDate,
                schoolType: resp.data[i].schoolType,
                schoolRunningType: resp.data[i].schoolRunningType,
                idImg: resp.data[i].idImg,
                bigIdImg: [resp.data[i].idImg]
              }
              this.organizerList.push(tempOrganizer)
            }
          }
        }
      })
    },
    deleteUser (index, rows) {
      this.$axios
        .post('/deleteOrganizer', {
          id: rows[index].id,
          user: {
            id: rows[index].user.id,
            account: rows[index].user.account,
            phone: rows[index].user.phone,
            password: rows[index].user.password,
            name: rows[index].user.name,
            type: rows[index].user.type
          },
          email: rows[index].email,
          school: rows[index].school,
          establishDate: rows[index].establishDate,
          schoolType: rows[index].schoolType,
          schoolRunningType: rows[index].schoolRunningType,
          idImg: rows[index].idImg
        })
        .then(successResponse => {
          this.$message({
            message: '删除了一个院校账号',
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
          type: rows[index].user.type
        },
        email: rows[index].email,
        school: rows[index].school,
        establishDate: rows[index].establishDate,
        schoolType: rows[index].schoolType,
        schoolRunningType: rows[index].schoolRunningType,
        idImg: rows[index].idImg
      }
      this.tempEstablishDate = rows[index].establishDate
    },
    editUserSubmit () {
      this.listenLoading = true
      if (this.tempEstablishDate !== this.editUserForm.establishDate) {
        this.tempEstablishDate = this.editUserForm.establishDate.toLocaleDateString()
      }
      this.$axios
        .post('/updateOrganizer', {
          id: this.editUserForm.id,
          user: {
            id: this.editUserForm.user.id,
            account: this.editUserForm.user.account,
            phone: this.editUserForm.user.phone,
            password: this.editUserForm.user.password,
            name: this.editUserForm.user.name,
            type: 6
          },
          email: this.editUserForm.email,
          school: this.editUserForm.school,
          establishDate: this.tempEstablishDate,
          schoolType: this.editUserForm.schoolType,
          schoolRunningType: this.editUserForm.schoolRunningType,
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
              path: '/admin/user/organizerUser'
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
      this.loadOrganizer()
      if (this.organizerList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(_ => {
            for (let i = 0; i < this.organizerList.length; i++) {
              this.$axios
                .post('/deleteOrganizer', {
                  id: this.organizerList[i].id,
                  user: {
                    id: this.organizerList[i].user.id,
                    account: this.organizerList[i].user.account,
                    phone: this.organizerList[i].user.phone,
                    password: this.organizerList[i].user.password,
                    name: this.organizerList[i].user.name,
                    type: this.organizerList[i].user.type
                  },
                  email: this.organizerList[i].email,
                  school: this.organizerList[i].school,
                  establishDate: this.organizerList[i].establishDate,
                  schoolType: this.organizerList[i].schoolType,
                  schoolRunningType: this.organizerList[i].schoolRunningType,
                  idImg: this.organizerList[i].idImg
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
              message: '成功删除了' + this.organizerList.length + '个院校账号',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/admin/user/organizerUser'
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
