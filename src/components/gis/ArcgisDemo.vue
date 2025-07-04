<template>
  <div style="width: 100%;height: 100%">
      <div id="map" class="map-container" ref="mapContainer"></div>
<!--        <el-scrollbar height="10%" >-->
    <div style="width: 100%;height: 300px">
        <el-button @click="addPoint" style="right: 0" type="primary">添加点</el-button>
      </div>
<!--    </el-scrollbar>-->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

const mapContainer = ref(null);
let mapView = null;
let graphicsLayer = new GraphicsLayer();

onMounted( () => {
  // await nextTick();
  initMap();
});

const map = new Map({
  basemap: 'dark-gray',
  layers: [graphicsLayer]
});

const initMap =  () => {

  mapView = new MapView({
    map: map,
    container: 'map',
    center: [102.92934063304513, 25.102234987110343],
    zoom: 5,
    constraints: {
      minZoom: 3,
      maxZoom: 15,
      snapToZoom: false,
    },
    popup: {
      autoOpenEnabled:true,
      dockEnabled: true,
      alignment:'top-left',
      maxHeight: 300 ,// 设置 popup 的最大高度
      // container:
    },
    ui:{
      container: mapContainer.value // 将 UI 直接渲染到地图容器内
    }
  });

  mapView.ui.remove("attribution");
  mapView.ui.remove('zoom');

};

onUnmounted(() => {
  if (mapView) {
    mapView.destroy();
    mapView = null;
  }
});

const addPoint = () => {
  const pointGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: 102.92934063304513,
      latitude: 25.102234987110343
    },
    // symbol: {
    //   type: "simple-marker",
    //   style: "square",
    //   color: "blue",
    //   size: "8px",
    //   outline: {
    //     color: [255, 255, 0],
    //     width: 3
    //   }
    // },
    popupTemplate: {
      title: '点',
      content: '这是一个point'
    }
  });
  graphicsLayer.add(pointGraphic);
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 90vh;
  min-height: 90vh;
  position: relative; /* 添加相对定位 */
}
</style>
