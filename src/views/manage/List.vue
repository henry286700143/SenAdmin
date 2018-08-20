<template>
  <div class="page-wrapper">

    <!--搜索栏-->
    <div class="page-search">
      <el-form :inline="true" label-width="0px">
        <el-form-item label="" label-width="0px">
          <el-input v-model="sname"
                    placeholder="请输入工程名称或施工部位"
                    :trigger-on-focus="false"
                    @keydown.enter.stop.native="handleSearch($event)">
            <el-button type="warn" slot="append" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="pull-right" v-if="AuthManageAdd">
          <router-link :to="{ path: '/manage/add' }">
            <el-button type="default" icon="el-icon-plus">新增调度单</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>

    <!--主内容区-->
    <div class="page-main">
      <el-table :data="dataList" highlight-current-row v-loading="loading" element-loading-text="数据请求中"
                style="width: 100%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <p class="summary">[ 内容简介 ] {{ props.row.summary }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="工程名称及浇筑部位" sortable></el-table-column>
        <el-table-column prop="supplyUnit" label="施工单位" width="150"></el-table-column>
        <el-table-column prop="produceTime" label="生产时间" width="100"></el-table-column>
        <el-table-column prop="requester" label="委托单位" width="100"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <router-link :to="{ path: '/manage/edit/'+scope.row.id}" v-if="AuthManageEdit">
              <el-button type="warning" plain size="mini">编辑</el-button>
            </router-link>
            <el-button type="danger" plain size="mini" v-if="scope.row.role!==1" @click="handleDelete(scope.row.id)">
              <span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination layout="total,prev, pager, next"
                     :current-page="page"
                     :page-size="limit"
                     :total="total"
                     @current-change="handleCurrentChange"
                     class="pull-right">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import TYPE from '@/store/mutation-types'

  export default{
    data () {
      return {}
    },
    computed: {
      ...mapState(['loading']),
      ...mapState({
        dataList: state => state.manage.dataList,
        total: state => state.manage.total,
        page: state => state.manage.page,
        limit: state => state.manage.limit
      }),
      sname: {
        get () {
          return this.$store.state.manage.sname
        },
        set (val) {
          this.$store.commit('manage/updateItem', {sname: val})
        }
      },
      AuthManageAdd: function () {
        return this.isPermission('AuthManageAdd')
      },
      AuthManageEdit: function () {
        return this.isPermission('AuthManageEdit')
      }
    },
    methods: {
      ...mapActions('manage', ['findList', 'delete']),
      handleSearch (ev) {
        this.$store.commit('manage/resetSearchStatus')
        this.search()
        if (ev) {
          ev.preventDefault()
          ev.stopPropagation()
        }
      },
      handleCurrentChange (val) {
        this.$store.commit('manage/updateItem', {page: val})
        this.search()
      },
      search: async function () {
        try {
          this.$store.commit(TYPE.setLoading, true)
          let result = await this.findList()
          this.$store.commit(TYPE.setLoading, false)
          if (!(result && result.errcode === 0)) {
            this.$msgError(result.errmsg)
          }
        } catch (error) {
          console.log(error)
          this.$store.commit(TYPE.setLoading, false)
          this.$msgError('请求出现异常')
        }
      },
      handleDelete: async function (id) {
        try {
          await this.$confirm('确定删除该条记录吗？', '系统提示', {type: 'warning'})
        } catch (cancel) {
          return // 取消就不继续处理
        }
        try {
          // 确认后继续
          this.$store.commit(TYPE.setLoading, true)
          let result = await this.delete(id)
          this.$store.commit(TYPE.setLoading, false)
          if (result.errcode === 0) {
            this.$msgSuccess('删除成功')
          } else {
            this.$msgError(result.errmsg)
          }
        } catch (error) {
          console.log(error)
          this.$store.commit(TYPE.setLoading, false)
          this.$msgError('请求出现异常')
        }
      }
    },
    mounted () {
      if (!this.$store.state.manage.dataList || this.$store.state.manage.dataList.length === 0) {
        this.search()
      }
    }
  }
</script>
<style scoped>
  .summary {
    margin: 0px;
  }
</style>
