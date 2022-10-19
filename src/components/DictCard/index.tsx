import DictList from '@/components/DictList';
import { listDictByPage } from '@/services/dictService';
import { Link, useModel } from '@umijs/max';
import { Button, Card, Empty, Input, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

// 默认分页大小
const DEFAULT_PAGE_SIZE = 10;

interface Props {
  title?: string;
  needLogin?: boolean;
  showTag?: boolean;
  onLoad?: (
    searchParams: DictType.DictQueryRequest,
    setDataList: (dataList: DictType.Dict[]) => void,
    setTotal: (total: number) => void,
  ) => void;
  onImport?: (values: DictType.Dict) => void;
}

/**
 * 词库卡片
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const DictCard: React.FC<Props> = (props) => {
  const { title = '公开词库', needLogin = false, showTag = true, onLoad, onImport } = props;

  // 公开数据
  const [dataList, setDataList] = useState<DictType.Dict[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const initSearchParams: DictType.DictQueryRequest = {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortField: 'createTime',
    sortOrder: 'descend',
  };
  const [searchParams, setSearchParams] =
    useState<DictType.DictQueryRequest>(initSearchParams);

  const { initialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;

  /**
   * 加载数据
   */
  const innerOnLoad = () => {
    listDictByPage({
      ...searchParams,
      // 只展示已审核通过的
      reviewStatus: 1,
    })
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      });
  };

  // 加载数据
  useEffect(() => {
    // 需要登录
    if (needLogin && !loginUser) {
      return;
    }
    setLoading(true);
    if (onLoad) {
      onLoad(searchParams, setDataList, setTotal);
    } else {
      innerOnLoad();
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="dict-info-card">
      <Card
        title={title}
        extra={
          <Link to="/">
            <Button type="primary">创建词库</Button>
          </Link>
        }
      >
        {!needLogin || loginUser ? (
          <>
            <Space>
              <Input.Search
                placeholder="请输入名称"
                enterButton="搜索"
                onSearch={(value) => {
                  setSearchParams({
                    ...initSearchParams,
                    name: value,
                  });
                }}
              />
            </Space>
            <DictList
              pagination={{
                total,
                onChange: (current) => {
                  setSearchParams({ ...searchParams, current });
                  window.scrollTo({
                    top: 0,
                  });
                },
                pageSize: DEFAULT_PAGE_SIZE,
              }}
              dataList={dataList}
              loading={loading}
              showTag={showTag}
              onImport={onImport}
            />
          </>
        ) : (
          <Empty
            description={
              <Link to="/user/login">
                <Button type="primary" ghost style={{ marginTop: 8 }}>
                  请先登录
                </Button>
              </Link>
            }
          />
        )}
      </Card>
    </div>
  );
};

export default DictCard;
