<script src="./mlogin.js"></script>
<style module src="./style.css"></style>
<template>
  <div :class="$style.loginBg">
    <transition name="el-zoom-in-center" mode="in-out">
      <div :class="$style.loginForm" v-show="showLogin">
        <div :class="$style.loginLogo">
          <img src="../../../assets/logo.png">
          <span :class="$style.span">旧物志</span>
        </div>
        <el-form :model="formLogin" :rules="rulesLogin" ref="formLogin">
          <el-form-item prop="username">
            <el-input type="text" v-model="formLogin.username" auto-complete="off"  placeholder="用户名" @keyup.enter.native="submitForm(formLogin)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formLogin.password" auto-complete="off"  placeholder="密码" @keyup.enter.native="submitForm(formLogin)"></el-input>
          </el-form-item>
          <div :class="$style.toRegister">
            <span @click="toRegister">去注册</span>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formLogin)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
