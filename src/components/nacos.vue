<template>
    <div>
        <div @click="tiaozhuan">
            <button>跳转</button>
        </div>
        <!-- http://localhost:8848/nacos/index.html#/login -->
        <iframe 
            src="http://localhost:8848/nacos/index.html#/configurationManagement?dataId=&group=&appName=&namespace=&pageSize=&pageNo="
            allowfullscreen="true"
            ref="iframe" 
            id="idram" >
        </iframe>
    </div>
</template>

<script>

    export default {
        data () {
            return {
            }
        },
        mounted () {
            // 这里就拿到了iframe的对象
            console.log(this.$refs.iframe)
        },
        methods:{
            tiaozhuan(){
                const url = "http://localhost:8848/nacos/index.html#/configurationManagement?dataId=&group=&appName=&namespace=&pageSize=&pageNo=";

                // 使用window.open()在新窗口或标签页中打开链接
                window.open(url, "_blank");
            }
        }
    }
</script>

<style>
#idram{
    width: 100%;
    height: 800px;
}
</style>