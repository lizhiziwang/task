const PI= 3.1415926535897932384626;

const mercatorMax = 20037508.34;

const X_PI = 3.14159265358979324 * 3000.0 / 180.0;

let A = 6378245.0;
let EE = 0.00669342162296594323;

const transformlat = (lng,lat)=>{
    let ret= -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}
const transformlng = (lng,lat) =>{
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}
/**
 * 火星坐标GCJ02转2000
 * @param lng
 * @param lat
 * @return
 */
const gcj02ToCgcs2000 = (lng,lat) =>{
    let a= 6378245.0;
    let ee= 0.00669342162296594323;
    let dlat= transformlat(lng-105.0, lat-35.0);
    let dlng= transformlng(lng-105.0, lat-35.0);
    let radlat= lat/180.0*PI;
    let magic= Math.sin(radlat);
    magic= 1-ee*magic*magic;
    let sqrtmagic= Math.sqrt(magic);
    dlat= (dlat*180.0)/((a*(1-ee))/(magic*sqrtmagic)*PI);
    dlng= (dlng*180.0)/(a/sqrtmagic*Math.cos(radlat)*PI);
    let mglat= lat-dlat;
    let mglng= lng-dlng;
    return  [mglng,mglat];
}

/**
 * 2000、84坐标转火星坐标GCJ02
 * @param lng
 * @param lat
 * @return
 */
const cgcs2000ToGcj02 = (lng,lat) =>{
    let a= 6378245.0;
    let ee= 0.00669342162296594323;
    let dlat= transformlat(lng-105.0, lat-35.0);
    let dlng= transformlng(lng-105.0, lat-35.0);
    let radlat= lat/180.0*PI;
    let magic= Math.sin(radlat);
    magic= 1-ee*magic*magic;
    let sqrtmagic= Math.sqrt(magic);
    dlat= (dlat*180.0)/((a*(1-ee))/(magic*sqrtmagic)*PI);
    dlng= (dlng*180.0)/(a/sqrtmagic*Math.cos(radlat)*PI);
    let mglat= lat+dlat;
    let mglng= lng+dlng;
    return [mglng,mglat];
}

/**
 * 火星坐标系(GCJ-02)转百度坐标系(BD-09)
 *
 * 谷歌、高德——>百度
 * @param gcj_lon 火星坐标经度
 * @param gcj_lat 火星坐标纬度
 * @return number[]
 */
const gcj02tobd09 = (gcj_lon,gcj_lat)=>{
    let z = Math.sqrt(gcj_lon * gcj_lon + gcj_lat * gcj_lat) + 0.00002 * Math.sin(gcj_lat * X_PI);
    let theta = Math.atan2(gcj_lat, gcj_lon) + 0.000003 * Math.cos(gcj_lon * X_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
}
/**
 * 百度坐标系(BD-09)转火星坐标系(GCJ-02)
 *
 * 百度——>谷歌、高德
 * @param bd_lon 百度坐标纬度
 * @param bd_lat 百度坐标经度
 * @return 火星坐标数组
 */
const bd09togcj02 = (bd_lon,bd_lat)=>{
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat ];
}

/**
 * 4326坐标转3857即经纬度转墨卡托
 * @param lon
 * @param lat
 */
const transformTo3857 = (lon,lat)=>{
    let x = lon * mercatorMax/180;
    let y = Math.log(Math.tan((90+lat)*Math.PI/360))/(Math.PI/180);
    y = y *mercatorMax/180;
    return [x,y];
}

const tarnsformTo4326 = ( mercatorx, mercatory)=> {
    let lon = mercatorx / mercatorMax * 180;
    let lat = mercatory / mercatorMax * 180;
    lat = (180 / PI) * (2 * Math.atan(Math.exp((lat * PI) / 180)) - PI / 2);
    //System.out.printf("墨卡托坐标转经纬度后的坐标:%f,%f \n",lon,lat);
    return [lon, lat];

}

const  transform = {
    gcj2gcj:(lng,lat)=>{return[lng,lat]},
    gcj2wgc84:(lng,lat)=>{return gcj02ToCgcs2000(lng,lat)},
    gcj2mct:(lng,lat)=>{
        console.log("ddddddddddddddd")
        let tmp = gcj02ToCgcs2000(lng,lat);
        return transformTo3857(tmp[0],tmp[1]);
    },
    gcj2bd:(lng,lat)=>{return gcj02tobd09(lng,lat)},
    wgc842gcj:(lng,lat)=>{return cgcs2000ToGcj02(lng,lat)},
    wgc842wgc84:(lng,lat)=>{return[lng,lat]},
    wgc842mct:(lng,lat)=>{return transformTo3857(lng,lat)},
    wgc842bd:(lng,lat)=>{
        let tmp = cgcs2000ToGcj02(lng,lat);
        return gcj02tobd09(tmp[0],tmp[1]);
    },
    mct2gcj:(lng,lat)=>{
        let tmp = tarnsformTo4326(lng,lat);
        return cgcs2000ToGcj02(tmp[0],tmp[1]);
    },
    mct2wgc84:(lng,lat)=>{return tarnsformTo4326(lng,lat)},
    mct2mct:(lng,lat)=>{return[lng,lat]},
    mct2bd:(lng,lat)=>{
        let tmp = tarnsformTo4326(lng,lat);
        tmp = cgcs2000ToGcj02(tmp[0],tmp[1]);
        return gcj02tobd09(tmp[0],tmp[1]);
    },
    bd2gcj:(lng,lat)=>{return bd09togcj02(lng,lat)},
    bd2wgc84:(lng,lat)=>{
        let tmp = bd09togcj02(lng,lat);
        return gcj02ToCgcs2000(tmp[0],tmp[1]);
    },
    bd2mct:(lng,lat)=>{
        let tmp = bd09togcj02(lng,lat);
        tmp = gcj02ToCgcs2000(tmp[0],tmp[1]);
        return transformTo3857(tmp[0],tmp[1]);
    },
    bd2bd:(lng,lat)=>{return[lng,lat]},
}


export {transform};