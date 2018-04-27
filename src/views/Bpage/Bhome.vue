<template>
  <div class="title">
    <capsile>
      <i slot="icon" class="iconfont t-shangpin-copy-copy-copy"></i>
      <h1 slot="number">254</h1>
      <span slot="text">商品数量</span>
    </capsile>
    <capsile>
      <i slot="icon" class="iconfont t-huiyuan-copy"></i>
      <h1 slot="number">89</h1>
      <span slot="text">会员数量</span>
    </capsile>
    <capsile>
      <i slot="icon" class="iconfont t-huiyuan-copy"></i>
      <h1 slot="number">89</h1>
      <span slot="text">订单数量</span>
    </capsile>
    <capsile>
      <i slot="icon" class="iconfont t-huiyuan-copy"></i>
      <h1 slot="number">89</h1>
      <span slot="text">员工数量</span>
    </capsile>
  </div>
</template>

<script>
    import capsile from '../../components/capsule/capsule';
    export default {
        name: "bhome",
        components:{
            capsile
        },
        mounted:function(){

        }
    }
</script>

<style scoped>
</style>
