<template>
  <el-col :span="6">
    <div class="card">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="text">
        <span class="number">
          <slot name="number"></slot>
        </span>
        <span class="text-text">
          <slot name="text"></slot>
        </span>
      </div>
    </div>
  </el-col>
</template>

<script>
    export default {
        name: "capsule",
        props: {
          title: {
            type: String,
            default: ''
          },
          name: {
            type: String,
            default: ''
          },
          params: {
            type: String,
            default: ''
          },
          query: {
            type: String,
            default: ''
          },
          tclass:{
            type:String,
          }
        },
    }
</script>

<style scoped>
 .card{
   display:inline-block;
   width:200px;
   height:100px;
   text-align: center;
   border-radius: 4px 4px 4px 4px;
   box-shadow: 4px 4px 4px #8c939d;
 }
  .icon{
    float:left;
    height:100px;
    text-align: center;
    width: 43%;
    padding-left:7px;
    -webkit-border-radius: 4px 0px 0px 4px;
    border-radius: 4px 0px 0px 4px;
    line-height:100px;
    background:#6ccac9;
  }
  .text{
    float:right;
    background:#fff;
    border-radius: 0px 4px 4px 0px;
    width: 50%;
    color: #c6cad6;
    text-align: center;
    padding-top:20px;
  }
  .number{
    height:40px;
    font-weight:300;
    font-size:15px;
  }
  .text-text{
    font-size:12px;
  }

</style>
