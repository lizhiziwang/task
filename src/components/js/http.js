import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
 
let router = new useRouter();
// 创建 Axios 实例
const service = axios.create({
  baseURL: '/api', // 使用环境变量配置 baseURL
  timeout: 50000, // 设置请求超时时间
});
 
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // // 在请求发送前可以进行一些配置，例如添加认证信息等
    let token = sessionStorage.getItem('token')
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
    // console.log(response);
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
    if(error.status === 403){
      
      location='/game/login'
      ElMessage.error('请重新登录！')
    }
    console.log(error)
    

    // 处理响应错误
    //...
    return Promise.reject(error);
  }
);
 

var controller = null;
    // 对外暴露取消请求的方法
const cancel =  () => {
  try{
    if(controller){
      controller.abort(); // 调用abort方法取消所有关联的请求
    }

  }catch(error){
    if (error.name === 'CanceledError') {
      console.log('请求已被手动取消，进行一些后续清理工作...');
      // 在这里可以做如清理临时数据、重置相关状态等操作
    } else {
      // 处理其他真正的请求失败错误
      console.error('请求出现其他错误:', error);
    }
  }


  // reject(new Error('请求已取消')); // 抛出取消请求的错误，外部可以捕获
};

const requestQueue = async (urls,maxNum) => {

  controller = new AbortController();
  var signal = controller.signal;

  return new Promise((resolve) => {
    const results = [];
    const executing = [];
    const run = async (url) => {
      try {
        const response = await service.get(url,{signal });
        results.push(response);
        // console.log("请求中", url);
      } catch (error) {
        if (axios.isCancel(error)) {
          // 如果是取消请求导致的错误，直接返回，不将其作为真正的请求失败处理
          return;
        }
        results.push({ error: true, message: error.message });
      } finally {
        const index = executing.indexOf(url);
        if (index !== -1) {
          executing.splice(index, 1);
        }

      }

      if (urls.length > 0 && executing.length < maxNum) {
        const runUrl = urls.shift();
        run(runUrl);
        executing.push(runUrl);
      }
      if (urls.length === 0 && executing.length === 0) resolve(results);
    };



    // 初始化时，执行最多 maxNum 个请求
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      const url = urls.shift();
      run(url);
      executing.push(url);
    }
  });
};
const Re_Queue = {
  execute: requestQueue,
  cancel: cancel
}
export {service,Re_Queue} ;