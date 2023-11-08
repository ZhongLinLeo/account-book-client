// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FundsOverview, FundsTrend } from './data';

/** overview GET /analyze/overview */
export async function fundsOverview(): Promise<{ data: { overview: FundsOverview } }> {
  return request('/api/analyze/overview');
}

/** trend GET /analyze/trend */
export async function fundsTrend(params: {
  trendType?: string;
}): Promise<{ data: { trend: FundsTrend[] } }> {
  return request('/api/analyze/trend', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
