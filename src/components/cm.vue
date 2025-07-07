<template>
    <div id="cesiumContainer"></div>
<!--    <div id="infoBox"></div>-->
</template>

<script setup>
import {onMounted} from 'vue';
import * as Cesium from 'cesium'
import {SceneMode} from 'cesium'
// 对于 Vite 项目
import aomenModel from '@/assets/aomen.glb';

let viewer;
// 高德地图
var gaodeLayer = new Cesium.UrlTemplateImageryProvider({
            url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            minimumLevel: 4,
            maximumLevel: 18
        })

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
  const Cartesian = Cesium.Cartesian3.fromDegrees(119.56985, 34.20513, 11000000)
  // const Cartesian = Cesium.Cartesian3.fromDegrees(0, 0, 10)
  console.log(Cartesian, 'Cartesian');
  //viewer是所有Api的开始
  viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false, //是否显示动画控件
    baseLayerPicker: false, //是否显示图层选择控件
    geocoder: true, //是否显示地名查找控件
    timeline: false, //是否显示时间线控件
    sceneModePicker: true, //是否显示投影方式控件
    navigationHelpButton: false, //是否显示帮助信息控件
    fullscreenButton: true, //是否显示全屏按钮
    infoBox: false, //是否显示点击要素之后显示的信息
    homeButton: true, //是否显示Home按钮
    // imageryProvider:esri,//自定义图层
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: false,//水面特效
      // requestVertexNormals: true
    }),//地形图层也就是三维地图
  })
  console.log(viewer.imageryProvider);
  // 清除默认图层
  viewer.imageryLayers.removeAll();
  viewer.scene.mode = SceneMode.COLUMBUS_VIEW;
  // viewer.imageryLayers.addImageryProvider(esri)

  viewer.imageryLayers.addImageryProvider(gaodeLayer)

  // addJapan3D();


  // let tiandiyu = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
  //   url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f0ef2118b8ccd76bfd9acc8217e5dab0",
  //   layer: "img",
  //   style: "default",
  //   format: "image/jpeg",
  //   tileMatrixSetID: "w",
  //   show: true
  // }));
  // // 错误处理
  // tiandiyu.errorEvent.addEventListener((error) => {
  //   console.error("天地图图层加载错误:", error);
  //   alert("地图加载失败，请检查控制台错误信息");
  // });
  // console.log(tiandiyu)

  //相机


// // 创建相机初始位置和朝向
// var initialPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
// var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);

//   viewer.camera.setView({
//     destination: initialPosition,//初始位置
//     orientation: {//初始方向
//       heading: initialOrientation.heading, //初始方向
//       pitch: initialOrientation.pitch, //初始方向
//       roll: initialOrientation.roll,
//     }
//   })

  // //添加模型
  // addThreeDTiles({
  //   url: 'src/assets/output.json',
  //   show:true,

  // });
  // console.log(viewer.imageryLayers.removeAll())

  // viewer.entities.add({
  //           polygon: {
  //               hierarchy: Cesium.Cartesian3.fromDegreesArray([
  //                   -75.0, 35.0,
  //                   -80.0, 35.0,
  //                   -80.0, 40.0,
  //                   -75.0, 40.0
  //               ]),
  //               material: Cesium.Color.RED.withAlpha(0.8)
  //           },
  //           label:{
  //             text: "Philadelphia",
  //             // font: "24px Helvetica",
  //             // fillColor: Cesium.Color.SKYBLUE,
  //             // outlineColor: Cesium.Color.BLACK,
  //             // outlineWidth: 2,
  //             // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  //           },
  //           description: '这是一个多边形要素'
  //       });
  // viewer.terrainProvider = Cesium.createWorldTerrain();

  // 使用gld模型加载

  const entity = viewer.entities.add({
    name: "aomen.glb",
    position: Cesium.Cartesian3.fromDegrees(		113.56320664971413,22.163772045553486, -100),
    model: {
      uri: aomenModel,
      // minimumPixelSize: 128,
      // maximumScale: 200,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND  // 自动贴合地形
    }
  });
  // // 标记坐标点
  // viewer.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(		113.56320664971413,22.163772045553486, -50),
  //   point: {
  //     color: Cesium.Color.RED,
  //     pixelSize: 10,
  //     outlineColor: Cesium.Color.WHITE,
  //     outlineWidth: 2
  //   },
  //   description: "模型坐标点"
  // });
  // viewer.trackedEntity = entity;
  // console.log(entity)


        // infoView();

  // 添加地图点击事件
  var handlePoint = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handlePoint.setInputAction(function (event) {
        let pick = viewer.scene.pick(event.position)
        console.log(pick.id.pointData)
        if(!pick){
            return
        }
        console.log(pick)
        //用以下条件判断只有点击到点上才会触发此动作
        if(pick&&pick.id&&pick.id.pointData){
    console.log('进行点击')
    //可以在这里去写点击后需要执行什么
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

})

const addJapan3D = async () => {
  try {
    // 设置 Cesium Ion 访问令牌（重要！）
    Cesium.Ion.defaultAccessToken = '你的_Cesium_Ion_访问令牌';

    // 创建地形提供者（使用推荐方式）
    // 正确设置地形提供者
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: Cesium.IonResource.fromAssetId(2275207),
      requestVertexNormals: true, // 请求法线以获得更好的光照效果
      requestWaterMask: true,     // 请求水面效果
    });

    // 其他设置（可选）
    viewer.scene.globe.enableLighting = true; // 启用地形光照
    viewer.scene.globe.depthTestAgainstTerrain = true; // 使模型能贴地形显示

    // 定位到日本区域
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(139.767, 35.681, 5000),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      }
    });

    console.log('日本3D地形加载成功');
  } catch (error) {
    console.error('加载地形时出错:', error);
  }
};

//
// async function addThreeDTiles( option) {
//
//   viewer.scene.globe.depthTestAgainstTerrain = true
//
//   // ! 写法二：
//   let tileset = {}
//   if (typeof option.url == 'number') {
//     tileset = await Cesium.Cesium3DTileset.fromIonAssetId(url, option);
//   } else {
//     tileset = new  Cesium.Cesium3DTileset(option)
//   }
//
//   viewer.scene.primitives.add(tileset);
//   console.log(viewer.scene.primitives)
//
//
//   tileset.readyPromise.then(function () {
//       // 3D Tiles 加载成功
//       console.log('3D Tiles loaded successfully');
//       // 设置相机视角以查看 3D Tiles
//       viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, 0.5, tileset.boundingSphere.radius * 5.0));
//       viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
//   }).otherwise(function (error) {
//       // 3D Tiles 加载失败
//       console.log('Failed to load 3D Tiles: ', error);
//   });
//
//   return tileset // 返回模型对象
// }
//
//
//   const infoView = ()=>{
//     const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
//
//     // 监听鼠标移动事件
//     handler.setInputAction(function (movement) {
//         const pickedObject = viewer.scene.pick(movement.endPosition);
//         const infoBox = document.getElementById('infoBox');
//
//         if (Cesium.defined(pickedObject) && pickedObject.id) {
//             const entity = pickedObject.id;
//             if(infoBox.style.display === 'block'){
//               return;
//             }
//             if (entity.description) {
//                 // 显示信息框
//                 infoBox.style.display = 'block';
//                 infoBox.style.left = movement.endPosition.x + 'px';
//                 infoBox.style.top = movement.endPosition.y + 'px';
//                 infoBox.innerHTML = entity.description.getValue();
//             }
//         } else {
//             // 隐藏信息框
//             // infoBox.style.display = 'none';
//         }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
//   }
</script>

<style scoped>
*:deep(.cesium-viewer-bottom) * {
  display: none !important;
}
/* #cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
} */


#cesiumContainer {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        #infoBox {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px;
            border-radius: 5px;
            display: none;
        }

</style>