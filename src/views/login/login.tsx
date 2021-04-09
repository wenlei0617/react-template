/*
 * @Author: gary 
 * @Date: 2021-04-09 17:06:22 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-09 17:11:05
 * 登录页面
 */
import { Button, Form, Input, Typography, Layout } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from '../../utils/utils';
import styles from './login.module.scss';
import { FOOTER_TEXT, HOT_LINE } from '../../config/config';

const Login: React.FC = () => {
  const history = useHistory();

  const handleLogin = (data: { account: string; password: string }) => {
    // TODO 通过接口获取token 
    setToken('test');
    history.replace('/');
  }

  return (
    <Layout className={styles['login']}>
      <Layout.Content className={styles['login-content']}>
        <div className={styles['login-form']}>
          <Typography.Title className={styles['login-title']} level={2}>后台管理系统</Typography.Title>
          <Form 
            onFinish={handleLogin}
            size="large" 
            layout="horizontal">
            <Form.Item name="account">
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="请输入账号" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" block type="primary">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </Layout.Content>
      <Layout.Footer className={styles['login-footer']}>
        <div>技术服务热线：{HOT_LINE}</div>
        <div>{FOOTER_TEXT}</div>
      </Layout.Footer>
    </Layout>
  )
}

export default Login;