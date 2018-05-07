<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formOrder" :model="formOrder" label-width="80px" inline>
        <el-form-item label="用户名">
          <el-input v-model="formOrder.userName" @keyup.enter.native="submitForm(formOrder)"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="formOrder.goodsName" @keyup.enter.native="submitForm(formOrder)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="searchOrder" class="search">搜索</el-button>
      </el-form>
    </div>
    <div class="madmin-body">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部" name="first">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="用户名" width="140"></el-table-column>
            <el-table-column prop="goodsType" label="订单总价" width="120"></el-table-column>
            <el-table-column prop="price" label="运费" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="140"></el-table-column>
            <el-table-column prop="message" label="买家留言" width="160"></el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails1(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible1" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible1 = false">关闭</el-button>
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
            <el-table-column prop="goodsName" label="用户名" width="140"></el-table-column>
            <el-table-column prop="goodsType" label="订单总价" width="120"></el-table-column>
            <el-table-column prop="price" label="运费" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="140"></el-table-column>
            <el-table-column prop="message" label="买家留言" width="160"></el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails2(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible2" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible2 = false">关闭</el-button>
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
            <el-table-column prop="goodsName" label="用户名" width="140"></el-table-column>
            <el-table-column prop="goodsType" label="订单总价" width="120"></el-table-column>
            <el-table-column prop="price" label="运费" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="140"></el-table-column>
            <el-table-column prop="message" label="买家留言" width="160"></el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails3(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible3 = false">关闭</el-button>
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
        <el-tab-pane label="待收货" name="fourth">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="用户名" width="140"></el-table-column>
            <el-table-column prop="goodsType" label="订单总价" width="120"></el-table-column>
            <el-table-column prop="price" label="运费" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="140"></el-table-column>
            <el-table-column prop="message" label="买家留言" width="160"></el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails4(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible4" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible4 = false">关闭</el-button>
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
        <el-tab-pane label="交易成功" name="fifth">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="goodsName" label="用户名" width="140"></el-table-column>
            <el-table-column prop="goodsType" label="订单总价" width="120"></el-table-column>
            <el-table-column prop="price" label="运费" width="120"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="140"></el-table-column>
            <el-table-column prop="message" label="买家留言" width="160"></el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails5(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible5" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="goodsType" label="分类" width="120"></el-table-column>
              <el-table-column prop="price" label="价格" width="120"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="160"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible5 = false">关闭</el-button>
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
        formOrder: {            //  搜索条件
          userName: '',
          goodsName: '',
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
        dialogFormVisible1: false,  // 查看详情1
        dialogFormVisible2: false,  // 查看详情2
        dialogFormVisible3: false,  // 查看详情3
        dialogFormVisible4: false,  // 查看详情4
        dialogFormVisible5: false,  // 查看详情5
        orderData:[
          {
            goodsName:'宠物',
            goodsType:'宠物',
            price:19,
            ctime:'2018-05-5 14:20:40',
            utime:'2018-05-5 14:20:40',
          }
        ],       //  订单详情信息

        pageState: null,    //  当前页编号
        isShelf:false,      //  判断商品是否上架
        goodsId: '',     // 商品ID
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
      this.searchOrder();
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
      // 查看详情1---
      viewDetails1(row){
        this.dialogFormVisible1 = true;
      },
      // 查看详情2---
      viewDetails2(row){
        this.dialogFormVisible2 = true;
      },
      // 查看详情3---
      viewDetails3(row){
        this.dialogFormVisible3 = true;
      },
      // 查看详情4---
      viewDetails4(row){
        this.dialogFormVisible4 = true;
      },
      // 查看详情5---
      viewDetails5(row){
        this.dialogFormVisible5 = true;
      },
      // 编辑1
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
      //   搜索订单  ---
      async searchOrder(){
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
        this.$message('搜索订单');
      },
      //   提交搜索表单 ---
      submitForm(name){
        this.goAddAdmin();
      },
      // 添加管理员
      // 改变页码 ---
      handleCurrentChange(val){
        this.pageNo = val;
        this.$message('页码改变');
        //this.searchUser();  搜索事件
      },
      // 订单总价
      getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
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
    width:100%;
    margin:0 auto;
  }
  .form-option{
    float:left;
  }
  .add-goods{
    width:50%;
  }
</style>

