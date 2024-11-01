<template>
    <div class="common-layout" >
        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="true"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                <el-scrollbar height="100%">
                    <el-descriptions title="个人信息" border="true">
                        <el-descriptions-item
                            :rowspan="2"
                            :width="140"
                            label="头像"
                            align="center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="currentUser.avatar"/>
                        </el-descriptions-item>
                        <el-descriptions-item :rowspan="1" label="用户名">{{ currentUser.name }}</el-descriptions-item>
                        <el-descriptions-item :rowspan="1" label="手机号">{{ currentUser.phone }}</el-descriptions-item>
                        <el-descriptions-item :rowspan="1" label="性别">{{ currentUser.gender ===1?"男":"女" }}</el-descriptions-item>
                        <el-descriptions-item  :rowspan="1" label="钱包">
                            {{ currentUser.purse }}
                        </el-descriptions-item>
                        <el-descriptions-item :rowspan="2" label="个性签名">
                            {{ currentUser.idiograph }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
    import MyHeader from '../home/MyHeader.vue'
    import fileOps from '../js/file'
    import { ref, onMounted } from 'vue'

    let currentUser = ref({})

    onMounted(()=>{
        currentUser.value = JSON.parse(sessionStorage.getItem('user'))
        console.log(currentUser.value)
    })

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