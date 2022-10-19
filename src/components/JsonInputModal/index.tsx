import { JSON_INPUT_EXAMPLE } from '@/constants/examples';
import { Button, Form, Modal, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

interface Props {
  onSubmit: (values: TableSchema) => void;
  visible: boolean;
  onClose: () => void;
}

/**
 * JSON 配置输入模态框
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const JsonInput: React.FC<Props> = (props) => {
  const { visible, onSubmit, onClose } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const tableSchema = JSON.parse(values.content);
    onSubmit?.(tableSchema);
  };

  return (
    <Modal title="导入配置" open={visible} footer={null} onCancel={onClose}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="content"
          label={
            <>
              请输入表结构 JSON：
              <Button
                onClick={() =>
                  form.setFieldValue(
                    'content',
                    JSON.stringify(JSON_INPUT_EXAMPLE),
                  )
                }
              >
                导入示例
              </Button>
            </>
          }
          rules={[{ required: true, message: '请输入配置' }]}
        >
          <TextArea
            placeholder="请输入配置 JSON，可以从表单输入处复制"
            autoSize={{ minRows: 16 }}
          />
        </Form.Item>
        <Form.Item>
          <Space size="large">
            <Button type="primary" htmlType="submit" style={{ width: 120 }}>
              导入
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JsonInput;
