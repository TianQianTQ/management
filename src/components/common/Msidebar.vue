<template>
    <div class="sidebar">
      <div class="logo">
        <i class="iconfont t-side-guanliyuan1"></i>&nbsp;&nbsp;
        商城后台
      </div>
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index">
              <template slot="title"><i :class="item.icon" ></i>{{ item.title }}</template>
              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index">
              <i :class="item.icon"></i>{{ item.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'iconfont t-yonghuguanli',
                        index: 'muser',
                        title: '用户管理'
                    },
                    {
                        icon: 'iconfont t-yonghuguanlipitchon',
                        index: 'mbusiness',
                        title: '商户管理',
                    },
                    {
                        icon: 'iconfont t-icon_yuangongguanli',
                        index: 'madmin',
                        title: '管理员管理',
                    },
                    {
                        icon: 'iconfont t-kefu',
                        index: 'mkefu',
                        title: '客服中心'
                    },
                    {
                        icon: 'iconfont t-guanggao',
                        index: 'upload',
                        title: '广告管理'
                    },
                    {
                      icon: 'iconfont t-zhifuguanli',
                      index: 'vueeditor',
                      title: '支付管理'
                    },
                    {
                      icon: 'iconfont t-tongzhi',
                      index: 'baseform',
                      title: '通知系统'
                    },
                    {
                      icon: 'iconfont t-gerenzhongxin',
                      index: 'mpersonalcenter',
                      title: '个人中心'
                    },
                    {
                      icon: 'iconfont t-tongji',
                      index: 'mhome',
                      title: '统计报表'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
    }
</script>

<style scoped>
  .logo{
    width:200px;
    height:70px;
    text-align: center;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background: #324157;
  }
  .sidebar{
      display: block;
      position: absolute;
      width: 200px;
      left: 0;
      top: 0;
      bottom:0;
      background: #2E363F;
  }
  .sidebar > ul {
      height:100%;
  }
</style>
