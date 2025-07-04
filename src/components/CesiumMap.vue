<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {mapDestroy, mapInit} from "@/cesium/map.init.js";

onMounted(() => {
  mapInit()
})

onUnmounted(() => {
  mapDestroy()
})
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

:deep(.cesium-viewer-bottom) {
  display: none;
}
</style>
<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {mapDestroy, mapInit} from "@/cesium/map.init.js";

onMounted(() => {
  mapInit()
})

onUnmounted(() => {
  mapDestroy()
})
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

:deep(.cesium-viewer-bottom) {
  display: none;
}
</style>
