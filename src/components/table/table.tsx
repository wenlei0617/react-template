/*
 * @Author: gary 
 * @Date: 2021-04-08 15:01:43 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-09 17:47:27
 * 通用列表组件
 */
import { Form, Table } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';
import { AxiosResponse } from 'axios';
import React, { Ref, useImperativeHandle, useState } from 'react';
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';
import { PAGE_SIZE } from '../../config/config';
import { IResponse } from '../../utils/http';
import BasicsLayout from '../layouts/basics-layout';

interface LumuTableProps<T, R> {
  columns: ColumnsType<T>;
  api: string;  
  fetch: (params: R & SearchParams) => Promise<AxiosResponse<IResponse<HttpList<T>>>>;
  children?: React.ReactNode;
  initialValues?: Store;
  rowKey?: GetRowKey<T>;
  searchParams?: R;
  refs?: Ref<LumuTableRef>;
}

export interface LumuTableRef {
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

function LumuTable<T extends object = any, R extends object = {}>(props: LumuTableProps<T, R>) {
  const { children, api, searchParams, fetch, refs, initialValues, ...tableProps } = props;
  const [form] = Form.useForm();
  const [params, setParams] = useState<R & SearchParams>({
    ...searchParams as R,
    pageNum: 1,
    pageSize: PAGE_SIZE
  });
  const { isLoading, data, refetch } = useQuery([api, params], async () => {
    const response = await fetch(params);
    return response.data.result;
  });

  useImperativeHandle(refs, () => {
    return {
      refetch
    }
  })

  return (
    <BasicsLayout>
      <Form
        initialValues={initialValues}
        style={{ marginBottom: 20 }}
        layout="horizontal"
        form={form}
        onFinish={(values) => {
          setParams({
            ...values,
            pageNum: 1,
            pageSize: PAGE_SIZE
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
              pageNum: page,
              pageSize: PAGE_SIZE
            }))
          }
        }}
        dataSource={data?.list}
        loading={isLoading}
        {...tableProps}></Table>
    </BasicsLayout>
  )
};

export default LumuTable;