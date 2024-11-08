<template>
    <div v-for="(item,index) in users" :key="index">
        <div style="display: flex;margin-top: 10px;padding-left: 10px;" class="card">
            <div style="width: 20%;">
                <el-avatar :size="40" :src="fileOps.getFile+item.avatar" style="margin-left: 15px;margin-top: 2px;"/>
            </div>
            <div style="display: flex;align-items: center;position: relative;width: 80%;">
                <div >
                    <div 
                    style="margin-left: 10px;
                        margin-top: 2px;
                        font-size: 16px;
                        font-weight: bold;
                        max-width: 120px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;">
                        {{item.alia}}
                    </div>
                    <div v-if="item.isOnline" style="display: flex;align-items: center;">
                        <svg t="1729751451167" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8969" width="20" height="20"><path d="M480 480m-288 0a4.5 4.5 0 1 0 576 0 4.5 4.5 0 1 0-576 0Z" p-id="8970" fill="#1afa29"></path></svg>
                        <span>在线</span>
                    </div>
                    <div v-else style="display: flex;align-items: center;">
                        <svg t="1729752512300"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9323" width="20" height="20"><path d="M480 480m-288 0a4.5 4.5 0 1 0 576 0 4.5 4.5 0 1 0-576 0Z" p-id="9324"></path></svg>
                        <span>
                            离线
                        </span>
                    </div>
                </div>
                <div v-if="item.mesCount>0" 
                    style="width: 25px;height: 25px;background-color: red;margin-left: 10px;border-radius: 40%;display: flex;align-items: center;">
                    <div style="color: white;margin-left: auto;;margin-right: auto;">
                        {{item.mesCount>99?'99+':item.mesCount}}
                    </div>
                </div>
                <div style="position: absolute;right: 30px;">
                    <svg  @click="handleClick(item)"  t="1729750963388" 
                    class="sendMe" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4268" width="30" height="30"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity="0" p-id="4269"></path><path d="M591.127273 93.090909c204.8 0 377.018182 167.563636 377.018182 372.363636v23.272728c0 204.8-167.563636 372.363636-377.018182 372.363636H190.836364c-69.818182 0-130.327273-55.854545-130.327273-130.327273V465.454545c0-204.8 167.563636-372.363636 377.018182-372.363636h153.6z m0 69.818182H432.872727c-167.563636 0-307.2 134.981818-307.2 302.545454v265.309091c0 32.581818 27.927273 60.509091 60.509091 60.509091h400.290909c167.563636 0 307.2-134.981818 307.2-302.545454V465.454545c4.654545-167.563636-134.981818-302.545455-302.545454-302.545454z m-209.454546 353.745454c-27.927273 0-55.854545-27.927273-55.854545-60.50909 0-32.581818 27.927273-55.854545 55.854545-55.854546s55.854545 27.927273 55.854546 55.854546c4.654545 32.581818-23.272727 60.509091-55.854546 60.50909z m288.581818 0c-32.581818 0-55.854545-27.927273-55.854545-55.854545 0-32.581818 27.927273-55.854545 55.854545-55.854545 32.581818 0 55.854545 27.927273 55.854546 55.854545 4.654545 27.927273-23.272727 55.854545-55.854546 55.854545z" fill="#303237" p-id="4270"></path></svg>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref,watch,onUpdated,reactive} from 'vue'
    import fileOps from '../js/file'
    import {service} from '@/components/js/http.js';
    // onUpdated(() => {
    //     // $forceUpdate()
    //     console.log("Component updated.re:"+users.value);
    // });
    

    const po = defineProps({
        data:Array
    })
    const emit = defineEmits({
        sendTarget:(target)=>{
            return target;
        }
    })
    const handleClick = (target)=>{
        markRead(target)
        emit('sendTarget',target)
    }
    const markRead = async (item) => {
        await service.get('/mes/read/'+item.id).then(res => {
            if(res.data.code == 200){
                item.mesCount = 0
                console.log("成功标记已读")
            }
            
        })
    }

    var users = reactive(po.data);

    console.log("+++++++-++++++++ "+users.value)

    watch(() => po.data, (newData) => {
        users.splice(0, users.length, ...newData)
    }, { deep: true })

    onUpdated(() => {
        console.log("Component updated. Users:", users)
    })
 
</script>


<style>
    .card{
        transition: transform 0.8s ease-in-out; /* 为宽度和高度的变化添加过渡效果 */
    }
    .card:hover{
        transform: scale(1.1);
    }
    .sendMe:hover{
        fill: #0AC5F4;
        cursor: pointer;
    }

</style>

