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
        <el-form :model="formRegister" :rules="rulesRegister" ref="formRegister">
          <el-form-item prop="username">
            <el-input type="text" v-model="formRegister.username" auto-complete="off"  placeholder="用户名" @keyup.enter.native="submitForm(formRegister)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formRegister.password"  auto-complete="off"  placeholder="密码" @keyup.enter.native="submitForm(formRegister)"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input type="password" v-model="formRegister.repassword"  auto-complete="off"  placeholder="重复密码" @keyup.enter.native="submitForm(formRegister)"></el-input>
          </el-form-item>
          <div class="to-register">
            <span @click="toLogin">去登录</span>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRegister)">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
