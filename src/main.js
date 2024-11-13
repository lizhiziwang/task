
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import VueCesium from 'vue-cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css';
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'


// import ElementPlus from 'element-plus';
// import 'element-plus/theme-chalk/src/index.scss';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$axios = axios

app.use(router);
app.use(ElementPlus);
app.use(echarts)

// app.use(VueCesium, {
//     // cesiumPath 是指引用的Cesium.js路径，如
//     // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
//     // cesiumPath: /static/Cesium/Cesium.js
//     // 个人在线Cesium Build包：
//     // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
//     // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
//     // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
//     // 官方在线Cesium Build包，有CDN加速，推荐用这个：
//     cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
//     // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致Cesium在线影像加载不了
//     accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDQ5MmY1YS0wNjU0LTQ5MjgtOGYxMC1hZDZkN2Q2NzY4MDUiLCJpZCI6MTk2NDI0LCJpYXQiOjE3MTg3NjEzMjZ9.3A3qMen6eJ_cFkYvRrSE3iCJ-k2fqzMdnCMkZ1XjND8'
//   })
app.mount('#app');
