<!-- <template>
    <div style="width: 100%; height: 100%;">
        
        
    </div>
</template>

<script setup>
    import { ref, defineProps,onMounted ,watch,markRaw} from 'vue'
    import UserAdmin from '../home/UserAdmin.vue';

    let currentComponent = ref(markRaw(UserAdmin))
    let mess = ref(null);

    let p = defineProps({
        message: String,
        comName:String
    })

    onMounted(() => {
        mess.value = p.message;
        if(p.comName !== undefined){
            currentComponent.value = markRaw(p.comName);
            console.log("currentComponent.value",currentComponent.value)
        }
        
    });

    // 使用watch来监听message的变化
    watch(
        () => p.message,
        (newValue, oldValue) => {
            // 当message的值发生变化时，执行以下操作
            console.log(`message从 ${oldValue} 变为了 ${newValue}`);
            mess.value = newValue;
        }
    );

</script> -->