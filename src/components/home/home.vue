<template>
    <div class="common-layout" >
        <el-container style="height:100%">
        <el-header class="header" height="6%">
            <MyHeader :pubVis="true" @searchTarget="search"></MyHeader>
        </el-header>
        <el-main class="home_main">
            <el-scrollbar height="100%">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <el-image fit="fill" src="http://localhost:8062/file/get/game_wk.jfif" style="width: 100%"></el-image>
                        <el-image fit="fill" src="http://localhost:8062/file/get/game_wk.jfif"></el-image>
                        <el-image fit="fill" src="http://localhost:8062/file/get/game_wk.jfif"></el-image>
                        <el-image fit="fill" src="http://localhost:8062/file/get/game_wk.jfif"></el-image>
                    </el-carousel-item>
                </el-carousel>
                <!-- tag -->
                <el-scrollbar height="70px">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick()">
                         <!-- v-for="item in gameType" :key="item"  -->
                            <el-tab-pane label="全部" name="ALL"  style="width: 10%"></el-tab-pane>
                            <el-tab-pane label="MOBA" name="MOBA"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="FPS" name="FPS"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="动作" name="ACT"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="射击" name="STG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="格斗" name="FTG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="冒险" name="AVG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="模拟" name="SIM"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="角色扮演" name="RPG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="策略" name="SG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="音乐" name="MG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="休闲" name="CG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="体育" name="SG_"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="竞速" name="RG"   style="width: 400px"></el-tab-pane>
                            <el-tab-pane label="我的" name="MY"   style="width: 400px"></el-tab-pane>
                    </el-tabs>
                </el-scrollbar>
                <div  style="display: flex;width: 100%;flex-wrap: wrap;height: 80%">
                    <MyCard v-for="item in list" :key="item" :data = 'item' style="width: 20%;"/>
                </div>
                <!-- 分页组件 -->
                <div class="pagination-block" style="float: right;" v-if="pageParams.total>0" >
                    <el-pagination
                        v-model:current-page="pageParams.current"
                        v-model:page-size="pageParams.size"
                        :page-sizes="[10, 20, 40, 60]"
                        :size="pageParams.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageParams.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        />
                </div>
            </el-scrollbar>
        </el-main>
       
        </el-container>
    </div>
</template>


<script setup>
    import {ref,onMounted} from 'vue'
    import MyHeader from '../home/MyHeader.vue'
    import MyCard from '../home/MyCard.vue'
    import {service} from '@/components/js/http.js';

    let gameType = ref([])
    let activeName = ref('ALL')
    let list = ref([
        {
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    },{
        desText:'答答答答答答答答答答答答答答',
        gameName:'大富翁二色一看',
        wantCount:338555,
        isLike:false,
        price:5896.26
    }
    ]) 

    let pageParams = ref({
        current:1,
        total:1000,
        size:20,
        
    })

    let searchText = '';
    
    onMounted(()=>{
        getGameAccount()
    })
    // 获取游戏配型列表
    function getGameType(){
        service.get('/game/type').then(res=>{
            let re = res.data
            if(re.code === 200){

                gameType.value = re.data
                console.log(gameType.value)
            }

        })
    }
    //获取游戏账号信息列表
    function getGameAccount(){
        service.post('/game/page',
        {
            "gameType": activeName.value,
            "current":pageParams.value.current,
            "size":pageParams.value.size,
            "desText":searchText
        }
        ).then(res=>{
            let re = res.data
            if(re.code === 200){
                list.value = re.data.records
                pageParams.value.current = re.data.current
                pageParams.value.size = re.data.size
                pageParams.value.total = re.data.total
                console.log(pageParams.value)
            }

        })
    }

    // 重写为箭头函数形式的 handleClick
    const handleClick = () => {
        console.log(activeName.value);
        getGameAccount()
    };
    //分页组件相关
    const handleSizeChange = ()=>{
        getGameAccount()
    }
    const handleCurrentChange = ()=>{
        getGameAccount()
    }

    const search = (item)=>{
        console.log("搜索："+item )
        searchText = item
        getGameAccount()
        searchText = ''
    }
    
</script>

<style scoped>
    .common-layout{
        width: 100%;
        height: 100%;
    }
    .header{
        background-color: #c6e2ff;
    }
    .home_main{
        background-color: #ecf5ff;
        /* height: 94%; */
        overflow: auto;
    }
    .demo-tabs{
        display: flex;
        width: 100%;
    }
    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 40px;
        font-weight: 700;
    }
    #table_for{
        font-size: 80px;
        width: 300px;
    }
    :deep(.el-tabs__item){
        width: 130PX;
        text-align: center;
    }
</style>