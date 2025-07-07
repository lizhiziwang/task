<template>
  <div style="width: 100%;height: 100%;position: relative">
      <div id="map" class="map-container" ref=mapContainer></div>
    <div id="popupContainer" class="esri-popup esri-widget"  style="position: absolute; top: 20px; left: 20px; z-index: 100;background-color: white"></div>
    <div id="uiContainer" class="esri-ui esri-widget"  style="position: absolute; top: 20px; left: 20px; z-index: 99;"></div>

    <!--        <el-scrollbar height="10%" >-->
    <div style="width: 100%;height: 300px">
        <el-button @click="addPoint" style="right: 0" type="primary">添加点</el-button>
        <el-button @click="addLine" style="right: 0" type="primary">添加线</el-button>
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
import WebTileLayer from "@arcgis/core/layers/WebTileLayer"
import BaseMap from "@arcgis/core/BaseMap"

const mapContainer = ref(null);
let mapView = null;
let graphicsLayer = new GraphicsLayer();

onMounted(  async() => {
  await nextTick();
  initMap();
});

const map = new Map({
  basemap:new BaseMap({
    baseLayers: [
      // 天地图-卫星图
      new WebTileLayer({
        urlTemplate: "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=f0ef2118b8ccd76bfd9acc8217e5dab0",
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        visible: true
      })
    ]
  }),
  layers: [graphicsLayer]
});


const initMap =  () => {

  mapView = new MapView({
    map: map,
    container: mapContainer.value,
    center: [102.92934063304513, 25.102234987110343],
    zoom: 5,
    constraints: {
      minZoom: 3,
      maxZoom: 15,
      snapToZoom: false,
    },
    popup: {
      actions: null,
      autoOpenEnabled:false,
      dockEnabled: false,
      alignment:'auto',
      collapsed:false,
      // 关键配置：禁用停靠按钮
      dockOptions: {
        buttonEnabled: false, // 移除停靠按钮
        breakpoint: false,    // 禁用响应式停靠
        position: "bottom-right" // 可选：设置默认停靠位置（仅作参考，实际不会显示）
      },

      // maxHeight: 300 ,// 设置 popup 的最大高度
      // container:
      container: document.getElementById('popupContainer')
    },
    ui:{
      // container:document.getElementById('uiContainer'),

    }
  });

  mapView.ui.remove("attribution");
  mapView.ui.add('zoom',{
    position: "top-right"
  })
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
      content: '这是一个point',
      overwriteActions:true
    }
  });
  graphicsLayer.add(pointGraphic);
  mapView.goTo({
    center: [102.92934063304513, 25.102234987110343]
  })

};
const addLine  = () =>{
  const polylineGraphic = new Graphic({
    geometry: {
      type: "polyline",
      paths: [
        [-111.3, 52.68],
        [-98, 49.5],
        [-93.94, 29.89]
      ]
    },
    symbol: {
      type: "simple-line",
      color: [226, 119, 40],
      width: 4
    }
  });
  graphicsLayer.add(polylineGraphic);
  mapView.goTo({
    center: [-111.3, 52.68]
  })
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 90vh;
  min-height: 90vh;
  position: relative; /* 添加相对定位 */
}


:deep(#popupContainer > .esri-popup__main-container){
  padding-left: 20px;
  padding-bottom: 20px;
  width: auto;
  min-width: 280px;
  min-height: 250px;
}
.esri-view-width-xlarge .esri-popup__main-container {
  width: auto;
}
.esri-popup__main-container {

}
</style>
