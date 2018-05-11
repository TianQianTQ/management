<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formAdmin" :model="formAdmin" label-width="80px" inline>
        <el-form-item label="商品名">
          <el-input v-model="formAdmin.productName" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
        <el-button type="success" icon="iconfont t-icon02" class="create" @click="create">添加商品</el-button>
      </el-form>
    </div>
    <div class="madmin-body" v-if="!createGoods">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部" name="first">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="140"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="stock" label="库存" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="190"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="190"></el-table-column>
            <el-table-column label="操作" width="200" prop="productId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit1(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingDelete1(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible1" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.productName" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.category"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.productCategoryId"
                    :label="item.categoryName"
                    :value="item.productCategoryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="number" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="库存" >
                <el-input type="number" v-model="formModify.stock" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify1">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange1"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已上架" name="second">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="140"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="stock" label="库存" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="190"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="190"></el-table-column>
            <el-table-column label="操作" width="200" prop="productId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit2(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingDown(scope.row)" type="text" size="small">下架</el-button>
                <el-button  @click="auditingDelete2(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible2" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.productName" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.category"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.productCategoryId"
                    :label="item.categoryName"
                    :value="item.productCategoryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="number" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="库存" >
                <el-input type="number" v-model="formModify.stock" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify2">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange2"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架" name="third">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="productName" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="140"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="stock" label="库存" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="190"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="190"></el-table-column>
            <el-table-column label="操作" width="200" prop="productId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit3(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingUp(scope.row)" type="text" size="small">上架</el-button>
                <el-button  @click="auditingDelete3(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.productName" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.category"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.productCategoryId"
                    :label="item.categoryName"
                    :value="item.productCategoryId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="number" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="库存" >
                <el-input type="number" v-model="formModify.stock" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify3">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange3"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="add-goods" v-else >
      <el-form :model="formAddGoods" ref="formAddGoods" label-width="100px">
        <el-form-item label="商品名称" >
          <el-input type="text" v-model="formAddGoods.productName" ></el-input>
        </el-form-item>
        <el-form-item label="分类" >
          <el-select v-model="formAddGoods.category"  clearable placeholder="请选择商品类型" class="form-option">
            <el-option
              v-for="item in labelType"
              :key="item.productCategoryId"
              :label="item.categoryName"
              :value="item.productCategoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" >
          <el-input type="number" v-model="formAddGoods.price" class="el-input-price"></el-input>
        </el-form-item>
        <el-form-item label="库存" >
          <el-input type="number" v-model="formAddGoods.stock" class="el-input-price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" >
          <el-input type="textarea" v-model="formAddGoods.productDesc" ></el-input>
        </el-form-item>
        <el-form-item label="图片" >
          <el-upload
            class="avatar-uploader"
            action="/api-business/business/upload-image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goAddGoods">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import WebApi from '../../api/webapi';
  import * as utils from '../../utils/utils';
  export default {
    name:'bgoods',
    data() {
      return {
        formAdmin: {            //  搜索条件
          productName: '',
        },
        createGoods:false,      // 添加商品
        dataAll: [],           //  表格信息  --所有
        loading:false,        //  加载中
        activeName:'first',   // 首页显示表格
        pageState: null,    //  当前页编号
        isShelf:false,      //  判断商品是否上架
        productId: '',     // 商品ID
        shopId:'',       // 店铺ID
        dialogFormVisible1: false,  // 是否编辑1
        dialogFormVisible2: false,  // 是否编辑2
        dialogFormVisible3: false,  // 是否编辑3
        formModify: {            // 编辑商品基本信息
          productName : '',      // 商品名称
          category: '',         //  商品分类
          price:'',             // 商品价格
          stock:'',            // 商品库存
        },
        formAddGoods:{                  // 添加商品
          productName : '',      // 商品名称
          category: '',         //  商品分类
          price:'',             // 商品价格
          stock:'',            // 商品库存
          productDesc:'',      // 商品描述
          imageIds:[]          // 商品图片
        },
        imageUrl:'',          //  图片
        imageId:'',           // 图片ID
                                 // 编辑商品分类
        labelType:[],      //  选择商品类目
        pageTotal: null, // 页面总数
        pageSize: 10,  // 每页显示条数
        pageNo: 1,   // 当前页
      }
    },
    mounted:async function(){
      this.businessId = localStorage.getItem('businessId');
      let res1 =await WebApi.category();
      if(res1.code === 0){
        this.labelType = res1.data
      }else{
        this.$message(res1.msg);
      }
      let params = {
        businessId: this.businessId
      }
      let res =await WebApi.infoShop(params);
      if(res.code === 0){
        this.shopId = res.data.shopId
      }
      this.search();
    },
    methods: {
      // 标签事件
      handleClick(tab, event) {
        if(tab.index !== '0') {
          this.pageState = tab.index;
        }else{
          this.pageState = null;
        }
        let flag = 0;
        if(tab.index == 1){
          flag = 1
        }else if(tab.index ==2){
          flag = 2
        }
        console.log(flag+ tab.index);
        this.search(flag);
        this.$message('搜索');
      },
      // 编辑
      _auditingEdit(index){
        switch(index){
          case 1:  this.dialogFormVisible1 = true
                   break
          case 2:  this.dialogFormVisible2 = true
                   break
          case 3:  this.dialogFormVisible3 = true
                   break
        }

      },
      // 编辑1
      auditingEdit1(row){
        this._auditingEdit(1)
        this.productId = row.productId
      },
      // 编辑2
      auditingEdit2(row){
        this._auditingEdit(2)
        this.productId = row.productId
      },
      // 编辑3
      auditingEdit3(row){
        this._auditingEdit(3)
        this.productId = row.productId
      },
      // 上架
      async auditingUp(row){
        this.productId = row.productId
        let params = {
          shopId: this.shopId,
          productId:this.productId,
          status:1
        }
        let res = await WebApi.updateProduct(params);
        if(res.code === 0){
          this.search(2);
        }else{
          this.$message(res.msg);
        }
      },
      // 下架
      async auditingDown(row){
        this.productId = row.productId
        let params = {
          shopId: this.shopId,
          productId:this.productId,
          status:2
        }
        let res = await WebApi.updateProduct(params);
        if(res.code === 0){
          this.search(1);
          this.$message('下架成功');
        }else{
          this.$message(res.msg);
        }
      },
      // 删除
      _auditingDelete(index,productId){
        let flag = null;
        if(index === 2){
          flag = 1
        }else if(index === 3){
          flag = 2
        }else if(index === 1){
          flag = null
        }
        this.productId = productId
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let param = {
            productId: productId
          }
          let res =await WebApi.deleteProduct(param);
          if(res.code ===0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(flag);
            this.search(flag);  // 搜索
          }else{
            this.$message(res.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 删除1
      auditingDelete1(row){
        this.productId = row.productId
        this._auditingDelete(1,row.productId)
      },
      // 删除2
      auditingDelete2(row){
        this.productId = row.productId
        this._auditingDelete(2,row.productId)
      },
      // 删除3
      auditingDelete3(row){
        this.productId = row.productId
        this._auditingDelete(3,row.productId)
      },
      //   添加商品
      async create(){
        this.createGoods = true;
      },
      //   搜索商品
      async search(flag){
        this.createGoods = false;
        this.loading = true;
        let params={},
          formAdmin = this.formAdmin;
          params.pageNo = this.pageNo;    //传递页码（第一页）
          params.pageSize = this.pageSize;
          params.shopId = this.shopId
        if(formAdmin.productName !== ''){
          params.productName = formAdmin.productName;
        }
        console.log(flag);
        if(flag) {
          if (flag == 1) {        //  上架
            params.status = 1
          }
          if (flag == 2) {
            params.status = 2
          }
        }
        const res = await WebApi.listProduct(params);
        if(res.code === 0 ){
          this.loading = false;
          this.$message('查询成功');
          let tableData1 = res.data.list;
          this.pageTotal = res.data.total;
          this.dataAll = tableData1;
          tableData1 = tableData1.map(function(item,index,input){
            item.ctime = utils.timestampToTime(item.ctime);
            item.utime = utils.timestampToTime(item.utime);
          })
        }else{
          this.$message(res.msg);
        }
      },
      //   提交搜索表单
      submitForm(name){
        this.goAddAdmin();
      },
      // 改变页码
      _handleCurrentChange(val,index){
        let flag = null;
        if(index === 2){
          flag = 1
        }else if(index === 3){
          flag = 2
        }else if(index === 1){
          flag = null
        }
        this.pageNo = val;
        this.search(flag);
      },
      // 改变页码1
      handleCurrentChange1(val){
        this._handleCurrentChange(val,1)
      },
      // 改变页码2
      handleCurrentChange2(val){
        this._handleCurrentChange(val,2)
      },
      // 改变页码3
      handleCurrentChange3(val){
        this._handleCurrentChange(val,3)
      },
      // 编辑商品确认
      async _goFormModify(index){
        let formModify = this.formModify
        let params = {
          shopId: this.shopId,
          productId:this.productId,
          productName:formModify.productName,
          categoryId:formModify.category,
          price:formModify.price,
          stock:formModify.stock
        }
        let res = await WebApi.updateProduct(params);
        if(res.code === 0){
          switch(index){
            case 2:this.search(1)
                   break
            case 3:this.search(2)
                   break
            default:this.search()
                    break
          }
          this.$message('更改成功');
        }else{
          this.$message(res.msg);
        }
        switch(index){
          case 1:  this.dialogFormVisible1 = false
            break
          case 2:  this.dialogFormVisible2 = false
            break
          case 3:  this.dialogFormVisible3 = false
            break
        }
      },
      // 编辑商品1
      goFormModify1(){
        this._goFormModify(1);
      },
      // 编辑商品2
      async goFormModify2(){
        this._goFormModify(2);
      },
      async goFormModify3(){
        this._goFormModify(3);
      },
      // 添加商品发请求
      async goAddGoods(){
        let formAddGoods = this.formAddGoods
          let params = {
            shopId: this.shopId,
            productName: formAddGoods. productName,
            categoryId:formAddGoods.category,
            price:formAddGoods.price,
            stock:formAddGoods.stock,
            productDesc:formAddGoods.productDesc,
            imageIds:[this.imageId],
          }
          console.log(params);
        let res =await WebApi.addProduct(params);
        if(res.code === 0){
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.createGoods = false;
          this.search();   // 搜索商品
        }else{
          this.$message(res.msg);
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //  上传成功
      handleAvatarSuccess(res, file){
        this.imageUrl = res.data.url
        this.imageId = res.data.id
      },
    },
  }
</script>

<style scoped>
  .handle-box{
    margin-bottom: 20px;
  }
  .search{
    margin-left:50px;
  }
  .block{
    float:right;
    margin-top:30px;
  }
  .create{
    margin-left:60px;
  }
  .add-admin{
    width:40%;
    margin:0 auto;
  }
  .form-modify{
    width:60%;
    margin:0 auto;
  }
  .form-option{
    float:left;
  }
  .add-goods{
    width:40%;
  }
  .upload-demo{

  }
  .el-input-price{
    width:100px;
    float:left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

