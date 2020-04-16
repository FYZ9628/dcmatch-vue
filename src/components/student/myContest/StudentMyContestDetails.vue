<template>
  <div style="width: 800px; background-color: #f6f6f6">
    <el-page-header @back="goBack" content="详情页面" style="padding: 20px 20px 0 20px; background-color: #ffffff">
    </el-page-header>
    <div style="height: 110px; background-color: #ffffff; padding: 0 30px 20px 30px; margin-bottom: 10px">
      <el-row>
        <span style="font-weight: bolder; display: block; float: left; margin-top: 20px">
          {{contestDate.contestDetail.contestTitle}}
        </span>
        <el-button type="primary" @click="downloadTicket" style="display: block; float: right">
          下载准考证
        </el-button>
      </el-row>
      <el-row>
        <el-steps :active="activeState" finish-status="success" simple style="margin-top: 20px">
          <el-step title="报名"></el-step>
          <el-step title="下载准考证" ></el-step>
          <el-step title="查看成绩" ></el-step>
        </el-steps>
      </el-row>
    </div>
    <div style="height: 270px; background-color: #ffffff; padding: 30px 30px">
      <el-row>
        <span style="font-weight: bolder">报名信息</span>
        <el-button
          @click="deleteContest"
          type="danger"
          style="display: block; float: right;">
          取消报名
        </el-button>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0; margin-top: 30px">
        <span style="display: block; float: left; color: #778a99">报名科目：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.contestTitle}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">&emsp;举办方：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.organizer.school}}{{contestDate.contestDetail.organizer.user.name}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛日期：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.holdDate}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">比赛时间：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.contestDetail.holdStartTime}}-{{contestDate.contestDetail.holdEndTime}}</span>
      </el-row>
      <el-row style="line-height: 24px; padding: 10px 0">
        <span style="display: block; float: left; color: #778a99">准考证号：</span>
        <span style="display: block; float: left; margin-left: 30px">{{contestDate.ticketNumber}}</span>
      </el-row>
    </div>
<!--    <div style="height: 600px; background-color: #ffffff;">-->
<!--    ------------------------- 方法二(空白页) --------------------------------  -->
<!--      <div id="pdfDom" style="height: 200px; width: 300px; padding-top: 55px;background-color:#fff;">-->
<!--        给自己需要导出的ui部分.定义id为"pdfDom".此部分将就是pdf显示的部分-->
<!--      </div>-->
<!--      <button type="button" v-on:click="getPdf()">导出PDF</button>-->
      <!--    ------------------------- 方法三 --------------------------------  -->
<!--      <button v-print="printObj" @click="downloadTicket">下载pdf</button>-->
<!--      <div id="printMe2" style="width: 630px; height: 300px">-->
<!--        <div style="text-align: center">-->
<!--          <h3 style="font-size: 18px">第11届数学竞赛准考证</h3>-->
<!--        </div>-->
<!--        <el-table-->
<!--          :data="tableData"-->
<!--          border-->
<!--          :span-method="arraySpanMethod"-->
<!--          style="width: 100%">-->
<!--          <el-table-column-->
<!--            prop="title"-->
<!--            label="标题"-->
<!--            width="100"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name1"-->
<!--            label="姓名1"-->
<!--            width="150"-->
<!--            align="left">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name2"-->
<!--            label="姓名2"-->
<!--            width="100"-->
<!--            align="center">-->
<!--&lt;!&ndash;            <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;              {{scope.row.name}}&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name3"-->
<!--            label="姓名3"-->
<!--            width="100"-->
<!--            align="left">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name4"-->
<!--            min-width="160"-->
<!--            label="姓名4">-->
<!--            <template slot-scope="scope">-->
<!--              <img v-if="scope.$index === 0" style="width: 130px; height: 150px" :src="scope.row.name4"/>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
      <!--    ------------------------- 方法四 --------------------------------  -->
<!--      <div>-->
<!--        <div ref="pdfDom" style="background-color: white">-->
<!--          反反复复付付付付-->
<!--        </div>-->
<!--        <button @click="printDomVal">浏览器方式下载</button>-->
<!--      </div>-->
<!--    </div>-->
    <!--  -------------------------------------------- 分界线 -------------------------------------------------------  -->
    <!--编辑界面-->
    <el-dialog title="下载准考证"
               :visible.sync="downloadTicketVisible"
               width="720px">
      <div id="printMe" style="width: 630px; height: 430px; margin: 0 auto">
        <div style="text-align: center; margin-bottom: 30px">
          <h3 style="font-size: 18px">{{contestDate.contestDetail.contestTitle}}准考证</h3>
        </div>
        <el-table
          :data="tableData"
          border
          :show-header="false"
          :span-method="arraySpanMethod"
          style="width: 100%;">
          <el-table-column
            prop="title"
            label="标题"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name1"
            label="姓名1"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            prop="name2"
            label="姓名2"
            width="100"
            align="center">
            <!--            <template slot-scope="scope">-->
            <!--              {{scope.row.name}}-->
            <!--            </template>-->
          </el-table-column>
          <el-table-column
            prop="name3"
            label="姓名3"
            width="100"
            align="left">
          </el-table-column>
          <el-table-column
            prop="name4"
            min-width="160"
            label="姓名4">
            <template slot-scope="scope">
              <img v-if="scope.$index === 0" style="width: 146px; height: 150px;" :src="scope.row.name4"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downloadTicketVisible = false">取 消</el-button>
        <el-button type="primary" v-print="printObj" @click.native="downloadTicketSubmit" :loading="listenLoading">下 载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentMyContestDetails',
  data: function () {
    return {
      contestDate: {
        id: '',
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
          idImg: ''
        },
        state: '',
        ticketNumber: '',
        score: ''
      },
      activeState: 1,
      gotoContestDetailState: {
        state: ''
      },
      tableData: [
        {
          id: '1',
          title: '准考证号',
          name1: '12345678901234',
          name2: '',
          name3: '',
          name4: 'http://localhost:8999/api/file/dlcv0d.jpg'
        },
        {
          id: '2',
          title: '考生姓名',
          name1: '冯钰臻',
          name2: '',
          name3: '',
          name4: ''
        },
        {
          id: '3',
          title: '学号',
          name1: '116263000202',
          name2: '性别',
          name3: '男',
          name4: ''
        },
        {
          id: '4',
          title: '学校',
          name1: '广西民族大学',
          name2: '',
          name3: '',
          name4: ''
        },
        {
          id: '5',
          title: '学院',
          name1: '软信学院',
          name2: '',
          name3: '',
          name4: ''
        },
        {
          id: '6',
          title: '专业',
          name1: '软件工程',
          name2: '',
          name3: '',
          name4: ''
        },
        {
          id: '7',
          title: '考试日期',
          name1: '2020-06-11',
          name2: '考试时间',
          name3: '09:00 - 11:30',
          name4: ''
        },
        {
          id: '8',
          title: '考试地点',
          name1: '广西民族大学',
          name2: '',
          name3: '',
          name4: ''
        }
      ],
      printObj: {
        id: 'printMe',
        popTitle: '准考证',
        // extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      downloadTicketVisible: false, // 编辑界面是否显示
      listenLoading: false
    }
  },
  mounted: function () {
    // 接收返回判断值
    let gotoContestDetailStateJson = sessionStorage.getItem('gotoContestDetailStateJson')
    this.gotoContestDetailState = JSON.parse(gotoContestDetailStateJson)
    // 接收contest数据
    let contestJson = sessionStorage.getItem('contestJson')
    this.contestDate = JSON.parse(contestJson)
    if (this.contestDate) {
      // state 说明
      // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
      if (this.contestDate.state === '已报名') {
        this.activeState = 1
      }
      if (this.contestDate.state === '已下载准考证') {
        this.activeState = 2
      }
      if (this.contestDate.state === '查看成绩') {
        this.activeState = 3
      }
    }
    this.loadMyContest(this.contestDate.id)
  },
  methods: {
    loadMyContest (contestId) {
      if (this.$store.getters.account) {
        this.$axios
          .post('/searchContestById', {
            keywords: contestId
          })
          .then(successResponse => {
            this.contestDate = successResponse.data
            if (this.contestDate) {
              // state 说明
              // 1 为已报名，2 为下载准考证，3为查看成绩（比赛结束了）
              if (this.contestDate.state === '已报名') {
                this.activeState = 1
              }
              if (this.contestDate.state === '已下载准考证') {
                this.activeState = 2
              }
              if (this.contestDate.state === '查看成绩') {
                this.activeState = 3
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
    goBack () {
      if (this.gotoContestDetailState.state === 1) {
        this.$router.push({
          path: '/student/myContest'
          // name: 'noticeDetails/'
          // query: {
          //   data: contestDetailJson
          // // 以加问号接续的方式显示内容
          // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
          // }
        })
      }
      if (this.gotoContestDetailState.state === 2) {
        this.$router.push({
          path: '/student/contestList'
          // name: 'noticeDetails/'
          // query: {
          //   data: contestDetailJson
          // // 以加问号接续的方式显示内容
          // // http://localhost:8081/index/noticeDetails?data=%5Bobject%20Object%5D
          // }
        })
      }
    },
    deleteContest: function () {
      this.$confirm('确认取消报名？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true })
        .then(_ => {
          this.$axios
            .post('/deleteContest', {
              // 后端接收的是整个 contest 对象，但是其实只用到了 id
              // 所以只要传 id 到后端就行了
              id: this.contestDate.id
              // contestDetail: this.contestDate.contestDetail,
              // student: this.contestDate.student,
              // state: this.contestDate.state,
              // ticketNumber: this.contestDate.ticketNumber,
              // score: this.contestDate.score
            })
            .then(successResponse => {
              this.$message({
                message: '成功取消报名',
                type: 'success'
              })
              if (this.gotoContestDetailState.state === 1) {
                // 一秒后刷新
                setTimeout(() => {
                  window.open(
                    this.$router.resolve({
                      path: '/student/myContest'
                    }).href, '_self'
                    // 打开新窗口：_blank
                    // 在本地窗口打开：_self
                  )
                }, 1000)
              }
              if (this.gotoContestDetailState.state === 2) {
                // 一秒后刷新
                setTimeout(() => {
                  window.open(
                    this.$router.resolve({
                      path: '/student/contestList'
                    }).href, '_self'
                    // 打开新窗口：_blank
                    // 在本地窗口打开：_self
                  )
                }, 1000)
              }
            })
            .catch(failResponse => {
              this.$message({
                message: '取消报名失败',
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 打印dom的内容
    // printDomVal () {
    //   // 获取要打印的Dom内容
    //   // 将要打印的html赋给本页面
    //   window.document.body.innerHTML = this.$refs.pdfDom.innerHTML
    //   // 调用windos的打印接口
    //   window.print()
    //   window.location.reload() // 解决打印之后按钮失效的问题，刷新页面
    //   return false
    // },
    downloadTicket () {
      for (let i = 0; i < 8; i++) {
        if (i === 0) {
          this.tableData[i].name1 = this.contestDate.ticketNumber
          this.tableData[i].name4 = this.contestDate.student.idImg
        }
        if (i === 1) {
          this.tableData[i].name1 = this.contestDate.student.user.name
        }
        if (i === 2) {
          this.tableData[i].name1 = this.contestDate.student.user.account
          this.tableData[i].name3 = this.contestDate.student.sex
        }
        if (i === 3) {
          this.tableData[i].name1 = this.contestDate.student.school
        }
        if (i === 4) {
          this.tableData[i].name1 = this.contestDate.student.academy
        }
        if (i === 5) {
          this.tableData[i].name1 = this.contestDate.student.major
        }
        if (i === 6) {
          this.tableData[i].name1 = this.contestDate.contestDetail.holdDate
          this.tableData[i].name3 = this.contestDate.contestDetail.holdStartTime +
            ' -  ' + this.contestDate.contestDetail.holdStartTime
        }
        if (i === 7) {
          this.tableData[i].name1 = this.contestDate.contestDetail.place
        }
      }
      this.downloadTicketVisible = true
    },
    downloadTicketSubmit () {
      this.$axios
        .post('/updateContest', {
          // 后端接收的是整个 contest 对象，但是其实只用到了 id
          // 所以只要传 id 到后端就行了
          id: this.contestDate.id,
          contestDetail: this.contestDate.contestDetail,
          student: this.contestDate.student,
          state: '已下载准考证',
          ticketNumber: this.contestDate.ticketNumber,
          score: this.contestDate.score
        })
        .then(successResponse => {
          this.listenLoading = false
          this.downloadTicketVisible = false
          this.$message({
            message: '成功下载准考证',
            type: 'success'
          })
          this.loadMyContest(this.contestDate.id)
        })
        .catch(failResponse => {
          this.$message({
            message: '下载失败',
            type: 'error'
          })
        })
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // ----------------- 合并列 ---------------------------------
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 3]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        }
      }
      if (rowIndex === 1) {
        if (columnIndex === 1) {
          return [1, 3]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        }
      }
      if (rowIndex === 3) {
        if (columnIndex === 1) {
          return [1, 3]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        }
      }
      if (rowIndex === 4) {
        if (columnIndex === 1) {
          return [1, 4]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        } else if (columnIndex === 4) {
          return [0, 0]
        }
      }
      if (rowIndex === 5) {
        if (columnIndex === 1) {
          return [1, 4]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        } else if (columnIndex === 4) {
          return [0, 0]
        }
      }
      if (rowIndex === 6) {
        if (columnIndex === 3) {
          return [1, 2]
        } else if (columnIndex === 4) {
          return [0, 0]
        }
      }
      if (rowIndex === 7) {
        if (columnIndex === 1) {
          return [1, 4]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        } else if (columnIndex === 4) {
          return [0, 0]
        }
      }
      // ----------------- 合并行 ---------------------------------
      if (columnIndex === 4) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 1) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else if (rowIndex === 2) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else if (rowIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
