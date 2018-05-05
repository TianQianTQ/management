<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
        <el-button type="success" icon="iconfont t-icon02" class="create" @click="create">创建管理员</el-button>
      </el-form>
    </div>
    <div class="madmin-body" v-if="!createAdmin">
      <el-table :data="tableData" border style="width: 100%;">
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
          layout="prev, pager, next"
          :total="50">
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
        form: {
          name: '',
          mobile: '',
        },
        createAdmin:false,
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
      handleClick(row) {
        console.log(row);
      },
      create(){
        this.createAdmin = true;
      },
      search(){
        this.createAdmin = false;
        //请求接口
      },
      sumitForm(name){
        this.goAddAdmin();
      },
      async goAddAdmin() {

        const addAdmin = this.addAdmin;
        //验证数据完整性
        //手机号验证  用户名验证  验证码   密码复杂性
        const params = {
          username: addAdmin.username,
          mobile: addAdmin.mobile,
          password: addAdmin.password,
        }
        // const res = await WebApi.goRegister(params);
        // if(res.code !==0){
        //   this.$alert(res.msg, '提示', {
        //     confirmButtonText: '确定',
        //   });
        // }
        // if(res.code===0){
        //   this.$message('注册成功');
        //   this.$router.push({
        //     name: 'login'
        //   })
        // }
        let res = 0;
        if(res === 0){
          this.$message('添加成功');
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
  .create{
    margin-left:60px;
  }
  .add-admin{
    width:40%;
    margin:0 auto;
  }
</style>

