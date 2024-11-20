<template>
    <div class="account-vis">
        <div style="width: 100%;height: 620px;">
            <h3>全国游戏账号交易分布</h3>
            <div ref="mapChart" style="width:100%;height: 100%; "></div>
        </div>

        <div style="width: 100%;height: 520px;">
            <h3>游戏账号可视化数据</h3>
            <div style="display: flex;align-items: center;width: 100%;height: 100%;">
                <div ref="chartLeft" class="left" style="width: 49%;height: 100%;"></div>
                <div ref="chartRight" class="right" style="width: 49%;height: 100%;"></div>
            </div>
        </div>

        
    </div>

</template>

<script setup>
    import { ref, onMounted,nextTick  } from 'vue'
    import * as echarts from 'echarts'
    import {service} from '@/components/js/http.js';
    import  'echarts-extension-amap';

    const chartLeft = ref(null);
    const chartRight = ref(null);
    const mapChart = ref(null);

    let option = {
        title:{
            show: true ,
            text: '平台账号类型分布' ,
            left: 'center',
            top: '2%'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: 'center'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ]
            }
        ]
    };

    let option2 = {
  title: {
    text: '游戏账号想要人数与价格分布',
    
  },
  grid: {
    left: '3%',
    right: '7%',
    bottom: '7%',
    containLabel: true
  },
  tooltip: {
    // trigger: 'axis',
    showDelay: 0,
    formatter: function (params) {
      if (params.value.length > 1) {
        return (
          params.seriesName +
          ' :<br/>' +
          '账号ID: '+params.value[2]+
          '<br/>' +
          params.value[0] +
          '人 ' +
          params.value[1] +
          '元 '
        );
      } else {
        return (
          params.seriesName +
          ' :<br/>' +
          params.name +
          ' : ' +
          params.value +
          '元 '
        );
      }
    },
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'dashed',
        width: 1
      }
    }
  },
  toolbox: {
    feature: {
      dataZoom: {},
      brush: {
        type: ['rect', 'polygon', 'clear']
      }
    }
  },
  brush: {},
  legend: {
    data: [],
    left: 'center',
    bottom: 10
  },
  xAxis: [
    {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: '{value} 人'
      },
      splitLine: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: '{value} 元'
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: []
};


    onMounted(()=>{
       leftChart()
       rightChart()

       mapChart2()
    })

    const leftChart = ()=>{
        service.get('/game/type/count?pubUser=0&pubTime=')
            .then( res => {
                if(res.data.code === 200){
                    console.log(res.data.data)
                    option.series[0].data = res.data.data
                    nextTick(() => {
                        var myChart = echarts.init(chartLeft.value);
                        myChart.setOption(option);

                    })
                }     
            })
    }

    const rightChart = ()=>{
        service.get('/game/sandiantu?pubUser=0&pubTime=').then( res => {       
            if(res.data.code === 200){
                let dataVar = res.data.data
                let leng = []

                for(var i=0;i<dataVar.length;i++){
                    leng.push(dataVar[i].name)
                
                    let ser = {
                        name: dataVar[i].name,
                        type: 'scatter',
                        emphasis: {
                            focus: 'series'
                        },
                        // prettier-ignore
                        data: dataVar[i].data,
                        markArea: {
                            silent: true,
                            itemStyle: {
                            color: 'transparent',
                            borderWidth: 1,
                            borderType: 'dashed'
                            },
                            data: [
                            [
                                {
                                name: dataVar[i].name+' Data Range',
                                xAxis: 'min',
                                yAxis: 'min'
                                },
                                {
                                xAxis: 'max',
                                yAxis: 'max'
                                }
                            ]
                            ]
                        },
                        markPoint: {
                            data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                            ]
                        },
                        markLine: {
                            lineStyle: {
                            type: 'solid'
                            },
                            data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }]
                        }
                        }
                    
                    option2.series.push(ser)
                }
                option2.legend.data = leng

                nextTick(() => {
                    var myChart = echarts.init(chartRight.value);
                    myChart.setOption(option2);
                })
            }
        })
    }


    

var option3 = {
    title: {
        text: '平台游戏账号交易全国位置统计 - 高德地图',
        subtext: 'view in map',
        left: 'center',
        textStyle: {
            color: '#fff'
        },
        subtextStyle: {
            color: '#fff'
        }
    },
    tooltip: {
      trigger: 'item'
    },
  // 加载 amap 组件
  amap: {
    // 3D模式，无论你使用的是1.x版本还是2.x版本，都建议开启此项以获得更好的渲染体验
    viewMode: '3D',
    // 高德地图支持的初始化地图配置
    // 高德地图初始中心经纬度
    center: [108.39, 39.9],
    // 高德地图初始缩放级别
    zoom: 5,
    // 是否开启resize
    resizeEnable: true,
    // 自定义地图样式主题
    mapStyle: 'amap://styles/dark',
    // 移动过程中实时渲染 默认为true 如数据量较大 建议置为false
    renderOnMoving: true,
    // ECharts 图层的 zIndex 默认 2000
    // 从 v1.9.0 起 此配置项已被弃用 请使用 `echartsLayerInteractive` 代替
    echartsLayerZIndex: 2019,
    // 设置 ECharts 图层是否可交互 默认为 true
    // 设置为 false 可实现高德地图自身图层交互
    // 此配置项从 v1.9.0 起开始支持
    echartsLayerInteractive: true,
    // 是否启用大数据模式 默认为 false
    // 此配置项从 v1.9.0 起开始支持
    largeMode: false
    // 说明：如果想要添加卫星、路网等图层
    // 暂时先不要使用layers配置，因为存在Bug
    // 建议使用amap.add的方式，使用方式参见最下方代码
  },
  series: [
    {
      name:'geo info',
      type: 'scatter',
      // 使用高德地图坐标系
      coordinateSystem: 'amap',
      // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
      data: [{name:"dfgd",value:[120, 30, 8]}, {name:"b",value:[120.15, 30.2, 20]},{name:"c",value:[120.152, 30.12, 20]}],
      encode: {
        value: 2
      },
      symbolSize: function (val,param) {

        return (val[2]+50)/10;
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      }
    }
  ]
};


const mapChart2 = ()=>{
    service.get('/game/erecsxz').then( res => {
        if(res.data.code === 200){
            option3.series[0].data = res.data.data
            nextTick(() => {
                var myChart = echarts.init(mapChart.value);
                myChart.setOption(option3);
            })
        }
    })
}
</script>



<style scoped>
    :deep(.amap-layer){
        width: 100% !important;
        height: 100% !important;
    }
    :deep(.ec-extension-amap){
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
    }

    .account-vis{
        width: 100%;
        height: 100%;
    }
</style>