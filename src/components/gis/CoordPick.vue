<template>
    <div style="width: 100%; height: 100%;position: relative;">
        <div style="width: 100%; height: 7%;display: flex;justify-content: center;flex-direction: column;align-items: center;">
            <div >
                坐标定位：<el-input v-model="coord" style="width: 240px" placeholder="例：113,23" />
                <el-button type="primary" @click="drawPoint" style="margin-left: 10px;">确定</el-button>
            </div>
        </div>

        <div id="map"  :class="is_full?'map_s1' : 'map_s2'">
            <div class="map_select">
                <div style="display: flex; align-items: center;">
                    <el-select
                        v-model="current_map"
                        style="width: 240px"
                        placement="bottom"
                        @change="map_change"    
                        >
                        <el-option label="高德地图" value="高德地图"/>
                        <el-option label="高德影像" value="高德影像"/>
                        <el-option label="百度地图" value="百度地图"/>
                        <el-option label="天地图" value="天地图"/>
                    </el-select>
                </div>
            </div>

            <div id="full-screen">
                
                <!-- 全屏按钮 -->
                <svg  t="1732610476004"  viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" 
                @click="is_full = !is_full"
                v-if="is_full"
                p-id="4431" width="30" height="30">
                    <path d="M240.8 196l178.4 178.4-45.6 45.6-177.6-179.2-68 68V128h180.8l-68 68z m133.6 408.8L196 783.2 128 715.2V896h180.8l-68-68 178.4-178.4-44.8-44.8zM715.2 128l68 68-178.4 178.4 45.6 45.6 178.4-178.4 68 68V128H715.2z m-65.6 476.8l-45.6 45.6 178.4 178.4-68 68H896V715.2l-68 68-178.4-178.4z" p-id="4432" fill="#ffffff"></path></svg>
                <svg 
                    v-else t="1732612315026" 
                    @click="is_full = !is_full"
                    
                    class="icon" viewBox="0 0 1024 1024" 
                    version="1.1" xmlns="http://www.w3.org/2000/svg" 
                    p-id="4737" width="40" height="40"><path d="M298.666667 631.466667H226.133333v-81.066667h217.6v204.8h-85.333333v-68.266667l-128 128L170.666667 759.466667l128-128z m422.4 0l128 128-59.733334 59.733333-128-128v68.266667h-85.333333V554.666667h217.6v81.066666h-72.533333zM298.666667 341.333333L187.733333 230.4 243.2 170.666667l115.2 115.2V217.6h85.333333v204.8H226.133333V341.333333H298.666667z m430.933333 0h64v81.066667h-217.6V217.6h85.333333v72.533333L780.8 170.666667l59.733333 59.733333L729.6 341.333333z" fill="#ffffff" p-id="4738"></path></svg>
                
                <!-- 画点 -->
                <svg @click="addInteraction('Point')" 
                    style="margin-top: 100px;" t="1732612858182" class="icon" viewBox="0 0 1032 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7689" width="30" height="30"><path d="M345.68 395.064c0-92.976 78.08-168.496 174.2-168.496 96.112 0 174.192 75.52 174.192 168.496 0 92.976-78.08 168.504-174.192 168.504-96.12 0-174.2-75.528-174.2-168.504zM520.368 16h-0.864C303.552 16.24 128 186.296 128 395.184c0 106 87.096 256.696 172.464 379.184A2650.68 2650.68 0 0 0 459.096 979.2c14.824 18.048 37.184 28.56 61.024 28.8h0.128c23.6-0.24 45.84-10.64 60.536-28.56a2679.264 2679.264 0 0 0 158.752-205.072C824.896 652 912 501.184 912 395.184 911.88 186.176 736.2 16.12 520.368 16z" fill="#ffffff" p-id="7690"></path></svg>
                <svg @click="addInteraction('LineString')" style="margin-top: 20px;" t="1732612959071" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11611" width="30" height="30"><path d="M672 925.5c-52.11 0-94.5-42.39-94.5-94.5 0-27.32 11.82-53.29 32.43-71.26l0.3-0.26-254.6-473.05-0.31 0.01c-1.1 0.04-2.21 0.06-3.32 0.06-18.73 0-36.83-5.47-52.35-15.82l-0.34-0.23-114.89 114.89 0.1 0.29c3.31 9.75 4.99 19.97 4.99 30.37 0 52.11-42.39 94.5-94.5 94.5S0.5 468.11 0.5 416s42.39-94.5 94.5-94.5c17.2 0 34.04 4.67 48.7 13.5l0.34 0.2 117.11-117.1-0.08-0.28a94.646 94.646 0 0 1-3.57-25.81c0-52.11 42.39-94.5 94.5-94.5s94.5 42.39 94.5 94.5c0 26.56-11.28 52.05-30.94 69.93l-0.29 0.26 255.29 474.32s1.19-0.02 1.44-0.02c20.26 0 39.58 6.32 55.86 18.28l0.35 0.25 112-112-0.12-0.3c-4.37-11.06-6.59-22.74-6.59-34.73 0-52.11 42.39-94.5 94.5-94.5s94.5 42.39 94.5 94.5-42.39 94.5-94.5 94.5c-15.68 0-31.21-3.92-44.91-11.33l-0.33-0.18-118.68 118.68 0.06 0.27A95.354 95.354 0 0 1 766.5 831c0 52.11-42.39 94.5-94.5 94.5z" p-id="11612" fill="#ffffff"></path><path d="M352 98c51.83 0 94 42.17 94 94 0 26.42-11.22 51.78-30.78 69.56l-0.58 0.53 0.37 0.69 254.96 473.71 0.29 0.53 0.61-0.01 0.42-0.01c0.24 0 0.48-0.01 0.72-0.01 20.15 0 39.37 6.29 55.57 18.18l0.69 0.51 0.61-0.61 111.46-111.46 0.46-0.46-0.24-0.61c-4.35-11-6.55-22.62-6.55-34.55 0-51.83 42.17-94 94-94s94 42.17 94 94-42.17 94-94 94c-15.59 0-31.04-3.9-44.67-11.27l-0.66-0.35-0.53 0.53-118.23 118.23-0.39 0.39 0.12 0.54a94.365 94.365 0 0 1 2.35 20.95c0 51.83-42.17 94-94 94s-94-42.17-94-94c0-27.17 11.76-53.01 32.26-70.88l0.6-0.52-0.38-0.7-254.26-472.45-0.29-0.55-0.62 0.02c-1.27 0.04-2.32 0.06-3.3 0.06-18.63 0-36.64-5.44-52.08-15.74l-0.68-0.45-0.58 0.58-114.39 114.39-0.44 0.44 0.2 0.59c3.29 9.7 4.96 19.87 4.96 30.21 0 51.83-42.17 94-94 94S1 467.83 1 416s42.17-94 94-94c17.11 0 33.86 4.65 48.45 13.43l0.67 0.4 0.55-0.55L261.3 218.66l0.42-0.41-0.16-0.56a94.028 94.028 0 0 1-3.55-25.68C258 140.17 300.17 98 352 98m0-1c-52.47 0-95 42.53-95 95 0 9 1.25 17.7 3.59 25.95L143.96 334.58C129.66 325.96 112.91 321 95 321c-52.47 0-95 42.53-95 95s42.53 95 95 95 95-42.53 95-95c0-10.68-1.76-20.95-5.01-30.53l114.38-114.38C314.44 281.14 332.53 287 352 287c1.12 0 2.23-0.03 3.34-0.06l254.27 472.43C589.63 776.78 577 802.41 577 831c0 52.47 42.53 95 95 95s95-42.53 95-95c0-7.28-0.82-14.36-2.37-21.17L882.86 691.6c13.42 7.27 28.8 11.4 45.14 11.4 52.47 0 95-42.53 95-95s-42.53-95-95-95-95 42.53-95 95c0 12.33 2.35 24.11 6.62 34.92L728.16 754.38C712.43 742.83 693.01 736 672 736c-0.38 0-0.76 0.01-1.14 0.01L415.9 262.3C435 244.92 447 219.86 447 192c0-52.47-42.53-95-95-95z" p-id="11613" fill="#ffffff"></path></svg>
                <svg @click="addInteraction('Polygon')" style="margin-top: 20px;" t="1732613702180" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12675" width="30" height="30"><path d="M358.5 1021.5c-52.93 0-96-43.07-96-96 0-13.12 2.6-25.84 7.74-37.81l0.12-0.27-141.99-184.66-0.34 0.11a95.806 95.806 0 0 1-29.53 4.64c-52.93 0-96-43.07-96-96s43.07-96 96-96c7.56 0 15.09 0.89 22.41 2.64l0.36 0.09 213.67-370.08-0.16-0.25c-9.34-15.12-14.28-32.54-14.28-50.39 0-52.93 43.07-96 96-96 40.36 0 76.66 25.5 90.34 63.46l0.09 0.26 300.27 61.72 0.19-0.26c18.01-25.16 47.21-40.18 78.11-40.18 52.93 0 96 43.07 96 96 0 36.49-20.26 69.36-52.88 85.79l-0.31 0.16 41.76 393.5 0.25 0.12a96.184 96.184 0 0 1 39.11 34.79c9.85 15.41 15.06 33.27 15.06 51.65 0 52.93-43.07 96-96 96-31.18 0-60.53-15.24-78.52-40.76l-0.22-0.31-396.7 138.78-0.05 0.29c-8.2 45.76-47.94 78.97-94.5 78.97z m0-192c34.03 0 64.82 17.44 82.36 46.66l0.21 0.35L832.93 739.4l0.03-0.32c3.81-39.11 31.82-72.49 69.7-83.05l0.41-0.11-40.34-380.14-0.34-0.08c-39.73-9.82-68.86-43.81-72.49-84.56l-0.03-0.37-283.9-58.36-0.15 0.39c-7 17.7-19.01 32.81-34.72 43.69-16.08 11.13-34.96 17.02-54.59 17.02-9.75 0-19.37-1.46-28.59-4.33l-0.38-0.12L176.19 555.1l0.19 0.26c11.86 16.42 18.12 35.83 18.12 56.14 0 17.74-4.88 35.06-14.11 50.11l-0.18 0.29 136.28 177.25 0.37-0.18c13.04-6.28 27.05-9.47 41.64-9.47z" p-id="12676" fill="#ffffff"></path><path d="M416.5 2c40.15 0 76.26 25.37 89.87 63.13l0.19 0.53 0.55 0.11 299.68 61.6 0.64 0.13 0.38-0.53c8.66-12.1 20.19-22.15 33.34-29.06C854.71 90.77 870.06 87 885.5 87c52.66 0 95.5 42.84 95.5 95.5 0 18.03-5.05 35.58-14.6 50.77a95.81 95.81 0 0 1-38 34.57l-0.62 0.31 0.07 0.69 41.7 392.88 0.06 0.55 0.5 0.24c15.91 7.71 29.36 19.68 38.91 34.61 9.8 15.33 14.98 33.09 14.98 51.38 0 52.66-42.84 95.5-95.5 95.5-31.02 0-60.22-15.16-78.11-40.55l-0.43-0.62-0.71 0.25-396.09 138.59-0.55 0.19-0.1 0.57c-3.9 21.77-15.4 41.67-32.39 56.03-17.2 14.54-39.08 22.54-61.62 22.54-52.66 0-95.5-42.84-95.5-95.5 0-13.05 2.59-25.71 7.7-37.61l0.23-0.54-0.36-0.46-141.59-184.16-0.43-0.56-0.67 0.22A95.43 95.43 0 0 1 98.5 707C45.84 707 3 664.16 3 611.5S45.84 516 98.5 516c7.52 0 15.01 0.88 22.29 2.62l0.73 0.17 0.37-0.65 213.33-369.5 0.3-0.52-0.31-0.51c-9.29-15.04-14.2-32.37-14.2-50.12C321 44.84 363.84 2 416.5 2m0 191c-9.7 0-19.27-1.45-28.44-4.31l-0.76-0.24-0.4 0.69-210.98 365.43-0.32 0.56 0.38 0.52C187.77 571.99 194 591.3 194 611.5c0 17.64-4.85 34.88-14.03 49.85l-0.36 0.59 0.42 0.55 135.82 176.65 0.5 0.64 0.73-0.35c12.97-6.26 26.91-9.43 41.42-9.43 16.79 0 33.3 4.42 47.75 12.78a96.095 96.095 0 0 1 34.18 33.63l0.42 0.7 0.77-0.27 391.17-136.87 0.6-0.21 0.06-0.64c1.88-19.33 9.53-37.41 22.11-52.28 12.44-14.71 28.77-25.2 47.22-30.35l0.82-0.23-0.09-0.84-40.26-379.37-0.07-0.7-0.68-0.17c-39.52-9.77-68.5-43.58-72.11-84.12l-0.07-0.74-0.73-0.15-283.12-58.2-0.82-0.17-0.31 0.78c-6.96 17.61-18.91 32.64-34.54 43.46-15.99 11.11-34.77 16.96-54.3 16.96m0-192C363.2 1 320 44.2 320 97.5c0 18.58 5.26 35.93 14.35 50.65l-213.33 369.5A96.669 96.669 0 0 0 98.5 515C45.2 515 2 558.2 2 611.5S45.2 708 98.5 708a96.5 96.5 0 0 0 29.69-4.66l141.59 184.15c-5 11.66-7.78 24.51-7.78 38.01 0 53.3 43.2 96.5 96.5 96.5 47.46 0 86.91-34.25 94.99-79.39l396.08-138.59C867.04 828.81 895.88 845 928.5 845c53.3 0 96.5-43.2 96.5-96.5 0-38.22-22.23-71.26-54.46-86.88l-41.7-392.88C960.37 252.86 982 220.21 982 182.5c0-53.3-43.2-96.5-96.5-96.5-32.37 0-61.01 15.94-78.51 40.39l-299.68-61.6C493.91 27.59 458.31 1 416.5 1z m0 193c40.77 0 75.63-25.28 89.77-61.03l283.12 58.2c3.69 41.4 33.52 75.27 72.87 85l40.26 379.37c-37.74 10.53-66.15 43.41-70.06 83.49L441.29 875.9c-16.87-28.1-47.63-46.9-82.79-46.9-15 0-29.2 3.42-41.86 9.53L180.82 661.88c8.99-14.66 14.18-31.91 14.18-50.38 0-21.07-6.76-40.56-18.22-56.43l210.98-365.42c9.08 2.83 18.73 4.35 28.74 4.35z" p-id="12677" fill="#ffffff"></path></svg>
            </div>
                <!-- <div ref="full_screen_" id="full-screen"></div> -->
        </div>
        <div style="width: 100%; height: 10%;display: flex;justify-content: center;align-items: center;">
            <div>
                当前绘制图形(wkt)：
            </div>
            <div >
                <el-input type="textarea" v-model="current_wkt" style="width: 640px"  />
            </div>
            <div style="margin-left: 20px;">
                <el-button type="primary" @click="drawWkt">绘制</el-button>
            </div>
        </div>
        <div style="width: 100%; height: 10%;display: flex;justify-content: center;align-items: center;">
            <div>
                当前绘制图形(geojson)：
            </div>
            <div >
                <el-input type="textarea" v-model="draw_json"  resize ="both" style="width: 640px;height: 100%;"/>
            </div>
            <div style="margin-left: 20px;">
                <el-button type="primary" @click="draw_json_func">绘制</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref,onMounted } from 'vue'
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
    import Icon from 'ol/style/Icon'
    import FullScreen from 'ol/control/FullScreen'
    import Draw from 'ol/interaction/Draw'

    import {service} from '@/components/js/http.js';
    import fileOps from '@/components/js/file.js'
    import {maps} from '@/components/js/layer.js'

    let map = null;
    //429628.875,2216529.634
    let wkt = 'POINT(113.90149133406717 22.719296937819504)'

    let coord = ref('113.90149133406717,22.719296937819504')

    // 矢量点图层的建立
    let format = new WKT();
    let feature = format.readFeature(wkt,{
        dataProjection: 'EPSG:4326', //	目标坐标系
        featureProjection: 'EPSG:3857'// 当前坐标系
    });
    var source = new Vector({
        features: [feature],
    })

    var vectorLayer = new VectorLayer({
        source: source,
    })
    // feature.setStyle(style)
    // 矢量点图层的建立

    onMounted(() => {
        initMap()
        //添加绘制的矢量图层
        map.addLayer(vectorLayer)
        
    })
    // 初始化底图
    const initMap = () => {
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
    let current_map = ref('高德地图')
    //更换底图
    const map_change = (value)=>{
        let all = map.getAllLayers()
        // map.removeLayer(all[0])
        // map.addLayer(maps[value]);
        for(let i = 0;i<all.length;i++){
            map.removeLayer(all[i])
        }
        all[0] = maps[value]
        for(let i = 0;i<all.length;i++){
            map.addLayer(all[i])
        }
        
    }
    //坐标定位
    const drawPoint = ()=>{
        let t = coord.value.split(',')
        let wkt_ = 'POINT('+t[0]+' '+t[1]+')'
        // ElMessage.success('坐标：'+wkt)
        console.log(wkt_)

        let rt = format.readFeature(wkt_,{
            dataProjection: 'EPSG:4326', //	当前坐标系
            featureProjection: 'EPSG:3857'// 目标坐标系
        });
        var style = new Style({
            image: new Icon({
                src: fileOps.getFile+'location.png',//图标路径
                anchor: [0.5, 1],//锚点
                scale: 0.16,//大小
                rotation: 0	//旋转角度
            })
        })

        rt.setStyle(style)

        source.addFeature(rt)
    }

    const drawWkt = ()=>{
        console.log(current_wkt.value)
        let rt = format.readFeature(current_wkt.value,{
            dataProjection: 'EPSG:4326', //	目标坐标系
            featureProjection: 'EPSG:3857'// 当前坐标系
        });

        source.addFeature(rt)
    }

    let is_full = ref(true)
    // 绘制
    let draw = null
    let current_wkt = ref('')
    let addInteraction = (type) => {
        draw = new Draw({
            source: source,
            type: type
        });
        map.addInteraction(draw);
        draw.on(
            'drawend',
            (event) => {
                let feature_ = event.feature;
                let te = feature_.clone();
                te.values_.geometry.transform('EPSG:3857', 'EPSG:4326');
                current_wkt.value = new WKT().writeFeature(te);
                // geojson
                let a = JSON.parse(draw_json.value);
                a.features.push(JSON.parse(new GeoJSON().writeFeature(te)));
                draw_json.value = JSON.stringify(a);

                map.removeInteraction(draw);
            }
        )
    }

    //绘制geojson
    let draw_json = ref(JSON.stringify({
                                        type: "FeatureCollection",
                                        features: []
                                    })
                        )
    let format_json = new GeoJSON();

    const draw_json_func = ()=>{
        let feature_json = format_json.readFeatures(draw_json.value,{
            dataProjection: 'EPSG:4326', //	目标坐标系
            featureProjection: 'EPSG:3857'// 当前坐标系
        });
        source.addFeatures(feature_json);
    }

</script>


<style scoped>

    #full-screen{
        position: absolute;
        top: 2%;
        right: 1%;
        z-index: 999;

        display: flex;
        flex-direction: column;
    }
    #full-screen:hover{
        cursor: pointer;
    }

    .map_s1{
        width: 100%; height: 60%;min-width: 100%;min-height: 70%;position: relative;
    }
    .map_s2{
        width: 100%; height: 100%;min-width: 100%;min-height: 100%;position: absolute;
        z-index: 3;
        top: 0;
    }
    .map_select{
        position: absolute;
        top: 2%;
        right: 5%;
        z-index: 999;
    }
</style>