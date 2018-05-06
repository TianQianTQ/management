<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formAdmin" :model="formAdmin" label-width="80px" inline>
        <el-form-item label="商品名">
          <el-input v-model="formAdmin.goodsName" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-input v-model="formAdmin.goodsType" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
        <el-button type="success" icon="iconfont t-icon02" class="create" @click="create">添加商品</el-button>
      </el-form>
    </div>
    <div class="madmin-body" v-if="!createAdmin">
      <el-table :data="tableData" border style="width: 100%;" v-loading="loading">
        <el-table-column prop="username" label="用户名" width="240"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="240"></el-table-column>
        <el-table-column prop="ctime" label="注册时间" width="240"></el-table-column>
        <el-table-column prop="utime" label="上次修改时间" width="240"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" prop="businessId">
            <el-button @click="deleteAdmin(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <div class="madmin-bodyy" v-else>
      <el-form :model="addAdmin" :rules="rulesaddAdmin" ref="addAdmin" class="add-admin">
        <el-form-item prop="username">
          <el-input type="text"  v-model="addAdmin.username" auto-complete="off"  placeholder="用户名"  @keyup.enter.native="sumitForm(addAdmin)"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input type="text"  v-model="addAdmin.mobile" auto-complete="off"  placeholder="手机号"  @keyup.enter.native="sumitForm(addAdmin)"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"   v-model="addAdmin.password" auto-complete="off"  placeholder="密码" @keyup.enter.native="sumitForm(addAdmin)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goAddAdmin">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import WebApi from '../../api/webapi';
  import * as utils from '../../utils/utils';
  export default {
    name:'madmin',
    data() {
      return {
        formAdmin: {
          goodsName: '',
          goodsType: '',
        },
        createAdmin:false,
        loading:false,
        businessId: '',     // 管理员ID
        pageTotal: null, // 页面总数
        pageSize: 10,  // 每页显示条数
        pageNo: 1,   // 当前页
        tableData:[], // 表格数据
        addAdmin: {
          username: '',
          mobile:'',
          password:''
        },
        rulesaddAdmin: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
      }
    },
    mounted:function(){
      this.search();
    },
    methods: {
      //改变页码
      handleCurrentChange(val){
        this.pageNo = val;
      },
      // 删除
      deleteAdmin(row) {
        this.businessId = row.businessId;
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let param = {
            businessId:row.businessId
          }
          let res =await WebApi.deleteAdmin(param);
          if(res.code ===0) {
            this.search();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search();
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
      //创建管理员
      create(){
        this.createAdmin = true;
      },
      //搜索商品
      async search(){
        this.createAdmin = false;
        this.loading = true;
        let params={},
          formAdmin = this.formAdmin;
        params.pageNo = this.pageNo;    //传递页码（第一页）
        params.pageSize = this.pageSize;
        if(formAdmin.goodsName !== ''){
          params.goodsName = formAdmin.goodsName;
        }
        if(formAdmin.goodsType !== ''){
          params.goodsType = formAdmin.goodsType;
        }
        //const res = await WebApi.adminList(params);
        const res = {};
        res.code =0;
        if(res.code === 0 ){
          this.loading = false;
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
      // 提交搜索表单
      sumitForm(name){
        this.goAddAdmin();
      },
      // 添加管理员
      async goAddAdmin(){
        let params = {
          mobile: this.addAdmin.mobile,
          username: this.addAdmin.username,
          password: this.addAdmin.password
        }
        let res = await WebApi.createAdmin(params);
        if(res.code === 0){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.createAdmin = false;
          this.search();
        }else{
          this.$message(res.msg);
        }
        console.log(params);
      },
      // 改变页码
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
  .create{
    margin-left:60px;
  }
  .add-admin{
    width:40%;
    margin:0 auto;
  }
</style>

