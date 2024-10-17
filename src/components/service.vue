<template>
      <button @click="requestFullscreen">进入全屏</button>
    <div @click="requestFullscreen">
        <iframe src="http://localhost:8071/#/dashboard/app/sentinel-dashboard" id="idram" allow="payment" ref="ifram"></iframe>
    </div>
</template>
<script>
    export default{
        data(){
            return{}
        },
        methods:{
            requestFullscreen() {
            const el = this.$refs.ifram || document.documentElement; // 默认使用document.documentElement，也可以根据实际需求替换为其他元素的ref引用

            // 使用条件判断和`.call()`方法调用正确的全屏API
            (el.requestFullscreen ||
                el.webkitRequestFullscreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen).call(el);
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