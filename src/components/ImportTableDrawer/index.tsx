import TableInfoCard from '@/components/TableInfoCard';
import { listMyTableInfoByPage } from '@/services/tableInfoService';
import { useModel } from '@@/exports';
import { Drawer, message } from 'antd';
import React from 'react';

interface Props {
  onImport: (values: TableInfoType.TableInfo) => void;
  visible: boolean;
  onClose: () => void;
}

/**
 * 导入表抽屉
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const ImportTableDrawer: React.FC<Props> = (props) => {
  const { visible, onImport, onClose } = props;
  const { initialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;

  /**
   * 加载我的数据
   * @param searchParams
   * @param setDataList
   * @param setTotal
   */
  const loadMyData = loginUser
    ? (
        searchParams: TableInfoType.TableInfoQueryRequest,
        setDataList: (dataList: TableInfoType.TableInfo[]) => void,
        setTotal: (total: number) => void,
      ) => {
        listMyTableInfoByPage(searchParams)
          .then((res) => {
            setDataList(res.data.records);
            setTotal(res.data.total);
          })
          .catch((e) => {
            message.error('加载失败，' + e.message);
          });
      }
    : undefined;

  return (
    <Drawer
      title="导入表"
      contentWrapperStyle={{ width: '60%', minWidth: 320 }}
      open={visible}
      onClose={onClose}
    >
      <TableInfoCard onLoad={loadMyData} onImport={onImport} />
    </Drawer>
  );
};

export default ImportTableDrawer;
