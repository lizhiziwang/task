<script>
  import demo from "../components/demo.vue"
  export default{
    components:{
      demo
    }
  }
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1><br>
    <demo/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


