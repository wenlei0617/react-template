import { Button, Form, Input, Row } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import LumuTable from '../../../components/table/table';
import { http } from '../../../utils/http';

const OrderList: React.FC = () => {
  const table = useRef(null);

  return (
    <LumuTable
      refs={table}
      api="/v1/user/list"
      fetch={() => http.get('/')}
      rowKey={data => data.id}
      columns={[
        { title: '序号', render: (_, __, index) => index + 1 },
        { title: '姓名', dataIndex: 'name' },
        {
          title: '操作', render: () => <Link to="/order/1">详情</Link>
        }
      ]}>
      <Row gutter={[24, 24]}>
        <Form.Item label="test" name="test">
          <Input placeholder="测试" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">搜索</Button>
        </Form.Item>
      </Row>
    </LumuTable>
  )
}

export default OrderList;