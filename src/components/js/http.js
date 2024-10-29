import axios from 'axios';
import { ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
 

// 创建 Axios 实例
const service = axios.create({
  baseURL: '/api', // 使用环境变量配置 baseURL
  timeout: 5000, // 设置请求超时时间
});
 
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // // 在请求发送前可以进行一些配置，例如添加认证信息等
    let token = localStorage.getItem('token')
    config.headers['Authorization'] = token; // 示例：添加认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在响应返回后，可以进行一些处理，例如判断是否需要更新令牌等
    //...
    console.log(response.data);
    if (response.data && response.data.code === 403) {
      // const router = useRouter();
      // router.push({ path: '/chat/login' });
      ElMessage.error('权限不足！')
    }
    if (response.data && response.data.code === 404) {
      // const router = useRouter();
      // router.push({ path: '/chat/login' });
      ElMessage.error('资源路径错误！')
    }
    let responseData;
    try {
      responseData = JSON.parse(response.data.data);
    } catch (e) {
      return response;
    }
    if (responseData && responseData.token!== undefined) {
      localStorage.setItem('token', responseData.token);
    }
    return response;
  },
  (error) => {
    ElMessage.error('服务器错误！')

    // 处理响应错误
    //...
    return Promise.reject(error);
  }
);
 
export {service} ;