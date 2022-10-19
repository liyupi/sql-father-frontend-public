import GenerateResultCard from '@/components/GenerateResultCard';
import ReportModal from '@/components/ReportModal';
import { deleteDict, generateCreateDictTableSql } from '@/services/dictService';
import { useModel } from '@umijs/max';
import {
  Button,
  Divider,
  Drawer,
  List,
  message,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import React, { useState } from 'react';
import './index.less';

interface Props {
  pagination: PaginationConfig;
  loading?: boolean;
  dataList: DictType.Dict[];
  showTag?: boolean;
  onImport?: (values: DictType.Dict) => void;
}

/**
 * 词库列表
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const DictList: React.FC<Props> = (props) => {
  const { dataList, pagination, loading, showTag = true } = props;
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportedId, setReportedId] = useState(0);
  const [result, setResult] = useState<GenerateVO>();
  const [genLoading, setGenLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;

  /**
   *  删除节点
   * @param id
   */
  const doDelete = async (id: number) => {
    const hide = message.loading('正在删除');
    if (!id) return true;
    try {
      await deleteDict({
        id,
      });
      message.success('操作成功');
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };

  return (
    <div className="dict-list">
      <List<DictType.Dict>
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={pagination}
        dataSource={dataList}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={
                <Space align="center">
                  <div>{item.name}</div>
                  <div>
                    {showTag && item.reviewStatus === 1 && (
                      <Tag color="success">公开</Tag>
                    )}
                    {item.userId === 1 && <Tag color="gold">官方</Tag>}
                  </div>
                </Space>
              }
              description={
                <Typography.Paragraph
                  type="secondary"
                  ellipsis={{
                    rows: 6,
                    expandable: true,
                    symbol: '展开',
                  }}
                  copyable
                >
                  {JSON.parse(item.content).join(',')}
                </Typography.Paragraph>
              }
            />
            <Space split={<Divider type="vertical" />} style={{ fontSize: 14 }}>
              <Typography.Text type="secondary">
                {item.createTime.toString().split('T')[0]}
              </Typography.Text>
              <Button
                type="text"
                loading={genLoading}
                onClick={() => {
                  setGenLoading(true);
                  generateCreateDictTableSql(item.id)
                    .then((res) => {
                      setResult(res.data);
                    })
                    .catch((e) => {
                      message.error('复制失败，' + e.message);
                    })
                    .finally(() => setGenLoading(false));
                }}
              >
                生成表
              </Button>
              <Button
                type="text"
                onClick={() => {
                  setReportedId(item.id);
                  setReportModalVisible(true);
                }}
              >
                举报
              </Button>
              {loginUser && loginUser.id === item.userId && (
                <Popconfirm
                  title="你确定要删除么？"
                  onConfirm={() => {
                    doDelete(item.id);
                  }}
                >
                  <Button type="text" danger>
                    删除
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </List.Item>
        )}
      />
      <ReportModal
        visible={reportModalVisible}
        reportedId={reportedId}
        onClose={() => {
          setReportModalVisible(false);
        }}
      />
      <Drawer
        title="生成字典表成功"
        contentWrapperStyle={{ width: '80%', minWidth: 320 }}
        open={!!result}
        onClose={() => setResult(undefined)}
      >
        <GenerateResultCard result={result} showCard={false} />
      </Drawer>
    </div>
  );
};

export default DictList;
