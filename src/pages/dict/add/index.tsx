import { addDict, getDictById, listMyDict } from '@/services/dictService';
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';

/**
 * 词条创建页面
 * @constructor
 */
const DictAddPage: React.FC<unknown> = () => {
  const [dictList, setDictList] = useState<DictType.Dict[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = useForm();
  const navigate = useNavigate();

  // 获取可选词库列表
  useEffect(() => {
    setLoading(true);
    listMyDict({})
      .then((res) => {
        setDictList(res.data);
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  /**
   * 创建
   * @param fields
   */
  const doAdd = async (fields: DictType.DictAddRequest) => {
    const hide = message.loading('正在提交');
    try {
      await addDict(fields);
      message.success('创建成功');
      navigate('/dict/add_result');
    } catch (e: any) {
      message.error('创建失败，请重试！', e.message);
    } finally {
      hide();
    }
  };

  /**
   * 导入基础词库
   * @param id
   */
  const loadDict = (id: number) => {
    if (!id) {
      form.setFieldValue('content', '');
      return;
    }
    getDictById(id)
      .then((res) => {
        form.setFieldValue('content', JSON.parse(res.data.content).join(','));
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      });
  };

  return (
    <PageContainer title="创建词库">
      <ProForm<DictType.DictAddRequest>
        form={form}
        onFinish={async (values) => {
          doAdd(values);
        }}
        labelAlign="left"
        submitter={{
          submitButtonProps: {
            style: {
              minWidth: 160,
            },
          },
          render: (props, dom) => [...dom.reverse()],
        }}
      >
        <ProFormText
          name="name"
          label="词库名称"
          rules={[{ required: true }, { max: 30 }]}
        />
        <ProFormSelect
          disabled={loading}
          options={dictList.map((dict) => {
            return {
              value: dict.id,
              label: dict.name,
            };
          })}
          name="parent"
          label="基础词库（可不选）"
          placeholder="基础词库中的所有单词会自动添加到新词库中"
          fieldProps={{
            onChange(value) {
              loadDict(value);
            },
          }}
        />
        <ProFormTextArea
          name="content"
          label="单词列表"
          placeholder="多个单词间用【英文或中文逗号】分割"
          rules={[{ required: true }]}
          fieldProps={{
            maxLength: 20000,
            showCount: true,
            autoSize: { minRows: 8 },
          }}
        />
      </ProForm>
    </PageContainer>
  );
};

export default DictAddPage;
