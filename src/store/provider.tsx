import React, { useReducer } from 'react';
import Store, { DispatchType, IAction, StoreState } from './context';
import { UserInfo } from './user.interface';

const reducer = (state: StoreState, action: IAction) => {
  const { data, type } = action;
  const cloneState = Object.assign({}, state);
  switch (type) {
    case DispatchType.USERINFO:
      cloneState.userInfo = Object.assign({}, cloneState.userInfo, data as UserInfo);
      return cloneState;
    default:
      return state;
  }
}

export const Provider:React.FC = (props) => {
  const [
    state, 
    dispatch
  ] = useReducer(reducer, { 
    userInfo: null 
  });

  return (
    <Store.Provider value={{...state, dispatch}}>
      {props.children}
    </Store.Provider>
  )
}