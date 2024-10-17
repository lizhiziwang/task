// // map.init.js
 
// import {ref} from 'vue'
// import * as Cesium from 'cesium'
// import {mapOptions, tiandituAnnotationProvider} from "@/cesium/map.config.js";
 
// const cesium_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDQ5MmY1YS0wNjU0LTQ5MjgtOGYxMC1hZDZkN2Q2NzY4MDUiLCJpZCI6MTk2NDI0LCJpYXQiOjE3MTg3NjEzMjZ9.3A3qMen6eJ_cFkYvRrSE3iCJ-k2fqzMdnCMkZ1XjND8'
 
// export const map = ref(null)
 
// export const mapInit = () => {
//   Cesium.Ion.defaultAccessToken = cesium_token
//   map.value = new Cesium.Viewer('cesiumContainer', mapOptions())
//   // 天地图注记
//   map.value.imageryLayers.addImageryProvider(tiandituAnnotationProvider);
//   // 启用深度检测
//   map.value.scene.globe.depthTestAgainstTerrain = true
// }
 
// export const mapDestroy = () => {
//   if (map.value) {
//     map.value.destroy()
//     map.value = null;
//   }
// }