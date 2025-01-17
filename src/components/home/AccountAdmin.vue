<template>
    <div class="container">
        <div class="search-top" style="height: 30%;">
                <el-form :inline="true" :model="searchTra" class="demo-form-inline" ref="searchTraForm">
                    <el-form-item label="游戏名" prop="gameName">
                        <el-input v-model="searchTra.gameName" placeholder="game name" clearable  style="width: 200px;"/>
                    </el-form-item>
                    <el-form-item label="类型" prop="gameType">
                        <el-select
                            v-model="searchTra.gameType"
                            placeholder="请选择"
                            clearable
                            style="width: 200px;">

                            <el-option label="MOBA" value="MOBA" />
                            <el-option label="FPS" value="FPS" />
                            <el-option label="动作" value="ACT" />
                            <el-option label="射击" value="STG" />
                            <el-option label="格斗" value="FTG" />
                            <el-option label="冒险" value="AVG" />
                            <el-option label="模拟" value="SIM" />
                            <el-option label="角色扮演" value="RPG" />
                            <el-option label="策略" value="SG" />
                            <el-option label="音乐" value="MG" />
                            <el-option label="休闲" value="CG" />
                            <el-option label="体育" value="SG_" />
                            <el-option label="竞速" value="RG" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布人" prop="pubUserName">
                        <el-autocomplete
                            v-model="searchTra.pubUserName"
                            :fetch-suggestions="querySearchAsync"
                            value-key="name"
                            clearable
                            style="width: 200px;"
                            placeholder="pubUser 模糊匹配"
                            @select="pubUserHandleSelect"
                        />
                    </el-form-item>
                    <el-form-item label="想要人数" prop="wantNum">
                        <el-input  v-model="searchTra.wantNum" placeholder="例：10" clearable style="width: 240px;"/>
                    </el-form-item>
                    <el-form-item label="排序方式" prop="desc">
                        <el-select
                            v-model="searchTra.desc"
                            placeholder="请选择"
                            clearable
                            style="width: 150px;">

                            <el-option label="升序" value="false" />
                            <el-option label="降序" value="true" />
                            
                        </el-select>
                    </el-form-item>

                    <el-form-item label="发布时间" >
                        <el-col :span="10">
                            <el-date-picker
                            v-model="searchTra.startTime"
                            type="date"
                            aria-label="Pick a date"
                            placeholder="Pick a date"
                            style="width: 100%"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            />
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.8rem">至</el-col>
                        <el-col :span="10">
                            <el-date-picker
                                v-model="searchTra.endTime"
                                type="date"
                                aria-label="Pick a date"
                                placeholder="Pick a date"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                style="width: 100%"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="金额" >
                        <el-col :span="9">
                            <el-input-number v-model="searchTra.lowPrice">
                                <template #prefix>
                                    <span>￥</span>
                                </template>
                            </el-input-number>
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.8rem">至</el-col>
                        <el-col :span="9">
                            <el-input-number v-model="searchTra.upPrice" >
                                <template #prefix>
                                    <span>￥</span>
                                </template>
                            </el-input-number>
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.5rem">RMB</el-col>
                    </el-form-item>

                    <el-form-item label="排序方式" prop="orderBy">
                        <el-select
                            v-model="searchTra.orderBy"
                            placeholder="请选择"
                            clearable
                            style="width: 150px;">
                            <el-option label="想要人数" value="want_num" />
                            <el-option label="发布时间" value="create_time" />
                            <el-option label="价格" value="price" />
                        </el-select>
                    </el-form-item>
                   

                    <br/>
                    <el-form-item style="float: right;">
                        <el-button @click="resetForm">清空</el-button>
                        <el-button type="primary" @click="searchForm">
                            查询
                        </el-button>
                        
                    </el-form-item>
                </el-form>
            </div>

        <div class="tableData" style="height: 60%;width: 100%;">
            <el-table :data="records__" style="width: 100%" height="640">
                <el-table-column type="index" width="70"  label="序号"></el-table-column>
                <el-table-column prop="gameName" label="游戏名"></el-table-column>
                <el-table-column align="center" label="展示图" min-width="120">

                    <template #default="scope">
                        <el-image
                            style="width: 140px; height: 80px"
                            :src="fileOps.getFile+scope.row.showImg"/>
                    </template>
                </el-table-column>
                <el-table-column prop="pubUser" label="发布人"></el-table-column>
                <el-table-column prop="desText" label="账号介绍" min-width="80"></el-table-column>
                <el-table-column prop="gameId" label="游戏账号"></el-table-column>
                <el-table-column prop="wantNum" label="想要人数"></el-table-column>

                <el-table-column label="是否还在">
                    <template #default="scope">
                        {{ scope.row.isExist===1?'在售':'已售' }}
                    </template>
                </el-table-column>

                <el-table-column prop="price" label="金额"></el-table-column>
                <el-table-column align="center" fixed="right" label="操作" >
                    <template #default="scope">
                         <el-button link type="primary" @click="de(scope.row)">详情</el-button>
                         <el-button link type="primary" @click="delete_(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <div class="page-toolbar" style="height: 10%;width: 100%;margin-top: 20px;">
            <el-pagination
                style="float: right;"
                v-model:current-page="pageParams.current"
                v-model:page-size="pageParams.size"
                :page-sizes="[10, 20, 40, 60]"
                :size="pageParams.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total"
                @size-change="searchForm"
                @current-change="searchForm"/>
        </div>

        <el-drawer v-model="isOpen" size="45%" :with-header="false" >
            <ProductDet :data="currentProsObj" :dealObj="dealUser" ></ProductDet>
        </el-drawer>
    </div>
</template>

<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { service } from '../js/http';
    import fileOps from '../js/file'
    import ProductDet from './ProductDet.vue'
import { ElMessage, ElMessageBox } from 'element-plus';

    let searchTra = ref({
        gameName:'',
        gameType:'',
        pubuser:'',
        wantNum:'',
        startTime:'',
        endTime:'',
        pubuserName:'',
        desc:'',
        orderBy:''
    })
    let pageParams = ref({
        current:1,
        size:20,
        total:100
    })
    let searchTraForm = ref(null)
    let allUser = []

    let records__ = ref([])
    let currentProsObj = ref({})
    let isOpen = ref(false)
    let dealUser = ref(null)

    onMounted(()=>{
        getAllUser()
        searchForm()
    })

    const getAllUser=()=>{
        service.get('/user/aui').then(res=>{

            if(res.data.code === 200){
                allUser = res.data.data
                console.log(allUser)

            }
        })
    }

    function querySearchAsync(queryString, cb) {
        let results;
        if (queryString) {
            results = allUser.filter(createFilter(queryString));
        } else {
            results = allUser;
        }
        // console.log(results)

        cb(results);
    }

    function createFilter(queryString) {
        return function (restaurant) {
            // console.log(restaurant)
            return restaurant.name.indexOf(queryString)!= -1;
        };
    }
    const pubUserHandleSelect = (item)=>{
        console.log(item)
        searchTra.value.pubUserName = item.name
        searchTra.value.pubUser = item.id
    
    }

    const resetForm = ()=>{
        searchTraForm.value.resetFields()
    } 
    const searchForm = ()=>{
        searchTra.value.current = pageParams.value.current
        searchTra.value.size = pageParams.value.size
        service.post('/game/page',searchTra.value).then(res=>{
            if(res.data.code === 200){
                pageParams.value.total = res.data.data.total
                pageParams.value.current = res.data.data.current
                pageParams.value.size = res.data.data.size
                records__.value = res.data.data.records
                console.log(records__.value)
            }
        })
    }
    const de = (row)=>{
        currentProsObj.value = row

        service.get('/user/ava/'+row.pubUser).then(res=>{
            dealUser.value = res.data.data
            isOpen.value = true
        })
    }

    const delete_ = (id)=>{
        ElMessageBox.confirm('确定删除该商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            service.post('/game/de/'+id)
                .then(res=>{
                    if(res.data.code === 200){
                        ElMessage.success('删除成功')
                        searchForm()
                    }
                })
        })
        
    }


</script>
<style scoped>

    .container {
        width: 100%;
        height: 100%;
        /* background-color: brown; */
    }
</style>