/*
 * @Author: gary 
 * @Date: 2021-04-08 13:34:09 
 * @Last Modified by:   gary 
 * @Last Modified time: 2021-04-08 13:34:09 
 * 用于React.lazy通用包装器
 */
import React, { Suspense } from 'react';
import Loading from './loading';

const LazyHOC = (Component: React.ComponentType) => {
  return class extends React.PureComponent {
    render() {
      return (
        <Suspense fallback={<Loading/>}>
          <Component />
        </Suspense>
      )
    }
  }
}

export default LazyHOC;