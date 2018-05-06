<script src="./login.js"></script>
<style module src="./style.css"></style>
<template>
  <div :class="$style.loginBg">
    <transition name="el-zoom-in-center" mode="in-out">
      <div :class="$style.loginForm" v-show="showLogin">
        <div :class="$style.loginLogo">
          <img src="../../../assets/logo.png">
          <span :class="$style.span">旧物志</span>
        </div>
        <el-form :model="formLogin" :rules="rulesLogin" ref="formLogin" v-loading="loading">
          <el-form-item prop="mobile">
            <el-input type="number" v-model="formLogin.mobile" auto-complete="off"  placeholder="手机号" @keyup.enter.native="sumitForm(formLogin)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formLogin.password" auto-complete="off"  placeholder="密码" @keyup.enter.native="sumitForm(formLogin)"></el-input>
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
