<template>
    <div>
      <el-row :gutter="13">
        <el-col class="col-half" :span="7">
          <span class="title-main">Course Judges</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Judges" placement="left">
              <el-button @click="addJudges()" class="button-only"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="row-half">
        <el-col>
          <el-table
          :data="judgeList"
          style="width: 100%"
          v-loading="loading"
          stripe>
          <el-table-column
            prop="uid"
            label="UID">
          </el-table-column>
          <el-table-column
            prop="host"
            label="Host">
          </el-table-column>
          <el-table-column
            prop="max_job"
            label="Max Job">
          </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, judgeList)"
                type="text"
                size="small">
                移除服务器
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      judgeList: [],
      childChange: false,
      loading: true
    }
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该服务器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            method: 'delete',
            url: `${this.Api}/course/${this.getUid}/judge/${rows[index].uid}`,
            headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
          })
            .then((response) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              rows.splice(index, 1)
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                showClose: true
              })
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addJudges () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$emit('changeState', this.childChange)
      }, 500)
    }
  },
  created () {
    if (this.getAuth) {
      let promise = new Promise((resolve, reject) => {
        this.axios.get(`${this.Api}/course/${this.getUid}/judge/`)
          .then(response => {
            resolve(response.data)
          }).catch(error => {
            reject(error)
          })
      })
      promise.then(data => {
        for (let i = 0; i < data.length; i++) {
          this.axios.get(`${this.Api}/judge/${data[i].uid}`)
            .then((response2) => {
              this.judgeList.push(response2.data)
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err.status,
                showClose: true
              })
            })
        }
      })
    }
    this.loading = false
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  })
}
</script>

<style scoped>
  .col-half {
    margin-top: 5%;
  }
  .title-main {
    font-family: inherit;
    font-size: 40px;
  }
  .col-one {
    float: right;
    margin-top: 5%;
    padding-left: 35px !important;
  }
  .button-only {
    background-color: #A40004;
  }
  .el-icon-plus {
    color: white!important;
  }
  .row-half {
    margin-top: 2%;
  }
</style>
