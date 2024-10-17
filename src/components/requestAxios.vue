<template>
    <!-- <div id="box1">
        <ElButton @click="point" id="bu" type="primary">点击</ElButton>
    <div >{{message}}</div>
    </div> -->
    <el-row>
  <el-button plain>朴素按钮</el-button>
  <el-button type="primary" plain>主要按钮</el-button>
  <el-button type="success" plain>成功按钮</el-button>
  <el-button type="info" plain>信息按钮</el-button>
  <el-button type="warning" plain>警告按钮</el-button>
  <el-button type="danger" plain>危险按钮</el-button>
</el-row>


<el-row>
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>
</el-row>
</template>

<script >
    import axios from 'axios';
    import {ElButton} from 'element-plus';



    export default {
        
        
        data(){
            return{
                message:""
            }
        },

        methods:{
            point(){
                axios.get('http://localhost:8080/test/qw')
                .then((res)=>{
                    this.message = res.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }

    }
</script>

<style scoped>
    #box1{
        width: 100%;
        height: 20px;
    }
</style>