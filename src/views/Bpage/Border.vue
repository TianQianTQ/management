<template>
  <div class="table">
    <div class="madmin-body">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="全部" name="first">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="addressInfo.userName" label="用户名" width="160"></el-table-column>
            <el-table-column prop="orderTotal" label="订单总价" width="140"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            <el-table-column prop="addressInfo.streetName" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="orderId" label="订单操作" width="120">
              <template slot-scope="scope">
                <el-button @click="changeOrderState1(scope.row)" type="text" size="small">更改订单状态</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails1(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="更改订单状态" :visible.sync="dialogFormVisibleOne" class="form-order">
            <el-form :model="orderStatus" ref="orderStatus" label-width="80px">
              <el-form-item label="订单状态" >
                <el-select v-model="orderStatus.status"  clearable placeholder="请选择订单状态" class="form-option">
                  <el-option
                    v-for="(item,index) in labelType"
                    :key="index"
                    :label="item.type"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleOne = false">取 消</el-button>
              <el-button type="primary" @click="goFormStatus1">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible1" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="productNum" label="个数" width="100"></el-table-column>
              <el-table-column prop="productPrice" label="价格" width="100"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="180"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible1 = false">关闭</el-button>
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
        <el-tab-pane label="待付款" name="second">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="addressInfo.userName" label="用户名" width="160"></el-table-column>
            <el-table-column prop="orderTotal" label="订单总价" width="140"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            <el-table-column prop="addressInfo.streetName" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="orderId" label="订单操作" width="120">
              <template slot-scope="scope">
                <el-button @click="changeOrderState2(scope.row)" type="text" size="small">更改订单状态</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails2(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="更改订单状态" :visible.sync="dialogFormVisibleTwo" class="form-order">
            <el-form :model="orderStatus" ref="orderStatus" label-width="80px">
              <el-form-item label="订单状态" >
                <el-select v-model="orderStatus.status"  clearable placeholder="请选择订单状态" class="form-option">
                  <el-option
                    v-for="(item,index) in labelType"
                    :key="index"
                    :label="item.type"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
              <el-button type="primary" @click="goFormStatus2">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible2" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="productNum" label="个数" width="100"></el-table-column>
              <el-table-column prop="productPrice" label="价格" width="100"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="180"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible2 = false">关闭</el-button>
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
        <el-tab-pane label="待发货" name="third">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="addressInfo.userName" label="用户名" width="160"></el-table-column>
            <el-table-column prop="orderTotal" label="订单总价" width="140"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            <el-table-column prop="addressInfo.streetName" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="orderId" label="订单操作" width="120">
              <template slot-scope="scope">
                <el-button @click="changeOrderState3(scope.row)" type="text" size="small">更改订单状态</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails3(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="更改订单状态" :visible.sync="dialogFormVisibleThree" class="form-order">
            <el-form :model="orderStatus" ref="orderStatus" label-width="80px">
              <el-form-item label="订单状态" >
                <el-select v-model="orderStatus.status"  clearable placeholder="请选择订单状态" class="form-option">
                  <el-option
                    v-for="(item,index) in labelType"
                    :key="index"
                    :label="item.type"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleThree = false">取 消</el-button>
              <el-button type="primary" @click="goFormStatus3">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible3" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="productNum" label="个数" width="100"></el-table-column>
              <el-table-column prop="productPrice" label="价格" width="100"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="180"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible3 = false">关闭</el-button>
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
        <el-tab-pane label="待收货" name="fourth">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="addressInfo.userName" label="用户名" width="160"></el-table-column>
            <el-table-column prop="orderTotal" label="订单总价" width="140"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            <el-table-column prop="addressInfo.streetName" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="orderId" label="订单操作" width="120">
              <template slot-scope="scope">
                <el-button @click="changeOrderState4(scope.row)" type="text" size="small">更改订单状态</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails4(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="更改订单状态" :visible.sync="dialogFormVisibleFour" class="form-order">
            <el-form :model="orderStatus" ref="orderStatus" label-width="80px">
              <el-form-item label="订单状态" >
                <el-select v-model="orderStatus.status"  clearable placeholder="请选择订单状态" class="form-option">
                  <el-option
                    v-for="(item,index) in labelType"
                    :key="index"
                    :label="item.type"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleFour = false">取 消</el-button>
              <el-button type="primary" @click="goFormStatus4">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible4" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="productNum" label="个数" width="100"></el-table-column>
              <el-table-column prop="productPrice" label="价格" width="100"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="180"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible4 = false">关闭</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange4"
              :page-size= pageSize
              layout="total, prev, pager, next, jumper"
              :total= pageTotal
              :current-page= pageNo >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交易成功" name="fifth">
          <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
            <el-table-column prop="addressInfo.userName" label="用户名" width="160"></el-table-column>
            <el-table-column prop="orderTotal" label="订单总价" width="140"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            <el-table-column prop="addressInfo.streetName" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="orderId" label="订单操作" width="120">
              <template slot-scope="scope">
                <el-button @click="changeOrderState5(scope.row)" type="text" size="small">更改订单状态</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单详情" width="160">
              <template slot-scope="scope">
                <el-button @click="viewDetails5(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="更改订单状态" :visible.sync="dialogFormVisibleFive" class="form-order">
            <el-form :model="orderStatus" ref="orderStatus" label-width="80px">
              <el-form-item label="订单状态" >
                <el-select v-model="orderStatus.status"  clearable placeholder="请选择订单状态" class="form-option">
                  <el-option
                    v-for="(item,index) in labelType"
                    :key="index"
                    :label="item.type"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleFive = false">取 消</el-button>
              <el-button type="primary" @click="goFormStatus5">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="订单信息" :visible.sync="dialogFormVisible5" class="form-modify">
            <el-table :data="orderData" style="width: 100%" >
              <el-table-column prop="productName" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="productNum" label="个数" width="100"></el-table-column>
              <el-table-column prop="productPrice" label="价格" width="100"></el-table-column>
              <el-table-column prop="ctime" label="创建时间" width="180"></el-table-column>
              <el-table-column prop="utime" label="修改时间" width="180"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible5 = false">关闭</el-button>
            </div>
          </el-dialog>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange5"
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
        // formOrder: {               //  搜索条件
        //   userName: '',
        //   goodsName: '',
        // },
        dataAll: [],           //  表格信息
        orderStatus:{
          status:''
        },
        labelType:[
          {
            type:'待支付',
            value:1
          },
          {
            type:'待发货',
            value:2
          },
          {
            type:'已发货',
            value:3
          },
          {
            type:'订单完成',
            value:4
          }
          ],
        loading:false,          //  加载中
        activeName:'first',   // 首页显示表格
        dialogFormVisibleOne:false,  // 操作1
        dialogFormVisibleTwo:false,  // 操作2
        dialogFormVisibleThree:false,  // 操作3
        dialogFormVisibleFour:false,  // 操作4
        dialogFormVisibleFive:false,  // 操作5
        dialogFormVisible1: false,  // 查看详情1
        dialogFormVisible2: false,  // 查看详情2
        dialogFormVisible3: false,  // 查看详情3
        dialogFormVisible4: false,  // 查看详情4
        dialogFormVisible5: false,  // 查看详情5
        orderData:[                 //  表格数据
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
        orderId: '',     // 订单ID
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

        pageTotal: null, // 页面总数
        pageSize: 10,  // 每页显示条数
        pageNo: 1,   // 当前页
      }
    },
    mounted:function(){
      this.searchOrder(0);   // 所有订单
    },
    methods: {
      // 标签事件
      handleClick(tab, event) {
        if(tab.index !== '0') {
          this.pageState = tab.index;
        }else{
          this.pageState = null;
        }
        this.searchOrder(tab.index);
      },
      //  更改确认
      async _goFormStatus(index){
        let params = {
          orderStatus:this.orderStatus.status,
          orderId:this.orderId
        }
        let res = await WebApi.updateOrder(params);
        if(res.code === 0){
          // 查询
          this.searchOrder(index);
          this.$message('更改成功');
        }else{
          this.$message(res.msg);
        }
        switch(index){
          case 0:  this.dialogFormVisibleOne = false
            break
          case 1:  this.dialogFormVisibleTwo = false
            break
          case 2:  this.dialogFormVisibleThree = false
            break
          case 3:  this.dialogFormVisibleFour = false
            break
          case 4:  this.dialogFormVisibleFive = false
            break
        }
      },
      goFormStatus1(){
        this._goFormStatus(0);
      },
      goFormStatus2(){
        this._goFormStatus(1);
      },
      goFormStatus3(){
        this._goFormStatus(2);
      },
      goFormStatus4(){
        this._goFormStatus(3);
      },
      goFormStatus5(){
        this._goFormStatus(4);
      },
      // 更改订单状态打开弹框
      _changeOrderState(index,orderId){
        switch(index){
          case 1:  this.dialogFormVisibleOne = true
            break
          case 2:  this.dialogFormVisibleTwo = true
                break
          case 3:  this.dialogFormVisibleThree = true
            break
          case 4:  this.dialogFormVisibleFour = true
            break
          case 5:  this.dialogFormVisibleFive = true
            break
        }

      },
      changeOrderState1(row){
        this.orderId = row.orderId
        this._changeOrderState(1,row.orderId)
      },
      changeOrderState2(row){
        this.orderId = row.orderId
        this._changeOrderState(2,row.orderId)
      },
      changeOrderState3(row){
        this.orderId = row.orderId
        this._changeOrderState(3,row.orderId)
      },
      changeOrderState4(row){
        this.orderId = row.orderId
        this._changeOrderState(4,row.orderId)
      },
      changeOrderState5(row){
        this.orderId = row.orderId
        this._changeOrderState(5,row.orderId)
      },
      // 查看详情
      async _viewDetails(index){
        let params = {
          orderId:this.orderId
        }
        let res = await WebApi.infoOrder(params)
        if(res.code === 0){
          let tableData1 = res.data
          this.orderData = tableData1;
          tableData1 = tableData1.map(function(item,index,input){
            item.ctime = utils.timestampToTime(item.ctime);
            item.utime = utils.timestampToTime(item.utime);
          })
        }else{
          this.$message(res.msg);
        }

      },
      // 查看详情1---
      viewDetails1(row){
        this.orderId = row.orderId
        this.dialogFormVisible1 = true;
        this._viewDetails(1);
      },
      // 查看详情2---
      viewDetails2(row){
        this.orderId = row.orderId
        this.dialogFormVisible2 = true;
        this._viewDetails(2);
      },
      // 查看详情3---
      viewDetails3(row){
        this.orderId = row.orderId
        this.dialogFormVisible3 = true;
        this._viewDetails(3);
      },
      // 查看详情4---
      viewDetails4(row){
        this.orderId = row.orderId
        this.dialogFormVisible4 = true;
        this._viewDetails(4);
      },
      // 查看详情5---
      viewDetails5(row){
        this.orderId = row.orderId
        this.dialogFormVisible5 = true;
        this._viewDetails(5);
      },

      //   搜索订单  ---
      async searchOrder(index){
        console.log(index);
         this.loading = true;
         let params={
           pageNo : this.pageNo,
           pageSize: this.pageSize,
           orderStatus:index
         }
        const res = await WebApi.listOrder(params);
         if(res.code ===0 ){
           this.loading = false;
             this.$message('查询成功');
             let tableData1 = res.data.list;
             this.pageTotal = res.data.total;
             this.dataAll = tableData1;
             tableData1 = tableData1.map(function(item,index,input){
               item.createDate = utils.timestampToTime(item.createDate);
               item.updateTime = utils.timestampToTime(item.updateTime);
             })
           }else{
             this.$message(res.msg);
           }
         },
      //   提交搜索表单 ---
      submitForm(name){
        this.goAddAdmin();
      },
      _handleCurrentChange(val,index){
        this.pageNo = val;
        this.search(index);
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
      // 改变页码4
      handleCurrentChange4(val){
        this._handleCurrentChange(val,4)
      },
      // 改变页码5
      handleCurrentChange5(val){
        this._handleCurrentChange(val,5)
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
  .form-order{
    width:50%;
    margin:0 auto;
  }
  .form-option{
    float:left;
  }
  .add-goods{
    width:50%;
  }
</style>

