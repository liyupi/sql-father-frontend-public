import { request } from '@umijs/max';

/**
 * 根据 schema 生成
 * @param params
 */
export async function generateBySchema(params: TableSchema) {
  return request<BaseResponse<GenerateVO>>('/sql/generate/schema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 智能获取 schema
 * @param params
 */
export async function getSchemaByAuto(params: GenerateByAutoRequest) {
  return request<BaseResponse<TableSchema>>('/sql/get/schema/auto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 SQL 获取 schema
 * @param params
 */
export async function getSchemaBySql(params: GenerateBySqlRequest) {
  return request<BaseResponse<TableSchema>>('/sql/get/schema/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 Excel 获取 schema
 * @param file
 */
export async function getSchemaByExcel(file: any) {
  const params = new FormData();
  params.append('file', file);
  return request<BaseResponse<TableSchema>>('/sql/get/schema/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: params,
  });
}

/**
 * 下载模拟数据 Excel
 * @param params
 */
export async function downloadDataExcel(params: GenerateVO) {
  return request<BlobPart>('/sql/download/data/excel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
    data: params,
  });
}
