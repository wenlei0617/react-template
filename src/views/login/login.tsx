import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../store';
import { DispatchType } from '../../store/context';
import { setToken } from '../../utils/utils';

const Login: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useStore();
  return (
    <div>
      Login
      <Button onClick={() => {
        setToken('test');
        history.replace('/order');
        dispatch({ type: DispatchType.USERINFO, data: { auth: ['/order'] }})
      }}>登录</Button>
    </div>
  )
}

export default Login;