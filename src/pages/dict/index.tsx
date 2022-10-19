import DictCard from '@/components/DictCard';
import { listMyDictByPage } from '@/services/dictService';
import { PageContainer } from '@ant-design/pro-components';
import { Col, message, Radio, RadioChangeEvent, Row } from 'antd';
import React, { useState } from 'react';
import './index.less';

/**
 * 主页
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const IndexPage: React.FC = () => {
  const [layout, setLayout] = useState('half');

  /**
   * 加载我的数据
   * @param searchParams
   * @param setDataList
   * @param setTotal
   */
  const loadMyData = (
    searchParams: DictType.DictQueryRequest,
    setDataList: (dataList: DictType.Dict[]) => void,
    setTotal: (total: number) => void,
  ) => {
    listMyDictByPage(searchParams)
      .then((res) => {
        setDataList(res.data.records);
        setTotal(res.data.total);
      })
      .catch((e) => {
        message.error('加载失败，' + e.message);
      });
  };

  /**
   * 更改布局
   * @param e
   */
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  return (
    <div id="indexPage">
      <PageContainer
        title={
          <>
            使用现成的词库来生成特定数据，或用作研究数据集！
            <a
              href="https://www.bilibili.com/video/BV1eP411N7B7/"
              target="_blank"
              rel="noreferrer"
            >
              查看视频教程
            </a>
          </>
        }
        extra={
          <div style={{ marginLeft: 0 }}>
            切换布局：
            <Radio.Group onChange={onLayoutChange} value={layout}>
              <Radio.Button value="input">公开</Radio.Button>
              <Radio.Button value="half">同屏</Radio.Button>
              <Radio.Button value="output">个人</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 2 : 1}
          >
            <DictCard title="公开词库" showTag={false} />
          </Col>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 1 : 2}
          >
            <DictCard title="个人词库" onLoad={loadMyData} needLogin />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default IndexPage;
