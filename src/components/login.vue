<template>
    <div class="login">
        <input type="text" name="user" placeholder="账号"/><br>
        <input type="text" name="pwd" placeholder="密码"><br>
        <button @click="login()">login</button>
    </div>
</template>

<script>
import router from '../router';
import axios from 'axios'
// vue.prototype.$axios = axios;
    export default{
        methods:{
            login(){
                this.$axios.post('',{
				id:1
                }).then(res=>{
                    console.log(res.data);
                },err=>{
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>
    .login{

        background-color: bisque;
        border-radius: 10%;
        padding: 100px 50px 100px 50px;
    }
</style>