/**
 * 举报服务
 */
import { request } from '@umijs/max';

/**
 * 分页获取列表
 * @param params
 */
export async function listReportByPage(params: ReportType.ReportQueryRequest) {
  return request<BaseResponse<PageInfo<ReportType.Report>>>(
    '/report/list/page',
    {
      method: 'GET',
      params,
    },
  );
}

/**
 * 创建
 * @param params
 */
export async function addReport(params: ReportType.ReportAddRequest) {
  return request<BaseResponse<number>>('/report/add', {
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
export async function getReportById(id: number) {
  return request<BaseResponse<ReportType.Report>>(`/report/get`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 更新
 * @param params
 */
export async function updateReport(params: ReportType.ReportUpdateRequest) {
  return request<BaseResponse<boolean>>(`/report/update`, {
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
export async function deleteReport(params: DeleteRequest) {
  return request<BaseResponse<boolean>>(`/report/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
