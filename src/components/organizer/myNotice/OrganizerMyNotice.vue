<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的通知</span>
      <div style="height: 30px">
        <el-button type="primary" @click="publishNotice"
                   style="display: block; float: right; margin-right: 50px" >发布新通知</el-button>
      </div>
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">已发布的通知如下：</div>
      <div v-if="noticeList.length !== 0">
        <!--  可通过竞赛标题查询  -->
        <el-table
          :data="noticeList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          max-height="350">
          <el-table-column
            fixed
            prop="title"
            width="500"
            align="left">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="160"
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="small"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteNotice(scope.$index, scope.row)"
                type="danger"
                size="small">
                删除
              </el-button>
              <el-button
                @click.native.prevent="gotoNoticeDetails(scope.$index, noticeList)"
                type="primary"
                size="small">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-button
            @click="allDelete"
            type="danger"
            size="small"
            style="display: block; float: right; margin: 20px 20px 0 0">
            全部删除
          </el-button>
        </div>
      </div>
      <!--  -------------------------------------------- 分界线 以下是另一种做法 -------------------------------------------------------  -->
      <!--      <div style="height: 160px; margin: 10px 0 0 20px">-->
      <!--        <span style="margin-top: 10px; font-weight: bolder">进行中的比赛科目列表如下：</span>-->
      <!--        <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">-->
      <!--          <div v-for="(item, index) in contestDetailList"-->
      <!--               :key="item.value"-->
      <!--               style="text-align: left; margin: 30px 30px 0 0">-->
      <!--            <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;-->
      <!--           padding: 20px 15px;">-->
      <!--              <div style="width: 450px; font-size: 18px; font-weight: bolder;-->
      <!--             line-height: 40px;  display: block; float: left;-->
      <!--              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">-->
      <!--                {{item.contestTitle}}-->
      <!--              </div>-->
      <!--              <el-button type="danger" @click="deleteContestDetails(index, contestDetailList)" style="height: 40px; display: block; float: left; margin-left: 10px">-->
      <!--                删除-->
      <!--              </el-button>-->
      <!--              <el-button type="primary" @click="gotoContestDetails(index, contestDetailList)" plain style="height: 40px; display: block; float: right">-->
      <!--                查看详情-->
      <!--              </el-button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="noticeList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无通知</el-tag>
      </div>
    </div>
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="发布新比赛"
               :visible.sync="publishNoticeFormVisible"
               :before-close="publishNoticeFormHandleClose"
               width="720px">
      <div style="min-height: 300px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="publishNoticeForm" ref="publishNoticeForm"
                 label-width="80px"
                 :rules="publishNoticeFormRules"
                 style="width: 500px;">
          <el-form-item
            label="标  题"
            prop="title">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="publishNoticeForm.title" placeholder="标题" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="内  容"
            prop="content">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              size="small" style="margin-left: 20px;"
              v-model="publishNoticeForm.content">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishNoticeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="publishNoticeSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrganizerMyNotice',
  data: function () {
    return {
      organizerData: {
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
      noticeList: [],
      publishNoticeFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      publishNoticeForm: {
        id: '',
        title: '',
        time: '',
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
          idImg: ''
        },
        content: ''
      },
      publishNoticeFormRules: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        content: [{required: true, message: '请输入内容', trigger: 'blur'}]
      },
      search: ''
    }
  },
  mounted: function () {
    this.loadOrganizer()
    this.loadNotice()
  },
  methods: {
    loadOrganizer () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchOrganizerByAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.organizerData = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    loadNotice () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchNoticeByOrganizerAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            this.noticeList = []
            this.noticeList = successResponse.data
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    publishNotice () {
      this.publishNoticeFormVisible = true
    },
    publishNoticeSubmit () {
      this.$refs.publishNoticeForm.validate((valid) => {
        if (valid) {
          this.listenLoading = true
          this.$axios
            .post('/addNotice', {
              id: '',
              title: this.publishNoticeForm.title,
              // 获取当前时间
              time: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
              organizer: this.organizerData,
              content: this.publishNoticeForm.content
            })
            .then(successResponse => {
              this.listenLoading = false
              this.publishNoticeFormVisible = false
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              window.open(
                this.$router.resolve({
                  path: '/organizer/myNotice'
                }).href, '_self'
                // 打开新窗口：_blank
                // 在本地窗口打开：_self
              )
            })
            .catch(failResponse => {
              this.$message({
                message: '发布失败',
                type: 'error'
              })
            })
        }
      })
    },
    // 点击外面遮罩时提示，防止误点
    publishNoticeFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    gotoNoticeDetails: function (index, NoticeList) {
      let noticeJson = JSON.stringify(NoticeList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('noticeJson', noticeJson)
      this.$router.push({
        path: '/organizer/noticeDetails'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    deleteNotice: function (index, row) {
      this.$axios
        .post('/deleteNotice', {
          id: row.id,
          title: row.title,
          time: row.time,
          organizer: this.organizerData,
          content: row.content
        })
        .then(successResponse => {
          this.loadNotice()
          this.$message({
            message: '删除了一个通知',
            type: 'success'
          })
          for (let i = 0; i < this.noticeList.length; i++) {
            if (row.id === this.noticeList[i].id) {
              this.noticeList.splice(i, 1)
            }
          }
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    allDelete () {
      this.loadNotice()
      if (this.noticeList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.noticeList.length; i++) {
              this.$axios
                .post('/deleteNotice', {
                  id: this.noticeList[i].id,
                  title: this.noticeList[i].title,
                  time: this.noticeList[i].time,
                  organizer: this.organizerData,
                  content: this.noticeList[i].content
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
              message: '成功删除了' + this.noticeList.length + '个比赛',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/organizer/myNotice'
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
