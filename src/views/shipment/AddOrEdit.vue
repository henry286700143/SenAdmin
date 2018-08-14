<template>
  <div class="page-wrapper page-wrapper--book" v-loading="loading" element-loading-text="数据请求中">
    <!--导航区-->
    <div class="page-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shipment/list' }">出料单管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{id ? '编辑出料单' : '新增出料单'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!--返回按钮-->
      <div class="button-back">
        <router-link :to="{ path:'/shipment/list'}">
          <el-button type="default" size="mini">返回</el-button>
        </router-link>
      </div>
    </div>

    <!--主内容区-->
    <div class="page-main">
      <div class="content-wrap">
        <el-form class="form-book--info" ref="bookForm" :model="bookForm" :rules="bookRule" label-width="80px">
          <el-form-item label="工程名称及浇筑部位" prop="address">
            <el-input v-model="bookForm.address"></el-input>
          </el-form-item>
          <el-form-item label="施工单位" prop="project">
            <el-input v-model="bookForm.project"></el-input>
          </el-form-item>
          <el-form-item label="标号" prop="label">
            <el-input v-model="bookForm.label"></el-input>
          </el-form-item>
          <el-form-item label="浇筑方式" prop="pouringType">
            <el-input v-model="bookForm.pouringType"></el-input>
          </el-form-item>
          <el-form-item label="信息1" prop="infomation1">
            <el-input v-model="bookForm.infomation1"></el-input>
          </el-form-item>
          <el-form-item label="信息2" prop="infomation2">
            <el-input v-model="bookForm.infomation2"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="codeNum">
            <el-input v-model="bookForm.codeNum"></el-input>
          </el-form-item>
          <el-form-item label="配合比" prop="mixRatio">
            <el-input v-model="bookForm.mixRatio"></el-input>
          </el-form-item>
          <el-form-item label="信息3" prop="infomation3">
            <el-input v-model="bookForm.infomation3"></el-input>
          </el-form-item>
          <el-form-item label="车号" prop="CarNum">
            <el-input v-model="bookForm.CarNum"></el-input>
          </el-form-item>
          <el-form-item label="信息4" prop="infomation4">
            <el-input v-model="bookForm.infomation4"></el-input>
          </el-form-item>
          <el-form-item label="司机" prop="driver">
            <el-input v-model="bookForm.driver"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="dateTime">
            <el-date-picker v-model="bookForm.dateTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="信息5" prop="infomation5">
            <el-input v-model="bookForm.infomation5"></el-input>
          </el-form-item>
          <el-form-item label="调度" prop="manager">
            <el-input v-model="bookForm.manager"></el-input>
          </el-form-item>
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
          address: '',
          project: '',
          label: '',
          pouringType: '',
          infomation1: '',
          infomation2: '',
          codeNum: '',
          mixRatio: '',
          infomation3: '',
          CarNum: '',
          infomation4: '',
          driver: '',
          dateTime: '',
          infomation5: '',
          manager: ''
        },
        bookRule: {
          address: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          pouringType: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation1: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation2: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          codeNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mixRatio: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation3: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          CarNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation4: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          driver: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          dateTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          infomation5: [
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
      ...mapActions('shipment',
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
                  this.$store.commit('shipment/updateItem', {dataList: []})
                  this.$router.push({path: '/shipment/list'})
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
                this.$router.push({path: '/shipment/list'})
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
            this.bookForm.address = result.data.address
            this.bookForm.project = result.data.project
            this.bookForm.label = result.data.label
            this.bookForm.pouringType = result.data.pouringType
            this.bookForm.infomation1 = result.data.infomation1
            this.bookForm.infomation2 = result.data.infomation2
            this.bookForm.codeNum = result.data.codeNum
            this.bookForm.mixRatio = result.data.mixRatio
            this.bookForm.infomation3 = result.data.infomation3
            this.bookForm.CarNum = result.data.CarNum
            this.bookForm.infomation4 = result.data.infomation4
            this.bookForm.driver = result.data.driver
            this.bookForm.dateTime = result.data.dateTime
            this.bookForm.infomation5 = result.data.infomation5
            this.bookForm.manager = result.data.manager
          } else {
            this.btnSubmitDisabled = true
            this.$msgError('获取数据失败')
          }
        } catch (error) {
          this.$msgError(error.toString())
        }
      }

      await this.fillCategories()
    }
  }
</script>
