<template>
  <div class="mperson-main">
    <div class="mperson-top">
      <div class="head-portrait">
        <img class="head-img" :src="src" alt="">
      </div>
      <div class="head-information">
        <span>{{username}}</span>
        <el-button type="primary" plain icon="iconfont t-xiugai" @click="changeInformation" class="to-change">修改个人信息</el-button>
      </div>
    </div>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" v-if="toChange" class="change-form" ref="formLabelAlign">
      <el-form-item label="头像">
        <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                               :crop="true"
                               text="上传图片"
                               url=imgUrl
                               extensions="png,gif,jpeg,jpg"
                               @:imageuploaded="imageuploaded"
                               @:errorhandle="handleError"></vue-core-image-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" v-model="formLabelAlign.name" @keyup.enter.native="submitForm(formLabelAlign)"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="formLabelAlign.password" @keyup.enter.native="submitForm(formLabelAlign)"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" >
        <el-input type="password" @keyup.enter.native="submitForm(formLabelAlign)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toChangeInformation">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
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
          src:'../../static/img/img.jpg',
          name:'',
          imgUrl:''
        };
      },
      computed:{
        username(){
          let username = localStorage.getItem('username');
          return username ? username : this.name;
          // 从后台请求用户名
        }
      },
      methods:{
        //提交用户
        submitForm(name){
          this.toChangeInformation();
        },
        // 上传图片
        imageuploaded(res) {
          console.log(res)
        },
        // 图片上传失败
        handleError(){
          this.$notify.error({
            title: '上传失败',
            message: '图片上传接口上传失败，可更改为自己的服务器接口'
          });
        },
        // 修改个人信息
        changeInformation(){
          this.toChange = true;
        },
        // 确认修改
        toChangeInformation(){
          this.$message('修改成功');
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

</style>
