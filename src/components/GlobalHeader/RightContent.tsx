import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React from 'react';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

type GlobalHeaderRightProps = Partial<ProSettings>;

/**
 * 全局菜单右侧
 * @constructor
 */
const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = () => {
  return (
    <div className={styles.right}>
      <AvatarDropdown />
    </div>
  );
};

export default GlobalHeaderRight;
