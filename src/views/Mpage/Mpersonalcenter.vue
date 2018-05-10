<template>
  <div class="mperson-main">
    <div class="mperson-top">
      <div class="head-portrait">
        <img class="head-img" :src=url alt="">
      </div>
      <div class="head-information">
        <span>{{username}}</span>
        <el-button type="primary" plain icon="iconfont t-xiugai" @click="changeInformation" class="to-change">修改个人信息</el-button>
      </div>
    </div>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" v-if="toChange" class="change-form" ref="formLabelAlign">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="/api-business/business/upload-image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" v-model="formLabelAlign.name" @keyup.enter.native="submitForm(formLabelAlign)"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="formLabelAlign.password" @keyup.enter.native="submitForm(formLabelAlign)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toChangeInformation">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
  import WebApi from '../../api/webapi';
    export default {
      name: "mpersonalcenter",
      components: {
        VueCoreImageUpload
      },
      data() {
        return {
          labelPosition: 'right',
          formLabelAlign: {
            name: '',
            password:''
          },
          toChange: false,
          src:'../../../static/img/img.jpg',
          name:'',
          imageUrl:'',
        };
      },
      computed:{
        username(){
          let username = localStorage.getItem('username');
          return username ? username : this.name;
          // 从后台请求用户名
        },
        url(){
          let url = localStorage.getItem('personUrl');
          return url ? url : this.src
        }
      },
      methods:{
        //提交用户
        submitForm(name){
          this.toChangeInformation();
        },
       // 图片上传成功
        handleAvatarSuccess(res, file) {
          console.log(res);
          this.imageUrl = res.data.url;
          localStorage.removeItem('personUrl');
          localStorage.setItem('personUrl',this.imageUrl);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },

        // 修改个人信息
        changeInformation(){
          this.toChange = true;
        },
        // 确认修改
        async toChangeInformation(){
          let formLabelAlign = this.formLabelAlign;
          let params = {};
          if(formLabelAlign.name !==''){
            params.username = formLabelAlign.name
          }if(formLabelAlign.password !== ''){
            params.password = formLabelAlign.password
          }if(this.imageUrl !==''){
            params.headImage = this.imageUrl
          }
          let businessId = localStorage.getItem('businessId');
          params.businessId = businessId;
          let res = await WebApi.updatePerson(params);
          if(res.code === 0){
            if(this.imageUrl !==''){
              this.src = this.imageUrl;
            }
            this.$message('修改成功');
            this.toChange = false;
          }else{
            this.$message(res.msg);
          }
        }
      },
    }
</script>

<style scoped>
  .mperson-top{
    height: 100px;
    width: 43%;
    margin: 0 auto;
  }
  .head-portrait{
    float: left;
    width: 100px;
    height: 100px;
  }
  .head-portrait img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .head-information{
    float: right;
    margin-left: 50px;
    text-align:center;
    line-height:100px;
  }
  .to-change{
    margin-right: 30px;
    margin-left: 60px;
  }
  .change-form{
    width:40%;
    margin-top:80px;
  }
/*图片*/
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
