import { addTableInfo } from '@/services/tableInfoService';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal, Typography } from 'antd';
import React, { PropsWithChildren } from 'react';

interface Props {
  modalVisible: boolean;
  initialValues?: TableInfoType.TableInfo;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableInfoType.TableInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addTableInfo({ ...fields } as TableInfoType.TableInfoAddRequest);
    hide();
    message.success('添加成功');
    return true;
  } catch (e: any) {
    hide();
    message.error('添加失败，' + e.message);
    return false;
  }
};

/**
 * 创建数据模态框
 * @param props
 * @constructor
 */
const TableInfoCreateModal: React.FC<PropsWithChildren<Props>> = (props) => {
  const { modalVisible, initialValues, onSubmit, onCancel } = props;

  /**
   * 表格列配置
   */
  const columns: ProColumns<TableInfoType.TableInfo>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true }],
      },
      fieldProps: {
        autoFocus: true,
        placeholder: '请输入中文名称',
      }
    },
    {
      title: '内容（不建议在此处修改）',
      dataIndex: 'content',
      valueType: 'textarea',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="保存表信息（后续可直接导入）"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Typography.Text type="secondary">
        注意，你提交的内容可能会被公开！
      </Typography.Text>
      <div style={{ marginBottom: 16 }} />
      <ProTable<TableInfoType.TableInfo, TableInfoType.TableInfo>
        form={{
          initialValues,
          submitter: {
            render: (props, dom) => [...dom.reverse()],
          },
        }}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default TableInfoCreateModal;
