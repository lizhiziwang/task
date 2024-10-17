<template>
    <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium'
console.log(Cesium, 'CesiumCesium');
onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDQ5MmY1YS0wNjU0LTQ5MjgtOGYxMC1hZDZkN2Q2NzY4MDUiLCJpZCI6MTk2NDI0LCJpYXQiOjE3MTg3NjEzMjZ9.3A3qMen6eJ_cFkYvRrSE3iCJ-k2fqzMdnCMkZ1XjND8'
  //自定义图层
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
    enablePickFeatures: false
  })
  //返回的是笛卡尔坐标   经纬度转笛卡尔坐标
  //经度 纬度 高度
  //响水县坐标
  const Cartesian = Cesium.Cartesian3.fromDegrees(119.56985, 34.20513, 10000)
  console.log(Cartesian, 'Cartesian');
  //viewer是所有Api的开始
  const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false, //是否显示动画控件
    baseLayerPicker: false, //是否显示图层选择控件
    geocoder: false, //是否显示地名查找控件
    timeline: false, //是否显示时间线控件
    sceneModePicker: false, //是否显示投影方式控件
    navigationHelpButton: false, //是否显示帮助信息控件
    fullscreenButton: false, //是否显示全屏按钮
    // infoBox: false, //是否显示点击要素之后显示的信息
    homeButton: false, //是否显示Home按钮
    // imageryProvider:esri,//自定义图层
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,//水面特效
      // requestVertexNormals: true
    }),//地形图层也就是三维地图
  })
 
 
  //相机
  viewer.camera.setView({
    destination: Cartesian,//初始位置
    orientation: {//初始方向
      heading: Cesium.Math.toRadians(-50), //初始方向
      pitch: Cesium.Math.toRadians(-50), //初始方向
      roll: Cesium.Math.toRadians(0),
    }
  })
 
})
</script>

<style scoped>
/* *:deep(.cesium-viewer-bottom) * {
  display: none !important;
} */
#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>