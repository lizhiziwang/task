<template>
    <el-scrollbar height="100%" ref="mainContainer" noresize="true">
        <div class="room-top">
            智能客服
            <div style="float: right;"> 
                <el-select v-model="request_body.model" placeholder="请选择模型" style="width: 200px;margin-right: 20px;" >
                    <el-option v-for="item in models" :key="item.id" :label="item.label" :value="item.label"/>
                </el-select>
            </div>
        </div>
        <div style="width: 100%;height: 100%;" ref = "sdsdsdsd">
            <div class="ai-chat" v-for="(item,index) in request_body.messages">
                <div class="chat-container" v-if="item.role!='user'">
                    <div class="avatar">
                        <el-avatar :size="50" src="https://p.ssl.qhimg.com/sdm/480_480_/t01acfe6e7ea19ee759.jpg"/>
                    </div>
                    <div class="mess" height="100%" whight="100%">
                        <v-md-preview :text="item.content"></v-md-preview>
                    </div>
                </div>
                <div class="chat-container_"  v-else>
                    <div class="mess" height="100%" whight="100%">
                        <v-md-preview :text="item.content"></v-md-preview>
                    </div>
                    <div class="avatar">
                        <el-avatar :size="50" src="https://ts4.cn.mm.bing.net/th?id=OIP-C.MqovI15z6O3xqrbcjHUm4gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"/>
                    </div>
                </div>
            </div>
            <div class="send" ref="keyIn">
                <el-input v-model="q" style="width: 40%;margin-right: 20px;"  type="textarea"  :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入提问的内容" />
                <el-button class="send_button" size="large"  type="primary" :icon="IconSend" @click="sendQ" v-loading="sending">发送</el-button>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
    import {ref, onMounted,reactive,nextTick,h} from 'vue'
    import fileOps from '../js/file'
    import IconSend from '../icons/IconSend.vue';
    import { ElNotification } from 'element-plus'
    import { service } from '../js/http';


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

    let models = ref([])
    
    
    let keyIn = ref(null)
    let sending = ref(false)
    // po.data = []
    let request_body = ref(
        {
            model: "deepseek-r1",  
            messages: [             
                {
                role: "assistant",       
                content: "你好！有什么可以帮助您的吗？" 
                }
            ],
            "stream": true
        }
    )

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
        getModels();

        console.log(mainContainer.value)
    })

    const getModels =  ()=>{
        service.get('/ai/list/models').then(response => {
            if (response.data.code == 200){
                response.data.data.models.forEach(element => {
                    models.value.push({
                        id:element.name,
                        label:element.name.split(':')[0],
                        value:element.name.split(':')[0]
                    })
                });
            }

        });
        
    }


    const url = '/api/ai';
    async function fetchData(q,a) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'token':'231321321',
        });
        console.log(JSON.stringify(request_body.value));
        const response = await fetch(url,{
            method:'POST',
            body:JSON.stringify(request_body.value),
            headers:headers
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

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
            a.content += chunk;
            // await nextTick();
            console.log(chunk);
        }
        console.log(a.content);
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
    
        const xxx = q.value
        let a = {
            role: "user",       
            content: xxx
        }

        let ai =reactive({role: "assistant",content: "" })
        request_body.value.messages.push(a)

        request_body.value.messages.push(ai)
        scrollToBottom()
        await fetchData(q.value,ai)
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
        bottom: 10px;
        display: flex;
        width: 100%;
        justify-content: center;
        /* justify-self: center; */
        /* position: relative;  */
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
        max-width: 90%;
        /* margin-bottom: 50px; */
        margin-top: 25px;
    }
    .chat-container_{
        display: flex;
        /* max-width: 800px; */
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

    .room-top{
        position: absolute;
        width: 100%;
        height: 25px;
        text-align: center;
        font-size: 20px;
        background-color: aliceblue;
        /* display: block; */
    }
</style>