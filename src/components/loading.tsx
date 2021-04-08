/*
 * @Author: gary 
 * @Date: 2021-04-08 13:30:55 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 13:34:02
 * 全屏loading组件
 */
import { Spin } from 'antd';
import React from 'react';
import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles['loading']}>
      <Spin tip="加载中..." size="large"></Spin>
    </div>
  )
}

export default Loading;