
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
    import GeoJSON from "ol/format/GeoJSON"
    import Vector from "ol/source/Vector"
    import View from "ol/View"
    import Projection from "ol/proj/Projection"
    import { Tile as TileLayer } from 'ol/layer'
    import { TileWMS, XYZ } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer';
    import ElMessage from 'element-plus'
    import Style from 'ol/style/Style'
    import Text from 'ol/style/Text'
    import Fill from 'ol/style/Fill'
    import Circle from 'ol/style/Circle'
    import Stroke from 'ol/style/Stroke'
    import Icon from 'ol/style/Icon'
    import {service,Re_Queue} from '@/components/js/http.js';

    var map = null;

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
        features: [feature]
    });

    // 将矢量数据源添加到矢量图层
    var vectorLayer = new VectorLayer({
        source:source
    });

    onMounted(()=>{
        initMap()
        map.addLayer(vectorLayer)


        
        console.log(map)
        loadMap()
        
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
            layers: [maps["高德地图"]],
            view: new View({
                projection:projection,
                //地图中心点
                center: [1.2715915047398917E7,3453476.714017157],
                zoom: 3,
                minZoom:1, // 地图缩放最小级别
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

        service.get('/map/lev18/t_fittings?tenantId='+tenantId+'&extent='+extent_.join(','))
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

</script>