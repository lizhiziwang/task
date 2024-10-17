import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import LayerGroup from 'ol/layer/Group';
import tk from '@/gis/token';

const tdtLayer_img = new TileLayer({
    source: new XYZ({
        url: `http://t{0-7}.tianditu.com/DataServer?T=img_w&tk=${tk}&x={x}&y={y}&l={z}`,
    })
});

const tdtLayer_cia = new TileLayer({
    source: new XYZ({
        url: `http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${tk}`,
    })
});

const tdtLayer_ibo = new TileLayer({
    source: new XYZ({
        url: `http://t{0-7}.tianditu.com/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=${tk}`
    })
});

const tdtLayer_vec = new TileLayer({
    source: new XYZ({
        url: `http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tk}`
    })
});
const tdtLayer_cva = new TileLayer({
    source: new XYZ({
        url: `http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tk}`,
    })
});
//天地图影像图
const tdtImgLayer = new LayerGroup({
    layers: [
        tdtLayer_img,
        tdtLayer_ibo,
        tdtLayer_cia,
    ]
})
//天地图矢量图
const tdtVectorLayer = new LayerGroup({
    layers: [
        tdtLayer_vec,
        tdtLayer_cva,
    ]
});
//WMS服务图层（农田图层）
const dFarmlandSource = new TileWMS({
    url: 'http://localhost:8080/geoserver/cite/wms',
    params: {
      'LAYERS': 'cite:胡_result',
      'VERSION': '1.1.0',
      'TILED': true
    },
    serverType: 'geoserver'
  });
  const dFarmlandLayer = new TileLayer({
    //ratio: 1,
    source: dFarmlandSource
  });
export { tdtImgLayer, tdtVectorLayer, dFarmlandLayer};
