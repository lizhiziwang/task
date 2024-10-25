<template>
        <div id="one" class="one-mess" v-for="(item,index) in data" :key="index" style="width: 100%;">
            <div class="all-mess" v-if="item.uid != userId" id="bv">
                <el-avatar :size="50" 
                    :src="item.imgUrl"/>
                <div class="message">
                    <div class="text">
                        <span >{{item.msg}}</span>
                    </div>
                </div>
            </div>
            <div class="all-mess" v-else >
                <div style="display: flex;margin-left: auto;">
                    <div class="message" style="background-color: #c0d2ad;">
                        <div class="text">
                            <span >{{item.msg}}</span>
                        </div>
                    </div>
                    <el-avatar :size="50" :src="item.imgUrl"/>
                </div>
            
            </div>
        </div>
</template>


<script setup>
    import { ref,onMounted ,reactive,watch,onUpdated} from 'vue'

    let po = defineProps({
        data:Array
    })
    let data = ref(po.data)
    let userId = ref(null)

    onMounted(()=>{
        userId.value = JSON.parse(sessionStorage.getItem("user")).id
        console.log("当前chatI d:"+userId.value)
    })


    watch(() => po.data, (newData) => {
        data.value = newData
    }, { deep: true })

    onUpdated(() => {
        console.log("Component updated. data:", data)
    })

</script>

<style>
    .message{
        min-height: 40px;
        background-color: #4CB4E4;
        max-width: 300px;
        padding: 0px 5px 3px 5px;
        align-content: center;
        border-radius: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .all-mess{
        display: flex;
        margin-bottom: 30px;
        width: 100%;
        padding-right: 0px;
    }
    .text{
        margin: 8px;
    }
    #bv{
        width: 100%;
    }
</style>