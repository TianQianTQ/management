<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="商铺名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
      </el-form>
    </div>
    <el-tabs v-model="activeName" :click="handleClick" class="tabs">
      <el-tab-pane label="全部" name="first">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="username" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="ctime" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="second">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="username" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="ctime" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="third">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="username" label="商铺名" width="190"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="190"></el-table-column>
          <el-table-column prop="ctime" label="商家名" width="190"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="190"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="190"></el-table-column>
          <el-table-column label="审核操作" width="240">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">审核通过</el-button>
              <el-button type="text" size="small">审核驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审核驳回" name="fourth">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="username" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="ctime" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name:'mbusiness',
    data() {
      return {
        form: {
          username: '',
          mobile: '',
          name:''
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        activeName:'first',
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
  }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
  .search{
    margin-left:50px;
  }
  .block{
    float:right;
    margin-top:30px;
  }
</style>

