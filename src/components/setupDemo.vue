<template>
    <div>
        <span>{{ cout }}</span>
        <button @click="add">add</button>

        <div v-for="(item,index) in list" :key="item.uniqueId || index">
            <span v-bind:key="index">{{ item.name }}</span>
        </div>
    </div>
</template>


<script setup>

    import {ref,onMounted} from 'vue'

    // let cout = ref(0);
    let cout = ref(0);
    let po = defineProps({
        msg:String,
        num:String,
        data:Array
    })
    let list = ref(po.data)



    // console.log(po.msg+po.num)
    // console.log(po.data.length)

    function add(){
        cout.value++;
        console.log(cout.value)
    }

    onMounted(()=>{
        cout.value++;
        console.log(cout.value)
    })

</script>