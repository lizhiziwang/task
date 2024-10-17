<template>
  <setupDemo :msg="msg" :num='num' :data="list" ></setupDemo>
</template>

<script setup>
    import setupDemo from './setupDemo.vue';

    let msg = 'test';
    let num = '123';

    let list = [
        {name:'张三',age:18},
        {name:'李四',age:20},
        {name:'王五',age:22},
    ];

</script>

<style>

</style>