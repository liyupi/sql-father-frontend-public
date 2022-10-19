/**
 * 词条类型定义
 */
declare namespace DictType {
  /**
   * 实体
   */
  interface Dict {
    id: number;
    name: string;
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
  interface DictAddRequest {
    name: string;
    content: string;
  }

  /**
   * 更新请求
   */
  interface DictUpdateRequest {
    id: number;
    name?: string;
    content?: string;
    reviewStatus?: number;
    reviewMessage?: string;
  }

  /**
   * 查询请求
   */
  interface DictQueryRequest extends PageRequest {
    name?: string;
    content?: string;
    userId?: number;
    reviewStatus?: number;
  }

}
