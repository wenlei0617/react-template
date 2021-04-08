```tsx
// 用法
const Page = () => {
  const table = useRef(null);

  // table.current.refetch() 更新列表

  return (
    <LumuTable
      ref={table}
      api="api地址"
      rowKey={data => data.id}
      columns={[]}>
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
```