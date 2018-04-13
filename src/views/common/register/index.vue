<script src="./register.js"></script>
<style src="./style.css"></style>
<template>
  <div class="register-bg">
    <transition name="el-zoom-in-center" mode="in-out">
      <div class="register-form" v-show="showLogin">
        <div class="login-logo">
          <img src="../../../assets/logo.png">
          <span>旧物志</span>
        </div>
        <el-form >
          <el-form-item prop="username">
            <el-input type="text"  auto-complete="off"  placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input type="password"  auto-complete="off"  placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input type="password"  auto-complete="off"  placeholder="重复密码"></el-input>
          </el-form-item>
          <div class="to-register">
            <span @click="toLogin">去登录</span>
          </div>
          <el-form-item>
            <el-button type="primary" >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
