<template>
    <div style="width: 100%; height: 100%;">
        <div style="width: 100%; height: 7%;display: flex;justify-content: center;flex-direction: column;align-items: center;">
            <div >
                坐标：<el-input v-model="coord" style="width: 240px" placeholder="例：113,23" />
                <el-button type="primary" @click="drawPoint" style="margin-left: 10px;">确定</el-button>
            </div>
        </div>
        <div id="map" style="width: 100%; height: 80%;min-width: 100%;min-height: 80%;"></div>
    </div>
    
</template>

<script setup>

    import { ref,onMounted } from 'vue'
    import Map from "ol/Map"
    import WKT from "ol/format/WKT"
    import Vector from "ol/source/Vector"
    import View from "ol/View"
    import Projection from "ol/proj/Projection"
    import { Tile as TileLayer } from 'ol/layer'
    import { TileWMS, XYZ } from 'ol/source'
    import { Vector as VectorLayer } from 'ol/layer';
    import ElMessage from 'element-plus'
    import Style from 'ol/style/Style'
    import Icon from 'ol/style/Icon'

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
    const initMap = () => {
        var gaodeLayer = new TileLayer({
            visible: true,
            source: new XYZ({
                visible: true,
                // 高德影像地图
                // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                // 高德矢量地图
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scale=1&style=10&key=17be85abdc35ac0635cfcfe31fe10936',
            })
        });
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
            layers: [gaodeLayer],
            view: new View({
                projection:projection,
                //地图中心点
                center: [13134894.524877965,2189149.087479662],
                zoom: 5,
                // minZoom:1, // 地图缩放最小级别
            })
        });
    }

    const drawPoint = ()=>{
        let t = coord.value.split(',')
        let wkt_ = 'POINT('+t[0]+' '+t[1]+')'
        // ElMessage.success('坐标：'+wkt)
        console.log(wkt_)

        let rt = format.readFeature(wkt_,{
            dataProjection: 'EPSG:4326', //	目标坐标系
            featureProjection: 'EPSG:3857'// 当前坐标系
        });
        var style = new Style({
            image: new Icon({
                src: 'src/assets/location.png',//图标路径
                anchor: [0.5, 1],//锚点
                scale: 0.16,//大小
                rotation: 0	//旋转角度
            })
        })

        rt.setStyle(style)

        source.addFeature(rt)
    }
</script>