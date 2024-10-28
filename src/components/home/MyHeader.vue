<template>
    <div class="header_" >
        <div class="logo" style="width: 5%">
            <svg t="1730099095949" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5495" width="40" height="40"><path d="M917.4 507c-27.8-98.4-66-189.8-79.3-214.7-16.8-31.4-39.9-55.5-68.7-71.5-29.8-16.6-66.7-25.1-109.6-25.1H364c-42.9 0-79.8 8.4-109.6 25.1-28.7 16-51.8 40.1-68.7 71.5-13.4 24.9-51.5 116.3-79.3 214.7-37.1 131.4-42.1 224.8-14.7 277.7 15.2 29.3 40.4 47 73.1 51.1 13.5 1.7 26 2.5 37.7 2.5 87.6 0 127.7-44.2 163.5-83.8 21.2-23.4 41.3-45.6 70.9-57.9h166.3c29.4 12.3 46.5 33.8 66.1 58.5 18 22.7 36.7 46.1 65.9 62.6 32.8 18.5 73.3 24.5 123.9 18.1 32.7-4.1 57.9-21.8 73.1-51.1 27.3-52.9 22.3-146.3-14.8-277.7z m-29.7 254.8c-7.7 14.8-18.4 22.4-34.9 24.4-11.4 1.4-21.8 2.1-31.3 2.1-61.9 0-85-29-113.1-64.4-22-27.6-46.9-59-91.7-75.8-2.8-1.1-5.8-1.6-8.8-1.6H432.1c-3 0-6 0.5-8.8 1.6-43.2 16.2-70.4 46.3-94.4 72.8-38.7 42.7-69.2 76.4-158 65.3-16.5-2.1-27.2-9.6-34.9-24.4-20.7-40.1-14.2-125.7 18.4-241.1 27.3-96.7 64.4-184.4 75.3-204.7 25.6-47.9 68.3-70.1 134.2-70.1h295.8c65.9 0 108.6 22.3 134.2 70.1 10.9 20.3 48 108 75.3 204.7 32.7 115.4 39.2 201 18.5 241.1z" fill="#2c2c2c" p-id="5496"></path><path d="M450 444.9h-70.3v-70.5c0-11-9-20-20-20s-20 9-20 20v70.5H270c-11 0-20 9-20 20s9 20 20 20h69.7v69.5c0 11 9 20 20 20s20-9 20-20v-69.5H450c11 0 20-9 20-20s-9-20-20-20z" fill="#2c2c2c" p-id="5497"></path><path d="M640.5 427m-41.9 0a41.9 41.9 0 1 0 83.8 0 41.9 41.9 0 1 0-83.8 0Z" fill="#2c2c2c" p-id="5498"></path><path d="M739.1 525.6m-41.9 0a41.9 41.9 0 1 0 83.8 0 41.9 41.9 0 1 0-83.8 0Z" fill="#2c2c2c" p-id="5499"></path></svg>
        </div>
        <div class="title_name" style="width: 5%">
            <h3>
                <!-- 自己可以更换 -->
                小小
            </h3>
        </div>

        <div style="width: 15%;" class="heard_search"> 
            <el-input
                v-model="input3"
                style="max-width: 600px;color: #409eff;"
                placeholder="搜索"
                class="input-with-select">
                <template #append>
                    <el-button :icon="SearchIcon" type="primary"></el-button>
                </template>
            </el-input>
        </div>

        <div class="touxiang">
            <el-popover
                placement="bottom-start"
                :width="150"
                trigger="hover"
                content="this is content, this is content, this is content"
                popper-style="width:250px"
            >
                <template #reference>
                    <el-avatar :size="50" :src="currentUser.avatar"></el-avatar>
                </template>

                <div>
                    <div class="pro_top" style="width:100%;height:40px;border-bottom:1px solid #eee;">
                        <h2 style="text-align: center;">{{currentUser.name}}</h2>
                    </div>

                </div>
            </el-popover>

            <!-- <el-avatar :size="50" :src="currentUser.avatar"></el-avatar> -->
        </div>
        <div class="pub_button">
            <el-button type="primary"  :icon="PubIcon" round="true">发布</el-button>
        </div>
    </div>
</template>

<script setup>
    import {ref,onMounted} from 'vue'
    import PubIcon from '../icons/PubIcon.vue';
    import SearchIcon from '../icons/SearchIcon.vue';
    import fileOps from '../js/file'


    console.log("文件base地址："+fileOps.getFile)
    let currentUser = ref({});
    onMounted(() => {
    })
    currentUser.value = {
        avatar:fileOps.getFile + 'tx.jfif',
        name:'kirito'
    }
</script>

<style>
    .header_{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .logo{
        padding-top: 5px;
        padding-left: 10px ;
        margin-right:10px ;
    }
    .title_name{
        display: flex;
        align-items: center;
        height: 100%;

    }
    .input-with-select{
        border-radius: 20px;
        color: #409eff;
    }
    .pub_button{
        position: absolute;
        right: 1%;
    }
    .touxiang{
        position: absolute;
        right:7%;
    }
    .heard_search{
        position: absolute;
        right: 18%;
    }
</style>
