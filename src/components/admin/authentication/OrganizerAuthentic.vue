<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">学生认证申请列表</div>
    <el-table
      :data="organizerList"
      style="width: 100%"
      max-height="430">
      <el-table-column
        fixed
        label="法人证书"
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
        label="组织名称"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="user.account"
        label="编号"
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
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="审核"
        width="160"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="reject(scope.$index, organizerList)"
            type="danger"
            size="mini">
            驳回
          </el-button>
          <el-button
            @click.native.prevent="adopt(scope.$index, organizerList)"
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
  name: 'organizerAuthentic',
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
      }
    }
  },
  mounted: function () {
    this.loadOrganizer()
  },
  methods: {
    loadOrganizer () {
      this.$axios.get('/getAllOrganizer').then(resp => {
        if (resp && resp.status === 200) {
          this.organizerList = []
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].user.type === 60) {
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
    reject (index, rows) {
      console.log('测试表格每行数据')
      console.log(rows[index])
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
      this.$axios
        .post('/updateOrganizer', {
          id: rows[index].id,
          user: {
            id: rows[index].user.id,
            account: rows[index].user.account,
            phone: rows[index].user.phone,
            password: rows[index].user.password,
            name: rows[index].user.name,
            type: 6
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
            message: '通过了一名学生的认证请求',
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
      this.loadOrganizer()
      if (this.organizerList.length > 0) {
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
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '驳回了' + this.organizerList.length + '名学生的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/organizerAuthentic'
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
      this.loadOrganizer()
      if (this.organizerList.length > 0) {
        for (let i = 0; i < this.organizerList.length; i++) {
          this.$axios
            .post('/updateOrganizer', {
              id: this.organizerList[i].id,
              user: {
                id: this.organizerList[i].user.id,
                account: this.organizerList[i].user.account,
                phone: this.organizerList[i].user.phone,
                password: this.organizerList[i].user.password,
                name: this.organizerList[i].user.name,
                type: 6
              },
              email: this.organizerList[i].email,
              school: this.organizerList[i].school,
              establishDate: this.organizerList[i].establishDate,
              schoolType: this.organizerList[i].schoolType,
              schoolRunningType: this.organizerList[i].schoolRunningType,
              idImg: this.organizerList[i].idImg
            })
            .then(successResponse => {
              this.searchRegister(i, this.organizerList)
            })
            .catch(failResponse => {
              this.$message({
                message: '审核失败',
                type: 'error'
              })
            })
        }
        this.$message({
          message: '通过了' + this.organizerList.length + '名学生的认证请求',
          type: 'success'
        })
        // 一秒后刷新
        setTimeout(() => {
          window.open(
            this.$router.resolve({
              path: '/admin/authentication/organizerAuthentic'
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
