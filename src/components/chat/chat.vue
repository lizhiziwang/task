<template>
    <div class="common-layout">
    <el-container class="all">
      <el-header class="header" height="6%">
        <MyHeader :pubVis="false"></MyHeader>
      </el-header>
      <el-container style="height: 94%">
        <el-aside width="21%" class="aside" style="overflow: visible;overflow-x: auto;">
            <div style="width: 100%;margin-top: 10px;display: flex;">
                <svg t="1729153345122" style="margin-left: 10px;" class="icon" viewBox="0 0 1024 1024" version="1.1" 
                xmlns="http://www.w3.org/2000/svg" p-id="7429" width="30" height="30"><path d="M882.607 620.29c-32.233-46.502-75.779-81.467-126.4-101.612 22.324-15.705 41.105-36.646 54.68-61.068 15.712-28.268 24.018-60.572 24.018-93.42 0-102.398-79.285-185.705-176.74-185.705-13.838 0-25.097 11.258-25.097 25.098 0 13.855 11.26 25.128 25.097 25.128 69.743 0 126.483 60.775 126.483 135.479 0 74.72-56.74 135.507-126.483 135.507-13.838 0-25.097 11.265-25.097 25.113v0.136c0 13.855 11.26 25.128 25.097 25.128 125.464 0 227.537 108.816 227.537 242.569 0 13.873 11.285 25.159 25.158 25.159 13.838 0 25.097-11.286 25.097-25.16 0.001-62.398-18.448-121.998-53.35-172.353z" fill="" p-id="7430"></path><path d="M623.157 577.674c-26.348-18.662-55-33.4-85.316-43.896 64.02-38.906 103.316-108.15 103.316-183.412 0-118.333-96.263-214.605-214.588-214.605-118.359 0-214.65 96.272-214.65 214.605 0 40.29 11.283 79.585 32.63 113.642a215.99 215.99 0 0 0 71.568 70.318c-30.826 10.524-59.95 25.425-86.697 44.37a343.098 343.098 0 0 0-76.195 74.126c-44.566 59.376-68.122 130.018-68.122 204.29 0 13.838 11.258 25.098 25.097 25.098 13.856 0 25.129-11.26 25.129-25.098 0-77.456 30.203-150.434 85.044-205.489 54.71-54.925 127.125-85.207 203.921-85.283a24.91 24.91 0 0 0 7.632-0.516l1.991-0.446c74.72 1.513 144.954 31.659 198.33 85.262 54.815 55.05 85.003 128.013 85.003 205.448 0 13.838 11.273 25.097 25.128 25.097 13.839 0 25.098-11.26 25.098-25.097 0-74.272-23.556-144.914-68.121-204.29a343.214 343.214 0 0 0-76.198-74.124zM426.57 186.002c90.629 0 164.362 73.734 164.362 164.364 0 90.638-73.733 164.379-164.362 164.379-90.648 0-164.393-73.741-164.393-164.38-0.001-90.63 73.745-164.363 164.393-164.363z" fill="" p-id="7431"></path></svg>            
                <el-popover
                    placement="bottom"
                    title="搜索结果"
                    :width="300"
                    trigger="click">
                    <template #reference>
                        <el-input v-model="searchName" style="width: 70%;margin-left:10px;margin-right:10px" :prefix-icon="SearchIcon" placeholder="搜索"/>
                    </template>
                    <div>
                        <!-- <usercard :data="searchList"></usercard> -->
                    </div>
                </el-popover>
                
                <svg t="1729664230263" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5628" width="30" height="30"><path d="M512 958.016611c-119.648434 0-232.1288-46.367961-316.736783-130.559656-84.640667-84.255342-131.263217-196.255772-131.263217-315.455235 0-119.168499 46.624271-231.199892 131.232254-315.424271 84.607983-84.191695 197.088348-130.559656 316.736783-130.559656s232.1288 46.367961 316.704099 130.559656c84.67163 84.224378 131.263217 196.255772 131.263217 315.391587 0.032684 119.199462-46.591587 231.232576-131.263217 315.455235C744.1288 911.615966 631.648434 958.016611 512 958.016611zM512 129.983389c-102.623626 0-199.071738 39.743475-271.583282 111.936783-72.480581 72.12794-112.416718 168.063432-112.416718 270.079828s39.903454 197.951888 112.384034 270.047144c72.511544 72.191587 168.959656 111.936783 271.583282 111.936783 102.592662 0 199.071738-39.743475 271.583282-111.936783 72.480581-72.160624 112.416718-168.063432 112.384034-270.079828 0-102.016396-39.903454-197.919204-112.384034-270.016181C711.071738 169.759548 614.592662 129.983389 512 129.983389z" fill="#575B66" p-id="5629"></path><path d="M736.00086 480.00086 544.00086 480.00086 544.00086 288.00086c0-17.664722-14.336138-32.00086-32.00086-32.00086s-32.00086 14.336138-32.00086 32.00086l0 192L288.00086 480.00086c-17.664722 0-32.00086 14.336138-32.00086 32.00086s14.336138 32.00086 32.00086 32.00086l192 0 0 192c0 17.695686 14.336138 32.00086 32.00086 32.00086s32.00086-14.303454 32.00086-32.00086L544.00258 544.00086l192 0c17.695686 0 32.00086-14.336138 32.00086-32.00086S753.696546 480.00086 736.00086 480.00086z" fill="#575B66" p-id="5630"></path></svg>
            </div>
            <div>
                <UserCard :data="userList" @sendTarget="sendTarget"></UserCard>
            </div>
        </el-aside>
        <el-main class="main" id="mian_" ref="mainContainer">
            <ChatRoom :target="chatTarget" v-if="chatTarget!=null"></ChatRoom>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
    import { ref ,onMounted,watch,nextTick,onBeforeMount,reactive} from 'vue';
    // import message from './message.vue';
    import SearchIcon from '../icons/SearchIcon.vue';
    import UserCard from './UserCard.vue';
    import {service} from '@/components/js/http.js';
    import ChatRoom from './ChatRoom.vue';
    import MyHeader from '../home/MyHeader.vue'
    
    var data = ref(null);
    // 获取 main 容器的引用
    const mainContainer = ref(null)
    let currentUser = ref(null)
    const isChat = ref(false)
    //查询出来的用户列表
    var searchList = ref([])
    //用户自己的
    let userList = ref([])
    var searchName = ref('')
    let chatTarget = ref({
        name:null
    })


    data.value = [{
        msg: '自定义滚动区域，使用 offset props 可以设置锚点滚动偏移。 监听link-click事件并阻止浏览器的默认行为，然后它不会改变历史。',
        imgUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.VnqbqHI999-VVVkUOWBcMwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        id: '1'
    }]
    onBeforeMount(()=>{
        currentUser.value = JSON.parse(sessionStorage.getItem('user'))
        console.log("成功"+currentUser.value.id)
    })

    onMounted(()=>{
        scrollToBottom()
        getFriends()
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
    
    //获取用户的好友
    function getFriends(){
        let usreId = currentUser.value.id

        service.get('/user/friends/'+usreId+'?name=').then(res=>{
            console.log(res.data.data)
            if(res.data.code === 200){
                // userList.value = res.data.data
                // userList.value = Array.from(res.data.data);
                userList.value = reactive(res.data.data);
                console.log("-------"+JSON.stringify(userList.value))
                nextTick(()=>{
                    console.log('Updated userList:', userList.value)
                })
            }
        })
    }
    const sendTarget = (item)=>{
        console.log(item)
        chatTarget.value = item

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
        /* height: calc(100vh - 45px);  */
        /* max-height: calc(100vh -60px);  */
        height: 100%;
        /* height: 95%;
        max-height: 95%; */
    }
    /* .name{
        padding-top: 10px;
        padding-left: 10px;
    } */
    /* .textIn{
        width: 50%;
        margin-right: 10px;
    } */
    /* .send{
        position: fixed;
        bottom: 2%;
        right: 1%;
        width: 78%;
        display: flex;
        z-index: 99;
    } */
</style>