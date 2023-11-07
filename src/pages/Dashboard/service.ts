// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FundsOverview } from './data';

/** overview GET /analyze/overview */
export async function fundsOverview(): Promise<{ data: { overview: FundsOverview } }> {
  return request('/api/analyze/overview');
}
