<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formSearchUser" :model="formSearchUser" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="formSearchUser.name" @keyup.enter.native="sumitForm(formSearchUser)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formSearchUser.mobile" @keyup.enter.native="sumitForm(formSearchUser)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="searchUser" class="search">搜索</el-button>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="username" label="用户名" width="240"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="240"></el-table-column>
      <el-table-column prop="ctime" label="注册时间" width="240"></el-table-column>
      <el-table-column prop="utime" label="上次修改时间" width="240"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import WebApi from '../../api/webapi';
  import * as utils from '../../utils/utils';
  export default {
    name:'muser',
    data() {
      return {
        formSearchUser: {
          name: '',
          mobile: '',
        },
        tableData: [],
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      sumitForm(name){
        this.searchUser();
      },
      async searchUser(){
        let formSearchUser = this.formSearchUser;
        let params = {}
        if(formSearchUser.mobile !== ''){
          params = utils.addObject('mobile',formSearchUser.mobile);
        }
        if(formSearchUser.name !== ''){
          params = utils.addObject('username',formSearchUser.name);
        }
        const res = await WebApi.searchUser(params);
        if(res.code ===0 ){
          this.$message('查询成功');
           let tableData1 = res.data.list;
           this.tableData = tableData1.map(function(item,index,input){
             item.ctime = utils.formatDate(item.ctime);
             item.utime = utils.formatDate(item.utime);
           })
           console.log(this.tableData );

        }else{
          this.$message(res.msg);
        }
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
