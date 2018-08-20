<template>
  <div class="page-wrapper page-wrapper--book" v-loading="loading" element-loading-text="数据请求中">
    <!--导航区-->
    <div class="page-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage/list' }">调度单管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{id ? '编辑调度单' : '新增调度单'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--返回按钮-->
      <div class="button-back">
        <router-link :to="{ path:'/manage/list'}">
          <el-button type="default" size="mini">返回</el-button>
        </router-link>
      </div>
    </div>

    <!--主内容区-->
    <div class="page-main">
      <div class="content-wrap">
        <el-form class="form-book--info" ref="bookForm" :model="bookForm" :rules="bookRule" label-width="80px">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="合同编号" prop="contractId">
                <el-input v-model="bookForm.contractId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务单号" prop="jobId">
                <el-input v-model="bookForm.jobId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="施工单位" prop="supplyUnit">
                <el-input v-model="bookForm.supplyUnit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产日期" prop="produceTime">
                <el-input v-model="bookForm.produceTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="工程名称及浇筑部位" label-width="11em"  prop="address">
            <el-input v-model="bookForm.address"></el-input>
          </el-form-item>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="委托单位" prop="requester">
                <el-input v-model="bookForm.requester"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="混凝土强度等级" label-width="9em" prop="powerLevel">
                <el-input v-model="bookForm.powerLevel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗渗等级" label-width="7em" prop="impLevel">
                <el-input v-model="bookForm.impLevel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="混凝土运送方式" label-width="9em" prop="pouringType">
                <el-input v-model="bookForm.pouringType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他技术要求" label-width="8em" prop="others">
                <el-input v-model="bookForm.others"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="本车供应方量" label-width="8em" prop="supply">
                <el-input v-model="bookForm.supply"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="要求坍落度" label-width="8em" prop="planSlump">
                <el-input v-model="bookForm.planSlump"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实测坍落度" label-width="7em" prop="realSlump">
                <el-input v-model="bookForm.realSlump"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="配合比编号" label-width="7em" prop="mixRatioNum">
                <el-input v-model="bookForm.mixRatioNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配合比" prop="mixRatio">
                <el-input v-model="bookForm.mixRatio"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="运距" prop="distance">
                <el-input v-model="bookForm.distance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车号" prop="carNum">
                <el-input v-model="bookForm.carNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="信息1" prop="infomation1">
                <el-input v-model="bookForm.infomation1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="司机" prop="driver">
                <el-input v-model="bookForm.driver"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="出站时间" prop="departureTime">
                <el-date-picker v-model="bookForm.departureTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到场时间" prop="arriveTime">
                <el-input v-model="bookForm.arriveTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到场出罐温度" label-width="8em" prop="arriveTemp">
                <el-input v-model="bookForm.arriveTemp"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="开始浇筑时间" label-width="8em" prop="beginTime">
                <el-date-picker v-model="bookForm.beginTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成浇筑时间" label-width="8em" prop="endTime">
                <el-input v-model="bookForm.endTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现场坍落度" label-width="8em" prop="liveSlump">
                <el-input v-model="bookForm.liveSlump"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="信息2" label-width="7em" prop="infomation2">
                <el-input v-model="bookForm.infomation2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调度员" prop="manager">
                <el-input v-model="bookForm.manager"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="">
            <el-button type="main" @click="handleSubmit" :disabled="btnSubmitDisabled" class="btn-long">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import TYPE from '@/store/mutation-types'

  export default{
    data () {
      return {
        btnSubmitDisabled: false,
        id: '',
        bookForm: {
          contractId: '',
          jobId: '',
          supplyUnit: '',
          produceTime: '',
          address: '',
          requester: '',
          powerLevel: '',
          impLevel: '',
          pouringType: '',
          others: '',
          supply: '',
          planSlump: '',
          realSlump: '',
          mixRatioNum: '',
          mixRatio: '',
          distance: '',
          carNum: '',
          infomation1: '',
          driver: '',
          departureTime: '',
          arriveTime: '',
          arriveTemp: '',
          beginTime: '',
          endTime: '',
          liveSlump: '',
          infomation2: '',
          manager: ''
        },
        bookRule: {
          contractId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          jobId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          supplyUnit: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          produceTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          requester: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          powerLevel: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          impLevel: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          pouringType: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          others: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          supply: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          planSlump: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          realSlump: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mixRatioNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mixRatio: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          distance: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          carNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation1: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          driver: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          departureTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          arriveTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          arriveTemp: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          beginTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          liveSlump: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation2: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          manager: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['loading']),
      ...mapState({
        categories: state => state.category.categories
      })
    },
    methods: {
      ...mapActions('manage',
        ['findById', 'findMoreById', 'add', 'update']
      ),
      checkValid: async function () {
        let valid = false
        try {
          valid = await this.$refs.bookForm.validate()
        } catch (error) {
        }
        return valid
      },
      handleSubmit: async function () {
        if (this.loading) {
          return
        }
        let valid = await this.checkValid()
        if (!valid) {
          return
        }
        try {
          // 修改
          if (this.id) {
            let params = _.clone(this.bookForm)
            params.id = this.id
            this.$store.commit(TYPE.setLoading, true)
            let result = await this.update(params)
            this.$store.commit(TYPE.setLoading, false)
            if (result && result.errcode === 0) {
              this.$alert('操作成功！', '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$store.commit('manage/updateItem', {dataList: []})
                  this.$router.push({path: '/manage/list'})
                }
              })
            } else {
              this.$msgError(result.errmsg)
            }
          }
          // 新增
          else {
            this.$store.commit(TYPE.setLoading, true)
            let result = await this.add(this.bookForm)
            this.$store.commit(TYPE.setLoading, false)
            if (result && result.errcode === 0) {
              this.$confirm('操作成功！ 是否继续?', '提示', {
                confirmButtonText: '继续新增',
                cancelButtonText: '返回列表',
                type: 'warning'
              }).then(() => {
                this.id = ''
                this.$refs['bookForm'].resetFields()
              }).catch(() => {
                this.$router.push({path: '/manage/list'})
              })
            } else {
              this.$msgError(result.errmsg)
            }
          }
        } catch (error) {
          console.log(error)
          this.$store.commit(TYPE.setLoading, false)
          this.$msgError('请求出现异常')
        }
      }
    },
    created: async function () {
      let id = this.$route.params.id
      if (id) {
        this.id = id
        try {
          let result = await this.findMoreById(id)
          if (result.errcode === 0 && result.data) {
            this.bookForm.contractId = result.data.contractId
            this.bookForm.jobId = result.data.jobId
            this.bookForm.supplyUnit = result.data.supplyUnit
            this.bookForm.produceTime = result.data.produceTime
            this.bookForm.address = result.data.address
            this.bookForm.requester = result.data.requester
            this.bookForm.powerLevel = result.data.powerLevel
            this.bookForm.impLevel = result.data.impLevel
            this.bookForm.pouringType = result.data.pouringType
            this.bookForm.others = result.data.others
            this.bookForm.supply = result.data.supply
            this.bookForm.planSlump = result.data.planSlump
            this.bookForm.realSlump = result.data.realSlump
            this.bookForm.mixRatioNum = result.data.mixRatioNum
            this.bookForm.mixRatio = result.data.mixRatio
            this.bookForm.distance = result.data.distance
            this.bookForm.carNum = result.data.carNum
            this.bookForm.infomation1 = result.data.infomation1
            this.bookForm.driver = result.data.driver
            this.bookForm.departureTime = result.data.departureTime
            this.bookForm.arriveTime = result.data.arriveTime
            this.bookForm.arriveTemp = result.data.arriveTemp
            this.bookForm.beginTime = result.data.beginTime
            this.bookForm.endTime = result.data.endTime
            this.bookForm.liveSlump = result.data.liveSlump
            this.bookForm.infomation2 = result.data.infomation2
            this.bookForm.manager = result.data.manager
          } else {
            this.btnSubmitDisabled = true
            this.$msgError('获取数据失败')
          }
        } catch (error) {
          this.$msgError(error.toString())
        }
      }
    }
  }
</script>
