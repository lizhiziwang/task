<template>
    <div class="common-layout">
    <el-container class="all">
      <el-header class="header" height="5%">
        <div style="width: 100%;height=100%">
            <svg t="1729151876541" class="icon" viewBox="0 0 1159 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4566" width="40" height="40"><path d="M1088.731 85.857c7.486 15.186-0.014 34.184-16.746 42.433L247.459 534.728c-16.735 8.25-36.37 2.625-43.855-12.56-7.485-15.184 0.013-34.183 16.748-42.432l824.525-406.438c16.734-8.248 36.368-2.626 43.854 12.56z" p-id="4567"></path><path d="M1067.131 69.833c16.507 3.765 27.377 17.834 24.278 31.421L938.702 770.787c-3.1 13.587-18.995 21.552-35.5 17.786-16.506-3.764-27.374-17.831-24.274-31.42l152.705-669.531c3.098-13.589 18.993-21.553 35.498-17.789z" p-id="4568"></path><path d="M1059.32 99.368c12.483 11.436 14.63 29.416 4.79 40.156l-484.802 529.24c-9.84 10.742-27.938 10.176-40.422-1.257-12.483-11.437-14.626-29.413-4.786-40.156L1018.9 98.111c9.839-10.741 27.937-10.177 40.42 1.257zM502.153 622.73c-6.02 16.604-24.36 25.185-40.965 19.166l-240.527-87.19c-16.606-6.02-25.187-24.36-19.168-40.965 6.02-16.605 24.36-25.186 40.965-19.167l240.526 87.192c16.606 6.018 25.187 24.36 19.169 40.964zM937.345 775.375c-6.019 16.605-24.36 25.186-40.966 19.167L655.851 707.35c-16.603-6.019-25.185-24.36-19.165-40.964s24.362-25.185 40.964-19.166l240.528 87.19c16.604 6.02 25.184 24.36 19.167 40.965z" p-id="4569"></path><path d="M585.576 911.117c0 17.662-14.318 31.98-31.98 31.98-17.663 0-31.981-14.318-31.981-31.98V655.275c0-17.662 14.318-31.98 31.98-31.98 17.663 0 31.98 14.318 31.98 31.98v255.842z" fill="#d81e06" p-id="4570"></path></svg>
        </div>
      </el-header>
      <el-container>
        <el-aside width="20%" class="aside">
            <div style="width: 100%;height=20px;padding-left: 5px;">
                <svg t="1729153345122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7429" width="30" height="30"><path d="M882.607 620.29c-32.233-46.502-75.779-81.467-126.4-101.612 22.324-15.705 41.105-36.646 54.68-61.068 15.712-28.268 24.018-60.572 24.018-93.42 0-102.398-79.285-185.705-176.74-185.705-13.838 0-25.097 11.258-25.097 25.098 0 13.855 11.26 25.128 25.097 25.128 69.743 0 126.483 60.775 126.483 135.479 0 74.72-56.74 135.507-126.483 135.507-13.838 0-25.097 11.265-25.097 25.113v0.136c0 13.855 11.26 25.128 25.097 25.128 125.464 0 227.537 108.816 227.537 242.569 0 13.873 11.285 25.159 25.158 25.159 13.838 0 25.097-11.286 25.097-25.16 0.001-62.398-18.448-121.998-53.35-172.353z" fill="" p-id="7430"></path><path d="M623.157 577.674c-26.348-18.662-55-33.4-85.316-43.896 64.02-38.906 103.316-108.15 103.316-183.412 0-118.333-96.263-214.605-214.588-214.605-118.359 0-214.65 96.272-214.65 214.605 0 40.29 11.283 79.585 32.63 113.642a215.99 215.99 0 0 0 71.568 70.318c-30.826 10.524-59.95 25.425-86.697 44.37a343.098 343.098 0 0 0-76.195 74.126c-44.566 59.376-68.122 130.018-68.122 204.29 0 13.838 11.258 25.098 25.097 25.098 13.856 0 25.129-11.26 25.129-25.098 0-77.456 30.203-150.434 85.044-205.489 54.71-54.925 127.125-85.207 203.921-85.283a24.91 24.91 0 0 0 7.632-0.516l1.991-0.446c74.72 1.513 144.954 31.659 198.33 85.262 54.815 55.05 85.003 128.013 85.003 205.448 0 13.838 11.273 25.097 25.128 25.097 13.839 0 25.098-11.26 25.098-25.097 0-74.272-23.556-144.914-68.121-204.29a343.214 343.214 0 0 0-76.198-74.124zM426.57 186.002c90.629 0 164.362 73.734 164.362 164.364 0 90.638-73.733 164.379-164.362 164.379-90.648 0-164.393-73.741-164.393-164.38-0.001-90.63 73.745-164.363 164.393-164.363z" fill="" p-id="7431"></path></svg>            
            </div>
        </el-aside>
        <el-main class="main" id="mian_" ref="mainContainer">
            <message :data="data" ></message>
            <div class="send">
                <el-input v-model="input" style="width: 92%;" class="textIn"/>
                <el-button type="primary" :icon="IconSend">发送</el-button>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
    import { ref ,onMounted,watch,nextTick} from 'vue'
    import message from './message.vue'
    import IconSend from '../icons/IconSend.vue'
    
    var data = ref(null);
    // 获取 main 容器的引用
    const mainContainer = ref(null)
    let websocket = null;

    data.value = [
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
    },
    {
        msg: '自定义滚动区域，使用 offset props 可以设置变历史。',
        imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        id: '1111123'
    }
    ]

    onMounted(()=>{
        sessionStorage.setItem('id',"1111123")
        scrollToBottom()
        con()
    })
    // 监听 data 的变化
    watch(data, () => {
        scrollToBottom()
    })
    // 滚动到最底部的方法
    const scrollToBottom = () => {
        const container = mainContainer.value?.$el || mainContainer.value;
        if (container) {
            // 确保内容高度超过容器高度
            if (container.scrollHeight > container.clientHeight) {
                // 使用 setTimeout 确保 DOM 完全更新
                    container.scrollTop = container.scrollHeight;
            } else {
            }
        } else {
            console.error('mainContainer is not defined');
        }
    }
    function con(){
        websocket = new WebSocket("ws://localhost:8061/ws/serverTwo?id=1");
        // 连接断开
        websocket.onclose = e => {
            console.log(`连接关闭: code=${e.code}, reason=${e.reason}`)
        }
        // 收到消息
        websocket.onmessage = e => {
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
</script>

<style scoped>
    .common-layout{
        width: 100%;
        height: 100%;
    }
    .all{
        height: 100%;
    }
    .header{
        background-color: #c6e2ff;
    }
    .aside{
        background-color: #d9ecff;
    }
    .main{
        background-color: #ecf5ff;
        /* height: 60%; */
        height: calc(100vh - 60px); 
        max-height: calc(100vh - 60px); 
        /* height: 95%;
        max-height: 95%; */
    }
    .textIn{
        width: 50%;
        margin-right: 10px;
    }
    .send{
        position: sticky;
        display: flex;
        z-index: 99;
        bottom: 0px;
    }
</style>