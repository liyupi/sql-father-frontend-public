/**
 * 字段信息服务
 */
import { request } from '@umijs/max';

/**
 * 获取列表
 * @param params
 */
export async function listFieldInfo(params: FieldInfoType.FieldInfoQueryRequest) {
  return request<BaseResponse<FieldInfoType.FieldInfo[]>>('/field_info/list', {
    method: 'GET',
    params,
  });
}

/**
 * 获取当前用户可选的全部资源列表
 * @param params
 */
export async function listMyFieldInfo(params: FieldInfoType.FieldInfoQueryRequest) {
  return request<BaseResponse<FieldInfoType.FieldInfo[]>>('/field_info/my/list', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户创建的资源列表
 * @param params
 */
export async function listMyAddFieldInfoByPage(params: FieldInfoType.FieldInfoQueryRequest) {
  return request<BaseResponse<PageInfo<FieldInfoType.FieldInfo>>>('/field_info/my/add/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户的资源列表
 * @param params
 */
export async function listMyFieldInfoByPage(params: FieldInfoType.FieldInfoQueryRequest) {
  return request<BaseResponse<PageInfo<FieldInfoType.FieldInfo>>>('/field_info/my/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取列表
 * @param params
 */
export async function listFieldInfoByPage(params: FieldInfoType.FieldInfoQueryRequest) {
  return request<BaseResponse<PageInfo<FieldInfoType.FieldInfo>>>('/field_info/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 创建
 * @param params
 */
export async function addFieldInfo(params: FieldInfoType.FieldInfoAddRequest) {
  return request<BaseResponse<number>>('/field_info/add', {
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
export async function getFieldInfoById(id: number) {
  return request<BaseResponse<FieldInfoType.FieldInfo>>(`/field_info/get`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 更新
 * @param params
 */
export async function updateFieldInfo(params: FieldInfoType.FieldInfoUpdateRequest) {
  return request<BaseResponse<boolean>>(`/field_info/update`, {
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
export async function deleteFieldInfo(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/field_info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 生成创建字段 SQL
 * @param id
 */
export async function generateCreateFieldSql(id: number) {
  return request<BaseResponse<string>>(`/field_info/generate/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  });
}
