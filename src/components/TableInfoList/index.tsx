import ReportModal from '@/components/ReportModal';
import {
  deleteTableInfo,
  generateCreateTableSql,
} from '@/services/tableInfoService';
import { useModel } from '@umijs/max';
import {
  Button,
  Descriptions,
  Divider,
  List,
  message,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import './index.less';

interface Props {
  pagination: PaginationConfig;
  loading?: boolean;
  dataList: TableInfoType.TableInfo[];
  showTag?: boolean;
  onImport?: (values: TableInfoType.TableInfo) => void;
}

/**
 * 表信息列表
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const TableInfoList: React.FC<Props> = (props) => {
  const { dataList, pagination, loading, showTag = true, onImport } = props;
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportedId, setReportedId] = useState(0);

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
      await deleteTableInfo({
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
    <div className="table-info-list">
      <List<TableInfoType.TableInfo>
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={pagination}
        dataSource={dataList}
        renderItem={(item, index) => {
          const content: TableSchema = JSON.parse(item.content);
          return (
            <List.Item
              key={index}
              extra={
                onImport && (
                  <Button
                    onClick={() => {
                      onImport(item);
                    }}
                  >
                    导入
                  </Button>
                )
              }
            >
              <Descriptions
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
                column={2}
              >
                <Descriptions.Item label="表名">
                  {content.tableName}
                </Descriptions.Item>
                <Descriptions.Item label="表注释">
                  {content.tableComment ?? '无'}
                </Descriptions.Item>
                <Descriptions.Item label="字段列表">
                  {content.fieldList.map((field) => field.fieldName).join(', ')}
                </Descriptions.Item>
              </Descriptions>
              <Space
                split={<Divider type="vertical" />}
                style={{ fontSize: 14 }}
              >
                <Typography.Text type="secondary">
                  {item.createTime.toString().split('T')[0]}
                </Typography.Text>
                <Button
                  type="text"
                  onClick={() => {
                    generateCreateTableSql(item.id)
                      .then((res) => {
                        copy(res.data);
                        message.success('复制建表 SQL 成功');
                      })
                      .catch((e) => {
                        message.error('复制失败，' + e.message);
                      });
                  }}
                >
                  复制语句
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
          );
        }}
      />
      <ReportModal
        visible={reportModalVisible}
        reportedId={reportedId}
        onClose={() => {
          setReportModalVisible(false);
        }}
      />
    </div>
  );
};

export default TableInfoList;
