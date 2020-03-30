<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">未认证用户管理</div>
    <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="individualContestDetailList.filter(data => !search || data.contestTitle.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed="left"
        label="序号"
        type="index"
        min-width="50"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="left"
        prop="contestTitle"
        label="标题"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="organizer.user.name"
        label="举办方"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="signUpStartTime"
        label="报名开始时间"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="signUpEndTime"
        label="报名结束时间"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="place"
        label="举办地点"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="holdDate"
        label="竞赛日期"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        label="竞赛时间"
        min-width="120"
        align="center">
        <template slot-scope="scope">
          {{scope.row.holdStartTime}}-{{scope.row.holdEndTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="upperLimit"
        label="人数上限"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="180"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editUser(scope.$index, individualContestDetailList)"
            type="primary"
            size="mini">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteUser(scope.$index, individualContestDetailList)"
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
      <div style="height: 230px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editUserForm" ref="editUserForm"
                 label-width="80px"
                 :rules="editUserFormRules"
                 style="width: 500px;">
          <el-form-item
            label="姓  名"
            prop="name">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="editUserForm.name" placeholder="姓名" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="账  号"
            prop="phone">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.account" placeholder="电话" :disabled="true" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="电  话"
            prop="phone">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.phone" placeholder="电话" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="密  码"
            prop="password">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input v-model="editUserForm.password" placeholder="密码" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
        </el-form>
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
  name: 'AdminIndividualContest',
  data () {
    return {
      individualContestDetailList: [],
      adminList: [],
      admin: {
        id: '',
        account: '',
        phone: '',
        password: '',
        name: '',
        type: ''
      },
      editUserFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      editUserForm: {
        id: '',
        account: '',
        phone: '',
        password: '',
        name: '',
        type: ''
      },
      editUserFormRules: {
        account: [{required: true, message: '请输入账号', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
      },
      search: ''
    }
  },
  mounted: function () {
    this.loadContestDetail()
    this.loadAdmin()
  },
  methods: {
    loadContestDetail () {
      this.$axios.get('/getAllContestDetail').then(resp => {
        this.individualContestDetailList = []
        if (resp && resp.status === 200) {
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].type === '个人赛') {
              this.individualContestDetailList.push(resp.data[i])
            }
          }
        }
        console.log('测试个人赛')
        console.log(this.individualContestDetailList)
      })
    },
    loadAdmin () {
      this.$axios.get('/getAllUser').then(resp => {
        if (resp && resp.status === 200) {
          this.adminList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].type === 1) {
              let tempAdmin = {
                id: resp.data[i].id,
                account: resp.data[i].account,
                phone: resp.data[i].phone,
                password: resp.data[i].password,
                name: resp.data[i].name,
                type: resp.data[i].type
              }
              this.adminList.push(tempAdmin)
            }
          }
        }
      })
    },
    deleteUser (index, rows) {
      this.$axios
        .post('/deleteUser', {
          id: rows[index].id,
          account: rows[index].account,
          phone: rows[index].phone,
          password: rows[index].password,
          name: rows[index].name,
          type: rows[index].type
        })
        .then(successResponse => {
          this.$message({
            message: '成功删除了一名管理员',
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
        account: rows[index].account,
        phone: rows[index].phone,
        password: rows[index].password,
        name: rows[index].name,
        type: rows[index].type
      }
    },
    editUserSubmit () {
      this.listenLoading = true
      this.$axios
        .post('/updateUser', {
          id: this.editUserForm.id,
          account: this.editUserForm.account,
          phone: this.editUserForm.phone,
          password: this.editUserForm.password,
          name: this.editUserForm.name,
          type: this.editUserForm.type
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
              path: '/admin/user/adminUser'
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
      this.$confirm('确认全部删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true })
        .then(_ => {
          this.loadAdmin()
          if (this.adminList.length > 0) {
            for (let i = 0; i < this.adminList.length; i++) {
              this.$axios
                .post('/deleteUser', {
                  id: this.adminList[i].id,
                  account: this.adminList[i].account,
                  phone: this.adminList[i].phone,
                  password: this.adminList[i].password,
                  name: this.adminList[i].name,
                  type: this.adminList[i].type
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
              message: '成功删除了' + this.adminList.length + '名管理员',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/admin/user/adminUser'
                }).href, '_self'
                // 打开新窗口：_blank
                // 在本地窗口打开：_self
              )
            }, 1000)
          } else {
            this.$message({
              message: '当前无数据',
              type: 'warning'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
