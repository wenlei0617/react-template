import { Form, Input, Modal } from "antd";

const usePassword = () => {
  const [form] = Form.useForm();

  const openPassword = () => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '请输入操作密码',
        content: <Form form={form} layout="horizontal">
          <Form.Item name="password">
            <Input placeholder="请输入操作密码" />
          </Form.Item>
        </Form>,
        okButtonProps: {
          htmlType: "submit"
        },
        onOk() {
          resolve(form.getFieldValue('password'));
        },
        onCancel() {
          reject();
        }
      })
    })
  }

  return openPassword;
}

export default usePassword;