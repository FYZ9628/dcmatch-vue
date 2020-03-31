<template>
  <div style="height: 550px; background-color: #ffffff; margin-bottom: 10px; text-align: left">
    <div style="padding: 20px 0 10px 10px; font-weight: bolder">个人竞赛管理</div>
    <!--  可通过用户姓名、账号、电话、邮箱、学校、学院、专业查询  -->
    <el-table
      :data="contestDetailList.filter(data => !search || data.contestTitle.toLowerCase().includes(search.toLowerCase()))"
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
        min-width="200"
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
        min-width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="signUpEndTime"
        label="报名结束时间"
        min-width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="170"
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
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        label="竞赛时间"
        min-width="100"
        align="center">
        <template slot-scope="scope">
          {{scope.row.holdStartTime}}-{{scope.row.holdEndTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="upperLimit"
        label="上限"
        min-width="50"
        align="center">
        <template slot-scope="scope">
          1{{scope.row.upperLimit}}人
        </template>
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
            @click.native.prevent="editContestDetail(scope.$index, contestDetailList)"
            type="primary"
            size="mini">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteContestDetail(scope.$index, contestDetailList)"
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
        type="danger"
        size="small"
        style="display: block; float: right; margin: 20px 20px 0 0">
        全部删除
      </el-button>
    </div>
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="编辑竞赛"
               :visible.sync="editContestDetailFormVisible"
               :before-close="editContestDetailFormHandleClose"
               width="720px">
      <div style="min-height: 730px; background-color: #ffffff; padding: 0 50px;">
        <el-form :model="editContestDetailForm" ref="editContestDetailForm"
                 label-width="120px"
                 :rules="editContestDetailFormRules"
                 style="width: 540px;">
          <el-form-item
            label="标  题"
            prop="contestTitle">
            <!--              v-model.number 只有输入数字才不会提示错误-->
            <el-input type="age" v-model="editContestDetailForm.contestTitle" placeholder="标题" autocomplete="off" size="small" style="margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item
            label="内  容"
            prop="contestContent">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              size="small" style="margin-left: 20px;"
              v-model="editContestDetailForm.contestContent">
            </el-input>
          </el-form-item>
          <el-form-item
            label="报名开始时间"
            prop="signUpStartTime">
            <el-date-picker
              v-model="editContestDetailForm.signUpStartTime"
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
              v-model="editContestDetailForm.signUpEndTime"
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
            <el-input type="age" v-model="editContestDetailForm.place" placeholder="比赛地点" autocomplete="off" size="small" style="margin-left: 20px" ></el-input>
          </el-form-item>
          <el-form-item
            label="比赛日期"
            prop="holdDate">
            <el-date-picker
              v-model="editContestDetailForm.holdDate"
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
              v-model="editContestDetailForm.holdStartTime"
              size="small"
              :picker-options="{
                art: '08:30',
                step: '00:15',
                end: '18:30'}"
              style="width: 190px; margin-left: 20px">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="editContestDetailForm.holdEndTime"
              size="small"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: editContestDetailForm.holdStartTime}"
              style="width: 190px">
            </el-time-select>
          </el-form-item>
          <el-form-item
            label="类  型"
            prop="type">
            <el-radio-group v-model="editContestDetailForm.type" style="margin-left: 20px">
              <el-radio disabled label="个人赛"></el-radio>
              <el-radio disabled label="团队赛"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="editContestDetailForm.type === '个人赛'"
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
            v-if="editContestDetailForm.type === '团队赛'"
            label="人数上限"
            prop="upperLimit">
            <el-select v-model="editContestDetailForm.upperLimit" placeholder="请选择" size="small"
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
        <el-button @click="editContestDetailFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editContestDetailFormSubmit" :loading="listenLoading">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminTeamContest',
  data () {
    return {
      contestDetailList: [],
      editContestDetailFormVisible: false, // 编辑界面是否显示
      listenLoading: false,
      editContestDetailForm: {
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
      editContestDetailFormRules: {
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
    this.loadContestDetail()
  },
  methods: {
    loadContestDetail () {
      this.$axios.get('/getAllContestDetail').then(resp => {
        this.contestDetailList = []
        if (resp && resp.status === 200) {
          for (let i = 0; i < resp.data.length; i++) {
            if (resp.data[i].type === '团队赛') {
              this.contestDetailList.push(resp.data[i])
            }
          }
        }
      })
    },
    deleteContestDetail: function (index, contestDetailList) {
      this.$axios
        .post('/deleteContestDetail', {
          id: contestDetailList[index].id,
          contestTitle: contestDetailList[index].contestTitle,
          organizer: contestDetailList[index].organizer,
          contestContent: contestDetailList[index].contestContent,
          signUpStartTime: contestDetailList[index].signUpStartTime,
          signUpEndTime: contestDetailList[index].signUpEndTime,
          publishTime: contestDetailList[index].publishTime,
          place: contestDetailList[index].place,
          holdDate: contestDetailList[index].holdDate,
          holdStartTime: contestDetailList[index].holdStartTime,
          holdEndTime: contestDetailList[index].holdEndTime,
          type: contestDetailList[index].type,
          upperLimit: contestDetailList[index].upperLimit,
          state: contestDetailList[index].state
        })
        .then(successResponse => {
          this.loadContestDetail()
          this.$message({
            message: '删除了一个竞赛',
            type: 'success'
          })
          contestDetailList.splice(index, 1)
        })
        .catch(failResponse => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
    },
    editContestDetail (index, rows) {
      this.editContestDetailFormVisible = true
      this.editContestDetailForm = {
        id: rows[index].id,
        contestTitle: rows[index].contestTitle,
        organizer: {
          id: rows[index].organizer.id,
          user: {
            id: rows[index].organizer.user.id,
            account: rows[index].organizer.user.account,
            phone: rows[index].organizer.user.phone,
            password: rows[index].organizer.user.password,
            name: rows[index].organizer.user.name,
            type: rows[index].organizer.user.type
          },
          email: rows[index].organizer.email,
          school: rows[index].organizer.school,
          establishDate: rows[index].organizer.establishDate,
          schoolType: rows[index].organizer.schoolType,
          schoolRunningType: rows[index].organizer.schoolRunningType,
          idImg: rows[index].organizer.idImg
        },
        contestContent: rows[index].contestContent,
        signUpStartTime: rows[index].signUpStartTime,
        signUpEndTime: rows[index].signUpEndTime,
        publishTime: rows[index].publishTime,
        place: rows[index].place,
        holdDate: rows[index].holdDate,
        holdStartTime: rows[index].holdStartTime,
        holdEndTime: rows[index].holdEndTime,
        type: rows[index].type,
        upperLimit: rows[index].upperLimit,
        state: rows[index].state
      }
    },
    editContestDetailFormSubmit () {
      this.listenLoading = true
      this.$axios
        .post('/updateContestDetail', {
          id: this.editContestDetailForm.id,
          contestTitle: this.editContestDetailForm.contestTitle,
          organizer: this.editContestDetailForm.organizer,
          contestContent: this.editContestDetailForm.contestContent,
          signUpStartTime: this.editContestDetailForm.signUpStartTime,
          signUpEndTime: this.editContestDetailForm.signUpEndTime,
          publishTime: this.editContestDetailForm.publishTime,
          place: this.editContestDetailForm.place,
          holdDate: this.editContestDetailForm.holdDate,
          holdStartTime: this.editContestDetailForm.holdStartTime,
          holdEndTime: this.editContestDetailForm.holdEndTime,
          type: this.editContestDetailForm.type,
          upperLimit: this.editContestDetailForm.upperLimit,
          state: this.editContestDetailForm.state
        })
        .then(successResponse => {
          console.log('测试返回值')
          console.log(successResponse.data)
          this.listenLoading = false
          this.editContestDetailFormVisible = false
          if (successResponse.data !== '') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            window.open(
              this.$router.resolve({
                path: '/admin/contest/teamContest'
              }).href, '_self'
              // 打开新窗口：_blank
              // 在本地窗口打开：_self
            )
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        })
    },
    // 点击外面遮罩时提示，防止误点
    editContestDetailFormHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    allDelete () {
      this.loadContestDetail()
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
                  path: '/admin/contest/teamContest'
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
