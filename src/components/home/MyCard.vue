<template>
    <div>
    <el-drawer v-model="isOpen" direction="rtl" size="45%" :before-close="handleClose" :with-header="false" @open="init">
        <el-scrollbar height="100%">
            <div style="display: flex;align-items: center;height:10%;width:100%;margin-top:20px">
                <el-popover
                    placement="top-start"
                    title="添加好友"
                    trigger="hover"
                    width="200"
                >
                    <template #reference>
                        <el-avatar :size="50" :src="fileOps.getFile + dealObj.avatar" style="margin-right:2%"></el-avatar>
                    </template>

                    <el-button type="primary" link @click="addFriend(data.pubUser)">添加</el-button>对方为您的好友，快速的了解该账号。
                </el-popover>
                <span style="font-size:30px">{{dealObj.name}}</span>

            </div>

            <div class="card-body">
                <el-descriptions
                    class="margin-top"
                    title="游戏账号信息"
                    :column="1"
                    border>
                    <el-descriptions-item align="center" label-align="center" label="展示图" :rowspan="1">
                        <el-image :src="fileOps.getFile+data.showImg" style="width: 100px; height: 100px"/>
                    </el-descriptions-item>  
                     
                    <el-descriptions-item align="center" label-align="center" label="游戏名" :rowspan="1">{{data.gameName}}</el-descriptions-item>    
                    <el-descriptions-item align="center" label-align="center" label="游戏ID" :rowspan="1">{{data.gameId}}</el-descriptions-item>    
                    <el-descriptions-item align="center" label-align="center" label="游戏类型" :rowspan="1">{{data.gameType}}</el-descriptions-item>  
                    <el-descriptions-item align="center" label-align="center" label="想要人数" :rowspan="1">{{data.wantNum}}</el-descriptions-item> 
                    <el-descriptions-item align="center" label-align="center" label="账号介绍" :rowspan="1">{{data.desText}}</el-descriptions-item> 
                    <el-descriptions-item align="center" label-align="center" label="金额" :rowspan="1"><h4>￥{{data.price}}</h4></el-descriptions-item> 
                    
                </el-descriptions>
            </div>
            <div>
                <h4>视频展示</h4>
                <video v-for="item in data.videoList" :key="item" :src="fileOps.getFile+item" autoplay controls></video>
            </div>
        </el-scrollbar>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="close">添加想要</el-button>
                <el-button type="primary" @click="addOrder">下单 </el-button>
            </div>
        </template>
    </el-drawer>

        <el-card class="box-card">
            <div class="top-card" @click="opendraw">
                <el-image style="width: 100%; height: 100%" :src="fileOps.getFile+data.showImg" fit="fill" />
            </div>
            <div class="bottom-card">
                <div style="width:100%;height:30%;display:flex;align-items:center;">
                    <span class="card-title" style="font-size: 18px;width:60%;color:#b24b3d;">{{data.gameName}}</span>
                    <div style="width:40%;flex:1;display:flex;justify-content: flex-end;align-items:center;" @click="doLike">
                        <svg t="1730181692819" v-if="data.isWant == 1" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4499" width="30" height="30"><path d="M511.35312969 140.06901917C451.07077625 90.09254886 387.40018812 67.1372548 327.48489406 67.1372548 242.07312969 67.1372548 162.50607031 112.03137261 106.82607031 176.54901917-39.03745844 367.95607855 44.76489406 507.91843105 217.1696 687.12784292L511.38136437 942.43137261l294.18352969-255.30352969c167.43529406-179.20941188 261.82588219-328.57411781 110.31529407-510.57882375C849.92254156 111.01490229 767.16489406 67.1372548 676.84018812 67.1372548c-53.92941187 0-114.40941187 22.98352969-165.45882374 72.93176437z" p-id="4500" fill="#d81e06"></path></svg>
                        <svg t="1730186050657" v-else class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4861" width="30" height="30"><path d="M508 957.7c-6.3 0-12.7-2.4-17.5-7.3L74.9 534.9c-45.1-45.1-70-105.1-70-168.9 0-63.8 24.8-123.8 69.9-168.9 81.3-81.3 209.1-93 303.9-27.8l129.3 89 129.6-88.8c94.5-64.8 222.1-53.1 303.2 27.8 45.2 45 70.1 104.9 70.1 168.7 0 63.8-24.8 123.7-69.9 168.8L525.5 950.5c-4.8 4.8-11.2 7.2-17.5 7.2zM243.6 176.8c-48.8 0-97.1 18.8-133.7 55.4-73.8 73.8-73.8 193.9 0 267.7L508 898l398.1-398.1c35.7-35.7 55.4-83.2 55.4-133.8 0-50.5-19.8-98-55.6-133.7-64.3-64.1-165.4-73.4-240.3-22.1L522 308.8c-8.4 5.8-19.6 5.8-28 0l-143.3-98.6c-32.5-22.5-69.9-33.4-107.1-33.4z" fill="#040000" p-id="4862"></path></svg>
                        <span style="margin-left:2px">{{data.wantNum}}</span>
                    </div>
                </div>
                <div style="width:100%;height:50%;display:flex;align-items:center;">
                    <span class="card-title" style="font-size: 18px;width:60%">{{data.desText}}</span>
                    <div style="width:40%;flex:1;display:flex;justify-content: flex-end;align-items:center;">
                        <svg t="1730186762504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5872" width="30" height="30"><path d="M447.488 764.928l-197.632 0q-27.648-2.048-42.496-23.04t-17.92-46.592q3.072-25.6 17.92-41.984t42.496-18.432l197.632 0 0-64.512-197.632-1.024q-27.648-2.048-42.496-19.456t-17.92-44.032q3.072-25.6 17.92-41.984t42.496-18.432l147.456 0-137.216-241.664q-10.24-12.288-19.456-31.232t-8.192-41.472q5.12-28.672 20.48-46.592t57.344-23.04q24.576 2.048 44.032 16.896t31.744 32.256l155.648 284.672 171.008-286.72q12.288-17.408 31.744-30.72t44.032-16.384q15.36 1.024 28.16 4.096t22.528 10.24 16.384 20.48 9.728 34.816q0 29.696-20.48 56.32l-158.72 258.048 150.528 0q26.624 2.048 41.984 18.432t17.408 41.984q-2.048 26.624-17.92 45.056t-42.496 20.48l-195.584 1.024 0 62.464 196.608 0q26.624 2.048 41.984 20.48t17.408 44.032q-2.048 26.624-17.408 44.544t-41.984 19.968l-196.608-1.024 0 108.544q-4.096 87.04-95.232 87.04-45.056 0-70.144-21.504t-27.136-65.536l0-106.496z" p-id="5873"></path></svg>
                        <span style="margin-left:2px">{{data.price}}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>

    <!-- 下单购买 -->
 
    
</template>

<script setup>
    import {ref,defineProps} from 'vue'
    import {service} from '@/components/js/http.js';
    import { ElMessage, ElMessageBox} from 'element-plus'
    import fileOps from '../js/file'


    let po = defineProps({
        data:Object
    })
    const currentUser = JSON.parse(sessionStorage.getItem('user'))

    let isOpen = ref(false)
    
    var data = ref(po.data)
    let dealObj = ref({})
    let diaOpen = ref(true)
    


    const opendraw = ()=>{
        isOpen.value = true
    }
    function init(){
        console.log(data.value)
        service.get('/user/ava/'+data.value.pubUser).then(res=>{
            dealObj.value = res.data.data
        })

        data.value.videoList = JSON.parse(data.value.desFile).video
        console.log(data.value.videoList)
    }

    function doLike(){
        const currentUserId = JSON.parse(sessionStorage.getItem('user')).id
        console.log(currentUserId)
        service.post('/game/want?userId='+currentUserId+'&accId='+data.value.id)
        .then(res=>{
            if(res.data.code === 200){
                if(res.data.data === true&&(data.value.isWant === 0||data.value.isWant === null)){
                    data.value.isWant = 1
                    data.value.wantNum++
                    ElMessage({
                        message: '已添加想要',
                        type: 'success',
                    })
                }else if(res.data.data === true&&data.value.isWant === 1){
                    data.value.isWant = 0
                    data.value.wantNum--
                    ElMessage({
                        message: '已取消想要',
                        type: 'warning',
                    })
                }
                
            }
            
        })
    }
    const close = ()=>{
        doLike()
        isOpen.value = false
    }

    const addOrder = ()=>{
        service.post('/order?accIds='+data.value.id).then(res=>{
            if(res.data.code === 200&& res.data.data){
                ElMessage({
                    type: 'success',
                    message: '下单成功！'
                })
                ElMessageBox.confirm('该游戏账号已成功下单，请前往支付','提示',{
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'success'
                })
            }else if(res.data.code === 200&& (!res.data.data)){
                ElMessage({
                    type: 'warning',
                    message: res.data.message
                })
            }
        })
    }

    const handleClose = ()=>{
        ElMessageBox.confirm('您还没有购买该账号，是否确认离开','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            isOpen.value = false
        })
    }
    const addFriend = (id)=>{
        ElMessageBox.confirm('是否添加该用户为好友','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            service.post('/user/fri/'+currentUser.id+"?receiver="+id).then(res=>{
                console.log(res.data.data)   
                
                if(res.data.code == 200&&res.data.data){
                    ElMessage({
                        type: 'success',
                        message: '添加成功'
                    })
                }else if(res.data.code == 200&&(res.data.data===false)){
                    console.log("已存在")
                    ElMessage({
                        type: 'error',
                        message: res.data.message
                    })
                }
            })
        })
    }

</script>

<style scoped>
    .box-card{
        max-width: 480px;
        height: 400px;
        margin: 5%;
        background-color: rgb(216.8, 235.6, 255);
        border-radius: 2%;
    }
    .box-card:hover{
        box-shadow: 0 0 10px #000000;
        cursor: pointer;
    }
    :deep(.top-card){
        width: 100%;
        height: 270px;
        /* background-color: black; */
        margin-bottom: 5px;
        
    }
    :deep(.bottom-card){
        width: 100%;
        height: 120px;
    }
    .card-body{
        width: 100%;
        margin-top: 50px;
    }
</style>