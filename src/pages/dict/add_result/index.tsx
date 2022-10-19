import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'umi';

/**
 * 词库添加成功页面
 * @constructor
 */
const DictAddResultPage: React.FC = () => (
  <Result
    status="success"
    title="词库创建成功"
    subTitle="你可以立即使用该词库，审核通过后他人也可使用该词库"
    extra={[
      <Link key="use" to="/">
        <Button type="primary">去使用</Button>
      </Link>,
      <Link key="add" to="/dict/add">
        <Button> 再创建一个</Button>
      </Link>,
    ]}
  />
);

export default DictAddResultPage;
