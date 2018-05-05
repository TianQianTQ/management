<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formSearchUser" :model="formSearchUser" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="formSearchUser.name" @keyup.enter.native="submitForm(formSearchUser)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formSearchUser.mobile" @keyup.enter.native="submitForm(formSearchUser)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="searchUser" class="search">搜索</el-button>
      </el-form>
    </div>
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="username" label="用户名" width="240"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="240"></el-table-column>
      <el-table-column prop="ctime" label="注册时间" width="240"></el-table-column>
      <el-table-column prop="utime" label="上次修改时间" width="240"></el-table-column>
      <el-table-column label="操作" width="200" prop="userId">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="form-modify">
      <el-form :model="formModify" ref="formModify">
        <el-form-item label="用户名" >
          <el-input type="text" v-model="formModify.name" auto-complete="off" @keyup.enter.native="submitFormModify(formModify)"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password" v-model="formModify.password" auto-complete="off" @keyup.enter.native="submitFormModify(formModify)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goFormModify">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
                     @current-change="handleCurrentChange"
                     :page-size= pageSize
                     layout="total, prev, pager, next, jumper"
                     :total= pageTotal
                     :current-page= pageNo >
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
        dialogTableVisible: false,
        dialogFormVisible: false,
        formModify: {
          name:'',
          password:''
        },
        userId:'',
        pageTotal:null, //页面总数
        pageSize: 10,  //每页显示条数
        pageNo:1,   //当前页
      };
    },
    methods: {
      //提交用户
      submitForm(name){
        this.searchUser();
      },
      //提交修改
      submitFormModify(name){
        this.goFormModify();
      },
      //修改
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.userId = row.userId;
        console.log(row.userId);
      },
      //删除
      handleDelete(row){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let param = {
            userId:row.userId
          }
          let res =await WebApi.deleteUser(param)
          if(res.code ===0) {
            this.searchUser();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message(res.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async goFormModify(){
        let params = {
          userId: this.userId,
          username: this.formModify.name,
          password: this.formModify.password
        }
        let res = await WebApi.updateUser(params);
        if(res.code === 0){
          this.searchUser();
          this.$message('更改成功');
        }else{
          this.$message(res.msg);
        }
        this.dialogFormVisible = false
      },
      //查询用户
      async searchUser(){
        let formSearchUser = this.formSearchUser;
        let params = {}
        // if(pageNumber){
        //   params.pageNo = pageNumber;
        // }else{
        //   params.pageNo = this.pageNo;
        // }
        params.pageNo = this.pageNo;
        params.pageSize = this.pageSize;
        console.log(params);
        if(formSearchUser.mobile !== ''){
          params.mobile = formSearchUser.mobile;
        }
        if(formSearchUser.name !== ''){
          params.username = formSearchUser.name;
        }
        const res = await WebApi.searchUser(params);
        if(res.code ===0 ){
          this.$message('查询成功');
           let tableData1 = res.data.list;
           this.pageTotal = res.data.total;
           this.tableData = tableData1;
           tableData1 = tableData1.map(function(item,index,input){
             item.ctime = utils.timestampToTime(item.ctime);
             item.utime = utils.timestampToTime(item.utime);
           })
        }else{
          this.$message(res.msg);
        }
      },
      //改变页码
      handleCurrentChange(val){
        this.pageNo = val;
        this.searchUser();
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
  .form-modify{
    width:50%;
    margin:0 auto;
  }
</style>
