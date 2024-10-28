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

                <div style="width:100%; height:3000px;">

                </div>
            </el-scrollbar>
        </el-main>
       
        </el-container>
    </div>
</template>


<script setup>
    import {ref} from 'vue'
    import MyHeader from '../home/MyHeader.vue'
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
</style>