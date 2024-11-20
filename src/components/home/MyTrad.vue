<template>

    <div style="width: 100%; height: 100%;">

        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="true"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                <el-scrollbar style="height:100%">
                    <div class="myChart">
                        <h4>账号数据(近一个月)</h4>

                        <div style="display: flex;align-items: center;width: 100%;height: 100%;">
                            <div ref="chartLeft" class="left" style="width: 49%;height: 100%;">

                            </div>
                            <div ref="chartRight" class="right" style="width: 49%;height: 100%;">

                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>交易管理</h4>
                        <div style="width: 100%;">
                            <el-table :data="myTrads" style="width: 100%" height="550px">
                                <el-table-column type="index" width="70"  label="序号"></el-table-column>
                                <el-table-column prop="game_name" label="游戏名"></el-table-column>
                                <el-table-column align="center" label="展示图" min-width="120">
                                    <template #default="scope">
                                        <el-image
                                            style="width: 140px; height: 80px"
                                            :src="fileOps.getFile+scope.row.show_img"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="des_text" label="账号介绍"></el-table-column>
                                <el-table-column prop="game_id" label="游戏账号"></el-table-column>
                                <el-table-column prop="want_num" label="想要人数"></el-table-column>
                                <el-table-column prop="state_" label="状态"></el-table-column>
                                <el-table-column prop="price" label="金额"></el-table-column>
                                <el-table-column align="center" fixed="right" label="操作" >
                                    <template #default="scope">
                                        <el-button link 
                                            v-if="scope.row.state === 'PAID'|| scope.row.state === 'UNDELIVER'"
                                            type="primary" size="small" @click="fahuo(scope.row.orderId)">发货</el-button>
                                            
                                        <el-button link 
                                            v-if="scope.row.state === 'RECEIVED'" 
                                            type="primary" size="small" @click="wancheng(scope.row.orderId)">完成</el-button>

                                        <el-button link type="primary" size="small" @click="delete_(scope.row.id)">删除</el-button>
                                        <!-- <el-button link 
                                            v-if="scope.row.state === 'NOPAID'" 
                                            type="primary" size="small" @click="pay_1(scope.row.id)">支付</el-button> -->
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="display: flex; justify-content: flex-end;">
                                <el-pagination
                                    v-model:current-page="pageParams.current"
                                    v-model:page-size="pageParams.size"
                                    :page-sizes="[5,10, 20, 40, 60]"
                                    :size="pageParams.size"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="pageParams.total"
                                    @size-change="getMyTrads"
                                    @current-change="getMyTrads"
                                    />
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>

</template>

<script setup>
    import MyHeader from "./MyHeader.vue";
    import {ref, nextTick, onMounted} from "vue";
    import * as echarts from 'echarts';
    import {service} from '@/components/js/http.js';
    import fileOps from '../js/file'
    import { ElMessage } from 'element-plus';

    let currentUser = JSON.parse(sessionStorage.getItem("user"));

    let myTrads = ref([])
    let pageParams = ref({
        current: 1,
        size: 20,
        total: 100
    })

    var chartLeft = ref(null);
    var chartRight = ref(null);
    let option = {
        title:{
            text: '游戏账号类型分布',
            show: true,
        },
        legend: {
            top: 'bottom'
        },
        toolbox:{
            show:true,
            feature:{
                dataView:{readOnly:false},
                saveAsImage:{}
            },
            left: '80%'

        },
        series: [
            {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: []
            }
        ]
        };

    let optionRight = {
        title: {
            text: '近一个月交易趋势'
        },
        toolbox:{
            show:true,
            feature:{
                dataView:{readOnly:false},
                saveAsImage:{}
            },
            left: '80%'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
            }
        ]
        };

    onMounted(() => {
        leftDataGet()
        rightDataGet()
        getMyTrads()
        
    })

    const leftDataGet = ()=>{
        service.get('/game/type/count?pubUser='+currentUser.id+'&pubTime=')
            .then( res => {
                if(res.data.code === 200){
                    console.log(res.data.data)
                    option.series[0].data = res.data.data
                    nextTick(() => {
                        var myChart = echarts.init(chartLeft.value);
                        myChart.setOption(option);
                        // var myChartRight = echarts.init(chartRight.value);
                        // myChartRight.setOption(optionRight);
                    })
                }     
            })
    }

    const rightDataGet = ()=>{
        service.get('/order/countData?pubUser='+currentUser.id+'&date=').then( res => {
            if(res.data.code === 200){
                let var1 = res.data.data
                optionRight.xAxis.data = var1.map(item=>item.time)
                optionRight.series[0].data = var1.map(item=>item.sum)
                nextTick(() => {
                    var myChartRight = echarts.init(chartRight.value);
                    myChartRight.setOption(optionRight);
                })
            }
        })

        
    }

    const getMyTrads = ()=>{
        service.post('/game/my/get',
            {
                pubUser:currentUser.id,
                size:pageParams.value.size,
                current:pageParams.value.current
            }
        ).then( res => {
            if(res.data.code === 200){
                myTrads.value = res.data.data.records
                pageParams.value.total = res.data.data.total
            }
        })
    }

    const fahuo = (id)=>{
        service.get('/order/fahuo/'+id).then( res => {
            if(res.data.code === 200){
                ElMessage({
                    message: '操作成功！',
                    type: 'success'
                });
                getMyTrads()
            }
        })
    }

    const wancheng = (id) =>{
        service.get('/order/complete/'+id).then( res => {
            if(res.data.code === 200){
                ElMessage({
                    message: '操作成功！',
                    type: 'success'
                });
                getMyTrads()
            }
        })
    }
    const delete_ = (id)=>{
        service.post('/game/de/'+id).then( res => {
            if(res.data.code === 200){
                ElMessage({
                    message: '删除成功！',
                    type: 'success'
                });
                getMyTrads()
            }
        })
    }

</script>

<style scoped>
    .header{
        background-color: #c6e2ff;
    }
    .home_main_per{
        background-color: #c6e2ff;
        background-color: #ecf5ff;
    }
    .myChart{
        width: 100%;
        height: 520px;
    }
</style>