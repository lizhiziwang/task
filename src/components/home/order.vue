<template>
    <div style="width: 500px; padding: 20px;">
        <div>
            <el-steps style="max-width: 600px" :active="cuSetup" :align-center="true">
                <el-step title="待支付" />
                <el-step title="已支付" />
                <el-step title="待发货" />
            </el-steps>
        </div>
        <div v-if="cuSetup==1" style="height: 300px;position: relative;">
            <div style="margin-top: 20px">
                <el-descriptions  :column="1" border title="订单详情">
                    <el-descriptions-item label-align="center" align="center" label="订单商品">
                        <div v-for="(item, index) in order.products" :key="index" style="display: flex;align-items: center;width: 100%;justify-content: center;">
                            <div class="product-info">{{ item.gameName }}</div>
                            <el-image class="product-info" :src="fileOps.getFile+item.showImg"/>
                            <div class="product-info">{{ item.price }}</div>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center" label="订单编号">{{props.order.id}}</el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center" label="订单金额">{{props.order.sum}}￥</el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="order-ftoor">
                <el-button type="danger" v-loading.fullscreen.lock="lock" @click="cancel">取消订单</el-button>
                <el-button type="primary" @click="pay" v-loading.fullscreen.lock="lock">立即付款</el-button>
            </div>
        </div>
        <div v-if="cuSetup==2" style="height: 300px;position: relative;">
            <div style="margin-top: 20px">
                <el-descriptions title="收货信息" column="1" border="false">
                    <el-descriptions-item label-align="center" align="center" label="收货人">
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center; ">
                            <el-avatar :src="currentUser.avatar" :size="60"/>
                            {{currentUser.name}}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center" label="手机号"><el-input v-model="currentUser.phone"/></el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center" label="位置"><el-input v-model="currentUser.location"/></el-descriptions-item>
                    
                </el-descriptions>
            </div>
            <div class="order-ftoor">
                <el-button type="danger" @click="cuSetup=1">上一步</el-button>
                <el-button type="primary" @click="saveInfo" v-loading.fullscreen.lock="lock">确认</el-button>
            </div>
        </div>
        <div v-if="cuSetup==3" style="height: 300px;position: relative;">
            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center; margin-top: 50px;">
                <svg t="1730874963406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4299" width="80" height="80"><path d="M698.181818 372.363636h93.090909l186.181818 186.181819v93.090909H698.181818V372.363636z" fill="#1296db" p-id="4300"></path><path d="M930.909091 512.768V791.272727a46.545455 46.545455 0 0 1-46.545455 46.545455h-48.872727a116.363636 116.363636 0 0 1-228.072727 0H370.036364a116.363636 116.363636 0 0 1-228.072728 0H93.090909a46.545455 46.545455 0 0 1-46.545454-46.545455V139.636364a46.545455 46.545455 0 0 1 46.545454-46.545455h418.909091a46.545455 46.545455 0 0 1 46.545455 46.545455v186.181818h185.413818a22.923636 22.923636 0 0 1 16.849454 6.679273l163.421091 163.42109a22.853818 22.853818 0 0 1 6.679273 16.849455zM256 884.363636a69.818182 69.818182 0 1 0-69.818182-69.818181 69.818182 69.818182 0 0 0 69.818182 69.818181z m256-512V139.636364H93.090909v651.636363h48.872727a116.363636 116.363636 0 0 1 228.072728 0H512V372.363636z m209.454545 512a69.818182 69.818182 0 1 0-69.818181-69.818181 69.818182 69.818182 0 0 0 69.818181 69.818181z m-69.818181-302.545454v-209.454546h-93.090909v418.909091h48.872727a116.363636 116.363636 0 0 1 228.072727 0H884.363636v-186.181818h-209.454545a23.272727 23.272727 0 0 1-23.272727-23.272727z m83.781818-209.454546H698.181818v186.181819h186.181818v-37.236364z" fill="#1296db" p-id="4301"></path></svg>
                <span style="margin-top: 20px">
                    已通知卖家抓紧送货中...
                </span>
            </div>
            <div class="order-ftoor">
                <el-button type="primary" @click="close">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, reactive, onMounted,defineProps} from 'vue'
    import fileOps from '../js/file'
    import {service} from '@/components/js/http.js';
    import { ElMessage } from 'element-plus';

    const props = defineProps({
        order: Object
    })
    const emit = defineEmits({
        closeTarget:(item)=>{
            return item;
        }
    })

    // let order = ref(props.order)
    let cuSetup = ref(1)
    let lock = ref(false)
    let lock1 = ref(false)
    let currentUser = ref({})

    

    onMounted(()=>{
        currentUser.value = JSON.parse(sessionStorage.getItem('user'))
    })

    // order.value = {
    //     id:"1853734719110459392",
    //     sum:300,
    //     products:[
    //         {
    //             gameName:"5656",
    //             showImg:'1853336314211106816.png',
    //             gameId:"43333",
    //             id:"1853336453646548992",
    //             price:188
    //         },
    //         {
    //             gameName:"5656",
    //             showImg:'1853336314211106816.png',
    //             gameId:"43333",
    //             id:"1853336453646548992",
    //             price:188
    //         }
    //     ]
    // }

    function pay(){
        lock.value = true
        service.get('/order/pay/'+props.order.id).then(
            res=>{
                if(res.data.code == 200){
                    cuSetup.value = 2
                    ElMessage.success('支付成功！')
                }else{
                    ElMessage.error(res.data.message)
                }
                lock.value = false
            }
        )
    }

    function cancel(){
        lock.value = true
        service.get('/order/cancel/'+props.order.id).then(
            res=>{
                if(res.data.code == 200){
                    ElMessage.success('取消成功！')
                }else{
                    ElMessage.error(res.data.message)
                }
                lock.value = false
                close()
            }
        )
    }

    function saveInfo(){
        lock.value = true
        let de = {
            id:currentUser.value.id,
            phone:currentUser.value.phone,
            location:currentUser.value.location
        }
        service.post('/user/update2',de).then(
            res=>{
                if(res.data.code==200){
                    ElMessage.success('保存成功')
                    cuSetup.value = 3
                }else{
                    ElMessage.error(res.data.message)
                }
                lock.value = false
            }
        )
    }

    const close = ()=>{
        console.log('close')
        emit('closeTarget',true)
    }

</script>

<style scoped>

    .product-info{
        margin-right: 2px;
    }
    .order-ftoor{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        position: absolute;
        bottom: 0;
    }
</style>