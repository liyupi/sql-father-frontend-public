/**
 * 词条服务
 */
import { request } from '@umijs/max';

/**
 * 获取列表
 * @param params
 */
export async function listDict(params: DictType.DictQueryRequest) {
  return request<BaseResponse<DictType.Dict[]>>('/dict/list', {
    method: 'GET',
    params,
  });
}

/**
 * 获取当前用户可选的全部词库列表
 * @param params
 */
export async function listMyDict(params: DictType.DictQueryRequest) {
  return request<BaseResponse<DictType.Dict[]>>('/dict/my/list', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户创建的资源列表
 * @param params
 */
export async function listMyAddDictByPage(params: DictType.DictQueryRequest) {
  return request<BaseResponse<PageInfo<DictType.Dict>>>('/dict/my/add/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 分页获取当前用户的资源列表
 * @param params
 */
export async function listMyDictByPage(params: DictType.DictQueryRequest) {
  return request<BaseResponse<PageInfo<DictType.Dict>>>('/dict/my/list/page', {
    method: 'GET',
    params,
  });
}


/**
 * 分页获取列表
 * @param params
 */
export async function listDictByPage(params: DictType.DictQueryRequest) {
  return request<BaseResponse<PageInfo<DictType.Dict>>>('/dict/list/page', {
    method: 'GET',
    params,
  });
}

/**
 * 创建
 * @param params
 */
export async function addDict(params: DictType.DictAddRequest) {
  return request<BaseResponse<number>>('/dict/add', {
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
export async function getDictById(id: number) {
  return request<BaseResponse<DictType.Dict>>(`/dict/get`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 更新
 * @param params
 */
export async function updateDict(params: DictType.DictUpdateRequest) {
  return request<BaseResponse<boolean>>(`/dict/update`, {
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
export async function deleteDict(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/dict/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 生成创建字典表 SQL
 * @param id
 */
export async function generateCreateDictTableSql(id: number) {
  return request<BaseResponse<GenerateVO>>(`/dict/generate/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: id,
  });
}

