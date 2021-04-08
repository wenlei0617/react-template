/*
 * @Author: gary 
 * @Date: 2021-04-08 13:36:56 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 19:15:53
 * http请求封装
 */
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { getToken, setToken } from './utils';
import { createHashHistory } from 'history'

export const BASE_URL = process.env.REACT_APP_API_CONFIG;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000,
  responseType: 'json'
});

export interface IResponse<T> {
  result: T,
  message: string,
  code: number
}

http.interceptors.request.use((config: AxiosRequestConfig) => {
  // ! 授权信息
  config.headers['Authorization'] = '556d95510b4d48617b65d9984a1480ea';
  // config.headers['Authorization'] = getToken();
  config.headers['deviceType'] = 3;
  config.validateStatus = (status) => {
    return (status >= 200 && status < 300) || [401, 429].includes(status)
  }
  return config;
}, error => {
  message.error('网络连接失败');
  return Promise.reject(error);
});

http.interceptors.response.use(<T>(response: AxiosResponse<IResponse<T>>) => {
  if (response.config.url && response.config.url.indexOf('https://up-z1.qiniup.com') > -1 && response.status === 200) {
    return response;
  } else if (response.status === 200 && response.data.code === 200) {
    return response;
  } else if (response.status === 200) {
    message.error(response.data.message);
    return Promise.reject(response);
  } else if (response.status === 401) {
    // ! 重定向
    setToken('');
    const history = createHashHistory();
    history.replace('/login');
    return Promise.reject(response);
  }
  // !异常错误
  if (typeof response.data !== 'object') {
    message.error('服务器繁忙，请刷新重试')
    return Promise.reject(response);
  }
  return Promise.reject(response);
}, (error: AxiosError) => {
  // !超时错误
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    message.error('当前网络不稳定，请检查网络后重新进入')
  } else {
    // !未知错误
    message.error('服务器繁忙，请刷新重试')
  }
  return Promise.reject(error);
});