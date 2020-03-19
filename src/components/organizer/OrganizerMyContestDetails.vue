<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px; background-color: #ffffff">
    </el-page-header>
<!--    <div style="height: 100px; background-color: #ffffff; padding: 20px 30px; margin-bottom: 10px">-->
<!--      <span style="font-weight: bolder">{{contestDate.contestDetail.contestTitle}}</span>-->
<!--    </div>-->
    <div style="height: 550px; background-color: #ffffff; padding: 10px 30px">
      <div>
        <span style="font-weight: bolder;">{{contestDetail.contestTitle}}</span>
        <div style="display: block; float: right">
          <el-button type="primary" @click="upDateContestDetail">修改比赛</el-button>
          <el-button type="primary" @click="gotoContestSignUp">查看报名名单</el-button>
        </div>
      </div>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 20px">
        <span style="display: block; float: left; color: #778a99">发布时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.publishTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">报名时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.signUpStartTime}}——{{contestDetail.signUpEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.holdDate}} {{contestDetail.holdStartTime}}-{{contestDetail.holdEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">举办地点：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDetail.place}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">详细内容：</span>
      </el-row>
      <div style="overflow-y: scroll; height: 250px; background-color: #ffffff; margin-bottom: 20px">
        <p>
          {{contestDetail.contestContent}}
        </p>
      </div>
    </div>
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="修改竞赛"
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
            v-if="publishContestDetailForm.type === '个人赛'"
            label="人数上限"
            prop="upperLimit">
            <el-select v-model="singleSelect" disabled placeholder="1" size="small"
                       style="margin-left: 20px; width: 420px">
              <el-option
                v-for="item in upperLimitList"
                :key="item.id"
                :label="item.id"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="publishContestDetailForm.type === '团队赛'"
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
  name: 'OrganizerMyContestDetails',
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
        type: ''
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
      ],
      singleSelect: 1
    }
  },
  mounted: function () {
    // 接收contestDetail数据
    let contestDetailJson = sessionStorage.getItem('contestDetailJson')
    this.contestDetail = JSON.parse(contestDetailJson)
    this.loadOrganizer()
    this.publishContestDetailForm = {
      id: this.contestDetail.id,
      contestTitle: this.contestDetail.contestTitle,
      organizer: {},
      contestContent: this.contestDetail.contestContent,
      signUpStartTime: this.contestDetail.signUpStartTime,
      signUpEndTime: this.contestDetail.signUpEndTime,
      publishTime: this.contestDetail.publishTime,
      place: this.contestDetail.place,
      holdDate: this.contestDetail.holdDate,
      holdStartTime: this.contestDetail.holdStartTime,
      holdEndTime: this.contestDetail.holdEndTime,
      type: this.contestDetail.type,
      upperLimit: this.contestDetail.upperLimit,
      state: this.contestDetail.state
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
    upDateContestDetail () {
      this.publishContestDetailFormVisible = true
    },
    publishContestDetailSubmit () {
      if (this.publishContestDetailForm.type === '个人赛') {
        this.publishContestDetailForm.upperLimit = 1
      }
      this.$refs.publishContestDetailForm.validate((valid) => {
        if (valid) {
          this.listenLoading = true
          this.$axios
            .post('/updateContestDetail', {
              id: this.contestDetail.id,
              contestTitle: this.publishContestDetailForm.contestTitle,
              organizer: this.organizerData,
              contestContent: this.publishContestDetailForm.contestContent,
              signUpStartTime: this.publishContestDetailForm.signUpStartTime,
              signUpEndTime: this.publishContestDetailForm.signUpEndTime,
              // 修改后的时间
              publishTime: this.publishContestDetailForm.publishTime,
              place: this.publishContestDetailForm.place,
              holdDate: this.publishContestDetailForm.holdDate,
              holdStartTime: this.publishContestDetailForm.holdStartTime,
              holdEndTime: this.publishContestDetailForm.holdEndTime,
              type: this.publishContestDetailForm.type,
              upperLimit: this.publishContestDetailForm.upperLimit,
              state: this.publishContestDetailForm.state
            })
            .then(successResponse => {
              this.contestDetail = successResponse.data
              let contestDetailJson = JSON.stringify(this.contestDetail)
              // 解决 router路由跳转使用query传递参数刷新后数据无法获取 问题
              // 的网站https://blog.csdn.net/tianxintiandisheng/article/details/82774644
              sessionStorage.setItem('contestDetailJson', contestDetailJson)
              this.listenLoading = false
              this.publishContestDetailFormVisible = false
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
    publishContestDetailFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    goBack () {
      this.$router.push({
        path: '/organizer/myContest'
        // name: 'noticeDetails/'
        // query: {
        //   data: contestDetailJson
        // // 以加问号接续的方式显示内容
        // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
        // }
      })
    },
    gotoContestSignUp () {
      this.$router.push({
        path: '/organizer/contestSignUp'
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
