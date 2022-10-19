import { updateFieldInfo } from '@/services/fieldInfoService';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface UpdateModalProps {
  oldData: FieldInfoType.FieldInfo;
  modalVisible: boolean;
  columns: ProColumns<FieldInfoType.FieldInfo>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: FieldInfoType.FieldInfo) => {
  const hide = message.loading('正在更新');
  try {
    await updateFieldInfo(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 更新数据模态框
 * @param props
 * @constructor
 */
const FieldInfoUpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, columns, modalVisible, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="更新"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<FieldInfoType.FieldInfo, FieldInfoType.FieldInfo>
        onSubmit={async (values) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id,
          });
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        form={{
          initialValues: oldData,
        }}
        columns={columns}
      />
    </Modal>
  );
};

export default FieldInfoUpdateModal;
