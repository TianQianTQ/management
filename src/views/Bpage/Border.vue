<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formAdmin" :model="formAdmin" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="formAdmin.goodsName" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="formAdmin.goodsType" @keyup.enter.native="submitForm(formAdmin)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="search" class="search">搜索</el-button>
      </el-form>
    </div>
    <div class="madmin-body">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部" name="first">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="120"></el-table-column>
            <el-table-column prop="volume" label="销量" width="100"></el-table-column>
            <el-table-column prop="isNew" label="是否新品" width="100"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="170" prop="goodsId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit1(scope.row)" type="text" size="small">编辑</el-button>
                <el-button v-show="isShelf" @click="auditingUp(scope.row)" type="text" size="small">上架</el-button>
                <el-button v-show="!isShelf" @click="auditingDown(scope.row)" type="text" size="small">下架</el-button>
                <el-button  @click="auditingDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible1" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.name" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.region"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="text" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="是否新品" >
                <el-select v-model="formModify.isNew"  clearable placeholder="请选择" class="form-option">
                  <el-option
                    v-for="item in labelTypeIsNew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="second">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="120"></el-table-column>
            <el-table-column prop="volume" label="销量" width="100"></el-table-column>
            <el-table-column prop="isNew" label="是否新品" width="100"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="170" prop="goodsId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit2(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingDown(scope.row)" type="text" size="small">下架</el-button>
                <el-button  @click="auditingDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible2" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.name" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.region"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="text" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="是否新品" >
                <el-select v-model="formModify.isNew"  clearable placeholder="请选择" class="form-option">
                  <el-option
                    v-for="item in labelTypeIsNew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="third">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="120"></el-table-column>
            <el-table-column prop="volume" label="销量" width="100"></el-table-column>
            <el-table-column prop="isNew" label="是否新品" width="100"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="170" prop="goodsId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit3(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingUp(scope.row)" type="text" size="small">上架</el-button>
                <el-button  @click="auditingDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.name" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.region"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="text" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="是否新品" >
                <el-select v-model="formModify.isNew"  clearable placeholder="请选择" class="form-option">
                  <el-option
                    v-for="item in labelTypeIsNew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="third">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="120"></el-table-column>
            <el-table-column prop="volume" label="销量" width="100"></el-table-column>
            <el-table-column prop="isNew" label="是否新品" width="100"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="170" prop="goodsId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit3(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingUp(scope.row)" type="text" size="small">上架</el-button>
                <el-button  @click="auditingDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.name" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.region"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="text" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="是否新品" >
                <el-select v-model="formModify.isNew"  clearable placeholder="请选择" class="form-option">
                  <el-option
                    v-for="item in labelTypeIsNew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交易成功" name="third">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
            <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="120"></el-table-column>
            <el-table-column prop="volume" label="销量" width="100"></el-table-column>
            <el-table-column prop="isNew" label="是否新品" width="100"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column label="操作" width="170" prop="goodsId">
              <template slot-scope="scope">
                <el-button @click="auditingEdit3(scope.row)" type="text" size="small">编辑</el-button>
                <el-button  @click="auditingUp(scope.row)" type="text" size="small">上架</el-button>
                <el-button  @click="auditingDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="商品信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-form :model="formModify" ref="formModify" label-width="80px">
              <el-form-item label="商品名称" >
                <el-input type="text" v-model="formModify.name" ></el-input>
              </el-form-item>
              <el-form-item label="分类" >
                <el-select v-model="formModify.region"  clearable placeholder="请选择商品类型" class="form-option">
                  <el-option
                    v-for="item in labelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="价格" >
                <el-input type="text" v-model="formModify.price" ></el-input>
              </el-form-item>
              <el-form-item label="是否新品" >
                <el-select v-model="formModify.isNew"  clearable placeholder="请选择" class="form-option">
                  <el-option
                    v-for="item in labelTypeIsNew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="goFormModify">确 定</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import WebApi from '../../api/webapi';
  import * as utils from '../../utils/utils';
  export default {
    name:'border',
    data() {
      return {
        formAdmin: {            //  搜索条件
          goodsName: '',
          goodsType: '',
        },
        dataAll: [
          {
            goodsName:'zhangsan',
            goodsType:'宠物',
            price:'8',
            number:10,
            volume:10,
            isNew:'新品',
            ctime:'2018-05-5 14:20:40',
            utime:'2018-05-5 14:20:40',
          }
        ],           //  表格信息
        loading:false,        //  加载中
        activeName:'first',   // 首页显示表格
        pageState: null,    //  当前页编号
        isShelf:false,      //  判断商品是否上架
        goodsId: '',     // 商品ID
        dialogFormVisible1: false,  // 是否编辑1
        dialogFormVisible2: false,  // 是否编辑2
        dialogFormVisible3: false,  // 是否编辑3
        formModify: {            // 编辑商品基本信息
          name: '',
          region: '',
          price:'',
          isNew:''
        },
        formAddGoods:{            // 添加商品
          name: '',
          region: '',
          price:'',
          isNew:''
        },
        // 编辑商品分类
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
        // 是否新品
        labelTypeIsNew:[
          {
            value: '选项1',
            label: '新品'
          }, {
            value: '选项2',
            label: '非新品'
          }
        ],

        pageTotal: null, // 页面总数
        pageSize: 10,  // 每页显示条数
        pageNo: 1,   // 当前页
        tableData:[], // 表格数据
        addAdmin: {
          username: '',
          mobile:'',
          password:''
        },
        rulesaddAdmin: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
      }
    },
    mounted:function(){
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
        //this.searchBusiness();
        this.$message('搜索');
      },
      // 编辑1
      auditingEdit1(row){
        this.dialogFormVisible1 = true
        console.log(row.userId);
        this.goodsId = row.goodsId
        this.$message('编辑');
      },
      // 编辑2
      auditingEdit2(row){
        this.dialogFormVisible2 = true
        console.log(row.userId);
        this.goodsId = row.goodsId
        this.$message('编辑');
      },
      // 编辑3
      auditingEdit3(row){
        this.dialogFormVisible3 = true
        console.log(row.userId);
        this.goodsId = row.goodsId
        this.$message('编辑');
      },
      // 上架
      auditingUp(row){
        this.goodsId = row.goodsId
        this.$message('上架');
      },
      // 下架
      auditingDown(row){
        this.goodsId = row.goodsId
        this.$message('下架');
      },
      // 删除
      auditingDelete(row){
        this.goodsId = row.goodsId
        this.$message('删除');
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let param = {
            goodsId:row.goodsId
          }
          // let res =await WebApi.deleteAdmin(param);
          let res = {};
          res.code=0;
          if(res.code ===0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // this.search();  搜索
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
      //   添加商品
      create(){
        this.createGoods = true;
      },
      //   搜索商品
      async search(){
        this.createGoods = false;
        // this.loading = true;
        // let params={},
        //   formAdmin = this.formAdmin;
        //   params.pageNo = this.pageNo;    //传递页码（第一页）
        //   params.pageSize = this.pageSize;
        // if(formAdmin.goodsName !== ''){
        //   params.goodsName = formAdmin.goodsName;
        // }
        // if(formAdmin.goodsType !== ''){
        //   params.goodsType = formAdmin.goodsType;
        // }
        // const res = {};
        // res.code =0;
        // if(res.code === 0 ){
        //   this.loading = false;
        //   this.$message('查询成功');
        //   let tableData1 = res.data.list;
        //   this.pageTotal = res.data.total;
        //   this.tableData = tableData1;
        //   tableData1 = tableData1.map(function(item,index,input){
        //     item.ctime = utils.timestampToTime(item.ctime);
        //     item.utime = utils.timestampToTime(item.utime);
        //   })
        // }else{
        //   this.$message(res.msg);
        // }
      },
      //   提交搜索表单
      sumitForm(name){
        this.goAddAdmin();
      },
      // 添加管理员
      // 改变页码
      handleCurrentChange(val){
        this.pageNo = val;
        this.$message('页码改变');
        //this.searchUser();  搜索事件
      },
      // 编辑商品
      goFormModify(){
        let params = {
          userId: this.userId,
          username: this.formModify.name,
          password: this.formModify.password
        }
        //let res = await WebApi.updateUser(params);
        // if(res.code === 0){
        //   this.searchUser();
        //   this.$message('更改成功');
        // }else{
        //   this.$message(res.msg);
        // }
        this.dialogFormVisible = false
      },
      // 添加商品
      goAddGoods(){

      }
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
    width:50%;
  }
</style>

