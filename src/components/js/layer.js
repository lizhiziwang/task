import { XYZ,TileImage } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid'
import Tile from 'ol/layer/Tile'


const gaode = new TileLayer({
    visible: true,
    source: new XYZ({
        visible: true,
        // 高德影像地图
        // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        // 高德矢量地图
        url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=2&style=7&key=17be85abdc35ac0635cfcfe31fe10936',
        // 设置canvas滤镜 黑色
        // tileLoadFunction: function (imageTile, src) {
        //     let img = new Image();
        //     // 设置图片不从缓存取，从缓存取可能会出现跨域，导致加载失败
        //     img.setAttribute("crossOrigin", "anonymous");
        //     img.onload = function () {
        //         let canvas = document.createElement("canvas");
        //         let w = img.width;
        //         let h = img.height;
        //         canvas.width = w;
        //         canvas.height = h;
        //         let context = canvas.getContext("2d");

        //         context.filter =
        //         "grayscale(0%) invert(100%) sepia(10%) hue-rotate(175deg) saturate(100%) brightness(100%) contrast(120%)";
        //         // grayscale 灰度   invert反相   sepia将图像转化成深褐色  saturate饱和度   brightness暗度 contrast对比度

        //         context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        //         imageTile.getImage().src = canvas.toDataURL("image/png");
        //     };
        //     img.src = src;
        // },
    })
});
const geode_yx = new TileLayer({
    visible: true,
    source: new XYZ({
        visible: true,
        // 高德影像地图
        // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        // 高德矢量地图
        url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=2&style=6&key=17be85abdc35ac0635cfcfe31fe10936',
        // 设置canvas滤镜 黑色
    })
});
const tianditu = new TileLayer({
    source: new XYZ({
        url: `http://t1.tianditu.com/DataServer?T=vec_w&tk=f0ef2118b8ccd76bfd9acc8217e5dab0&x={x}&y={y}&l={z}`,
    })
});

var resolutions = [];
for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}

const baidu = new TileLayer({
    source:new XYZ(
        {
            tileGrid: new TileGrid({
                origin: [0, 0],
                resolutions: resolutions
            }),
            projection:"EPSG:3857",
        
            tileUrlFunction: function (tileCoord) {
                if (!tileCoord) {
                    return "";
                }
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];
        
                x = x<0?x:'M'+(-x);
                y = -y
                return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
            }
        }
    )
});


const google = new TileLayer({
    title: "谷歌地图",
    source: new XYZ({
        url: "http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z} ",
        wrapX: false
    })
})


const maps = {
    "高德地图":gaode,
    "高德影像":geode_yx,
    "天地图":tianditu,
    "百度地图":baidu,
    "谷歌地图":google
}

export {maps};
