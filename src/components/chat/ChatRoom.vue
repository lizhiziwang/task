<template>
    <div class="chat-room" v-show="target != null">

        <div class="content" ref="mainContainer">
            <message :data="data" ></message>
        </div>
        <div class="send">
            <el-input v-model="messageContent" class="textIn"/>
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
        target: String
    })

    let data = ref([])
    let target = ref(po.target)
    let currentUser = null;
    let mainContainer = ref(null)
    let messageContent = ref('')
    let websocket = null;
    let mes = {
        id:null,
        message:''
    }


    data.value = []
    /*
    [
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            uId: '1',
            id:1256465
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        },
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        }
        ,
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        }
        ,
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        }
        ,
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        }
        ,
        {
            msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
            imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
            id: '1'
        }
    ]
*/
    // 滚动到最底部的方法
    const scrollToBottom =   () => {
        mainContainer.value.scrollTop = mainContainer.value.scrollHeight;
    }
    

    onMounted(() => {
        currentUser = JSON.parse(sessionStorage.getItem('user'))
        console.log(currentUser)
        scrollToBottom()
    })

    watch(() => po.target, (newData) => {
        console.log("进入room组件"+newData)
        target.value = newData
        console.log("高度"+mainContainer.value.scrollHeight)
        //获取历史聊天数据
        getHis()
        //建立连接
        con()
    }, { deep: true })

    function getHis(){
        service.get('/mes/his/'+currentUser.id+"/"+target.value).then(res=>{
            if(res.data.code==200){
                data.value = res.data.data
                console.log(data.value)
                nextTick(() => {
                    mainContainer.value.scrollTop = mainContainer.value.scrollHeight;
                });
            }
        })
    }
    scrollToBottom

    function con(){
        websocket = new WebSocket("ws://localhost:8061/ws/serverTwo?id="+currentUser.id);
        // 连接断开
        websocket.onclose = e => {
            console.log(`连接关闭: code=${e.code}, reason=${e.reason}`)
        }
        // 收到消息
        websocket.onmessage = e => {
            data.value.push(JSON.parse(e.data))
            nextTick(() => {
                mainContainer.value.scrollTop = mainContainer.value.scrollHeight;
            });
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
    function sendMessage (){
        console.log(messageContent.value)
        mes.id = target.value
        mes.message = messageContent.value
        websocket.send(JSON.stringify(mes))
        data.value.push(
            {
                id:null,
                uid:currentUser.id,
                imgUrl:currentUser.avatar,
                msg:messageContent.value
            }
        )
        messageContent.value = ''
        nextTick(() => {
            mainContainer.value.scrollTop = mainContainer.value.scrollHeight;
        });
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
    }
 
    .send{
        position: sticky;
        width: 100%;
        height: 5%;
        display: flex;
    }
     .textIn{
        width: 80%;
        margin-right: 10px;
    }
 </style>