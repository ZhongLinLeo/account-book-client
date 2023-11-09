// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FundsCompose, FundsOverview, FundsTop, FundsTrend } from './data';

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

/** compose GET /analyze/compose */
export async function fundsCompose(params: {
  trendType?: string;
}): Promise<{ data: { compose: FundsCompose } }> {
  return request('/api/analyze/compose', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** top GET /analyze/top */
export async function fundsTop(params: {
  trendType?: string;
}): Promise<{ data: { top: FundsTop } }> {
  return request('/api/analyze/top', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
