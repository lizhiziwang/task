<template>
    <div style="width: 100%;">
        <div id="one" class="one-mess" v-for="(item,index) in data" :key="index" style="width: 100%;">
            <div class="all-mess" v-if="item.id != userId" id="bv">
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
    </div>
</template>


<script setup>
    import { ref,onMounted } from 'vue'

    let po = defineProps({
        data:Array
    })
    let data = ref(po.data)
    let userId = ref(null)

    onMounted(()=>{
        userId.value = sessionStorage.getItem('id')
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
        margin-bottom: 15px;
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