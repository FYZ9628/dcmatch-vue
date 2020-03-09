<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">学生认证申请列表</div>
    <el-table
      :data="teacherList"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed
        label="聘请书"
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
        label="工号"
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
        prop="entryDate"
        label="入职日期"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="academy"
        label="学院"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="professionalTitle"
        label="职称"
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
        fixed="right"
        label="审核"
        width="160"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="reject(scope.$index, teacherList)"
            type="danger"
            size="mini">
            驳回
          </el-button>
          <el-button
            @click.native.prevent="adopt(scope.$index, teacherList)"
            type="danger"
            size="mini">
            通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button
        @click="allAdopt"
        type="primary"
        size="small"
        style="display: block; float: right; margin: 20px 20px 0 0">
        一键通过
      </el-button>
      <el-button
        @click="allReject"
        type="primary"
        size="small"
        style="display: block; float: right; margin: 20px 20px 0 0">
        一键驳回
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teacherAuthentic',
  data () {
    return {
      teacherList: [],
      teacher: {
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
        idImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        bigIdImg: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]
      }
    }
  },
  mounted: function () {
    this.loadTeacher()
  },
  methods: {
    loadTeacher () {
      this.$axios.get('/getAllTeacher').then(resp => {
        if (resp && resp.status === 200) {
          this.teacherList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 20) {
              let tempTeacher = {
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
                entryDate: resp.data[i].entryDate,
                academy: resp.data[i].academy,
                professionalTitle: resp.data[i].professionalTitle,
                education: resp.data[i].education,
                idImg: resp.data[i].idImg,
                bigIdImg: [resp.data[i].idImg]
              }
              this.teacherList.push(tempTeacher)
            }
          }
        }
      })
    },
    reject (index, rows) {
      console.log('测试表格每行数据')
      console.log(rows[index])
      this.$axios
        .post('/deleteTeacher', {
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
          entryDate: rows[index].entryDate,
          academy: rows[index].academy,
          professionalTitle: rows[index].professionalTitle,
          education: rows[index].education,
          idImg: rows[index].idImg
        })
        .then(successResponse => {
          this.$message({
            message: '驳回了一名教师的认证请求',
            type: 'success'
          })
          rows.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '审核失败',
            type: 'error'
          })
        })
    },
    adopt (index, rows) {
      this.$axios
        .post('/updateTeacher', {
          id: rows[index].id,
          user: {
            id: rows[index].user.id,
            account: rows[index].user.account,
            phone: rows[index].user.phone,
            password: rows[index].user.password,
            name: rows[index].user.name,
            type: 2
          },
          sex: rows[index].sex,
          email: rows[index].email,
          school: rows[index].school,
          entryDate: rows[index].entryDate,
          academy: rows[index].academy,
          professionalTitle: rows[index].professionalTitle,
          education: rows[index].education,
          idImg: rows[index].idImg
        })
        .then(successResponse => {
          this.$message({
            message: '通过了一名教师的认证请求',
            type: 'success'
          })
          this.searchRegister(index, rows)
          rows.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '审核失败',
            type: 'error'
          })
        })
    },
    searchRegister (index, rows) {
      this.$axios
        .post('/searchRegister', {
          keywords: rows[index].user.phone
        })
        .then(successResponse => {
          let register = successResponse.data
          this.deleteRegister(register)
        })
        .catch(failResponse => {
          this.$message({
            message: '查询register失败',
            type: 'error'
          })
        })
    },
    deleteRegister (register) {
      this.$axios
        .post('/deleteRegister', {
          id: register.id,
          phone: register.phone,
          password: register.password
        })
        .then(successResponse => {
          // this.$message({
          //   message: '删除register成功',
          //   type: 'success'
          // })
        })
        .catch(failResponse => {
          this.$message({
            message: '删除register失败',
            type: 'error'
          })
        })
    },
    allReject () {
      this.loadTeacher()
      if (this.teacherList.length > 0) {
        for (let i = 0; i < this.teacherList.length; i++) {
          this.$axios
            .post('/deleteTeacher', {
              id: this.teacherList[i].id,
              user: {
                id: this.teacherList[i].user.id,
                account: this.teacherList[i].user.account,
                phone: this.teacherList[i].user.phone,
                password: this.teacherList[i].user.password,
                name: this.teacherList[i].user.name,
                type: this.teacherList[i].user.type
              },
              sex: this.teacherList[i].sex,
              email: this.teacherList[i].email,
              school: this.teacherList[i].school,
              entryDate: this.teacherList[i].entryDate,
              academy: this.teacherList[i].academy,
              professionalTitle: this.teacherList[i].professionalTitle,
              education: this.teacherList[i].education,
              idImg: this.teacherList[i].idImg
            })
            .then(successResponse => {
            })
            .catch(failResponse => {
              this.$message({
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '驳回了' + this.teacherList.length + '名教师的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/teacherAuthentic'
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
    },
    allAdopt () {
      this.loadTeacher()
      if (this.teacherList.length > 0) {
        for (let i = 0; i < this.teacherList.length; i++) {
          this.$axios
            .post('/updateTeacher', {
              id: this.teacherList[i].id,
              user: {
                id: this.teacherList[i].user.id,
                account: this.teacherList[i].user.account,
                phone: this.teacherList[i].user.phone,
                password: this.teacherList[i].user.password,
                name: this.teacherList[i].user.name,
                type: 2
              },
              sex: this.teacherList[i].sex,
              email: this.teacherList[i].email,
              school: this.teacherList[i].school,
              entryDate: this.teacherList[i].entryDate,
              academy: this.teacherList[i].academy,
              professionalTitle: this.teacherList[i].professionalTitle,
              education: this.teacherList[i].education,
              idImg: this.teacherList[i].idImg
            })
            .then(successResponse => {
              this.searchRegister(i, this.teacherList)
            })
            .catch(failResponse => {
              this.$message({
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '通过了' + this.teacherList.length + '名教师的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/teacherAuthentic'
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
    }
  }
}
</script>

<style scoped>

</style>
