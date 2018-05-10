<template>
  <div>
    <div v-if="hasStore">
      <el-form ref="formModify" :model="formModify" label-width="100px" class="form-create">
        <el-form-item label="店铺名称" class="shop-name">
          <p class="modify-p" >{{formModify.name}}</p>
        </el-form-item>
        <el-form-item label="主营类目">
          <p class="modify-p">{{formModify.category}}</p>
        </el-form-item>
        <el-form-item label="所在地区">
          <p class="modify-p" >{{formModify.cityName}}</p>
        </el-form-item>
        <el-form-item label="门店地址" class="shop-name shop-adress">
          <p class="modify-p" >{{formModify.address}}</p>
        </el-form-item>
        <el-form-item label="店铺公告" class="shop-name ">
          <p class="modify-p" >{{formModify.notice}}</p>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmitModify" v-show="toModify">完成</el-button>-->
          <!--<el-button type="primary" @click="onModify" v-show="!toModify">编辑</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div v-else>
      <p  v-show="examine">您的店铺正在审核中，请耐心等候</p>
      <p  v-show="(!toCreate) && (!examine)">您还未创建商铺，去<el-button type="primary" @click="toCreate=true" style="margin-left:10px">创建</el-button></p>
      <el-form ref="form" :model="form" label-width="100px" v-show="toCreate" class="form-create">
        <el-form-item label="店铺名称" class="shop-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="主营类目">
          <el-select v-model="form.region" clearable placeholder="请选择主营类目" class="form-option">
            <el-option
              v-for="item in labelType"
              :key="item.productCategoryId"
              :label="item.categoryName"
              :value="item.productCategoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select v-model="form.province" clearable placeholder="请选择省" class="form-option-city" @change="goCity(form.province)">
            <el-option
              v-for="(item,index) in labelSpare1"
              :key="index"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
          <el-select v-model="form.city" clearable placeholder="请选择市" class="form-option-city"  @change="goArea(form.city)">
            <el-option
              v-for="(item,index) in labelSpare2"
              :key="index"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
          <el-select v-model="form.area" clearable placeholder="请选择区" class="form-option-city">
            <el-option
              v-for="(item,index) in labelSpare3"
              :key="index"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店地址" class="shop-name shop-adress">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告" class="shop-name ">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import WebApi from "../../api/webapi";
    export default {
        name: "bstore",
        data: function(){
          return {
            currentView: '',
            hasStore: false,  // 判断是否有店铺
            businessId: null, // 商家id
            shopId: null,     // 店铺id
            toCreate: false,  // 创建店铺
            examine: false,   // 店铺审核
            form: {           // 表单数据
              name: '',       //  店铺名称
              region: '',     //  主营类目
              province:'',       //  省
              city:'',          // 市
              area:'',         // 区
              address:'',      //  店铺地址
              desc: '',       //  店铺公告
            },
            formModify: {           // 可编辑 ---接口返回数据
              // name: '田家的小烽仔',       //  店铺名称
              // region: '宠物',     //  主营类目
              // space:'西安',       //  所在地区
              // address:'西安邮电大学',      //  店铺地址
              // desc: '欢迎来到小店',       //  店铺公告
            },
                                // 选择主营类目
            labelType:[],
                                // 选择地区
            labelSpare1:[],
            labelSpare2:[],
            labelSpare3:[],

          }
        },
      mounted:async function(){
          this.businessId = localStorage.getItem('businessId');
          let params = {
            businessId: this.businessId
          }
          // 请求店铺状态
          // 未创建、审核、已有店铺
          let res =await WebApi.infoShop(params);
          // res.state = 'no'
          if(res.code === 0) {  // 已创建店铺
              this.hasStore = true
              this.examine = false
              this.formModify = res.data
          }else if(res.code === -2){   // 审核中
            this.hasStore = false
            this.examine = true
          }else if(res.code === -1){   // 未创建
            this.hasStore = false
            this.examine = false
          }else{
            this.$message(res.msg);
          }
          // 请求选项
          let param = {
            parentId: '000000'
          }
          let res2 =await WebApi.getCity(param);
            if(res2.code === 0){
              this.labelSpare1 = res2.data
            }else{
              this.$message(res2.msg);
            }
          // 请求商品类目
        let res3 =await WebApi.category();
        if(res3.code === 0){
          this.labelType = res3.data
        }else{
          this.$message(res3.msg);
        }

      },
        methods: {
          // 请求市goCity--改变省
          async goCity(){
            this.labelSpare2 = []
            this.labelSpare3 = []
            let param = {
              parentId: this.form.province
            }
            let res =await WebApi.getCity(param);
            if(res.code === 0){
              this.labelSpare2 = res.data
            }else{
              this.$message(res.msg);
            }
          },
          // 请求区  --改变市
          async goArea(){
            this.labelSpare3 = [];
            console.log(this.labelSpare3);
            let param = {
              parentId: this.form.city
            }
            let res =await WebApi.getCity(param);
            if(res.code === 0){
              this.labelSpare3 = res.data
              console.log()
            }else{
              this.$message(res.msg);
            }
          },
          // 创建店铺
          async onSubmit() {
            let form  = this.form;
            let params = {    //  需要提交的数据
              shopName: form.name,
              businessId: this.businessId,
              categoryId: form.region,
              region: form.area,
              address: form.address,
              notice:form.desc
            }
            let res = await WebApi.createShop(params);
            if(res.code ===0) {
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              // this.hasStore = true;
              this.toCreate = false;
              this.examine = true;  // 审核状态
            }else{
              this.$message(res.msg);
            }
          },
        }
    }
</script>

<style scoped>
  .form-create{
    width:45%;
  }
  .shop-name{
    width:100%;
  }
  .form-option{
    float:left;
  }
  .form-option-city{
    float:left;
    width:130px;
    margin-right:10px;
  }
  .change-input{
    border:none;
  }
  .modify-p{
    text-align:left;
  }


  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-col{
    height:50px;
    line-height:50px;
  }
</style>
