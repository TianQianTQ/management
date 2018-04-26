<template>
    <div class="header">
      <button type="button" class="ivu-button">
        <i class="iconfont t-caidan" @click="toSmall"></i>
      </button>
      <span class="to-home" @click="toHome">首页</span>
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user-logo" src="../../../static/img/img.jpg">
            {{username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'tq',

            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            toSmall(){

            },
            toHome(){
              this.$router.push('/home');
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        margin-left:200px;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .user-info {
        /*position:absolute;*/
        /*right:30px;*/
        float:right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .iconfont{
      font-size:30px;
      /*position:absolute;*/
      /*left:20px;*/
      cursor:pointer;
    }
    .ivu-button{
      width:40px;
      height:40px;
      outline:none;
      display: inline-block;
      position:absolute;
      left:20px;
      text-align: center;
      vertical-align: middle;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      border: 1px solid transparent;
      white-space: nowrap;
      line-height:6;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 6px 15px;
      margin:0 auto;
      font-size: 12px;
      border-radius: 4px;
      transition: color .2s linear,background-color .2s linear,border .2s linear;
      color: #fff;
      background:#242f42;
    }
    .to-home{
      font-size:15px;
      font-weight: 700;
      position:absolute;
      left:100px;
      cursor:pointer;
    }
</style>

