
<template>

    <el-scrollbar height="100%" ref="mainContainer" noresize="true">
        <div style="width: 100%;height: 100%;" ref = "sdsdsdsd">
            <div class="ai-chat" v-for="(item,index) in data">
                <div class="chat-container" v-if="item.type==='ai'">
                    <div class="avatar">
                        <el-avatar :size="50" src="https://p.ssl.qhimg.com/sdm/480_480_/t01acfe6e7ea19ee759.jpg"/>
                    </div>
                    <div class="mess" height="100%" whight="100%">
                        <v-md-preview :text="item.text"></v-md-preview>
                    </div>
                </div>
                <div class="chat-container_"  v-else>
                    <div class="mess" height="100%" whight="100%">
                        <v-md-preview :text="item.text"></v-md-preview>
                    </div>
                    <div class="avatar">
                        <el-avatar :size="50" src="https://ts4.cn.mm.bing.net/th?id=OIP-C.MqovI15z6O3xqrbcjHUm4gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"/>
                    </div>
                </div>
            </div>
        
            <div class="send" ref="keyIn">
                <el-input v-model="q" style="width: 50%;margin-right: 20px;" placeholder="请输入提问的内容" />
                <el-button size="large" type="primary" :icon="IconSend" @click="sendQ" v-loading="sending">发送</el-button>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
    import {ref, onMounted,reactive,nextTick,h} from 'vue'
    import fileOps from '../js/file'
    import IconSend from '../icons/IconSend.vue';
    import { ElNotification } from 'element-plus'


    let po = defineProps({
        data:{
            type:Array,
            default:() => []
        },
        // imgHe:String,
        // imgMe:String
    })

    let messageObj = {
            id:'',
            text:'',
            time:''
        }
    
    
    let keyIn = ref(null)
    let sending = ref(false)
    // po.data = []
    let data = ref(po.data)
    let q = ref('你好')
    let sdsdsdsd = ref(null)
    let mainContainer = ref(null)
    // const preview = ref(null);

    onMounted(() => {
        fetchData(q.value)


        keyIn.value.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                console.log('Enter key released');
                sendQ();
            }
        });

        console.log(mainContainer.value)
    })


    const url = '/api/ai';
    async function fetchData(q) {
        const headers = new Headers({
            'Content-Type': 'text/plain',
            'token':'231321321',
        });
        const response = await fetch(url,{
            method:'POST',
            body:q,
            headers:headers
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let a = reactive({
            id:'',
            text:'',
            time:'',
            type:'ai'
        })
        console.log(data.value);
        data.value.push(a)

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            // console.log('Reading chunk...');
            const { done, value } = await reader.read();
            if (done) break;

            let chunk = decoder.decode(value, { stream: true });
            if(chunk.indexOf('<think>') !=-1){
                chunk = chunk.replace(/<think>/g, '```');
            }
            if(chunk.indexOf('</think>')!=-1){
                chunk = chunk.replace(/<\/think>/g, '```');
            }
            a.text += chunk;
            // console.log(chunk);
        }
        console.log(a.text);
    }


    const sendQ = async ()=>{
        if(q.value.trim()==''){
            ElNotification({
                title: '错误',
                message: '请输入问题',
                type: 'error',
            });
            return;
        }

        if(sending.value){
            ElNotification({
                title: '提示',
                message: h('i', { style: 'color: red;font-size: 18px' }, '请等待当前对话完成。'),
                type: 'warning'
            });
            return;
        }
        sending.value = true
    
        let a = reactive({
            id:'',
            text:''+q.value+'',
            time:'',
            type:'ai-'
        })
        data.value.push(a)
        scrollToBottom()
        await fetchData(q.value)
        q.value = ''
        scrollToBottom()
        sending.value = false
    }
    const scrollToBottom =   () => {
        nextTick(() => {
            console.log('滚动条到底部')
            mainContainer.value.setScrollTop(sdsdsdsd.value.scrollHeight)
        });
    }
</script>


<style scoped>
    .send{
        margin-top: 20px;
        position: absolute;
        bottom: 20px;
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .ai-chat {
        width: 100%;
        display: flex;
        /* flex-direction: column; */
        /* justify-content: flex-end; */
        align-items: flex-end;
    }
    .chat-container{
        display: flex;
        max-width: 800px;
        margin-bottom: 80px
    }
    .chat-container_{
        display: flex;
        max-width: 800px;
        margin-bottom: 80px;
        margin-left: auto
    }
    .avatar{
        margin-left: 10px;
        margin-top: 10px;
        margin-right: 10px;
    }
    .mess{
        background-color: rgb(190, 215, 243);
        max-width: 800px;
        border-radius: 10px;
    }

</style>