<template>
  <div class="title">
    <capsile  v-for="item in items" :key="item.id">
      <div class="icon" slot="icon" :class="item.background">
        <i slot="icon" class="iconfont t-shangpin1-copy" :class="item.icon"></i>
      </div>
      <h1 slot="number">{{item.number}}</h1>
      <span slot="text">{{item.text}}</span>
    </capsile>
  </div>
</template>

<script>
     import capsile from '../../components/little/capsule';
    export default {
        name: "bhome",
        data(){
          return {
            items:[
              {
                icon:'t-cap-goods',
                number:254,
                text:'商品数量',
                background:'gren',
                id:1
              },{
                icon:'t-cap-huiyuan',
                number:14,
                text:'会员数量',
                background:'red',
                id:2
              },{
                icon:'t-cap-dingdan',
                number:30,
                text:'订单数量',
                background:'yellow',
                id:3
              },{
                icon:'t-cap-browse',
                number:3,
                text:'浏览量',
                background:'blue',
                id:4
              }
            ]
          }
        },
        components:{
            capsile
        },
        mounted:function(){

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
</style>
