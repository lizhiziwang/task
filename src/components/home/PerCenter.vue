<template>
    <div class="common-layout" >
        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="true"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                <el-scrollbar height="100%">
                    <el-descriptions title="个人信息" border="true">
                        <el-descriptions-item
                            :rowspan="2"
                            :width="140"
                            label="头像"
                            align="center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="currentUser.avatar"/>
                        </el-descriptions-item>
                        <el-descriptions-item :width="140"  label="用户名">{{ currentUser.name }}</el-descriptions-item>
                        <el-descriptions-item  :width="140"  label="手机号">{{ currentUser.phone }}</el-descriptions-item>
                        <el-descriptions-item label="性别">{{ currentUser.gender ===1?"男":"女" }}</el-descriptions-item>
                        <el-descriptions-item   label="钱包">
                            <div style="display: flex; align-items: center;">
                                <span>{{ currentUser.purse }}</span>
                                <el-button style="margin-left: 10px;" type="primary" link @click="showPurse">充值</el-button>
                                <el-button type="primary" link @click="showTx">提现</el-button>
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item :rowspan="2" label="个性签名">
                            {{ currentUser.idiograph }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-scrollbar>
            </el-main>
        </el-container>

        <el-dialog v-model="tx" title="提现" width="25%" align-center="true" :before-close="closeBe">
            <div style="display: flex; align-items: center;">
                <svg t="1730786677725" style="margin-right: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5336" width="25" height="25"><path d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z" fill="#1296db" p-id="5337"></path></svg>
                <span >
                    请输入您所需要提现的金额
                </span>
            </div>
            <div style="margin-top: 20px;display: flex; align-items: center;margin-bottom: 20px;">
                <span style="width: 90px;">
                    充值金额：
                </span>
                <el-input
                    v-model="txSize"
                    style="width: 260px"
                    placeholder="请输入"
                    :formatter="(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/¥\s?|(,*)/g, '')"
                />
                <span>
                    &nbsp;&nbsp;人民币
                </span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="width: 90px;">支付宝账号：</span>
                <el-input v-model="aliId" style="width: 260px;" placeholder="请输入" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                  <el-button @click="tx = false">取消</el-button>
                  <el-button v-loading.fullscreen.lock="lock_1" type="primary" @click="handleTx">
                    确定
                  </el-button>
                </div>
              </template>
        </el-dialog>

        <el-dialog v-model="cz" title="充值" width="25%" align-center="true" :before-close="closeBe">
            <div style="display: flex; align-items: center;">
                <svg t="1730786677725" style="margin-right: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5336" width="25" height="25"><path d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z" fill="#1296db" p-id="5337"></path></svg>
                <span >
                    请输入您所需要充值的金额
                </span>
            </div>
            <div style="margin-top: 20px;display: flex; align-items: center;margin-bottom: 20px;">
                <span>
                    充值金额：
                </span>
                <el-input
                    v-model="czSize"
                    style="width: 260px"
                    placeholder="请输入"
                    :formatter="(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/¥\s?|(,*)/g, '')"
                />
                <span>
                    &nbsp;&nbsp;人民币
                </span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                  <el-button @click="cz = false">取消</el-button>
                  <el-button v-loading.fullscreen.lock="lock_1" type="primary" @click="handleCz">
                    确定
                  </el-button>
                </div>
              </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import MyHeader from '../home/MyHeader.vue'
    import fileOps from '../js/file'
    import { ref, onMounted } from 'vue'
    import { ElMessage, ElMessageBox} from 'element-plus'
    import {service} from '@/components/js/http.js';

    let currentUser = ref({})
    let cz = ref(false)
    let tx = ref(false)
    let czSize = ref('')

    let txSize = ref('')
    let aliId = ref('2088722008879139')

    let lock_1 = ref(false)

    let re = {}

    onMounted(()=>{
        updateUserInfo()
        console.log(currentUser.value)
    })

    // const showPurse = ()=>{
    //     ElMessageBox.confirm('请输入您所需要充值的金额','充值',{
    //         confirmButtonText: '确认',
    //         cancelButtonText: '取消',
    //         type: 'success',
    //         draggable: true,
            
    //     }).then(()=>{}).catch(()=>{})
    // }
    const showPurse = ()=>{
        console.log(czSize.value)
        cz.value = true
    }
    const closeBe = ()=>{
        ElMessageBox.confirm('操作还未完成，是否退出','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true,
            
        }).then(()=>{
            cz.value = false
            tx.value = false
        }).catch(()=>{})
    }

    const handleCz = ()=>{
        lock_1.value = true
        service.post('/game/money/add?m='+czSize.value+'&type=TOPUP')
            .then(res=>{
                if(res.data.code==200){
                    ElMessage({
                        message: '跳转支付页面',
                        type: 'success',
                        duration: 1000
                    })
                    re = res.data.data
                    lock_1.value = false
                    cz.value = false
                    pay() 
                }
            })
    }

    const pay = () =>{
        const payUrl = 'http://localhost:8062/alipay/pay?subject=账号充值&traceNo=' + re.id + '&totalAmount=' + re.operatorAmount+'&currentUserId='+currentUser.value.id;
        window.open(payUrl, '_blank');
    }

    const handleTx = ()=>{
        lock_1.value = true
        service.post('/game/money/add?m='+txSize.value+'&type=WITHDRAW')
            .then(res=>{
                if(res.data.code==200){
                    ElMessage({
                        message: '正在进行提现，请稍后...',
                        type: 'success',
                        duration: 1000
                    })
                    re = res.data.data
                    service.get('/alipay/money?orderId='+re.id+'&amount='+txSize.value+'&aliId='+aliId.value).then(
                        res=>{

                            let data = res.data;
                            if(data.code==200&&data.data){
                                //更新用户数据
                                updateUserInfo()
                                lock_1.value = false
                                tx.value = false
                                ElMessage({
                                    message: '提现成功！',
                                    type: 'success',
                                })
                            }
                        }
                    )
                }
            })
    }

    async function updateUserInfo(){
        await service.get('/user/current').then(res=>{
            if(res.data.code == 200){
                currentUser.value = res.data.data
                currentUser.value.avatar = fileOps.getFile + currentUser.value.avatar;
                sessionStorage.setItem('user',JSON.stringify(res.data.data))
            }
        })
    }
    const showTx = ()=>{
        tx.value = true
    }
</script>

<style scoped>
.common-layout{
        width: 100%;
        height: 100%;
    }
    .header{
        background-color: #c6e2ff;
    }
    .home_main_per{
        background-color: #ecf5ff;
        /* height: 94%; */
        overflow: auto;
    }
</style>