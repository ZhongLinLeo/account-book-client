// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FundsRecordItem } from './data';

/** 获取记录列表 GET /funds_record/pagination */
export async function classifies(
  params: {
    /** 当前的页码 */
    pageNumber?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FundsRecordItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/funds_record/pagination', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新记录 PUT /api/funds_record */
export async function updateClassify(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<FundsRecordItem>('/api/funds_record/' + data.fundsRecordId, {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建记录 POST /api/funds_record */
export async function addClassify(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<FundsRecordItem>('/api/funds_record', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除记录 DELETE /api/funds_record */
export async function removeClassify(data: { key: number }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/funds_record/' + data.key, {
    method: 'DELETE',
    ...(options || {}),
  });
}