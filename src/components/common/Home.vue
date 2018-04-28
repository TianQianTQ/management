<template>
    <div class="wrapper">
        <v-head></v-head>
        <component :is="currentView"></component>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import BSidebar from './Bsidebar.vue';
    import MSidebar from './Msidebar.vue'
    import * as utils from '../../utils/utils';
    export default {
        components:{
            vHead, BSidebar, MSidebar
        },
        data(){
          return{
            currentView: ''
          }
        },
        mounted:function(){
            if(utils.getView() === 'administrator') {
              this.currentView = 'MSidebar';
            }else{
              this.currentView = 'BSidebar';
            }
        }
    }
</script>
<style scoped>
  .content{
    left:200px;
  }
</style>
