// // map.config.js
// import * as Cesium from 'cesium';
 
// const tiandituKey = "f0ef2118b8ccd76bfd9acc8217e5dab0";
// const tiandituImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
//   url : `https://t{s}.tianditu.gov.cn/img_w/wmts?tk=${tiandituKey}`,
//   layer : 'img',
//   style : 'default',
//   format : 'tiles',
//   tileMatrixSetID : 'w',
//   subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//   maximumLevel : 18
// });
 
// // 加载天地图影像注记
// export const tiandituAnnotationProvider = new Cesium.WebMapTileServiceImageryProvider({
//   url : `https://t{s}.tianditu.gov.cn/cia_w/wmts?tk=${tiandituKey}`,
//   layer : 'cia',
//   style : 'default',
//   format : 'tiles',
//   tileMatrixSetID : 'w',
//   subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//   maximumLevel : 18
// });
 
// // 地图配置项
// export const mapOptions = () => {
//   return {
//     infoBox: false, // 右侧信息框
//     selectionIndicator: false, //选中状态
//     imageryProvider: tiandituImageryProvider , // 设置影像地图
//     // terrainProvider: Cesium.createWorldTerrain({
//     //   requestVertexNormals: true,  //可以增加法线，用于提高光照效果
//     //   requestWaterMask: true // 水面特效
//     // }), // 地形图层
//     scene3DOnly: false,
//     timeline: false, //时间轴控件
//     animation: false, //动画控件
//     geocoder: false, //搜索控件
//     homeButton: false, //主页控件
//     sceneModePicker: false, //投影控件
//     baseLayerPicker: false, //图层控件
//     navigationHelpButton: false, //帮助控件
//     fullscreenButton: false, //全屏控件
//   }
// }