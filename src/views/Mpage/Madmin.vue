<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formAdmin" :model="formAdmin" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="formAdmin.name" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formAdmin.mobile" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
        <el-button type="success" icon="iconfont t-icon02" class="create" @click="create">创建管理员</el-button>
      </el-form>
    </div>
    <div class="madmin-body" v-if="!createAdmin">
      <el-table :data="tableData" border style="width: 100%;" v-loading="loading">
        <el-table-column prop="username" label="用户名" width="240"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="240"></el-table-column>
        <el-table-column prop="ctime" label="注册时间" width="240"></el-table-column>
        <el-table-column prop="utime" label="上次修改时间" width="240"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
  export default {
    name:'madmin',
    data() {
      return {
        formAdmin: {
          name: '',
          mobile: '',
        },
        createAdmin:false,
        loading:false,
        userId: '',
        pageTotal: null, //页面总数
        pageSize: 10,  //每页显示条数
        pageNo: 1,   //当前页
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
    methods: {
      //改变页码
      handleCurrentChange(val){
        this.pageNo = val;
      },
      handleClick(row) {
        console.log(row);
      },
      //创建管理员
      create(){
        this.createAdmin = true;
      },
      //搜索
      async search(){
        this.createAdmin = false;
        this.loading = true;
        let params={},
          formAdmin = this.formAdmin;
        params.pageNo = this.pageNo;    //传递页码（第一页）
        params.pageSize = this.pageSize;
        if(formAdmin.name !== ''){
          params.name = formAdmin.name;
        }
        if(formAdmin.mobile !== ''){
          params.mobile = formAdmin.mobile;
        }
        const res = await WebApi.searchShop(params);
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
        this.$message('搜索');
        //请求接口
      },
      //提交搜索表单
      sumitForm(name){
        this.goAddAdmin();
      },
      goAddAdmin(){
        this.$message('提交');
      },
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

