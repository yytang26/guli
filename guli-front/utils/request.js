import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8222', // api的base_url
  timeout: 20000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
    if(cookie.get('guli_token')) {
      config.headers['token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

service.interceptors.response.use(
  response => {
    if(response.data.code  == 28004){
      console.log("response.data.resultCode是28004")
      window.location.href = "/login"
      return
    }else{
      if(response.data.code!==20000){
        Message({
          message : response.data.message || 'error',
          type:'error',
          duration:5*1000
        })
      }else{
        return response;
      }
    }
  },
  error =>{
    return Promise.reject(error.response)
  }
);

export default service