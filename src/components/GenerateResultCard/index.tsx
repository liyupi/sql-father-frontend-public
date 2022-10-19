import CodeEditor from '@/components/CodeEditor';
import { downloadDataExcel } from '@/services/sqlService';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Collapse,
  Empty,
  message,
  Space,
  Table,
  Tabs,
} from 'antd';
import copy from 'copy-to-clipboard';
import React from 'react';

interface Props {
  result?: GenerateVO;
  loading?: boolean;
  showCard?: boolean;
}

/**
 * 生成结果卡片
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const GenerateResultCard: React.FC<Props> = (props) => {
  const { result, loading = false, showCard = true } = props;

  /**
   * 下载 excel 数据
   */
  const doDownloadDataExcel = async () => {
    if (!result) {
      return;
    }
    try {
      const res = await downloadDataExcel(result);
      // 下载文件
      const blob = new Blob([res]);
      const objectURL = URL.createObjectURL(blob);
      const btn = document.createElement('a');
      btn.download = `${result.tableSchema.tableName}表数据.xlsx`;
      btn.href = objectURL;
      btn.click();
      URL.revokeObjectURL(objectURL);
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    }
  };

  /**
   * 生成表格列
   * @param tableSchema
   */
  const schemaToColumn = (tableSchema: TableSchema) => {
    if (!tableSchema?.fieldList) {
      return [];
    }
    return tableSchema.fieldList.map((column) => {
      return {
        title: column.fieldName,
        dataIndex: column.fieldName,
        key: column.fieldName,
      };
    });
  };

  const tabContent = result ? (
    <Tabs
      items={[
        {
          label: `SQL 代码`,
          key: 'createSql',
          children: (
            <>
              <Space>
                <Button
                  icon={<CopyOutlined />}
                  type="primary"
                  onClick={(e) => {
                    if (!result) {
                      return;
                    }
                    copy(`${result.createSql}\n\n${result.insertSql}`);
                    e.stopPropagation();
                    message.success('已复制到剪切板');
                  }}
                >
                  复制全部
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} />
              <Collapse defaultActiveKey={['1', '2']}>
                <Collapse.Panel
                  header="建表语句"
                  key="1"
                  className="code-collapse-panel"
                  extra={
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        copy(result?.createSql);
                        e.stopPropagation();
                        message.success('已复制到剪切板');
                      }}
                    >
                      复制
                    </Button>
                  }
                >
                  <CodeEditor value={result.createSql} language="sql" />
                </Collapse.Panel>
                <Collapse.Panel
                  header="插入语句"
                  key="2"
                  className="code-collapse-panel"
                  extra={
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        copy(result?.insertSql);
                        e.stopPropagation();
                        message.success('已复制到剪切板');
                      }}
                    >
                      复制
                    </Button>
                  }
                >
                  <CodeEditor value={result.insertSql} language="sql" />
                </Collapse.Panel>
              </Collapse>
            </>
          ),
        },
        {
          label: `模拟数据`,
          key: 'mockData',
          children: (
            <>
              <Space>
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={() => doDownloadDataExcel()}
                >
                  下载数据
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} />
              <Table
                bordered={true}
                dataSource={result.dataList}
                columns={schemaToColumn(result.tableSchema)}
              />
            </>
          ),
        },
        {
          label: `JSON 数据`,
          key: 'dataJson',
          children: (
            <>
              <Space>
                <Button
                  icon={<CopyOutlined />}
                  type="primary"
                  onClick={(e) => {
                    copy(result?.dataJson);
                    e.stopPropagation();
                    message.success('已复制到剪切板');
                  }}
                >
                  复制代码
                </Button>
              </Space>
              <div style={{ marginTop: 16 }} />
              <CodeEditor value={result.dataJson} language="json" />
            </>
          ),
        },
        {
          label: `Java 代码`,
          key: 'javaCode',
          children: (
            <>
              <Collapse defaultActiveKey={['1', '2']}>
                <Collapse.Panel
                  header="实体代码"
                  key="1"
                  className="code-collapse-panel"
                  extra={
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        copy(result?.javaEntityCode);
                        e.stopPropagation();
                        message.success('已复制到剪切板');
                      }}
                    >
                      复制
                    </Button>
                  }
                >
                  <CodeEditor value={result.javaEntityCode} language="java" />
                </Collapse.Panel>
                <Collapse.Panel
                  header="对象代码"
                  key="2"
                  className="code-collapse-panel"
                  extra={
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        copy(result?.javaObjectCode);
                        e.stopPropagation();
                        message.success('已复制到剪切板');
                      }}
                    >
                      复制
                    </Button>
                  }
                >
                  <CodeEditor value={result.javaObjectCode} language="java" />
                </Collapse.Panel>
              </Collapse>
            </>
          ),
        },
        {
          label: `前端代码`,
          key: 'frontendCode',
          children: (
            <>
              <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel
                  header="Typescript 类型代码"
                  key="1"
                  className="code-collapse-panel"
                  extra={
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        copy(result?.typescriptTypeCode);
                        e.stopPropagation();
                        message.success('已复制到剪切板');
                      }}
                    >
                      复制
                    </Button>
                  }
                >
                  <CodeEditor
                    value={result.typescriptTypeCode}
                    language="typescript"
                  />
                </Collapse.Panel>
              </Collapse>
            </>
          ),
        },
      ]}
    />
  ) : (
    <Empty description="请先输入配置并点击【一键生成】" />
  );

  return showCard ? (
    <Card title="生成结果" loading={loading}>
      {tabContent}
    </Card>
  ) : (
    tabContent
  );
};

export default GenerateResultCard;
