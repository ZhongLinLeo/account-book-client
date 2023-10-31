// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取分类列表 GET /funds_record_classify/pagination */
export async function classifies(
  params: {
    // query
    /** 当前的页码 */
    pageNumber?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/funds_record_classify/pagination', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新分类 PUT /api/rule */
export async function updateClassify(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<TableListItem>('/api/funds_record_classify', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建分类 POST /api/rule */
export async function addClassify(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/funds_record_classify', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除分类 DELETE /api/rule */
export async function removeClassify(data: { key: number }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/funds_record_classify/' + data.key, {
    method: 'DELETE',
    ...(options || {}),
  });
}
