
<template>
    <div style="width: 100%; height: 100%;position: relative;">
        <div id="map" style="width: 100%; height: 100%;min-width: 100%;min-height: 100%;position: absolute;"></div>

    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import {maps} from '@/components/js/layer.js'
    import Map from "ol/Map"
    import WKT from "ol/format/WKT"
    import MVT from "ol/format/MVT"
    import GeoJSON from "ol/format/GeoJSON"
    import Vector from "ol/source/Vector"
    import View from "ol/View"
    import Projection from "ol/proj/Projection"
    import { Tile as TileLayer } from 'ol/layer'
    import { TileWMS, XYZ} from 'ol/source'
    import { Vector as VectorLayer} from 'ol/layer';

    import VectorTileLayer from 'ol/layer/VectorTile';  
    import VectorTileSource from 'ol/source/VectorTile';
    import {defaultLoadFunction} from 'ol/source/VectorTile';
    import {loadFeaturesXhr} from 'ol/featureloader'


    import ElMessage from 'element-plus'
    import Style from 'ol/style/Style'
    import Text from 'ol/style/Text'
    import Fill from 'ol/style/Fill'
    import Circle from 'ol/style/Circle'
    import Stroke from 'ol/style/Stroke'
    import Icon from 'ol/style/Icon'
    import {service,Re_Queue} from '@/components/js/http.js';

    var map = null;
    // const url = 'http://10.0.120.106:12050/pipe/pipe/stream/{z}/{x}/{y}';
    // const url = 'http://10.0.120.106:12050/pipe/pipe/stream';

    const url = 'http://10.0.120.106:12050/mapserver/tile/{z}/{x}/{y}?tenantId=1773355726431895643&theme=press&tableName=t_pipe';


    // 级别
    // var clusterIndexSet = {
    //         city: {
    //             minZoom: 2,
    //             maxZoom: 5,
    //         },
    //         city_:{
    //             minZoom: 5,
    //             maxZoom: 10,
    //         }
    //         ,
    //         district: {
    //             minZoom: 10,
    //             maxZoom: 12,
    //         },
    //         area: {
    //             minZoom: 12,
    //             maxZoom: 15,
    //         },
    //         community: {
    //             minZoom: 15,
    //             maxZoom: 17,
    //         },
    //         b:{
    //             minZoom: 17,
    //             maxZoom: 27,
            
    //         }
    //     };

    let current_level = ''
    let move_zoom = 0;
    let pressData = new Map()
    // vector
    
    var wkt = 'POINT(113.90149133406717 22.719296937819504)';
    // 矢量点图层的建立
    let format = new WKT();
    let feature = format.readFeature(wkt,{
        dataProjection: 'EPSG:4326', //	目标坐标系
        featureProjection: 'EPSG:3857'// 当前坐标系
    });
    // 将所有点添加到矢量数据源
    const source = new Vector({
        features: []
    });
    

  

    // 将矢量数据源添加到矢量图层
    var vectorLayer = new VectorLayer({
        source:source,

        style:function(e){
            var press = e.press;
            var color = 'blue';
            if (press>=0.05&&press<=0.15) {
                color = '#0ebeff';
            } 
            if (press>=0.15&&press<=0.18) {
                color = '#29b0f7';
            } 
            if (press>=0.18&&press<=0.19) {
                color = '#44a2ee';
            } 
            if (press>=0.18&&press<=0.2) {
                color = '#2daef5';
            } 
            if (press>=0.2&&press<=0.22) {
                color = '#38a8f2';
            } 
            if (press>=0.22&&press<=0.24) {
                color = '#7788de';
            } 
            if (press>=0.24&&press<=0.26) {
                color = '#8183db';
            } 
            if (press>=0.26&&press<=0.28) {
                color = '#8c7dd7';
            } 
            if (press>=0.28&&press<=0.30) {
                color = '#a86966';
            } 
            if (press>=0.30&&press<=0.35) {
                color = '#b96055';
            } 
            if (press>=0.35&&press<=0.4) {
                color = '#c41818';
            } 
            

            return new Style({
                stroke: new Stroke({
                        color: color,
                        width: 2
                    })
            })
        }

    });
    const mvt_format = new MVT();
    const mvt_source = new VectorTileSource({
        format: mvt_format,
        url: 'http://10.0.120.106:12050/mapserver/tile/{z}/{x}/{y}?tenantId=1773355726431895643&theme=pressure',
        tileLoadFunction: function(tile, src) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('GET', src);
            xhr.setRequestHeader('Authorization', 'Bearer YOUR_ACCESS_TOKEN'); // 添加自定义请求头
            xhr.onload = () =>{
                if (xhr.status === 200) {
                     // 使用 tile.setLoader 来设置加载器
                    //  console.log(tile)
                    //  tile.setLoader(function(extent, resolution, projection) {
                        const features = tile.getFormat().readFeatures(xhr.response,{
                            extent: tile.extent,
                            featureProjection: tile.projection
                        });
                        // console.log(features)
                        tile.setFeatures(features);
                    // });
                } else {
                    console.error('Failed to load tile:', src);
                }
            };
            xhr.send();
        }
    
    })
    var mvtLayer = new VectorTileLayer({
        source:mvt_source,

        style:function(e){
            let a = pressData[e.properties_.id]
            
            var color = 'blue';
            if(a == undefined){
                return new Style({
                    stroke: new Stroke({
                            color: color,
                            width: 2
                        })
                });
            }
            var press = a.press
           
            if (press>=0.05&&press<=123) {
                color = '#0ebeff';
            }

           
            

            return new Style({
                stroke: new Stroke({
                        color: color,
                        width: 2
                    })
            })
        }

    });
    
    // const png_layer = new TileLayer({
    //   source: new TileWMS({
    //     //不能设置为0，否则地图不展示。
    //     ratio: 1,
    //     url: "http://10.0.120.106:8062/mapserver/png",
    //     params: {
    //       layers: "dyw:pipe",
    //       VERSION: "1.1.1",
    //       tiled: true,
    //       tileSize:256,
    //       format:"image/png",
    //       type:"wms",
    //       // CQL_FILTER: "task_id = '1828737322178265167'"
    //       // viewparams: "condition1:log_id = '1784462986302496840';condition2:log_id = '1784463202015551551';condition3:log_id = '1778328365816131601';"  
    //     },
    //     serverType: "geoserver",
    //   }),
    // });
    const png_layer_ = new TileLayer({
      source: new XYZ({
        visible: true,
        // 高德影像地图
        // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        // 高德矢量地图
        // url: "http://10.0.120.106:8062/mapserver/png?x={x}&y={y}&z={z}&size=256&CQL_FILTER=material='WSZ0127001'",
        url: "http://localhost:8062/mapserver/wmts/file?x={x}&y={y}&z={z}&size=512",

        })
    });

    onMounted(()=>{
        initMap()
        // map.addLayer(vectorLayer)
        // get_press_data()
        // map.addLayer(mvtLayer)
        console.log(map.getView().getResolution())

        map.addLayer(png_layer_)
    })

    const initMap = ()=>{
        var projection = new Projection({
            code: 'EPSG:3857',
            units: 'm',
            axisOrientation: 'neu',
            global: false
        });
        map = new Map({
        //地图容器ID
            target: "map",
            //引入地图
            // layers: [maps["高德地图"]],
            layers: [],
            view: new View({
                projection:projection,
                //地图中心点
                center: [1.2715915047398917E7,3453476.714017157],
                zoom: 6,
                minZoom:6, // 地图缩放最小级别
            }),
            
        });
    }


    const loadMap = ()=>{
        const layer = map.getLayers().item(0);
    //     map.on('moveend', function (e) {
    //         console.log(source.getExtent());
    //         const zoom = Math.floor(map.getView().getZoom()); // 将缩放大小设置成整数
    //             const extent = map.getView().calculateExtent(map.getSize());
    //             let current_zoom = map.getView().getZoom();

    //             console.log(current_zoom);
    //             if(move_zoom!=current_zoom&&Math.abs(current_zoom-move_zoom)>=0.5)
    //             {
    //                 move_zoom = current_zoom;

    //             }else{
    //                 return;
    //             }
    //             // 通过图层源获取图块网格
    //             const tileGrid = layer.getSource().getTileGrid();
    //             // 遍历视图范围内的所有图块
    //             let urls = [];
    //             const promises = [];
    //             tileGrid.forEachTileCoord(extent, zoom, function(tileCoord) {
    //                 const x = tileCoord[1]; 
    //                 const y = tileCoord[2]; 
    //                 const z = tileCoord[0]; 
    //                 urls.push('/map/cluster/t_fittings/'+x+'/'+y+'/'+z+'?tenantId=1685910164576936014');
    //             });
    //             // Re_Queue.cancel();
    //             let re = Re_Queue.execute(urls,10).then(responses=>{
    //                 console.log(responses);
    //                 const allCoordinates = [];
    //                 responses.forEach(response => {
    //                     let re = response.data.data
    //                     for (var i = 0; i < re.length; i++) {
    //                         let piontt = re[i]
    //                         allCoordinates.push({
    //                             geom:piontt.geom,
    //                             count:Number(piontt.count),
    //                             feature_p:null
    //                         });
                            
    //                     }
    //                 });


    //                 // 统一设置样式
    //             const createStyle = (text) => {
    //                 const style = new Style({
    //                     image: new Circle({
    //                         radius: 10+10*(text/2000)>40?40:10+10*(text/2000),
    //                         fill: new Fill({
    //                             color: "#ff2d51"
    //                         })
    //                     })
    //                 });

    //                 if (text > 1) {
    //                     style.setText(new Text({
    //                         text: text+'',
    //                         font: '10px Arial',
    //                         fill: new Fill({
    //                             color: '#000'
    //                         }),
    //                         stroke: new Stroke({
    //                             color: '#fff',
    //                             width: 2
    //                         })
    //                     }));
    //                 }

    //                 return style;
    //             };


    //             // 创建点要素数组
    //             const points = allCoordinates.map((coord, index) => {
    //                 let feature__ = format.readFeature(coord.geom,{
    //                     dataProjection: 'EPSG:4326', //	目标坐标系
    //                     featureProjection: 'EPSG:3857'// 当前坐标系
    //                 })
    //                 coord.feature_p = feature__


    //                 coord.feature_p.setStyle(createStyle(coord.count))
    //                 return feature__;
    //             });
    //             source.clear()
    //             //添加新点
    //             source.addFeatures(allCoordinates.map(item=>{
    //                 return item.feature_p
    //             }))
    //         }).catch(function(error) {
    //             console.error("Failed to fetch coordinates:", error);
    //         });
    //     })
        
        map.on('moveend',function(e){
            let extent = map.getView().calculateExtent(map.getSize())

            console.log('当前级别：'+map.getView().getZoom())
            let aaaaa = map.getView().getZoom(); 
            // zoom达到18时，不再聚合
            if(aaaaa>=18){
                move_zoom = aaaaa
                let param = {
                    tenantId:"1685910164576936014",
                    extent:extent,
                    tableName:"t_fittings"
                }
                get_data(param)

                return;
            }

            if(Math.abs(aaaaa-move_zoom)<=0.3){
                return;
            }else{
                move_zoom = aaaaa
            }
            
            // console.log(extent)
            service.get('/map/cluster/t_fittings?tenantId=1685910164576936014&extent='+extent.join(','))
            .then(res=>{
                // console.log(res)
                if (res.data.code === 200) {
                    const allCoordinates = [];
                    const responses = res.data.data;
                    // 去掉多余的内层循环，直接在forEach中处理每个元素
                    responses.forEach((response) => {
                        allCoordinates.push({
                            geom: response.geom,
                            count: Number(response.count),
                            feature_p: null
                        });
                    });
                    const features = allCoordinates.map((coord) => {
                        const feature = format.readFeature(coord.geom, {
                            dataProjection: 'EPSG:4326', // 目标坐标系
                            featureProjection: 'EPSG:3857' // 当前坐标系
                        });
                        feature.setStyle(createStyle(coord.count));
                        return feature;
                    });
                    source.clear();
                    // 直接使用构建好的features数组添加新点，避免重复映射操作
                    source.addFeatures(features);
                }
            })
        })
    }

    const createStyle = (text) => {
        const style = new Style({
            image: new Circle({
                radius: 10+10*(text/2000)>40?40:10+10*(text/3000),
                fill: new Fill({
                    color: "#ff2d51"
                })
            })
        });

        if (text > 1) {
            style.setText(new Text({
                text: text+'',
                font: '10px Arial',
                fill: new Fill({
                    color: '#000'
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2
                })
            }));
        }

        return style;
    };

    const get_data = (obj)=>{

        let extent_ = obj.extent
        let tenantId = obj.tenantId
        let tableName = obj.tableName

        service.get('/map/lev18/'+tableName+'?tenantId='+tenantId+'&extent='+extent_.join(','))
        .then(res=>{
            // console.log(res)
            if (res.data.code === 200) {
                const allCoordinates = [];
                const responses = res.data.data;
                
                // 去掉多余的内层循环，直接在forEach中处理每个元素

                responses.forEach((response) => {
                    allCoordinates.push({
                        geom: response.geom.split(";")[1],
                        count: 1,
                        feature_p: null
                    });
                });

                const features = allCoordinates.map((coord) => {
                    const feature = format.readFeature(coord.geom, {
                        dataProjection: 'EPSG:4326', // 目标坐标系
                        featureProjection: 'EPSG:3857' // 当前坐标系
                    });
                    feature.setStyle(createStyle(coord.count));
                    return feature;
                });
                source.clear();
                // 直接使用构建好的features数组添加新点，避免重复映射操作
                source.addFeatures(features);
            }
        })
    }


    const load_pipe = ()=>{
        map.on('moveend',function(e){
            let extent = map.getView().calculateExtent(map.getSize())

            let a = map.getView().getZoom();
            if(Math.abs(a-move_zoom)>=0.5){
                move_zoom = a
                get_data({
                    tenantId:"1685910164576936014",
                    extent:extent,
                    tableName:"t_pipe"
                })
                return;
            }
        })
    }

    const add_gs_layer = ()=>{
        let layer__ = new TileLayer({
            source: new TileWMS({
                //不能设置为0，否则地图不展示。
                ratio: 1,
                url: url,
                params: {
                    layers: "t_pipe",
                    VERSION: "1.1.1",
                    tiled: true,
                    tileSize:256,
                    format:"image/png",
                    type:"wms",
                },
                serverType: "geoserver",
            }),
        });
        map.addLayer(layer__);
    }

    const add_layer_stream = ()=>{
        fetchData()
    }
    async function fetchData() {
        const headers = new Headers({
        });
        const response = await fetch(url,{headers});
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let receivedData = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done){
                console.log('done');
                break;
            }

            receivedData += decoder.decode(value, { stream: true });
            const endIndex = receivedData.indexOf('##END##'); // 查找自定义结束标识的位置
            if (endIndex!= -1) {
                const jsonData = receivedData.slice(0, endIndex); // 截取到结束标识之前的数据作为JSON数组内容
                // console.log(jsonData)
                let srr = JSON.parse(jsonData);
                addPipe(srr);
                receivedData = ''
            }
        }
    }

    const addPipe = (arr)=>{
        let eeeeee = arr.map(coord=>{
            let a = format.readFeature(coord.geom, {
                dataProjection: 'EPSG:4326', // 目标坐标系
                featureProjection: 'EPSG:3857' // 当前坐标系
            });
            a.press = coord.press
            return a;
        })
        source.addFeatures(eeeeee);
    }

    const get_press_data = ()=>{
        service.get('/pipe/pipe/press/data?tenantId=1773355726431895643').then(res=>{
            if (res.data.code === 200) {
                pressData = res.data.data
                console.log(pressData['1706513273920221311'])
            }
        })
    }
</script>