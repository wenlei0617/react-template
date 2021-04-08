import React from 'react';
import { UserInfo } from './user.interface';

interface IActionUserInfo {
  type: DispatchType.USERINFO;
  data: Partial<UserInfo> | null;
}
// action 定义结束

// action type 类型枚举
export enum DispatchType {
  USERINFO = 'USERINFO'
}

// store state 定义
export interface StoreState {
  userInfo: UserInfo | null;
}

export type IAction = IActionUserInfo;

export interface StoreEvent {
  dispatch: (action: IAction) => void;
}

const Store = React.createContext<StoreEvent & StoreState>({
  dispatch: () => {},
  userInfo: null
});

export default Store;