/*
 * @Author: gary 
 * @Date: 2021-04-08 13:37:07 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 18:53:03
 * 公共函数库
 */

// 存储的token字段
const TOKEN = process.env.REACT_APP_WEB_UUID;

/**
 * @description 获取当前token
 */
export const getToken = () => {
  if (!TOKEN) {
    throw '请配置REACT_APP_WEB_UUID';
  }
  return sessionStorage.getItem(TOKEN);
}

/**
 * @description 设置当前token
 * @param value 
 */
export const setToken = (value: string) => {
  if (!TOKEN) {
    throw '请配置REACT_APP_WEB_UUID';
  }
  sessionStorage.setItem(TOKEN, value);
}