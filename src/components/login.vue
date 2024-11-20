<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">用户登录</div>
            <el-input  placeholder="用户名" v-model="username"></el-input>
            <el-input  placeholder="密码" v-model="pwd" show-password/>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
        
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import {service} from '@/components/js/http.js'
    import { useRouter } from 'vue-router'
    import fileOps from './js/file'
    // import axios from 'axios';

    const username = ref('kiri')
    const pwd = ref('123456')
    const router = useRouter()
    function login(){
        console.log(router)
        service.get('/user/login?'+'userName='+username.value+'&password='+pwd.value)
        .then(res=>{
            let data = res.data.data;
            console.log(data)
            if(res.data.code === 200){
                // let e = JSON.parse(data)
                // data.user.avatar = fileOps.getFile + data.user.avatar;
                sessionStorage.setItem('user',JSON.stringify(data.user));
                sessionStorage.setItem('token',data.token);
                console.log(data.token)
                console.log(data.user.id)
                router.push({path:'/game/home'})
            }
            console.log(res)
        })
    }
</script>

<style scoped>

    .login-container{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        z-index: 999;
    }
    .login-box{
        width: 400px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px #ccc;
        padding: 20px;
    }
    .login-title{
        text-align: center;
        font-size: 30px;
        margin-bottom: 30px;
    }
    .login-form{
        width: 300px;
        margin: 0 auto;
    }

    
</style>