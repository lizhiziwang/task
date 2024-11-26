
var gis = {


    mercatorTolonlat:(mercator)=>{
        var lonlat={
            x:0,
            y:0
        };
        var x = mercator.x/20037508.34*180;
        var y = mercator.y/20037508.34*180;
        y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);
        lonlat.x = x;
        lonlat.y = y;
        return lonlat;
    },
    lonLat2Mercator:(lonlat)=>{
        var mercator = {
            x:0,
            y:0
        };
        var earthRad = 6378137.0;
        mercator.x = lonlat.lng * Math.PI / 180 * earthRad;
        var a = lonlat.lat * Math.PI / 180;
        mercator.y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
        return mercator;
    }
}

export {gis};