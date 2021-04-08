import { Button, Form, Input, Popconfirm, Row, Select, Tooltip } from 'antd';
import React, { useRef } from 'react';
import LumuTable, { LumuTableRef } from '../../../components/table/table';
import { http } from '../../../utils/http';
import { ITicket } from '../ticket-interface';
import useDeleteCoupon from '../service/use-delete-coupon';
import useCouponPrice from '../service/use-coupon-price';
import useCouponType from '../service/use-coupon-type';
import useActivitySearchList from '../../activity/service/use-activity-search-list';

const TicketList: React.FC = () => {
  const table = useRef<LumuTableRef>(null);
  const deleteCoupon = useDeleteCoupon();
  const couponPriceList = useCouponPrice();
  const couponTypeList = useCouponType();
  const activitySearchList = useActivitySearchList();

  const handleRemove = async (data: ITicket) => {
    await deleteCoupon(data.id);
    table.current?.refetch();
  }

  return (
    <LumuTable<ITicket>
      refs={table}
      api="/v1/coupon-setting/page"
      fetch={(params) => http.post('/v1/coupon-setting/page', params)}
      rowKey={data => data.id}
      columns={[
        { title: '序号', render: (_, __, index) => index + 1, width: 60 },
        { title: '名称', dataIndex: 'name', width: 100 },
        { title: '类型', dataIndex: 'typeName', width: 100 },
        { title: '优惠内容', dataIndex: 'remark' },
        { title: '使用门槛', dataIndex: 'limitPrice' },
        {
          title: '使用规则', key: 'info', render: (text) => (
            <Tooltip placement="top" title={'使用规则'}>
              <Button type="link">详细</Button>
            </Tooltip>
          )
        },
        { title: '面额', dataIndex: 'price', width: 80 },
        { title: '已领取/剩余', render: (_, record) => `${record.receiveCount}/${record.totalCount - record.receiveCount}`, width: 80 },
        { title: '已使用', dataIndex: 'useCount', width: 80 },
        {
          title: '状态', render: (_, record) => {
            if (record.status === 1) {
              return '未配置';
            } else if (record.status === 2) {
              return '未到使用时间';
            } else if (record.status === 3) {
              return '可使用';
            } else {
              return '已过期';
            }
          }
        },
        { title: '有效期', render: (_, record) => `${record.startTime}到${record.endTime}`, width: 200 },
        { title: '所属活动', dataIndex: 'activityName', width: 100 },
        {
          title: '操作', key: 'action', render: (_, record) => (
            record.status === 1 ? <Popconfirm title="确定删除" onConfirm={() => handleRemove(record)}>
              <Button type="link">删除</Button>
            </Popconfirm> : null
          )
        }
      ]}>
      <Row gutter={[24, 24]}>
        <Form.Item label="消费券名称" name="name">
          <Input placeholder="请输入消费券名称" />
        </Form.Item>
        <Form.Item label="消费券状态" name="status">
          <Select className="common-select" defaultValue="">
            <Select.Option value="">全部</Select.Option>
            <Select.Option value={1}>未配置</Select.Option>
            <Select.Option value={2}>未到使用时间</Select.Option>
            <Select.Option value={3}>可使用</Select.Option>
            <Select.Option value={4}>已过期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="消费券类型" name="typeId">
          <Select className="common-select" defaultValue="">
            <Select.Option value="">全部</Select.Option>
            {
              couponTypeList?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>{name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="面额" name="price">
          <Select className="common-select" defaultValue="">
            <Select.Option value="">全部</Select.Option>
            {
              couponPriceList?.map((price) => (
                <Select.Option key={price} value={price}>{price}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="所属活动" name="activityId">
          <Select className="common-select" defaultValue="">
            <Select.Option value="">全部</Select.Option>
            {
              activitySearchList?.map(({ id, name }) => (
                <Select.Option key={id} value={id}>{name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">搜索</Button>
        </Form.Item>
      </Row>
    </LumuTable>
  )
}

export default TicketList;