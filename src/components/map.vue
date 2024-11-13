<template>
    <div id="map" class="map"></div>
    <div id="op" style="width: 100%;">
      <el-button type="primary" @click="drawLine">线</el-button>
      <el-button type="primary">面</el-button>
      <button id="rotate" class="btn btn-primary" @click="rotate">旋转</button>
      <input type="text" v-model="wkt">
      <button id="rotate" class="btn btn-primary" @click="draw">绘制</button>
      <button id="rotate" class="btn btn-primary" @click="to3D">切换</button>
    </div>
    <div style="margin-top: 20px;">
      <el-input
        v-model="wkt"
        style="width: 100%"
        :rows="20"
        type="textarea"
        placeholder="请输入文本"/>
    </div>
</template>
<script setup>
  import { ref,onMounted } from "vue"
  import "ol/ol.css";
  import Map from "ol/Map";
  import WKT from "ol/format/WKT";
  import Vector from "ol/source/Vector";
  import View from "ol/View";
  import Projection from "ol/proj/Projection"
  //导入相关模块
  import { Tile as TileLayer } from 'ol/layer'
  import { TileWMS, XYZ } from 'ol/source'
  import { Vector as VectorLayer } from 'ol/layer';
  import VectorTileLayer from 'ol/layer/VectorTile';  
  import VectorTileSource from 'ol/source/VectorTile';
  import MVT from 'ol/format/MVT'
  import Draw from 'ol/interaction/Draw';
  import Feature from 'ol/Feature';

  var map = ref(null)
  // var wkt = ref(null)
  var zoom = ref(null)
  var wkt = ref(null)

  onMounted(() => {
    initMap();
    console.log("最大级别: "+map.value.getView().getMaxZoom())
    console.log("最小级别: "+map.value.getView().getMinZoom())
    map.value.getView().on('change:resolution',()=>{
      let view = map.value.getView();
      zoom.value = view.getZoom()
      console.log("当前的级别: "+zoom.value)
      let extent = view.calculateExtent(map.value.getSize())
      // 假设你有一个extent
      // var extent = [minX, minY, maxX, maxY];
      console.log(extent)

      let resolution = view.getResolution();
      console.log("当前分辨率:"+resolution)
      // getTileInfo()
    })

    // addTileLayer().
  })

  function initMap() {
        // 中间库
    let layer = new TileLayer({
      source: new TileWMS({
        //不能设置为0，否则地图不展示。
        ratio: 1,
        url: "http://10.0.20.144:31080/geoserver/dyw/wms",
        params: {
          layers: "dyw:pipe",
          VERSION: "1.1.1",
          tiled: true,
          tileSize:256,
          format:"image/png",
          type:"wms",
          // CQL_FILTER: "task_id = '1828737322178265167'"
          // viewparams: "condition1:log_id = '1784462986302496840';condition2:log_id = '1784463202015551551';condition3:log_id = '1778328365816131601';"  
        },
        serverType: "geoserver",
      }),
    });
    var t_layer_pipe = new TileLayer({
      source: new TileWMS({
        //不能设置为0，否则地图不展示。
        ratio: 1,
        // url: "http://10.0.20.144:31080/geoserver/develop/wms",
        url: "http://localhost:8080/geoserver/liangw/wms",
        params: {
          layers: "liangw:point",
          VERSION: "1.1.1",
          tiled: true,
          tileSize:256,
          format:"image/png",
          type:"wms",
          // CQL_FILTER: "tenant_id = '1685910164576936014'"
        }
      })
    })
  // 瓦片图层
  // var vectorLayer=new ol.layer.VectorTile({
  //   projection:projection4326,
  //   source:new ol.source.VectorTile({
  //     format:new ol.format.MVT(),
  //     projection:projection4326,
  //     tilePixelRatio:1,
  //     url:'http://localhost:8050/zgis/vector/tile1/{z}/{x}/{y}'
  //   })
  // });
// delete from js_pipe where id >0
    var gaodeLayer = new TileLayer({
          visible: true,
          source: new XYZ({
            visible: true,
            // 高德影像地图
            // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            // 高德矢量地图
            url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scale=1&style=8',
          })
    });
    var projection = new Projection({
      code: 'EPSG:3857',
      units: 'm',
      axisOrientation: 'neu',
      global: false
    });
    map.value = new Map({
    //地图容器ID
      target: "map",
      //引入地图
      layers: [gaodeLayer,t_layer_pipe],
      view: new View({
        projection:projection,
        //地图中心点
        center: [13134894.524877965,2189149.087479662],
        zoom: 4,
        // minZoom:1, // 地图缩放最小级别
      })
    });
  };
  function rotate(){
    this.map.getView().setRotation(Math.PI/2);
  };

  function draw(){
    console.log(wkt.value);

    let format = new WKT();
    let feature = format.readFeature(wkt.value,{
      dataProjection: 'EPSG:4326', //	目标坐标系
      featureProjection: 'EPSG:3857'// 当前坐标系
    });

    let vectorSource = new Vector({
      features: [feature]
    });

    let vectorLayer = new VectorLayer({
      source: vectorSource,
      // style: new Style({
      //   image: new Circle({
      //     radius: 7,
      //     fill: new Fill({
      //       color: 'rgba(200, 20, 0, 0.2)'
      //     }),
      //     stroke: new Stroke({
      //       color: '#000000',
      //       width: 2
      //     })
      //   })
      // })
    });

    console.log(map.value);
    map.value.addLayer(vectorLayer);
  }

  // function addTileLayer(){
  //   let source= new VectorTileSource({  
  //     format: new MVT(),  
  //     url: 'http://localhost:12050/mapserver/mvt/{z}/{x}/{y}', // 修改为你的本地服务器地址和MVT文件路径  
  //     params: {  
  //       // 其他参数，如token等  
  //       tiled: true,
  //       tileSize:256,
  //     }
  //   })
  //   let layer = new VectorTileLayer({
  //     source: source
  //   })
    
  //   // map.value.addLayer(layer);
  // }

  // 获取当前地图的瓦片信息
  function getTileInfo() {
    const view = map.value.getView();
    const resolution = view.getResolution();
    const zoom = view.getZoom();

    // 获取当前视图的像素范围
    const pixelExtent = map.value.getView().calculateExtent(map.value.getSize());
    // 将像素范围转换为地理坐标范围
    const extent = map.value.getCoordinateFromPixel(pixelExtent);
    // 获取当前视图的瓦片网格
    const tileGrid = map.value.getView().getTileGridForViewResolution(resolution);

    // 获取当前视图的瓦片范围
    const tileRange = tileGrid.getTileRange(extent);

    // 获取瓦片行列号
    const xMin = tileRange.minX;
    const yMin = tileRange.minY;
    const xMax = tileRange.maxX;
    const yMax = tileRange.maxY;

    // 输出瓦片信息
    console.log(`Zoom Level: ${zoom}`);
    console.log(`Tile Range: (${xMin}, ${yMin}) to (${xMax}, ${yMax})`);
    console.log(`Extent: ${extent}`);

    // 遍历所有瓦片，输出它们的信息
    for (let x = xMin; x <= xMax; ++x) {
        for (let y = yMin; y <= yMax; ++y) {
            const tileUrl = map.value.getView().getTileUrlFunction({ x, y, z: zoom });
            if (tileUrl) {
                console.log(`Tile (${x}, ${y}, ${zoom}): ${tileUrl}`);
            }
        }
    }
  }
  //绘制线图层


  function drawLine(){
    // 创建一个矢量源，用来存放绘制的几何对象
    var vectorSource = new Vector();
    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
    let draw = new Draw({
      source: vectorSource,
      type: 'LineString'
    });
    map.value.addLayer(vectorLayer);
    map.value.addInteraction(draw);
    // 监听绘图完成事件
    draw.on(
      'drawend',
     (event) => {
      let feature_ = event.feature;
      wkt.value = new WKT().writeFeature(feature_);
      console.log('WKT:', wkt.value);
      // let fa = map.value.removeInteraction(draw);
      // console.log(fa);
    });
  }
  function to3D(){
    this.router.push({ path: '/3D' });
  }

</script>
  
//   <script >
//   //导入基本模块
//   import "ol/ol.css";
//   import Map from "ol/Map";
//   import WKT from "ol/format/WKT";
//   import Vector from "ol/source/Vector";
//   import Verector from "ol/layer/Vector";
//   import View from "ol/View";
//   import Projection from "ol/proj/Projection"
//   //导入相关模块
//   import { Tile as TileLayer } from 'ol/layer'
//   import { TileWMS, XYZ } from 'ol/source'
//   import Style from 'ol/style/Style'
//   import Circle from 'ol/style/Circle'
//   import Fill from 'ol/style/Fill'
//   import Stroke from 'ol/style/Stroke'
// // import Extent from 'ol/extent'

//   export default {
//     data() {
//       return {
//         map: null,
//         wkt:""
//       };
//     },
//     methods: {
//       initMap() {
//         // 中间库
//         let layer = new TileLayer({
//           source: new TileWMS({
//             //不能设置为0，否则地图不展示。
//             ratio: 1,
//             url: "http://10.0.20.144:31080/geoserver/preview/wms",
//             params: {
//               layers: "	preview:access_pipe",
//               VERSION: "1.1.1",
//               tiled: true,
//               tileSize:256,
//               format:"image/png",
//               type:"wms",
//               CQL_FILTER: "task_id = '1828737322178265167'"
//               // viewparams: "condition1:log_id = '1784462986302496840';condition2:log_id = '1784463202015551551';condition3:log_id = '1778328365816131601';"  
//               // viewparams: "condition1:log_id = '1784462986302496840'"  
//               // viewparams: "condition2:log_id = '1784463202015551551'"  
//               // viewparams: "condition3:log_id = '1778328365816131601'"  
//             },
//             serverType: "geoserver",
//           }),
//         });
//         var t_layer_pipe = new TileLayer({
//           source: new TileWMS({
//             //不能设置为0，否则地图不展示。
//             ratio: 1,
//             // url: "http://10.0.20.144:31080/geoserver/develop/wms",
//             url: "http://localhost:8080/geoserver/liangw/wms",
//             params: {
//               layers: "	liangw:t_fittings",
//               VERSION: "1.1.1",
//               tiled: true,
//               tileSize:256,
//               format:"image/png",
//               type:"wms",

//               CQL_FILTER: "tenant_id = '1685910164576936014'"
//             }
//           })
//         })
//       // 瓦片图层
//       // var vectorLayer=new ol.layer.VectorTile({
//       //   projection:projection4326,
//       //   source:new ol.source.VectorTile({
//       //     format:new ol.format.MVT(),
//       //     projection:projection4326,
//       //     tilePixelRatio:1,
//       //     url:'http://localhost:8050/zgis/vector/tile1/{z}/{x}/{y}'
//       //   })
//       // });

//         var gaodeLayer = new TileLayer({
//               visible: true,
//               source: new XYZ({
//                 visible: true,
//                 url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scale=1&style=8',
//               })
//         });

//         var projection = new Projection({
//           code: 'EPSG:3857',
//           units: 'm',
//           axisOrientation: 'neu',
//           global: false
//       });
//         this.map = new Map({
//         //地图容器ID
//           target: "map",
//           //引入地图
//           layers: [gaodeLayer],
//           view: new View({
//             projection:projection,
//             //地图中心点
//             center: [13134894.524877965,2189149.087479662],
//             zoom: 4,
//             // minZoom:1, // 地图缩放最小级别
//           })
//         });
//       },
//       //地图旋转
//       rotate(){
//         this.map.getView().setRotation(Math.PI/2);
//       },
//       // draw(){
//       //   // 解析 WKT 数据
//       //   var format = new WKT();
//       //   var feature = format.readFeature(this.wkt, {
//       //       dataProjection: 'EPSG:4326',
//       //       featureProjection: 'EPSG:3857'
//       //   });
//       //   var vectorSource = new Vector({
//       //     features: [feature]
//       //   });

//       //   // 创建一个矢量图层
//       //   var vectorLayer = new Verector({
//       //     source: vectorSource,
//       //     style: new Style({
//       //       image: new Circle({ // 可以根据需要更改样式
//       //         radius: 7,
//       //         fill: new Fill({
//       //           color: 'rgba(255, 0, 0, 0.2)'
//       //         }),
//       //         stroke: new Stroke({
//       //           color: '#ff0000',
//       //           width: 2
//       //         })
//       //       })
//       //     })
//       //   });

//       //   // 添加矢量图层到地图
//       //   this.map.addLayer(vectorLayer);
//       // },
//     },
//     mounted() {
//       this.initMap();
//     // const extent = Extent.boundingExtent(coordinates[0])
//     // Extent.getCenter(extent)
//     },
//   };
//   </script>
  
  <style scoped>
    #map {
      position: relative; /* 可能需要设置以确保正确布局 */
      width: 100%;
      height: 800px; /* 或者设置一个具体的像素值，如 height: 800px; */
      min-width: 100vh;
      min-height: 80vh;
    }
    /* #op{
        background-color: aqua;
        width: 100%;
        height: 100%;

      }*/
  </style>
