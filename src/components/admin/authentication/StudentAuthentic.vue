<template>
    <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">学生认证申请列表</div>
      <el-table
        :data="studentList"
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
          label="审核"
          width="160"
          align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="reject(scope.$index, studentList)"
              type="danger"
              size="mini">
              驳回
            </el-button>
            <el-button
              @click.native.prevent="adopt(scope.$index, studentList)"
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
  name: 'studentAuthentic',
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
      }
    }
  },
  mounted: function () {
    this.loadStudent()
  },
  methods: {
    loadStudent () {
      this.$axios.get('/getAllStudent').then(resp => {
        if (resp && resp.status === 200) {
          this.studentList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 30) {
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
    reject (index, rows) {
      console.log('测试表格每行数据')
      console.log(rows[index])
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
            message: '驳回了一名学生的认证请求',
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
      // let tempStudent = {
      //   id: rows[index].id,
      //   user: {
      //     id: rows[index].user.id,
      //     account: rows[index].user.account,
      //     phone: rows[index].user.phone,
      //     password: rows[index].user.password,
      //     name: rows[index].user.name,
      //     type: rows[index].user.type
      //   },
      //   sex: rows[index].sex,
      //   email: rows[index].email,
      //   school: rows[index].school,
      //   admissionDate: rows[index].admissionDate,
      //   graduationDate: rows[index].graduationDate,
      //   academy: rows[index].academy,
      //   major: rows[index].major,
      //   education: rows[index].education,
      //   idImg: rows[index].idImg
      // }
      this.$axios
        .post('/updateStudent', {
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
        })
        .then(successResponse => {
          this.$message({
            message: '通过了一名学生的认证请求',
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
    allReject () {
      this.loadStudent()
      if (this.studentList.length > 0) {
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
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '驳回了' + this.studentList.length + '名学生的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/studentAuthentic'
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
      this.loadStudent()
      if (this.studentList.length > 0) {
        for (let i = 0; i < this.studentList.length; i++) {
          this.$axios
            .post('/updateStudent', {
              id: this.studentList[i].id,
              user: {
                id: this.studentList[i].user.id,
                account: this.studentList[i].user.account,
                phone: this.studentList[i].user.phone,
                password: this.studentList[i].user.password,
                name: this.studentList[i].user.name,
                type: 3
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
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '通过了' + this.studentList.length + '名学生的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/studentAuthentic'
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
