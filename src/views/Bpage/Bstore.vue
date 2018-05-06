<template>
  <div>
    <div v-if="hasStore">
      <el-form ref="formModify" :model="formModify" label-width="100px" class="form-create">
        <el-form-item label="店铺名称" class="shop-name">
          <p class="modify-p" v-show="!toModify">{{formModify.name}}</p>
          <el-input v-model="formModify.name" v-show="toModify"></el-input>
        </el-form-item>
        <el-form-item label="经营人姓名" class="shop-name ">
          <p class="modify-p" v-show="!toModify">{{formModify.username}}</p>
          <el-input v-model="formModify.username" v-show="toModify"></el-input>
        </el-form-item>
        <el-form-item label="主营类目">
          <p class="modify-p" v-show="!toModify">{{formModify.region}}</p>
          <el-select v-model="formModify.region" v-show="toModify" clearable placeholder="请选择主营类目" class="form-option">
            <el-option
              v-for="item in labelType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区">
          <p class="modify-p" v-show="!toModify">{{formModify.space}}</p>
          <el-select v-model="form.space" v-show="toModify" clearable placeholder="请选择地区" class="form-option">
            <el-option
              v-for="item in labelSpare"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店地址" class="shop-name shop-adress">
          <p class="modify-p" v-show="!toModify">{{formModify.address}}</p>
          <el-input v-model="form.address" v-show="toModify"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告" class="shop-name ">
          <p class="modify-p" v-show="!toModify">{{formModify.desc}}</p>
          <el-input type="textarea" v-show="toModify" v-model="formModify.desc"></el-input>
        </el-form-item>
        <el-form-item label="发件地址" class="shop-name">
          <p class="modify-p" v-show="!toModify">{{formModify.goodsaddress}}</p>
          <el-input v-model="formModify.goodsaddress" v-show="toModify"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitModify" v-show="toModify">完成</el-button>
          <el-button type="primary" @click="onModify" v-show="!toModify">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <p  v-show="!toCreate">您还未创建商铺，去<el-button type="primary" @click="toCreate=true">创建</el-button></p>
      <el-form ref="form" :model="form" label-width="100px" v-show="toCreate" class="form-create">
        <el-form-item label="店铺名称" class="shop-name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="经营人姓名" class="shop-name ">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="主营类目">
          <el-select v-model="form.region" clearable placeholder="请选择主营类目" class="form-option">
            <el-option
              v-for="item in labelType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select v-model="form.space" clearable placeholder="请选择地区" class="form-option">
            <el-option
              v-for="item in labelSpare"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店地址" class="shop-name shop-adress">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告" class="shop-name ">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="发件地址" class="shop-name">
          <el-input v-model="form.goodsaddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

    export default {
        name: "bstore",
        data: function(){
          return {
            currentView: '',
            hasStore: true,  // 判断是否有店铺
            toCreate: false,  // 创建店铺
            toModify: false,   // 去编辑
            form: {           // 表单数据
              name: '',       //  店铺名称
              username:'',    //  经营人姓名
              region: '',     //  主营类目
              space:'',       //  所在地区
              address:'',      //  店铺地址
              desc: '',       //  店铺公告
              goodsaddress:'', //  发件地址
            },
            formModify: {           // 可编辑
              name: '田家的小烽仔',       //  店铺名称
              username:'伊人笑桃花酒',    //  经营人姓名
              region: '宠物',     //  主营类目
              space:'西安',       //  所在地区
              address:'西安邮电大学',      //  店铺地址
              desc: '欢迎来到小店',       //  店铺公告
              goodsaddress:'西安邮电大学', //  发件地址
            },
                                // 选择主营类目
            labelType:[
              {
                value: '选项1',
                label: '书籍'
              }, {
                value: '选项2',
                label: '电子产品'
              },
              {
                value: '选项3',
                label: '服饰'
              }, {
                value: '选项4',
                label: '生活用品'
              },
              {
                value: '选项5',
                label: '宠物'
              }
            ],
                                // 选择地区
            labelSpare:[
              {
                value: '选项1',
                label: '北京'
              }, {
                value: '选项2',
                label: '上海'
              },
              {
                value: '选项3',
                label: '广州'
              }, {
                value: '选项4',
                label: '西安'
              },
              {
                value: '选项5',
                label: '成都'
              }
            ],

          }
        },
        methods: {
          // 创建店铺
          onSubmit() {
            let form  = this.form;
            let params = {    //  需要提交的数据
              name: form.name,
              username: form.username,
              region: form.region,

            }
            let res = {};
            res.code = 0 ;
            if(res.code ===0) {
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              this.hasStore = true;
              this.toCreate = false;
            }else{
              this.$message(res.msg);
            }
          },
          // 修改店铺
          onModify(){
              this.toModify = true;
              this.$message('修改');
          },
          //  完成修改
          onSubmitModify(){
            this.toModify = false;
            this.$message('完成修改');
          }
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
