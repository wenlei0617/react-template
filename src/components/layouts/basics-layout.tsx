import { Card } from 'antd';
import React from 'react';

const BasicsLayout: React.FC = (props) => {
  return (
    <Card style={{ minHeight: '100%' }}>{props.children}</Card>
  )
}

export default BasicsLayout;