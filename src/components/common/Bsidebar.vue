<template>
    <div class="sidebar">
      <div class="logo">
        <i class="iconfont t-side-guanliyuan1"></i>&nbsp;&nbsp;
        {{username}}
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
                name:'tq',
                items: [
                    {
                        icon: 'iconfont t-dianpuguanli',
                        index: 'mstore',
                        title: '店铺管理'
                    },
                    {
                        icon: 'iconfont t-shangpinguanli',
                        index: '2',
                        title: '商品管理',
                        subs: [
                            {
                                index: 'basetable',
                                title: '基础表格'
                            },
                            {
                                index: 'vuetable',
                                title: 'Vue表格组件'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'baseform',
                                title: '基本表单'
                            },
                            {
                                index: 'vueeditor',
                                title: '编辑器'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont t-huiyuanguanli',
                        index: 'basecharts',
                        title: '会员管理'
                    },
                    {
                        icon: 'iconfont t-icon_yuangongguanli',
                        index: 'upload',
                        title: '员工管理'
                    },
                    {
                      icon: 'iconfont t-permissions',
                      index: 'markdown',
                      title: '权限管理'
                    },
                    {
                      icon: 'iconfont t-kefu',
                      index: 'vueeditor',
                      title: '客服管理'
                    },
                    {
                      icon: 'iconfont t-gerenzhongxin',
                      index: 'baseform',
                      title: '个人中心'
                    },
                    {
                      icon: 'iconfont t-zijinguanli',
                      index: 'vuetable',
                      title: '资金管理'
                    },
                    {
                      icon: 'iconfont t-tongji',
                      index: 'basetable',
                      title: '统计报表'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            username(){
              let username = localStorage.getItem('name');
              return username ? username : this.name;
            }
        }
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
