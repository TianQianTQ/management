<template>
  <div class="title">
    <capsile  v-for="item in items" :key="item.id">
      <div class="icon" slot="icon" :class="item.background">
        <i slot="icon" class="iconfont t-shangpin1-copy" :class="item.icon"></i>
      </div>
      <h1 slot="number">{{item.number}}</h1>
      <span slot="text">{{item.text}}</span>
    </capsile>
    <first class="chart"></first>
    <el-tabs v-model="activeName" :click="handleClick" class="tabs">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
   import capsile from '../../components/little/capsule';
   import first from '../../components/charts/first'
  export default {
    name: "mhome",
    data(){
      return {
        activeName: 'second',
        items:[
          {
            icon:'t-cap-dianpu',
            number:10,
            text:'店铺数量',
            background:'gren',
            id:1
          },{
            icon:'t-cap-dingdan',
            number:5,
            text:'订单数量',
            background:'red',
            id:2
          },{
            icon:'t-cap-yonghu',
            number:30,
            text:'用户数量',
            background:'yellow',
            id:3
          },{
            icon:'t-cap-browse',
            number:28,
            text:'访问量',
            background:'blue',
            id:4
          }
        ]
      }
    },
    components:{
      capsile,
      first
    },
    mounted:function(){

    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>
  .icon{
    float:left;
    height:100px;
    text-align: center;
    width: 43%;
    padding-left:7px;
    -webkit-border-radius: 4px 0px 0px 4px;
    border-radius: 4px 0px 0px 4px;
    line-height:100px;
  }
  .iconfont{
    color:#fff;
  }
  .gren{
    background:#6ccac9;
  }
  .red{
    background:#FF6C60;
  }
  .yellow{
    background:#f8d347;
  }
  .blue{
    background:#57c8f2;
  }
  .tabs{
    display:inline-block;
    margin-top:20px;
    width:500px;
    height:400px;
    border:1px solid #eaeefb;
    border-radius: 5px;
    box-shadow: 2px 3px 3px #8c939d;
  }
</style>
