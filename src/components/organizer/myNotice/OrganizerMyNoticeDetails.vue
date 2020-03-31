<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 550px; background-color: #ffffff; padding: 10px 30px">
      <div>
        <span style="font-weight: bolder;">{{notice.title}}</span>
        <div style="display: block; float: right">
          <el-button type="primary" @click="upDateNotice">修改通知</el-button>
        </div>
      </div>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 20px">
        <span style="display: block; float: left; color: #778a99">发布时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{notice.time}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">详细内容：</span>
      </el-row>
      <div style="overflow-y: scroll; height: 250px; background-color: #ffffff; margin-bottom: 20px">
        <p>
          {{notice.content}}
        </p>
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
  name: 'OrganizerMyNoticeDetails',
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
      notice: {
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
      }
    }
  },
  mounted: function () {
    // 接收contestDetail数据
    let noticeJson = sessionStorage.getItem('noticeJson')
    this.notice = JSON.parse(noticeJson)
    this.loadOrganizer()
    this.publishNoticeForm = {
      id: this.notice.id,
      title: this.notice.title,
      time: this.notice.time,
      organizer: {},
      content: this.notice.content
    }
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
    upDateNotice () {
      this.publishNoticeFormVisible = true
    },
    publishNoticeSubmit () {
      this.$refs.publishNoticeForm.validate((valid) => {
        if (valid) {
          this.listenLoading = true
          this.$axios
            .post('/updateNotice', {
              id: this.publishNoticeForm.id,
              title: this.publishNoticeForm.title,
              time: this.publishNoticeForm.time,
              organizer: this.organizerData,
              content: this.publishNoticeForm.content
            })
            .then(successResponse => {
              this.notice = successResponse.data
              let noticeJson = JSON.stringify(this.notice)
              // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
              // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
              sessionStorage.setItem('noticeJson', noticeJson)
              this.listenLoading = false
              this.publishNoticeFormVisible = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
            .catch(failResponse => {
              this.$message({
                message: '修改失败',
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
    goBack () {
      this.$router.push({
        path: '/organizer/myNotice'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    }
  }
}
</script>

<style scoped>

</style>
