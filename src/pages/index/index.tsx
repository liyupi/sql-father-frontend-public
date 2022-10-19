import AutoInputModal from '@/components/AutoInputModal';
import FormInput from '@/components/FormInput';
import GenerateResultCard from '@/components/GenerateResultCard';
import ImportTableDrawer from '@/components/ImportTableDrawer';
import JsonInputModal from '@/components/JsonInputModal';
import SqlInputModal from '@/components/SqlInputModal';
import { generateBySchema, getSchemaByExcel } from '@/services/sqlService';
import { getTableInfoById } from '@/services/tableInfoService';
import { PageContainer } from '@ant-design/pro-components';
import {
  BackTop,
  Button,
  Card,
  Col,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'umi';
import './index.less';

/**
 * 主页
 *
 * @constructor
 * @author https://github.com/liyupi
 */
const IndexPage: React.FC = () => {
  const [result, setResult] = useState<GenerateVO>();
  const [autoInputModalVisible, setAutoInputModalVisible] = useState(false);
  const [jsonInputModalVisible, setJsonInputModalVisible] = useState(false);
  const [sqlInputModalVisible, setSqlInputModalVisible] = useState(false);
  const [importTableDrawerVisible, setImportTableDrawerVisible] =
    useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const formInputRef: any = useRef();
  const [layout, setLayout] = useState('half');

  const [searchParams] = useSearchParams();
  const tableId = searchParams.get('table_id');

  /**
   * 根据 Schema 生成
   * @param values
   */
  const doGenerateBySchema = async (values: TableSchema) => {
    setGenLoading(true);
    try {
      const res = await generateBySchema(values);
      setResult(res.data);
      message.success('已生成');
    } catch (e: any) {
      message.error('生成错误，' + e.message);
    }
    setGenLoading(false);
  };

  /**
   * 导入 tableSchema
   * @param tableSchema
   */
  const importTableSchema = (tableSchema: TableSchema) => {
    formInputRef.current.setFormValues(tableSchema);
    setAutoInputModalVisible(false);
    setJsonInputModalVisible(false);
    setSqlInputModalVisible(false);
    message.success('导入成功');
  };

  // 根据 url 参数导入表
  useEffect(() => {
    if (!tableId) {
      return;
    }
    getTableInfoById(Number(tableId))
      .then((res) => {
        const tableSchema = JSON.parse(res.data.content);
        importTableSchema(tableSchema);
      })
      .catch((e) => {
        message.error('导入表失败，' + e.message);
      });
  }, [tableId]);

  /**
   * Excel 上传组件属性
   */
  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    customRequest: async (options) => {
      if (!options) {
        return;
      }
      try {
        const res = await getSchemaByExcel(options.file);
        importTableSchema(res.data);
      } catch (e: any) {
        message.error('操作失败，' + e.message);
      }
    },
  };

  /**
   * 更改布局
   * @param e
   */
  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value);
  };

  /**
   * 输入配置视图
   */
  const inputConfigView = (
    <Card
      title="输入配置"
      extra={
        <Select defaultValue="MySQL" style={{ width: 120 }} disabled>
          <Select.Option value="MySQL">MySQL</Select.Option>
        </Select>
      }
    >
      <Space size="large" wrap>
        <Button
          type="primary"
          ghost
          onClick={() => setAutoInputModalVisible(true)}
        >
          智能导入
        </Button>
        <Button onClick={() => setImportTableDrawerVisible(true)}>
          导入表
        </Button>
        <Button onClick={() => setJsonInputModalVisible(true)}>导入配置</Button>
        <Button onClick={() => setSqlInputModalVisible(true)}>
          导入建表 SQL
        </Button>
        <Upload {...uploadProps}>
          <Button>导入 Excel</Button>
        </Upload>
      </Space>
      <div style={{ marginTop: 16 }} />
      <FormInput ref={formInputRef} onSubmit={doGenerateBySchema} />
    </Card>
  );

  return (
    <div id="indexPage">
      <PageContainer
        title={
          <>
            快速生成 SQL 和模拟数据，大幅提高开发测试效率！
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
              <Radio.Button value="input">配置</Radio.Button>
              <Radio.Button value="half">同屏</Radio.Button>
              <Radio.Button value="output">结果</Radio.Button>
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
            {inputConfigView}
          </Col>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 1 : 2}
          >
            <GenerateResultCard result={result} loading={genLoading} />
          </Col>
        </Row>
        <BackTop />
      </PageContainer>
      <AutoInputModal
        onSubmit={importTableSchema}
        visible={autoInputModalVisible}
        onClose={() => setAutoInputModalVisible(false)}
      />
      <JsonInputModal
        onSubmit={importTableSchema}
        visible={jsonInputModalVisible}
        onClose={() => setJsonInputModalVisible(false)}
      />
      <SqlInputModal
        onSubmit={importTableSchema}
        visible={sqlInputModalVisible}
        onClose={() => setSqlInputModalVisible(false)}
      />
      <ImportTableDrawer
        onImport={(tableInfo) => {
          formInputRef.current.setFormValues(JSON.parse(tableInfo.content));
          setImportTableDrawerVisible(false);
          message.success('导入成功');
        }}
        visible={importTableDrawerVisible}
        onClose={() => setImportTableDrawerVisible(false)}
      />
    </div>
  );
};

export default IndexPage;
