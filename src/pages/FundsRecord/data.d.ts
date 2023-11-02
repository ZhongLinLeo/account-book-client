import { ClassifyInfo } from '@/pages/Classify/data';
import { FinancialAccount } from '@/pages/FinancialAccount/data';

export type FundsRecordItem = {
  fundsRecordId: string;
  fundsRecordBalance: number;
  fundsRecordTime: Date;
  fundsRecordDescribe: string;
  fundsRecordRemark: string;
  classifyInfo: ClassifyInfo;
  accountInfo: FinancialAccount;
  fundsUserId: string;
};

export type FundsRecordPagination = {
  totalSize: number;
  pageSize: number;
  pageNumber: number;
};
