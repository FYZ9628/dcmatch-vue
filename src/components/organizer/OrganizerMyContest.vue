<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的大赛</span>
      <div style="height: 30px">
        <el-button type="primary" @click="publishContestDetail"
                   style="display: block; float: right; margin-right: 50px" >发布新比赛</el-button>
      </div>
      <div style="height: 160px; margin: 10px 0 0 20px">
        <span style="margin-top: 10px; font-weight: bolder">进行中的比赛科目列表如下：</span>
        <div style="overflow-y: scroll; height: 400px; background-color: #ffffff; margin-bottom: 20px">
          <div v-for="(item, index) in contestDetailList"
               :key="item.value"
               style="text-align: left; margin: 30px 30px 0 0">
            <div style="height: 40px; border: 1px solid #559ae2; border-radius: 5px;
           padding: 20px 15px;">
              <div style="width: 500px; font-size: 18px; font-weight: bolder;
             line-height: 40px;  display: block; float: left;
              overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">
                {{item.contestTitle}}
              </div>
              <el-button type="primary" @click="gotoContestDetails(index, contestDetailList)" plain style="height: 40px; display: block; float: right">
                查看详情
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="contestDetailList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无可查询的比赛结果</el-tag>
      </div>
    </div>
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="发布新比赛"
               :visible.sync="publishContestDetailFormVisible"
               :before-close="publishContestDetailFormHandleClose"
               width="720px">
      <div style="min-height: 730px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="publishContestDetailForm" ref="publishContestDetailForm"
                 label-width="120px"
                 :rules="publishContestDetailFormRules"
                 style="width: 540px;">
          <el-form-item
            label="标  题"
            prop="contestTitle">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="publishContestDetailForm.contestTitle" placeholder="标题" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="内  容"
            prop="contestContent">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              size="small" style="margin-left: 20px;"
              v-model="publishContestDetailForm.contestContent">
            </el-input>
          </el-form-item>
          <el-form-item
            label="报名开始时间"
            prop="signUpStartTime">
            <el-date-picker
              v-model="publishContestDetailForm.signUpStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="报名开始时间"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="报名结束时间"
            prop="signUpEndTime">
            <el-date-picker
              v-model="publishContestDetailForm.signUpEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="报名结束时间"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="比赛地点"
            prop="place">
            <el-input type="age" v-model="publishContestDetailForm.place" placeholder="比赛地点" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="比赛日期"
            prop="holdDate">
            <el-date-picker
              v-model="publishContestDetailForm.holdDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="比赛日期"
              size="small"
              style="margin-left: 20px; width: 420px">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="比赛时间"
            prop="holdStartTime">
            <el-time-select
              placeholder="起始时间"
              v-model="publishContestDetailForm.holdStartTime"
              size="small"
              :picker-options="{
                art: '08:30',
                step: '00:15',
                end: '18:30'}"
              style="width: 190px; margin-left: 20px">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="publishContestDetailForm.holdEndTime"
              size="small"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: publishContestDetailForm.holdStartTime}"
              style="width: 190px">
            </el-time-select>
          </el-form-item>
          <el-form-item
            label="类  型"
            prop="type">
            <el-radio-group v-model="publishContestDetailForm.type" style="margin-left: 20px">
              <el-radio label="个人赛"></el-radio>
              <el-radio label="团队赛"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="人数上限"
            prop="upperLimit">
            <el-select v-model="publishContestDetailForm.upperLimit" placeholder="请选择" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in upperLimitList"
                :key="item.id"
                :label="item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishContestDetailFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="publishContestDetailSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrganizerMyContest',
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
      contestDetailList: [],
      contestDetail: {
        id: '',
        contestTitle: '',
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
        contestContent: '',
        signUpStartTime: '',
        signUpEndTime: '',
        publishTime: '',
        place: '',
        holdDate: '',
        holdStartTime: '',
        holdEndTime: '',
        type: '',
        state: ''
      },
      publishContestDetailFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      publishContestDetailForm: {
        id: '',
        contestTitle: '',
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
        contestContent: '',
        signUpStartTime: '',
        signUpEndTime: '',
        publishTime: '',
        place: '',
        holdDate: '',
        holdStartTime: '',
        holdEndTime: '',
        type: '',
        upperLimit: '',
        state: ''
      },
      publishContestDetailFormRules: {
        contestTitle: [{required: true, message: '请输入标题', trigger: 'blur'}],
        contestContent: [{required: true, message: '请输入内容', trigger: 'blur'}],
        signUpStartTime: [{required: true, message: '请选择报名开始时间', trigger: 'blur'}],
        signUpEndTime: [{required: true, message: '请选择报名结束时间', trigger: 'blur'}],
        place: [{required: true, message: '请输入比赛地点', trigger: 'blur'}],
        holdDate: [{required: true, message: '请选择比赛日期', trigger: 'blur'}],
        holdStartTime: [{required: true, message: '请选择比赛开始时间和结束时间', trigger: 'blur'}],
        holdEndTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}],
        type: [{required: true, message: '请选择类型', trigger: 'blur'}],
        upperLimit: [{required: true, message: '请选择团队人数上限', trigger: 'blur'}]
      },
      upperLimitList: [
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        },
        {
          id: 9
        },
        {
          id: 10
        }
      ]
    }
  },
  mounted: function () {
    this.loadOrganizer()
    this.loadContest()
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
    loadContest () {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestDetailByOrganizerAccount', {
            keywords: this.$store.getters.account
          })
          .then(successResponse => {
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state !== '查看成绩阶段') {
                this.contestDetailList.push(successResponse.data[i])
              }
            }
          })
          .catch(failResponse => {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          })
      }
    },
    publishContestDetail () {
      this.publishContestDetailFormVisible = true
    },
    publishContestDetailSubmit () {
      this.$refs.publishContestDetailForm.validate((valid) => {
        if (valid) {
          this.listenLoading = true
          console.log('测试写入的数据')
          console.log('测试写入的数据')
          console.log(this.publishContestDetailForm)
          console.log(this.publishContestDetailForm.signUpStartTime)
          console.log(this.publishContestDetailForm.signUpEndTime)
          console.log(this.publishContestDetailForm.holdDate)
          console.log(this.publishContestDetailForm.holdStartTime)
          console.log(this.publishContestDetailForm.holdEndTime)
          console.log(this.$moment().format('YYYY-MM-DD HH:mm:ss'))
          this.$axios
            .post('/addContestDetail', {
              id: '',
              contestTitle: this.publishContestDetailForm.contestTitle,
              organizer: this.organizerData,
              contestContent: this.publishContestDetailForm.contestContent,
              signUpStartTime: this.publishContestDetailForm.signUpStartTime,
              signUpEndTime: this.publishContestDetailForm.signUpEndTime,
              publishTime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
              place: this.publishContestDetailForm.place,
              holdDate: this.publishContestDetailForm.holdDate,
              holdStartTime: this.publishContestDetailForm.holdStartTime,
              holdEndTime: this.publishContestDetailForm.holdEndTime,
              type: this.publishContestDetailForm.type,
              upperLimit: this.publishContestDetailForm.upperLimit,
              state: '报名阶段'
            })
            .then(successResponse => {
              this.listenLoading = false
              this.publishContestDetailFormVisible = false
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              window.open(
                this.$router.resolve({
                  path: '/organizer/myContest'
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
    publishContestDetailFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    gotoContestDetails: function (index, contestDetailList) {
      let contestDetailJson = JSON.stringify(contestDetailList[index])
      // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
      // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
      sessionStorage.setItem('contestDetailJson', contestDetailJson)
      this.$router.push({
        path: '/organizer/contestDetails'
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
