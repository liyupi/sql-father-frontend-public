import { updateReport } from '@/services/reportService';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface UpdateModalProps {
  oldData: ReportType.Report;
  modalVisible: boolean;
  columns: ProColumns<ReportType.Report>[];
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: ReportType.Report) => {
  const hide = message.loading('正在更新');
  try {
    await updateReport(fields);
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
const UpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, columns, modalVisible, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="更新"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<ReportType.Report, ReportType.Report>
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

export default UpdateModal;
