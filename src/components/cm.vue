<template>
    <div id="cesiumContainer"></div>
<!--    <div id="infoBox"></div>-->
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium'

  let viewer;

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
    baseLayerPicker: true, //是否显示图层选择控件
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
 
  //相机
  viewer.camera.setView({
    destination: Cartesian,//初始位置
    orientation: {//初始方向
      heading: Cesium.Math.toRadians(10), //初始方向
      pitch: Cesium.Math.toRadians(-90), //初始方向
      roll: Cesium.Math.toRadians(0),
    }
  })

  // //添加模型
  // addThreeDTiles({
  //   url: 'src/assets/output.json',
  //   show:true,

  // });
  console.log(viewer.imageryLayers.removeAll())

  viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    -75.0, 35.0,
                    -80.0, 35.0,
                    -80.0, 40.0,
                    -75.0, 40.0
                ]),
                material: Cesium.Color.RED.withAlpha(0.8)
            },
            label:{
              text: "Philadelphia",
              // font: "24px Helvetica",
              // fillColor: Cesium.Color.SKYBLUE,
              // outlineColor: Cesium.Color.BLACK,
              // outlineWidth: 2,
              // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            },
            description: '这是一个多边形要素'
        });


        infoView();
 
})


async function addThreeDTiles( option) {

  viewer.scene.globe.depthTestAgainstTerrain = true

  // ! 写法二：
  let tileset = {}
  if (typeof option.url == 'number') {
    tileset = await Cesium.Cesium3DTileset.fromIonAssetId(url, option);
  } else {
    tileset = new  Cesium.Cesium3DTileset(option)
  }

  viewer.scene.primitives.add(tileset);
  console.log(viewer.scene.primitives)


  tileset.readyPromise.then(function () {
      // 3D Tiles 加载成功
      console.log('3D Tiles loaded successfully');
      // 设置相机视角以查看 3D Tiles
      viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, 0.5, tileset.boundingSphere.radius * 5.0));
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }).otherwise(function (error) {
      // 3D Tiles 加载失败
      console.log('Failed to load 3D Tiles: ', error);
  });

  return tileset // 返回模型对象
}


  const infoView = ()=>{
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // 监听鼠标移动事件
    handler.setInputAction(function (movement) {
        const pickedObject = viewer.scene.pick(movement.endPosition);
        const infoBox = document.getElementById('infoBox');

        if (Cesium.defined(pickedObject) && pickedObject.id) {
            const entity = pickedObject.id;
            if(infoBox.style.display === 'block'){
              return;
            }
            if (entity.description) {
                // 显示信息框
                infoBox.style.display = 'block';
                infoBox.style.left = movement.endPosition.x + 'px';
                infoBox.style.top = movement.endPosition.y + 'px';
                infoBox.innerHTML = entity.description.getValue();
            }
        } else {
            // 隐藏信息框
            infoBox.style.display = 'none';
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
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