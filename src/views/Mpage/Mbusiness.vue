<template>
  <div class="table">
    <div class="handle-box">
      <el-form ref="formSearch" :model="formSearch" label-width="80px" inline>
        <el-form-item label="商家名">
          <el-input v-model="formSearch.businessName" @keyup.enter.native="submitForm(formSearch)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formSearch.mobile" @keyup.enter.native="submitForm(formSearch)"></el-input>
        </el-form-item>
        <el-form-item label="商铺名">
          <el-input v-model="formSearch.shopName" @keyup.enter.native="submitForm(formSearch)"></el-input>
        </el-form-item>
        <el-button type="primary" icon="search" @click="searchBusiness" class="search">搜索</el-button>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="全部" name="first">
        <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
          <el-table-column prop="shopName" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="businessName" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
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
      <el-tab-pane label="审核中" name="second">
        <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
          <el-table-column prop="shopName" label="商铺名" width="190"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="190"></el-table-column>
          <el-table-column prop="businessName" label="商家名" width="190"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="190"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="190"></el-table-column>
          <el-table-column label="审核操作" width="240" prop="shopId">
            <template slot-scope="scope">
              <el-button @click="auditingPass(scope.row)" type="text" size="small">审核通过</el-button>
              <el-button @click="auditingRefuse(scope.row)" type="text" size="small">审核驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <el-tab-pane label="已审核" name="third">
        <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
          <el-table-column prop="shopName" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="businessName" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
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
      <el-tab-pane label="审核驳回" name="fourth">
        <el-table :data="dataAll" border style="width: 100%;" v-loading="loading">
          <el-table-column prop="shopName" label="商铺名" width="240"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="230"></el-table-column>
          <el-table-column prop="businessName" label="商家名" width="230"></el-table-column>
          <el-table-column prop="ctime" label="申请时间" width="230"></el-table-column>
          <el-table-column prop="utime" label="上次修改时间" width="230"></el-table-column>
        </el-table>
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
</template>

<script>
  import WebApi from '../../api/webapi';
  import * as utils from '../../utils/utils';
  export default {
    name:'mbusiness',
    data() {
      return {
        formSearch: {
          businessName: '',   // 商家名
          mobile: '',     // 手机号
          shopName:''        // 商铺名
        },
        tableData: [],
        activeName: 'first',  //正在显示的页面
        pageState: null,    //当前页编号
        dataAll: [],
        shopId: '',       //商户
        pageTotal: null, //页面总数
        pageSize: 10,  //每页显示条数
        pageNo: 1,   //当前页
        loading: false,  //正在加载
      }
    },
    mounted:function(){
      this.searchBusiness();
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab.label);
        // console.log(tab.index);
        if(tab.index !== '0') {
          this.pageState = tab.index;
        }else{
          this.pageState = null;
        }
        this.searchBusiness();
      },
      // 提交查询表单
      submitForm(name){
        this.searchBusiness();
      },
      // 审核通过
      auditingPass(row){
        console.log(row);
        this.shopId = row.shopId;
        this.$confirm('确认审核通过？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let params = {
            shopId: this.shopId,
            status: 2
          };
          let res = await WebApi.auditingShop(params);
          if(res.code ===0) {
            this.searchBusiness();
            this.$message({
              type: 'success',
              message: '审核通过!'
            });
          }else{
            this.$message(res.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 审核驳回
      auditingRefuse(row){
        this.shopId = row.shopId;
        this.$confirm('确认驳回审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let params = {
            shopId: this.shopId,
            status: 3
          };
          let res = await WebApi.auditingShop(params);
          if(res.code ===0) {
            this.searchBusiness();
            this.$message({
              type: 'success',
              message: '已驳回!'
            });
          }else{
            this.$message(res.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 查询商家
      async searchBusiness(){
        this.loading = true;
        let params={},
            formSearch = this.formSearch;
        params.pageNo = this.pageNo;    //传递页码（第一页）
        params.pageSize = this.pageSize;
        if(formSearch.businessName !== ''){
          params.businessName = formSearch.businessName;
        }
        if(formSearch.mobile !== ''){
          params.mobile = formSearch.mobile;
        }
        if(formSearch.shopName !== ''){
          params.shopName = formSearch.shopName;
        }
        if(this.pageState !==null){
          params.status = this.pageState
        }
        const res = await WebApi.searchShop(params);
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
      //改变页码
      handleCurrentChange(val){
        this.pageNo = val;
        this.searchBusiness();
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
</style>

