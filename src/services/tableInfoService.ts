/**
 * 表信息服务
 */
import { request } from '@umijs/max';

/**
 * 获取列表
 * @param params
 */
export async function listTableInfo(params: TableInfoType.TableInfoQueryRequest) {
  return request<BaseResponse<TableInfoType.TableInfo[]>>('/table_info/list', {
    method: 'GET',
    params,
  });
}

/**
 * 获取当前用户可选的全部资源列表
 * @param params
 */
export async function listMyTableInfo(params: TableInfoType.TableInfoQueryRequest) {
  return request<BaseResponse<TableInfoType.TableInfo[]>>('/table_info/my/list', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户创建的资源列表
 * @param params
 */
export async function listMyAddTableInfoByPage(params: TableInfoType.TableInfoQueryRequest) {
  return request<BaseResponse<PageInfo<TableInfoType.TableInfo>>>('/table_info/my/add/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户的资源列表
 * @param params
 */
export async function listMyTableInfoByPage(params: TableInfoType.TableInfoQueryRequest) {
  return request<BaseResponse<PageInfo<TableInfoType.TableInfo>>>('/table_info/my/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取列表
 * @param params
 */
export async function listTableInfoByPage(params: TableInfoType.TableInfoQueryRequest) {
  return request<BaseResponse<PageInfo<TableInfoType.TableInfo>>>('/table_info/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 创建
 * @param params
 */
export async function addTableInfo(params: TableInfoType.TableInfoAddRequest) {
  return request<BaseResponse<number>>('/table_info/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 id 查询
 * @param id
 */
export async function getTableInfoById(id: number) {
  return request<BaseResponse<TableInfoType.TableInfo>>(`/table_info/get`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 更新
 * @param params
 */
export async function updateTableInfo(params: TableInfoType.TableInfoUpdateRequest) {
  return request<BaseResponse<boolean>>(`/table_info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除
 * @param params
 */
export async function deleteTableInfo(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/table_info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 生成创建表 SQL
 * @param id
 */
export async function generateCreateTableSql(id: number) {
  return request<BaseResponse<string>>(`/table_info/generate/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  });
}
