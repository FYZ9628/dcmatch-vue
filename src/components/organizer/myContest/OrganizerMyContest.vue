<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <div style="height: 520px; background-color: #ffffff; margin-bottom: 10px; padding: 20px 30px;">
      <span style="font-size: 16px; font-weight: bolder">我的大赛</span>
      <div style="height: 30px">
        <el-button type="primary" @click="publishContestDetail"
                   style="display: block; float: right; margin-right: 50px" >发布新竞赛</el-button>
      </div>
      <div style="padding: 20px 0 10px 10px; font-weight: bolder">进行中的竞赛科目列表如下：</div>
      <div v-if="contestDetailList.length !== 0">
        <!--  可通过竞赛标题查询  -->
        <el-table
          :data="contestDetailList.filter(data => !search || data.contestTitle.toLowerCase().includes(search.toLowerCase())
          || data.state.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          max-height="350">
          <el-table-column
            fixed
            prop="contestTitle"
            width="190"
            align="left">
          </el-table-column>
          <el-table-column
            prop="state"
            min-width="80"
            align="left">
          </el-table-column>
          <el-table-column
            min-width="305"
            align="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="setStateDownLoad(scope.$index, contestDetailList)"
                type="primary"
                size="small">
                设为下载准考证阶段
              </el-button>
              <el-button
                @click.native.prevent="setStateInputScore(scope.$index, contestDetailList)"
                type="primary"
                size="small">
                设为录入成绩阶段
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="180"
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="small"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteContestDetails(scope.$index, scope.row)"
                type="danger"
                size="small">
                删除
              </el-button>
              <el-button
                @click.native.prevent="gotoContestDetails(scope.$index, contestDetailList)"
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
      <div v-if="contestDetailList.length === 0" style="text-align: center; margin-top: 60px">
        <el-tag type="success" style="width: 680px; font-weight: bolder; color: #33ba9b; font-size: 16px; line-height:60px;
          height: 60px">暂无进行中的竞赛</el-tag>
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
        type: '个人赛',
        upperLimit: '',
        state: '报名阶段'
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
      singleSelect: 1,
      search: ''
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
            this.contestDetailList = []
            for (let i = 0; i < successResponse.data.length; i++) {
              if (successResponse.data[i].state === '报名阶段' || successResponse.data[i].state === '下载准考证阶段') {
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
      if (this.publishContestDetailForm.type === '个人赛') {
        this.publishContestDetailForm.upperLimit = 1
      }
      this.$refs.publishContestDetailForm.validate((valid) => {
        if (valid) {
          this.listenLoading = true
          this.$axios
            .post('/addContestDetail', {
              id: '',
              contestTitle: this.publishContestDetailForm.contestTitle + '【' + this.publishContestDetailForm.type + '】',
              organizer: this.organizerData,
              contestContent: this.publishContestDetailForm.contestContent,
              signUpStartTime: this.publishContestDetailForm.signUpStartTime,
              signUpEndTime: this.publishContestDetailForm.signUpEndTime,
              // 获取当前时间
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
    },
    deleteContestDetails: function (index, row) {
      this.$axios
        .post('/deleteContestDetail', {
          id: row.id,
          contestTitle: row.contestTitle,
          organizer: this.organizerData,
          contestContent: row.contestContent,
          signUpStartTime: row.signUpStartTime,
          signUpEndTime: row.signUpEndTime,
          // 获取当前时间
          publishTime: row.publishTime,
          place: row.place,
          holdDate: row.holdDate,
          holdStartTime: row.holdStartTime,
          holdEndTime: row.holdEndTime,
          type: row.type,
          upperLimit: row.upperLimit,
          state: row.state
        })
        .then(successResponse => {
          this.loadContest()
          this.$message({
            message: '删除了一个竞赛',
            type: 'success'
          })
          for (let i = 0; i < this.contestDetailList.length; i++) {
            if (row.id === this.contestDetailList[i].id) {
              this.contestDetailList.splice(i, 1)
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
      this.loadContest()
      if (this.contestDetailList.length > 0) {
        this.$confirm('确认全部删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true })
          .then(_ => {
            for (let i = 0; i < this.contestDetailList.length; i++) {
              this.$axios
                .post('/deleteContestDetail', {
                  id: this.contestDetailList[i].id,
                  contestTitle: this.contestDetailList[i].contestTitle,
                  organizer: this.organizerData,
                  contestContent: this.contestDetailList[i].contestContent,
                  signUpStartTime: this.contestDetailList[i].signUpStartTime,
                  signUpEndTime: this.contestDetailList[i].signUpEndTime,
                  // 获取当前时间
                  publishTime: this.contestDetailList[i].publishTime,
                  place: this.contestDetailList[i].place,
                  holdDate: this.contestDetailList[i].holdDate,
                  holdStartTime: this.contestDetailList[i].holdStartTime,
                  holdEndTime: this.contestDetailList[i].holdEndTime,
                  type: this.contestDetailList[i].type,
                  upperLimit: this.contestDetailList[i].upperLimit,
                  state: this.contestDetailList[i].state
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
              message: '成功删除了' + this.contestDetailList.length + '个比赛',
              type: 'success'
            })
            // 一秒后刷新
            setTimeout(() => {
              window.open(
                this.$router.resolve({
                  path: '/organizer/myContest'
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
    },
    setStateDownLoad (index, contestDetailList) {
      if (contestDetailList[index].state === '报名阶段') {
        this.$axios
          .post('/updateContestDetail', {
            id: contestDetailList[index].id,
            contestTitle: contestDetailList[index].contestTitle,
            organizer: this.organizerData,
            contestContent: contestDetailList[index].contestContent,
            signUpStartTime: contestDetailList[index].signUpStartTime,
            signUpEndTime: contestDetailList[index].signUpEndTime,
            // 获取当前时间
            publishTime: contestDetailList[index].publishTime,
            place: contestDetailList[index].place,
            holdDate: contestDetailList[index].holdDate,
            holdStartTime: contestDetailList[index].holdStartTime,
            holdEndTime: contestDetailList[index].holdEndTime,
            type: contestDetailList[index].type,
            upperLimit: contestDetailList[index].upperLimit,
            state: '下载准考证阶段'
          })
          .then(successResponse => {
            if (successResponse.data !== '') {
              this.$message({
                message: '设置成功',
                type: 'success'
              })
              contestDetailList[index].state = '下载准考证阶段'
            } else {
              this.$message({
                message: '设置失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            this.$message({
              message: '设置失败',
              type: 'error'
            })
          })
      } else {
        this.$message({
          message: '当前已为下载准考证阶段',
          type: 'warning'
        })
      }
    },
    setStateInputScore (index, contestDetailList) {
      if (contestDetailList[index].state === '下载准考证阶段') {
        this.$axios
          .post('/updateContestDetail', {
            id: contestDetailList[index].id,
            contestTitle: contestDetailList[index].contestTitle,
            organizer: this.organizerData,
            contestContent: contestDetailList[index].contestContent,
            signUpStartTime: contestDetailList[index].signUpStartTime,
            signUpEndTime: contestDetailList[index].signUpEndTime,
            // 获取当前时间
            publishTime: contestDetailList[index].publishTime,
            place: contestDetailList[index].place,
            holdDate: contestDetailList[index].holdDate,
            holdStartTime: contestDetailList[index].holdStartTime,
            holdEndTime: contestDetailList[index].holdEndTime,
            type: contestDetailList[index].type,
            upperLimit: contestDetailList[index].upperLimit,
            state: '录入成绩阶段'
          })
          .then(successResponse => {
            if (successResponse.data !== '') {
              this.$message({
                message: '设置成功',
                type: 'success'
              })
              contestDetailList.splice(index, 1)
            } else {
              this.$message({
                message: '设置失败',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {
            this.$message({
              message: '设置失败',
              type: 'error'
            })
          })
      } else {
        this.$message({
          message: '不能跳过下载准考证阶段',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
