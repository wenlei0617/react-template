/*
 * @Author: gary 
 * @Date: 2021-04-08 13:37:07 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 13:44:52
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

/**
 * @description 设置col的布局
 * @param flex 
 */
export const colLayout = (flex: 1 | 2 = 1) => {
  return {
    xs: 24,
    sm: 24,
    md: 12,
    lg: flex === 1 ? 8 : 12,
    xl: 6 * flex,
    xxl: 6 * flex
  }
}