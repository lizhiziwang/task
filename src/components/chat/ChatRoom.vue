<template>
    <div class="chat-room">

        <message :data="data" ></message>
        <div class="send">
            <el-input v-model="input" style="width: 92%;" class="textIn"/>
            <el-button type="primary" :icon="IconSend" >发送</el-button>
        </div>
    </div>
</template>

 <script setup>
    import message from './message.vue'

 </script>

 <style>
    .chat-room{
        width: 100%;
        height: 100%;
    }
 
    .send{
        position: fixed;
        bottom: 2%;
        right: 1%;
        width: 78%;
        display: flex;
        z-index: 99;
    }
 </style>