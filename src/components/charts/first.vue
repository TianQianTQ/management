<template>
  <div id="myChart"></div>
</template>

<script>
  export default {
      name: "first",
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      mounted(){
        this.drawLine();
      },
      methods: {
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: {text: '浏览量统计'},
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }]
          });
        }
      }
    }
</script>

<style scoped>
  #myChart{
    width:500px;
    height:400px;
    display:inline;
    margin-left:40px;
    margin-top:40px;
    float:left;
  }
</style>
