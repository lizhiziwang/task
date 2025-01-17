<template>
    <div class="chat-room" v-show="target != null">
        <div style="width: 100%;height: 5%;display: flex;align-items: center;">
            <span style="font-size: 20px;margin: auto;">
                {{target.name}}
            </span>
        </div>

        <div class="content" style="height:90%;"  >
            <el-scrollbar height="100%" ref="mainContainer" noresize="true">
                <div ref="mes_con">
                    <message :data="data" :imgHe="target.avatar" :imgMe="currentUser.avatar"></message>
                </div>
            </el-scrollbar>
        </div>
        <div class="send" style="height:5%;" ref="keyIn">
            <el-input v-model="messageContent"  class="textIn"/>
            <el-button type="primary" :icon="IconSend" @click="sendMessage">发送</el-button>
        </div>
    </div>
</template>

 <script setup>
    import message from './message.vue'
    import { ref, onMounted,watch,nextTick } from 'vue'
    import {service} from '@/components/js/http.js';
    import IconSend from '../icons/IconSend.vue';


    let po = defineProps({
        target: Object
    })

    let data = ref([])
    let target = ref(po.target)
    let currentUser = ref({});

    console.log(currentUser.value)

    let mainContainer = ref(null)
    let messageContent = ref('')
    let websocket = null;
    let keyIn = ref(null) 
    let mes_con = ref(null)

    let height_ = ref(0)
    //回车触发发送
   // 正确添加enter事件的部分
   

    let mes = {
        id:null,
        message:''
    }


    data.value = []
    
    // 滚动到最底部的方法
    const scrollToBottom =   () => {
        nextTick(() => {
            mainContainer.value.setScrollTop(mes_con.value.scrollHeight)
        });
    }
    

    onMounted(() => {
        currentUser.value = JSON.parse(sessionStorage.getItem('user'))

        scrollToBottom()

        keyIn.value.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                console.log('Enter key released');
                sendMessage();
            }
        });

    })
    //标记已读
    

    watch(() => po.target, (newData) => {
        console.log("进入room组件"+newData)
        target.value = newData
        //获取历史聊天数据
        getHis()
        //建立连接
        con()
    }, { deep: true })

    function getHis(){
        service.get('/mes/his/'+currentUser.value.id+"/"+target.value.id).then(res=>{
            if(res.data.code==200){
                data.value = res.data.data
                console.log(data.value)
               scrollToBottom()
            }
        })
    }

    function con(){
        websocket = new WebSocket("ws://113.45.182.107:8062/ws/serverTwo?id="+currentUser.value.id);
        // websocket = new WebSocket("ws://127.0.0.1:8062/ws/serverTwo?id="+currentUser.value.id);
        // 连接断开
        websocket.onclose = e => {
            console.log(`连接关闭: code=${e.code}, reason=${e.reason}`)
        }
        // 收到消息
        websocket.onmessage = e => {
            data.value.push(JSON.parse(e.data))
            scrollToBottom()
            console.log(`收到消息：${e.data}`);
        }
        // 异常
        websocket.onerror = e => {
            console.log("连接异常")
            console.error(e)
        }
        // 连接打开
        websocket.onopen = e => {
            console.log("连接打开");
        }
    }
    function sendMessage (e){
        console.log(e)
        if(messageContent.value === ''){
            return null
        }
        console.log(messageContent.value)
        mes.id = target.value.id
        mes.message = messageContent.value
        websocket.send(JSON.stringify(mes))
        data.value.push(
            {
                id:null,
                uid:currentUser.value.id,
                imgUrl:currentUser.value.avatar,
                msg:messageContent.value
            }
        )
        messageContent.value = ''
        scrollToBottom()
    }
 </script>

 <style>
    .chat-room{
        width: 100%;
        height: 100%;
    }
    .content{
        width: 100%;
        height: 95%;
        overflow:auto;
        padding: 0;
    }
 
    .send{
        position: sticky;
        width: 100%;
        height: 5%;
        display: flex;
        align-items: center;
    }
     .textIn{
        width: 80%;
        margin-right: 10px;
    }
 </style>