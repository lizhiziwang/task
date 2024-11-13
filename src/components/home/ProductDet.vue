<template>
    <div style="width: 100%;height: 100%">
            <div v-if="po.dealObj!=null" style="display: flex;align-items: center;height:10%;width:100%;margin-top:20px;margin-bottom: 20px">
                <el-popover
                    placement="top-start"
                    title="添加好友"
                    trigger="hover"
                    width="200"
                >
                    <template #reference>
                        <el-avatar :size="50" :src="fileOps.getFile + po.dealObj.avatar" style="margin-right:2%"></el-avatar>
                    </template>

                    <el-button type="primary" link @click="addFriend(po.data.pubUser)">添加</el-button>对方为您的好友，快速的了解该账号。
                </el-popover>
                <span style="font-size:30px">{{po.dealObj.name}}</span>

            </div>

            <div class="card-body">
                <el-descriptions
                    class="margin-top"
                    title="游戏账号信息"
                    :column="1"
                    border>
                    <el-descriptions-item align="center" label-align="center" label="展示图" :rowspan="1">
                        <el-image :src="fileOps.getFile+po.data.showImg" style="width: 100px; height: 100px"/>
                    </el-descriptions-item>  
                     
                    <el-descriptions-item align="center" label-align="center" label="游戏名" :rowspan="1">{{po.data.gameName}}</el-descriptions-item>    
                    <el-descriptions-item align="center" label-align="center" label="游戏ID" :rowspan="1">{{po.data.gameId}}</el-descriptions-item>    
                    <el-descriptions-item align="center" label-align="center" label="游戏类型" :rowspan="1">{{po.data.gameType}}</el-descriptions-item>  
                    <el-descriptions-item align="center" label-align="center" label="想要人数" :rowspan="1">{{po.data.wantNum}}</el-descriptions-item> 
                    <el-descriptions-item align="center" label-align="center" label="账号介绍" :rowspan="1">{{po.data.desText}}</el-descriptions-item> 
                    <el-descriptions-item align="center" label-align="center" label="金额" :rowspan="1"><h4>￥{{po.data.price}}</h4></el-descriptions-item> 
                    
                </el-descriptions>
            </div>
            <div>
                <h4>视频展示</h4>
                <video v-for="item in po.data.videoList" :key="item" :src="fileOps.getFile+item" autoplay controls></video>
            </div>
    </div>
</template>

<script setup>
    import { ref, onMounted,defineProps } from 'vue'
    import fileOps from '../js/file'
    import { ElMessage, ElMessageBox} from 'element-plus'
    import {service} from '@/components/js/http.js';

    let po = defineProps({
        data:Object,
        dealObj:Object
    })
    let currentUser = JSON.parse(sessionStorage.getItem("user"))

       const addFriend = (id)=>{
        ElMessageBox.prompt('是否添加该用户为好友','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputPlaceholder:'请输入申请信息',
            type: 'warning'
        }).then(({ value })=>{
            service.post('/user/fri/'+currentUser.id+"?receiver="+id+"&mes="+value).then(res=>{
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