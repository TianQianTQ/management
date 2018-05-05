<script src="./bregister.js"></script>
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
            <el-input type="text"  v-model="formRegister.username" auto-complete="off"  placeholder="用户名"  @keyup.enter.native="sumitForm(formRegister)"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input type="number"  v-model="formRegister.mobile" auto-complete="off"  placeholder="手机号"  @keyup.enter.native="sumitForm(formRegister)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"   v-model="formRegister.password" auto-complete="off"  placeholder="密码" @keyup.enter.native="sumitForm(formRegister)"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input type="number"  v-model="formRegister.captcha" auto-complete="off"  placeholder="验证码" @keyup.enter.native="sumitForm(formRegister)"></el-input>
            <el-button @click="getSmsCode" class="getMesCodeButton">
              <count-down class="getMesCode" text="发送验证码" algin="'right'" :during="59" :active.sync="timmer" format="S 秒后重新发送" @change="timmerChange"></count-down>
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="goRegister">注册</el-button>
            <div class="to-register">
              <span @click="toLogin">去登录</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>
