import { XYZ,TileImage } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid'
import Tile from 'ol/layer/Tile'
import Group from 'ol/layer/Group'


const gaode = new TileLayer({
    visible: true,
    source: new XYZ({
        visible: true,
        // 高德影像地图
        // url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        // 高德矢量地图
        url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7&key=17be85abdc35ac0635cfcfe31fe10936',
        // url:'http://10.0.120.106:8062/mapserver/wms/db/clip?x={x}&y={y}&z={z}'
        // url:'http://10.0.120.106:12050/mapserver/wms/db?x={x}&y={y}&z={z}&maptype=dark&&mapId=050121a2d4c44274b9c04d2612ad5272',
        // tileLoadFunction: function (imageTile, src) {
        //     console.log(imageTile.getImage())
        // },
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
        //         "grayscale(00%) invert(100%) sepia(0%) hue-rotate(200deg) saturate(100%) brightness(100%) contrast(100%)";
        //         // grayscale 灰度   invert反相   sepia将图像转化成深褐色  saturate饱和度   brightness暗度 contrast对比度
        //         // context.fillStyle = '#0b1a3b';

        //         // context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
        //         // imageTile.getImage().src = canvas.toDataURL("image/png");

        //         context.fillRect(0, 0, w, h);
                
        //         context.drawImage(img, 0, 0, w, h);
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

const tianditu_zhuji = new TileLayer({
    source: new XYZ({
        url: `http://t1.tianditu.com/DataServer?T=cva_w&tk=f0ef2118b8ccd76bfd9acc8217e5dab0&x={x}&y={y}&l={z}`,
    })
});
const tianditu_dixing = new TileLayer({
    source: new XYZ({
        url: `http://t1.tianditu.com/DataServer?T=cta_w&tk=f0ef2118b8ccd76bfd9acc8217e5dab0&x={x}&y={y}&l={z}`,
    })
});
const layerGroup = new Group({
    layers:[tianditu,tianditu_zhuji]
})


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
const arcgis_yx = new TileLayer({
    title: "ArcGIS影像",
    source: new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        wrapX: false
    })
})
const arcgis_jd = new TileLayer({
    title: "ArcGIS街道",
    source: new XYZ({
        url: "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png",
        wrapX: false
    })
})
const arcgis_ah = new TileLayer({
    title: "ArcGIS暗黑",
    source: new XYZ({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/WMTS/tile/1.0.0/Canvas_World_Dark_Gray_Base/default/default028mm/{z}/{y}/{x}/",
        wrapX: false
    })
})

const var1 = new TileLayer({
    title: "中科星图（影像）",
    source: new XYZ({
        url: "https://tiles1.geovisearth.com/base/v1/img/{z}/{x}/{y}",
        wrapX: false
    })
})
const var2 = new TileLayer({
    title: "中科星图（矢量）",
    source: new XYZ({
        url: "https://tiles{1-3}.geovisearth.com/base/v1/vec/{z}/{x}/{y}",
        wrapX: false
    })
})

const maps = {
    "高德地图":gaode,
    "高德影像":geode_yx,
    "天地图":layerGroup,
    "百度地图":baidu,
    "谷歌地图":google,
    "ArcGIS影像":arcgis_yx,
    "ArcGIS街道":arcgis_jd,
    "ArcGIS暗黑":arcgis_ah,
    "中科星图（影像）":var1,
    "中科星图（矢量）":var2,
}

export {maps};


/**
 * 底图工厂函数 - 用于动态创建图层实例
 */
const createMapLayer = (type, options = {}) => {
    let layer;

    switch(type) {
        case 'gaode':
            layer = new TileLayer({
                visible: options.visible !== undefined ? options.visible : true,
                source: new XYZ({
                    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
                }),
            });
            break;

        case 'gaode_yx':
            layer = new TileLayer({
                visible: options.visible !== undefined ? options.visible : true,
                source: new XYZ({
                    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=2&style=6',
                }),
            });
            break;

        case 'tianditu':
            const tianditu = new TileLayer({
                source: new XYZ({
                    url: `http://t1.tianditu.com/DataServer?T=vec_w&tk=f0ef2118b8ccd76bfd9acc8217e5dab0&x={x}&y={y}&l={z}`,
                }),
            });
            const tianditu_zhuji = new TileLayer({
                source: new XYZ({
                    url: `http://t1.tianditu.com/DataServer?T=cva_w&tk=f0ef2118b8ccd76bfd9acc8217e5dab0&x={x}&y={y}&l={z}`,
                }),
            });
            layer = new Group({
                layers: [tianditu, tianditu_zhuji],
                visible: options.visible !== undefined ? options.visible : true,
            });
            break;

        case 'baidu':
            // 百度地图特殊配置
            var resolutions = [];
            for (var i = 0; i < 19; i++) {
                resolutions[i] = Math.pow(2, 18 - i);
            }

            layer = new TileLayer({
                source: new XYZ({
                    tileGrid: new TileGrid({
                        origin: [0, 0],
                        resolutions: resolutions
                    }),
                    projection: "EPSG:3857",
                    tileUrlFunction: function (tileCoord) {
                        if (!tileCoord) return "";
                        var z = tileCoord[0];
                        var x = tileCoord[1];
                        var y = tileCoord[2];
                        x = x < 0 ? x : 'M' + (-x);
                        y = -y;
                        return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1";
                    }
                }),
                visible: options.visible !== undefined ? options.visible : true,
            });
            break;

        // 其他地图类型...
        case 'google':
            layer = new TileLayer({
                title: "谷歌地图",
                source: new XYZ({
                    url: "http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z} ",
                    wrapX: false
                }),
                visible: options.visible !== undefined ? options.visible : true,
            });
            break;

        case 'arcgis_yx':
            layer = new TileLayer({
                title: "ArcGIS影像",
                source: new XYZ({
                    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    wrapX: false
                }),
                visible: options.visible !== undefined ? options.visible : true,
            });
            break;


        case 'arcgis_jd':
            layer  = new TileLayer({
                title: "ArcGIS街道",
                source: new XYZ({
                    url: "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png",
                    wrapX: false
                })
            });
            break;
        case 'arcgis_ah':
            layer = new TileLayer({
                title: "ArcGIS暗黑",
                source: new XYZ({
                    url: "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/WMTS/tile/1.0.0/Canvas_World_Dark_Gray_Base/default/default028mm/{z}/{y}/{x}/",
                    wrapX: false
                })
            });
            break;
        case 'var1':
            layer = new TileLayer({
                title: "中科星图（影像）",
                source: new XYZ({
                    url: "https://tiles1.geovisearth.com/base/v1/img/{z}/{x}/{y}",
                    wrapX: false
                })
            })
            break;
        case 'var2':
            layer = new TileLayer({
                title: "中科星图（矢量）",
                source: new XYZ({
                    url: "https://tiles{1-3}.geovisearth.com/base/v1/vec/{z}/{x}/{y}",
                    wrapX: false
                })
            })
            break;

        // 其他底图类型...
        default:
            throw new Error(`Unsupported map type: ${type}`);
    }

    return layer;
};

/**
 * 底图配置对象
 */
const mapConfig = {
    "高德地图": { type: 'gaode' },
    "高德影像": { type: 'gaode_yx' },
    "天地图": { type: 'tianditu' },
    "百度地图": { type: 'baidu' },
    "谷歌地图": { type: 'google' },
    "ArcGIS影像": { type: 'arcgis_yx' },
    "ArcGIS街道":{type:'arcgis_jd'},
    "ArcGIS暗黑":{type:'arcgis_ah'},
    "中科星图（影像）":{type:'var1'},
    "中科星图（矢量）":{type:'var2'},
    // 其他底图...
};
/**
 * 获取底图函数 - 每次调用返回新的图层实例
 */
const getMapLayer = (name, options = {}) => {
    const config = mapConfig[name];
    if (!config) {
        throw new Error(`Map "${name}" not found`);
    }
    return createMapLayer(config.type, { ...config.options, ...options });
};
/**
 * 获取所有底图名称
 */
const getAvailableMaps = () => {
    return Object.keys(mapConfig);
};

export { getMapLayer, getAvailableMaps };
