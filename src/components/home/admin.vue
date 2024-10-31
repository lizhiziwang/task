<template>
    <div class="common-layout" >
        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="false"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                 <el-row class="tac" style="height: 100%;">
                    <el-col :span="3">
                    <h3 class="mb-2">菜单</h3>
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                    >
                        <el-menu-item index="4">
                            <el-icon><setting /></el-icon>
                            <span>Navigator Four</span>
                        </el-menu-item>
                        <el-sub-menu index="1">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                        </el-sub-menu>
                        <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>Navigator Two</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                        <el-icon><document /></el-icon>
                        <span>Navigator Three</span>
                        </el-menu-item>
                
                    </el-menu>
                    </el-col>
                    <el-col>
                        <el-scrollbar height="100%">
                    
                        </el-scrollbar>
                    </el-col>
                 </el-row>

                
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