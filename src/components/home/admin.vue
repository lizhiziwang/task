<template>
    <div class="common-layout" >
        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="false"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                <el-scrollbar height="100%">
                    
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
    import MyHeader from '../home/MyHeader.vue'
</script>

<style scoped>
    .common-layout{
        width: 100%;
        height: 100%;
    }
    .header{
        background-color: #c6e2ff;
    }
    .home_main_per{
        background-color: #ecf5ff;
        /* height: 94%; */
        overflow: auto;
    }
</style>