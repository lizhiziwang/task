<template>
    <div class="common-layout" >
        <el-container style="height:100%">
        <el-header class="header" height="6%">
            <MyHeader></MyHeader>
        </el-header>
        <el-main class="home_main">
            <el-scrollbar height="100%">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in 4" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
                <!-- tag -->
                <el-scrollbar height="60px">
                    <el-tabs v-model="activeName" v-for="(item,index) in gameType" :key="index" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="item.name" name="item.code">User</el-tab-pane>
                    </el-tabs>
                </el-scrollbar>

            </el-scrollbar>
        </el-main>
       
        </el-container>
    </div>
</template>


<script setup>
    import {ref,onMounted} from 'vue'
    import MyHeader from '../home/MyHeader.vue'
    import {service} from '@/components/js/http.js';

    let gameType = ref([])

    onMounted(()=>{
        getGameType()
    })

    function getGameType(){
        service.get('/api/game/type').then(res=>{
            let re = res.data
            if(re.code === 200){

                gameType = re.data
            }

        })
    }

    // 重写为箭头函数形式的 handleClick
    const handleClick = (tab, event) => {
      console.log(tab);
      console.log(event);
    };
</script>

<style>
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
    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
</style>