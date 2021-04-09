/*
 * @Author: gary 
 * @Date: 2021-04-08 15:01:43 
 * @Last Modified by: gary
 * @Last Modified time: 2021-04-09 17:47:27
 * 通用列表组件
 */
import { Card, Form, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';
import { AxiosResponse } from 'axios';
import React, { Ref, useImperativeHandle, useState } from 'react';
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';
import { PAGE_SIZE } from '../../config/config';
import { IResponse } from '../../utils/http';
import styles from './table.module.scss';

interface LumuTableProps<T> {
  columns: ColumnsType<T>;
  api: string;
  rowKey?: GetRowKey<any>;
  searchParams?: any;
  children?: React.ReactNode;
  fetch: (params: any) => Promise<AxiosResponse<IResponse<HttpList<any>>>>;
  refs?: Ref<LumuTableRef>
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

function LumuTable<T>(props: LumuTableProps<T>) {
  const { children, api, searchParams, fetch, refs, ...tableProps } = props;
  const [form] = Form.useForm();
  const [params, setParams] = useState<SearchParams>({
    ...searchParams,
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
    <Card className={styles['card']}>
      <Form
        style={{ marginBottom: 20 }}
        layout="inline"
        form={form}
        onFinish={(values) => {
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
};

export default LumuTable;