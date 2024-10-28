import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import map from '../components/map.vue';
import requestAxios from '../components/requestAxios.vue'
import service from '../components/service.vue'
import nacos from '../components/nacos.vue'
import geoserver from '../components/geoserver.vue'
import setup from '../components/setupDemo.vue'
import testPo from '../components/testPo.vue'
import _3Demo from '../components/_3Demo.vue'
import door from '../components/door.vue'
import cm from '../components/cm.vue'
import chat from '../components/chat/chat.vue'
import message from '../components/chat/message.vue'
import login from '../components/login.vue'
import home from '../components/home/home.vue'
// import drag from '../components/drag.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/3D',
      name: 'cm',
      component: cm
    },
    {
      path: '/game/home',
      name: 'home',
      component: home
    },
    {
      path: '/chat/message',
      name: 'message',
      component: message
    },
    {
      path: '/chat/login',
      name: 'login',
      component: login
    },
    {
      path: '/chat/chat',
      name: 'chat',
      component: chat
    },
    {
      path:'/map',
      name:'map',
      component:map
    },
    {
      path:'/door',
      name:'door',
      component:door
    },
    {
      path:'/re',
      name:'/re',
      component:requestAxios
    },
    {
      path:'/sentinel',
      name:'service',
      component:service
    },
    {
      path:'/nacos',
      name:'nacos',
      component:nacos
    },
    {
      path:'/geoserver',
      name:'geoserver',
      component:geoserver
    },
    {
      path:'/setup',
      name:'setup',
      component:setup
    }
    ,
    {
      path:'/testPo',
      name:'testPo',
      component:testPo
    },
    {
      path:'/_3Demo',
      name:'_3Demo',
      component:_3Demo
    }
    // ,
    // {
    //   path:'/CesiumDemo',
    //   name:'CesiumDemo',
    //   component:CesiumDemo
    // }
  ]
})

export default router
