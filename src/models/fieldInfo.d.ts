/**
 * 字段信息类型定义
 */
declare namespace FieldInfoType {
  /**
   * 实体
   */
  interface FieldInfo {
    id: number;
    name: string;
    fieldName: string;
    content: string;
    reviewStatus: number;
    reviewMessage?: string;
    userId: number;
    createTime: Date;
    updateTime: Date;
  }

  /**
   * 创建请求
   */
  interface FieldInfoAddRequest {
    name: string;
    content: string;
  }

  /**
   * 更新请求
   */
  interface FieldInfoUpdateRequest {
    id: number;
    name?: string;
    fieldName?: string;
    content?: string;
    reviewStatus?: number;
    reviewMessage?: string;
  }

  /**
   * 查询请求
   */
  interface FieldInfoQueryRequest extends PageRequest {
    searchName?: string;
    name?: string;
    fieldName?: string;
    content?: string;
    userId?: number;
    reviewStatus?: number;
  }

}
