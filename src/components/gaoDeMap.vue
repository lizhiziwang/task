<script>
    var map = new AMap.Map('container', {
        center: [116.397428, 29.90923],
        layers: [//只显示默认图层的时候，layers可以缺省
            new AMap.TileLayer()//高德默认标准图层
        ],
        zoom: 13
    });
</script>
 <template>
    <div id="container">
    </div>
 </template>
 <style>
   #container {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
 </style>