/*
 * @Author: gary 
 * @Date: 2021-04-08 15:01:43 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-08 15:15:30
 * 通用列表组件
 */
import { Card, Form, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';
import React, { useImperativeHandle, useState } from 'react';
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';
import { PAGE_SIZE } from '../../config/config';
import { http, IResponse } from '../../utils/http';

interface LumuTableProps {
  columns: ColumnsType<any>;
  api: string;
  rowKey?: GetRowKey<any>;
  searchParams?: any;
  children?: React.ReactNode;
}

interface LumuTableSwipe {
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<HttpList<any>, unknown>>
}

interface HttpList<T> {
  total: number;
  list: T[]
}

interface SearchParams {
  pageNum: number;
  pageSize: number;
  [key: string]: any;
}

const LumuTable = React.forwardRef<LumuTableSwipe, LumuTableProps>((props, ref) => {
  const { children, api, searchParams, ...tableProps } = props;
  const [form] = Form.useForm();
  const [params, setParams] = useState<SearchParams>({
    ...searchParams,
    pageNum: 1,
    pageSize: PAGE_SIZE
  });
  const { isLoading, data, refetch } = useQuery([api, params], async () => {
    const response = await http.post<IResponse<HttpList<any>>>(api, {
      ...params
    });
    return response.data.data;
  });

  useImperativeHandle(ref, () => {
    return {
      refetch
    }
  })

  return (
    <Card>
      <Form form={form} onFinish={(values) => {
        setParams({
          ...values,
          pageNum: 1,
        });
      }}>
        {children}
      </Form>
      <Table
        bordered
        size="small"
        pagination={{
          position: ['topRight'],
          showSizeChanger: false,
          total: data?.total,
          current: params.pageNum,
          pageSize: PAGE_SIZE,
          onChange: (page) => {
            setParams((params) => ({
              ...params,
              pageNum: page
            }))
          }
        }}
        dataSource={data?.list}
        loading={isLoading}
        {...tableProps}></Table>
    </Card>
  )
});

export default LumuTable;