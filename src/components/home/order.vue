<template>
    <div style="width: 100%;">
            <el-steps style="max-width: 600px" :active="1" :align-center="true">
                <el-step title="Step 1" :icon="NoPay" />
                <el-step title="Step 2" :icon="Upload" />
                <el-step title="Step 3" :icon="Picture" />
            </el-steps>
        </div>
</template>

<script setup>
    import { Edit, Picture, Upload } from '@element-plus/icons-vue'
    import  NoPay from '../icons/NoPay.vue'
    

</script>