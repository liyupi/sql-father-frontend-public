import {
  BugOutlined,
  GithubOutlined,
  SketchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import './index.less';

/**
 * 全局 Footer
 *
 * @author https://github.com/liyupi
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} 程序员鱼皮`}
      links={[
        {
          key: 'master',
          title: (
            <>
              <UserOutlined /> 站长：程序员鱼皮
            </>
          ),
          href: 'https://space.bilibili.com/12890453',
          blankTarget: true,
        },
        {
          key: 'learn',
          title: (
            <>
              <SketchOutlined /> 编程学习圈
            </>
          ),
          href: 'https://yupi.icu',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 代码已开源
            </>
          ),
          href: 'https://github.com/liyupi/sql-father-frontend-public',
          blankTarget: true,
        },
        {
          key: 'feedback',
          title: (
            <>
              <BugOutlined /> 建议反馈
            </>
          ),
          href: 'https://support.qq.com/product/440825',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
